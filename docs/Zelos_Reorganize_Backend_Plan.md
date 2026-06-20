# Zelos — Reorganize Backend Plan

**Stack:** FastAPI + Supabase Postgres + Supabase Auth  
**Aligned with:** PRD V3 (behavioral coach), 12-entity data model  
**Out of scope for V1:** streaks, XP, achievements, leaderboard, gamification

---

## North Star

**Old backend:** one-shot task breakdown + gamification (XP, streaks, actions CRUD)

**New backend:** ChatGPT-style **threads** + **messages** + **goal memory** + **patterns/interventions** + **focus mode** + **LLM context assembly**

```
Frontend (Next.js)
       ↓
FastAPI (/api/v1)
       ↓
Services (business logic)
       ↓
Repositories (Supabase/Postgres only)
       ↓
Supabase Postgres
```

**Architecture rule:** API routes → services → repositories. No direct `db.client.table(...)` calls inside endpoints.

---

## Target Folder Layout

```
backend/app/
  api/v1/endpoints/     # thin routes only
  models/schemas.py     # Pydantic request/response
  repositories/         # all Supabase queries
    user_repo.py
    session_repo.py
    message_repo.py
    pattern_repo.py
    focus_repo.py
    profile_repo.py
  services/             # business logic
    session_service.py
    chat_service.py
    llm_context_service.py
    pattern_service.py
    focus_service.py
  core/                 # config, database
  llm/                  # prompts, OpenAI/Anthropic clients
    prompts.py
    client.py
```

---

## Phase 0 — Cleanup & Restructure (1–2 days)

**Goal:** Stop building on the wrong shape.

### 0.1 Add new folders

Create `repositories/`, `services/`, and `llm/` under `backend/app/`.

### 0.2 Unregister legacy routes

In `router.py`, stop exposing:

- `streaks` ❌
- `breakdown` as primary flow ❌ (replace with chat later)
- `actions` as standalone CRUD ❌ (optional later inside focus mode)
- gamification bits in `feedback` ❌ (XP bonuses)

Keep for now:

- `auth` ✅
- `sessions` ✅ (extend)
- `messages` ✅ (extend)

### 0.3 Update Pydantic schemas

Remove or deprecate:

- `UserStats`, streak/XP fields on `UserResponse`
- `BreakdownRequest/Response` as primary contract
- `ActionComplete` XP logic

Add enums:

- `SessionStatus` — active, paused, completed, abandoned
- `TaskStatus` — not_started, in_progress, blocked, drifting, completed, changed
- `MessageRole` — user, assistant, system
- `InterventionType` — gentle_redirect, validate_then_refocus, break_into_micro_step, ask_commitment, task_switch_confirmation, continue_normally
- `FocusSessionStatus` — started, completed, cancelled
- `PatternSeverity` — low, medium, high

---

## Phase 1 — Database Migration (2–3 days)

**Goal:** Postgres schema matches V3 MVP. Run in Supabase SQL Editor or `supabase/migrations/`.

