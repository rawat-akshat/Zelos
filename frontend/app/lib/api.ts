export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export const GUEST_TURN_LIMIT = 10;

export const TOKEN_KEY = "zelos_backend_token";
export const GUEST_CHAT_KEY = "zelos_guest_chat";

export interface ApiUser {
  id: string;
  email: string;
  name?: string | null;
  avatar_url?: string | null;
  subscription_plan: string;
  onboarding_completed: boolean;
  auth_provider?: string | null;
  created_at: string;
}

export interface ApiSession {
  id: string;
  user_id: string;
  title?: string | null;
  goal: string;
  status: string;
  task_status: string;
  last_message_at?: string | null;
  created_at: string;
  updated_at?: string | null;
}

export interface ApiMessage {
  id: string;
  session_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  mode?: string | null;
  metadata?: Record<string, unknown> | null;
  created_at: string;
}

export interface ApiInterventionSummary {
  id: string;
  type: string;
  pattern_name: string;
  message: string;
  confidence: number;
  intervention_type: string;
  message_id?: string | null;
}

export interface ApiChatTurn {
  user_message: ApiMessage;
  assistant_message: ApiMessage;
  detected_patterns: Array<{
    pattern_id: string;
    pattern_name: string;
    confidence: number;
    evidence?: string | null;
    timeline_title?: string | null;
    message_id?: string | null;
  }>;
  intervention?: ApiInterventionSummary | null;
  timeline_events: ApiTimelineEvent[];
}

export interface ApiTimelineEvent {
  id: string;
  goal_id: string;
  type: string;
  title: string;
  description?: string | null;
  confidence?: number | null;
  message_id?: string | null;
  pattern_id?: string | null;
  created_at: string;
}

export interface ApiSessionPattern {
  pattern_id: string;
  name: string;
  description: string;
  confidence: number;
  evidence_count: number;
  last_detected_at?: string | null;
}

export interface ApiCoachingPreferences {
  coaching_style: "supportive" | "balanced" | "direct";
  goal_checkins: boolean;
  weekly_reflection: boolean;
  pattern_alerts: boolean;
}

export interface ApiInsightsPage {
  has_data: boolean;
  summary: {
    active_goals: number;
    patterns_detected: number;
    playbook_rules_learned: number;
    experiments_completed: number;
  };
  behavioral_profile: Array<{ label: string; value: number }>;
  patterns: Array<{
    id: string;
    name: string;
    description: string;
    confidence: number;
    observed_count: number;
    last_observed_at: string;
    goals: Array<{ goal_id: string; goal_title: string; count: number }>;
    trend?: string | null;
  }>;
  occurrences: Array<{
    id: string;
    pattern_id: string;
    goal_id: string;
    goal_title: string;
    conversation_id: string;
    message_id: string;
    confidence: number;
    evidence_text: string;
    message_preview: string;
    created_at: string;
  }>;
  playbook: { works_well: string[]; does_not_work: string[] };
  timeline: Array<{
    id: string;
    type: string;
    title: string;
    goal_title: string;
    created_at: string;
  }>;
  active_experiments: Array<{
    id: string;
    title: string;
    goal_title: string;
    status: string;
    date: string;
  }>;
  completed_experiments: Array<{
    id: string;
    title: string;
    goal_title: string;
    status: string;
    date: string;
  }>;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const DEFAULT_TIMEOUT_MS = 30_000;

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
  timeoutMs = DEFAULT_TIMEOUT_MS
): Promise<T> {
  const authToken = token ?? getStoredToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError(
        "Request timed out. Check your connection and try again.",
        408
      );
    }
    if (err instanceof TypeError) {
      throw new ApiError(
        "Could not reach the server. Make sure the API is running and try again.",
        0
      );
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      if (typeof body.detail === "string") {
        detail = body.detail;
      } else if (Array.isArray(body.detail)) {
        detail = body.detail.map((d: { msg?: string }) => d.msg ?? "").join(" ");
      }
    } catch {
      /* ignore */
    }
    throw new ApiError(String(detail || "Request failed"), res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  exchangeToken(supabaseToken: string) {
    return apiFetch<{
      access_token: string;
      user: ApiUser;
    }>("/auth/exchange-token", {
      method: "POST",
      body: JSON.stringify({ supabase_token: supabaseToken }),
    });
  },

  getMe() {
    return apiFetch<ApiUser>("/auth/me");
  },

  updateMe(body: { name?: string; avatar_url?: string; onboarding_completed?: boolean }) {
    return apiFetch<ApiUser>("/auth/me", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  async uploadAvatar(file: File): Promise<ApiUser> {
    const authToken = getStoredToken();
    const form = new FormData();
    form.append("file", file);
    const headers: Record<string, string> = {};
    if (authToken) headers.Authorization = `Bearer ${authToken}`;

    const res = await fetch(`${API_BASE}/profile/avatar`, {
      method: "POST",
      headers,
      body: form,
    });
    if (!res.ok) {
      let detail = res.statusText;
      try {
        const body = await res.json();
        detail =
          typeof body.detail === "string"
            ? body.detail
            : JSON.stringify(body.detail);
      } catch {
        /* ignore */
      }
      throw new ApiError(String(detail || "Upload failed"), res.status);
    }
    return res.json() as Promise<ApiUser>;
  },

  listSessions() {
    return apiFetch<{ sessions: ApiSession[]; total: number }>("/sessions");
  },

  createSession(body: { title: string; goal: string; first_message?: string }) {
    return apiFetch<ApiSession>("/sessions", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  importGuestSession(body: {
    title: string;
    goal: string;
    messages: Array<{ role: "user" | "assistant"; content: string }>;
  }) {
    return apiFetch<ApiSession>("/sessions/import", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  getInsights() {
    return apiFetch<ApiInsightsPage>("/insights");
  },

  getSession(sessionId: string) {
    return apiFetch<ApiSession>(`/sessions/${sessionId}`);
  },

  openSession(sessionId: string) {
    return apiFetch(`/sessions/${sessionId}/open`, { method: "POST" });
  },

  getTimeline(sessionId: string) {
    return apiFetch<ApiTimelineEvent[]>(`/sessions/${sessionId}/timeline`);
  },

  listMessages(sessionId: string) {
    return apiFetch<ApiMessage[]>(`/sessions/${sessionId}/messages`);
  },

  sendMessage(sessionId: string, content: string) {
    return apiFetch<ApiChatTurn>(
      `/sessions/${sessionId}/messages`,
      {
        method: "POST",
        body: JSON.stringify({ content, mode: "do" }),
      },
      undefined,
      60_000
    );
  },

  getSessionPatterns(sessionId: string) {
    return apiFetch<ApiSessionPattern[]>(`/patterns/session/${sessionId}`);
  },

  getCoachingPreferences() {
    return apiFetch<ApiCoachingPreferences>("/profile/preferences");
  },

  updateCoachingPreferences(body: Partial<ApiCoachingPreferences>) {
    return apiFetch<ApiCoachingPreferences>("/profile/preferences", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },
};