### 1.1 Alter `users`

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_plan TEXT DEFAULT 'free';
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_provider TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_provider_id TEXT;
-- Drop later: current_streak, total_xp, current_level
```

### 1.2 Extend `sessions`

| Column | Purpose |
|--------|---------|
| `goal` | What user wants in this thread |
| `goal_history` | JSONB — goal changes over time |
| `task_status` | not_started / in_progress / blocked / drifting / completed / changed |
| `total_time_spent_seconds` | Cumulative focus time |
| `opened_at`, `closed_at` | Last UI open/close |
| `last_message_at` | Sidebar sorting |

### 1.3 Extend `messages`

```sql
ALTER TABLE messages ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';
```

Metadata shape: `detected_patterns`, `intervention_used`, `task_status_after_message`.

### 1.4 New tables (priority order)

| Priority | Table | Purpose |
|----------|-------|---------|
| **P0** | `user_profiles` | Goal memory, facts, AI summary |
| **P0** | `session_activity_logs` | Accurate time tracking |
| **P0** | `focus_sessions` | Focus mode |
| **P1** | `pattern_definitions` | Fixed V1 pattern catalog (seeded) |
| **P1** | `pattern_occurrences` | Individual detection events |
| **P1** | `intervention_logs` | Coach nudges |
| **P1** | `user_behavior_patterns` | Per-user pattern rollup |
| **P2** | `user_playbooks` | What works / doesn't work (Phase 3) |
| **P2** | `candidate_patterns` | Unreviewed new patterns (Phase 3) |

### 1.5 Seed `pattern_definitions`

Seed once with 12 V1 patterns:

- topic_drift
- research_spiral
- decision_paralysis
- avoidance
- comparison_trigger
- confidence_collapse
- overwhelm
- perfectionism_loop
- reassurance_seeking
- outcome_dependence
- overplanning
- action_gap

### 1.6 RLS policies

Enable RLS on all user-scoped tables: `user_id = auth.uid()`. Service role for admin/health checks only.

---

## Phase 2 — Auth (1 day)

**Goal:** Supabase Auth is source of truth; FastAPI verifies JWT.

### Endpoints

- `POST /auth/exchange-token` — Supabase token → backend JWT (or use Supabase JWT directly)
- `GET /auth/me` — user profile from `users` table
- Signup/login handled client-side via Supabase Auth

### On first login

Create `users` row + empty `user_profiles` + empty `user_playbooks` if missing.

---

## Phase 3 — Sessions & Time Tracking (2 days)

**Goal:** Thread CRUD + open/close tracking.

### Session endpoints

| Method | Route | Action |
|--------|-------|--------|
| POST | `/sessions` | Create thread: `title`, `goal` |
| GET | `/sessions` | List for sidebar (sort by `last_message_at` desc) |
| GET | `/sessions/{id}` | Thread detail |
| PATCH | `/sessions/{id}/goal` | Update goal + append `goal_history`, set `task_status=changed` |
| PATCH | `/sessions/{id}/status` | active / paused / completed / abandoned |
| DELETE | `/sessions/{id}` | Soft archive |

### Activity endpoints

| Method | Route | Action |
|--------|-------|--------|
| POST | `/sessions/{id}/open` | Set `opened_at`, create `session_activity_logs` row |
| POST | `/sessions/{id}/close` | Close log, compute duration, increment `total_time_spent_seconds` |

Implement via `session_service` + `session_repo`.

---

## Phase 4 — Messages & Chat (3–4 days) ⭐ MVP unlock

**Goal:** Replace `breakdown.py` with conversational flow.

### Message endpoints

| Method | Route | Action |
|--------|-------|--------|
| POST | `/sessions/{id}/messages` | Save user message → call LLM → save assistant message → return both |
| GET | `/sessions/{id}/messages` | Paginated history (oldest first) |

### LLM module

```
llm/prompts.py   — system prompts for Do / Understand / Explore modes
llm/client.py    — OpenAI (Anthropic fallback optional)
```

### `get_llm_context(user_id, session_id)`

Single service returning:

- `user_profiles.summary` + `facts`
- session `goal`, `task_status`, `goal_history`
- last N messages
- top `user_behavior_patterns`
- recent `pattern_occurrences` in this session
- active `pattern_definitions`

Optional debug endpoint: `GET /context/llm/{session_id}`.

### Deprecate `breakdown.py`

Delete or keep as thin wrapper that creates session + first message (temporary frontend bridge).

---

## Phase 5 — Patterns & Interventions (2–3 days)

**Goal:** Basic interventions + foundation for behavioral profile (PRD Phase 2).

### Pattern endpoints

| Method | Route | Action |
|--------|-------|--------|
| POST | `/patterns/occurrences` | Log detection |
| PATCH | `/patterns/users/{pattern_id}` | Update `user_behavior_patterns` summary |
| GET | `/patterns/definitions` | List active patterns (UI chips) |

`pattern_service.save_occurrence()` should:

1. Insert `pattern_occurrences`
2. Upsert `user_behavior_patterns` (frequency, confidence avg, severity)
3. Update `messages.metadata.detected_patterns`

### Intervention endpoints

| Method | Route | Action |
|--------|-------|--------|
| POST | `/interventions` | Log intervention |
| PATCH | `/interventions/{id}` | Set `accepted_by_user` true/false |

---

## Phase 6 — Focus Mode (1–2 days)

| Method | Route | Action |
|--------|-------|--------|
| POST | `/focus-sessions` | Start: `session_id`, `task`, `steps[]` |
| PATCH | `/focus-sessions/{id}/complete` | completed / cancelled + `duration_seconds` |

Links to chat session via `session_id`. Separate from message flow.

---

## Phase 7 — Profile & Playbook (Phase 2 prep, 1–2 days)

| Method | Route | Action |
|--------|-------|--------|
| GET | `/profile` | User facts + summary |
| PATCH | `/profile/facts` | Add/update fact |
| GET | `/playbook` | works_well / does_not_work |
| PATCH | `/playbook` | Update playbook |

Can ship after chat MVP.

---

## Phase 8 — Tests & Polish (ongoing)

- Update `test_database.py` for new tables
- Service tests for open/close time math
- Test `get_llm_context` response shape
- Keep global exception handler in `main.py`
- Add `.env.example` with required keys

---

## Delete vs Keep

| File / feature | Action |
|----------------|--------|
| `streaks.py` | Delete |
| `breakdown.py` | Replace with chat in `chat_service` |
| `actions.py` | Remove from router; focus steps in `focus_sessions` |
| `feedback.py` | Trim — keep research feedback if useful; drop XP |
| `sessions.py` | Extend |
| `messages.py` | Extend → becomes chat |
| `auth.py` | Keep, minor fixes |
| `database.py` | Keep |
| `schemas.py` | Rewrite |

---

## Suggested Timeline

| Week | Focus |
|------|-------|
| **Week 1** | Phase 0 + Phase 1 — structure, SQL migrations, seed patterns |
| **Week 2** | Phase 2 + Phase 3 — auth, sessions, time tracking |
| **Week 3** | Phase 4 — chat + LLM + `get_llm_context` (**MVP unlock**) |
| **Week 4** | Phase 5 + Phase 6 — patterns, interventions, focus |
| **Week 5** | Phase 7 + tests + wire frontend off `mock-ai` |

**MVP = end of Week 3** (working chat). Patterns and focus can trail by one week.

---

## First Step Tomorrow

Write Supabase migration SQL for:

1. Extended `sessions`
2. Extended `messages`
3. `user_profiles`
4. `session_activity_logs`

Everything else depends on this.

---

## Entity Reference (12 core models)

1. **User** — account, subscription, onboarding
2. **UserProfile** — flexible facts (JSONB), AI summary
3. **Session** — chat thread, goal, task status, time spent
4. **SessionActivityLog** — open/close duration events
5. **Message** — chat history + metadata JSONB
6. **PatternDefinition** — global fixed pattern catalog
7. **UserBehaviorPattern** — per-user pattern summary
8. **PatternOccurrence** — single detection event
9. **CandidatePattern** — unreviewed new patterns (Phase 3)
10. **InterventionLog** — coach intervention audit trail
11. **FocusSession** — focus mode blocks
12. **UserPlaybook** — what works / doesn't work (Phase 3)

---

## Future-Proofing (Postgres-only for now)

- Repository layer per entity — swap DB access without touching services
- Pydantic domain models separate from DB row shapes
- UUID primary keys everywhere
- JSONB for flexible fields (`facts`, `goal_history`, `metadata`)
- No business logic in SQL triggers — keep in FastAPI services
- `get_llm_context()` as single read orchestrator for LLM prompts
- Add Redis / pgvector / second store only when a concrete need appears

---

## PRD V3 Phase Mapping

| PRD Phase | Backend work |
|-----------|--------------|
| **Phase 1 MVP** | Chat, sessions, messages, goal memory, basic interventions, focus mode |
| **Phase 2** | Behavioral profile, pattern detection, user_behavior_patterns |
| **Phase 3** | Playbook, candidate patterns, behavioral timeline (derived from occurrences) |
| **Phase 4** | Predictions, advanced coaching — TBD |

---

*Last updated: March 2026*
