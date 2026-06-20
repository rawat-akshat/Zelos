-- =============================================================================
-- Zelos Phase 1 — V3 Behavioral Coach Schema
-- Run in Supabase SQL Editor or via: supabase db push
-- Idempotent: safe to re-run (uses IF NOT EXISTS / IF NOT EXISTS columns)
-- =============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 0. BASE TABLES (greenfield — skip if you already have these)
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT,
  first_message TEXT,
  blocker_type TEXT,
  validation_message TEXT,
  ai_model TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  total_actions INTEGER NOT NULL DEFAULT 0,
  completed_actions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  mode TEXT CHECK (mode IS NULL OR mode IN ('do', 'understand', 'explore', 'task', 'learn', 'mixed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================================================
-- 1.1 ALTER users — subscription + onboarding
-- =============================================================================

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS subscription_plan TEXT NOT NULL DEFAULT 'free';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS auth_provider TEXT;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS auth_provider_id TEXT;

-- Legacy gamification columns (keep for now; drop in a later migration)
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS current_streak INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS total_xp INTEGER NOT NULL DEFAULT 0;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_subscription_plan_check'
  ) THEN
    ALTER TABLE public.users
      ADD CONSTRAINT users_subscription_plan_check
      CHECK (subscription_plan IN ('free', 'premium'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_users_auth_provider_id ON public.users(auth_provider_id);

-- =============================================================================
-- 1.2 EXTEND sessions — goal, task status, time tracking
-- =============================================================================

ALTER TABLE public.sessions ADD COLUMN IF NOT EXISTS goal TEXT;
ALTER TABLE public.sessions ADD COLUMN IF NOT EXISTS goal_history JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.sessions ADD COLUMN IF NOT EXISTS task_status TEXT NOT NULL DEFAULT 'not_started';
ALTER TABLE public.sessions ADD COLUMN IF NOT EXISTS total_time_spent_seconds INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.sessions ADD COLUMN IF NOT EXISTS opened_at TIMESTAMPTZ;
ALTER TABLE public.sessions ADD COLUMN IF NOT EXISTS closed_at TIMESTAMPTZ;
ALTER TABLE public.sessions ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMPTZ;

-- Backfill goal from first_message where missing
UPDATE public.sessions
SET goal = first_message
WHERE goal IS NULL AND first_message IS NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'sessions_status_check'
  ) THEN
    ALTER TABLE public.sessions
      ADD CONSTRAINT sessions_status_check
      CHECK (status IN ('active', 'paused', 'completed', 'abandoned', 'archived'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'sessions_task_status_check'
  ) THEN
    ALTER TABLE public.sessions
      ADD CONSTRAINT sessions_task_status_check
      CHECK (task_status IN (
        'not_started', 'in_progress', 'blocked', 'drifting', 'completed', 'changed'
      ));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_sessions_user_id_updated_at ON public.sessions(user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id_last_message_at ON public.sessions(user_id, last_message_at DESC NULLS LAST);

-- =============================================================================
-- 1.3 EXTEND messages — metadata JSONB
-- =============================================================================

ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS idx_messages_session_id_created_at ON public.messages(session_id, created_at ASC);

-- =============================================================================
-- 1.4 NEW TABLES
-- =============================================================================

-- P0: user_profiles
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  facts JSONB NOT NULL DEFAULT '[]'::jsonb,
  summary TEXT,
  preferred_tone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);

-- P0: session_activity_logs
CREATE TABLE IF NOT EXISTS public.session_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  opened_at TIMESTAMPTZ NOT NULL,
  closed_at TIMESTAMPTZ,
  duration_seconds INTEGER CHECK (duration_seconds IS NULL OR duration_seconds >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_session_activity_logs_session_id ON public.session_activity_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_session_activity_logs_open ON public.session_activity_logs(session_id, closed_at);

-- P0: focus_sessions
CREATE TABLE IF NOT EXISTS public.focus_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  task TEXT NOT NULL,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'started'
    CHECK (status IN ('started', 'completed', 'cancelled')),
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  duration_seconds INTEGER CHECK (duration_seconds IS NULL OR duration_seconds >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_focus_sessions_user_id ON public.focus_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_focus_sessions_session_id ON public.focus_sessions(session_id);

-- P1: pattern_definitions (global catalog)
CREATE TABLE IF NOT EXISTS public.pattern_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pattern_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  examples JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pattern_definitions_active ON public.pattern_definitions(is_active);

-- P1: pattern_occurrences
CREATE TABLE IF NOT EXISTS public.pattern_occurrences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  message_id UUID NOT NULL REFERENCES public.messages(id) ON DELETE CASCADE,
  pattern_id TEXT NOT NULL REFERENCES public.pattern_definitions(pattern_id),
  note TEXT,
  evidence TEXT,
  confidence NUMERIC(4, 3) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pattern_occurrences_user_id ON public.pattern_occurrences(user_id);
CREATE INDEX IF NOT EXISTS idx_pattern_occurrences_session_id ON public.pattern_occurrences(session_id, created_at DESC);

-- P1: user_behavior_patterns
CREATE TABLE IF NOT EXISTS public.user_behavior_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  pattern_id TEXT NOT NULL REFERENCES public.pattern_definitions(pattern_id),
  summary TEXT,
  frequency INTEGER NOT NULL DEFAULT 1 CHECK (frequency >= 0),
  confidence_avg NUMERIC(4, 3) NOT NULL DEFAULT 0 CHECK (confidence_avg >= 0 AND confidence_avg <= 1),
  severity TEXT NOT NULL DEFAULT 'low' CHECK (severity IN ('low', 'medium', 'high')),
  first_seen_at TIMESTAMPTZ NOT NULL,
  last_seen_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, pattern_id)
);

CREATE INDEX IF NOT EXISTS idx_user_behavior_patterns_user_id ON public.user_behavior_patterns(user_id);

-- P1: intervention_logs
CREATE TABLE IF NOT EXISTS public.intervention_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE,
  message_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
  intervention_type TEXT NOT NULL CHECK (intervention_type IN (
    'gentle_redirect',
    'validate_then_refocus',
    'break_into_micro_step',
    'ask_commitment',
    'task_switch_confirmation',
    'continue_normally'
  )),
  reason TEXT,
  accepted_by_user BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_intervention_logs_session_id ON public.intervention_logs(session_id, created_at DESC);

-- P2: user_playbooks
CREATE TABLE IF NOT EXISTS public.user_playbooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  works_well JSONB NOT NULL DEFAULT '[]'::jsonb,
  does_not_work JSONB NOT NULL DEFAULT '[]'::jsonb,
  suggested_experiments JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- P2: candidate_patterns (admin / service role — not user-facing V1)
CREATE TABLE IF NOT EXISTS public.candidate_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  normalized_label TEXT NOT NULL UNIQUE,
  raw_labels JSONB NOT NULL DEFAULT '[]'::jsonb,
  short_definition TEXT,
  examples JSONB NOT NULL DEFAULT '[]'::jsonb,
  embedding_id TEXT,
  occurrence_count INTEGER NOT NULL DEFAULT 1,
  unique_user_count INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'candidate'
    CHECK (status IN ('candidate', 'reviewed', 'promoted', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================================================
-- updated_at triggers
-- =============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['users', 'sessions', 'user_profiles', 'user_behavior_patterns', 'user_playbooks', 'candidate_patterns']
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_%I_updated_at ON public.%I', t, t);
    EXECUTE format(
      'CREATE TRIGGER trg_%I_updated_at BEFORE UPDATE ON public.%I
       FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()',
      t, t
    );
  END LOOP;
END $$;

-- =============================================================================
-- 1.5 SEED pattern_definitions (12 V1 patterns)
-- =============================================================================

INSERT INTO public.pattern_definitions (pattern_id, name, description, examples) VALUES
  ('topic_drift', 'Topic Drift', 'User moves away from the stated goal mid-conversation.',
   '["Started on resume, now researching unrelated tools"]'::jsonb),
  ('research_spiral', 'Research Spiral', 'Excessive research instead of taking action.',
   '["Reading many articles before writing a single line"]'::jsonb),
  ('decision_paralysis', 'Decision Paralysis', 'Stuck choosing between options.',
   '["Cannot pick a stack, framework, or approach"]'::jsonb),
  ('avoidance', 'Avoidance', 'Emotional avoidance of the task.',
   '["I''ll do it tomorrow", "Maybe this isn''t worth it"]'::jsonb),
  ('comparison_trigger', 'Comparison Trigger', 'Demotivation from comparing to others.',
   '["Someone else shipped faster", "Their product looks better"]'::jsonb),
  ('confidence_collapse', 'Confidence Collapse', 'Self-doubt blocks progress.',
   '["I''m not good enough", "Who am I to do this"]'::jsonb),
  ('overwhelm', 'Overwhelm', 'Task feels too big to start.',
   '["This is impossible", "Too much to do"]'::jsonb),
  ('perfectionism_loop', 'Perfectionism Loop', 'Won''t ship until everything is perfect.',
   '["Need one more revision", "Not ready to share yet"]'::jsonb),
  ('reassurance_seeking', 'Reassurance Seeking', 'Seeking validation before acting.',
   '["Is this a good idea?", "Do you think this will work?"]'::jsonb),
  ('outcome_dependence', 'Outcome Dependence', 'Focus on uncontrollable results over actions.',
   '["What if it fails?", "Need to know it will succeed first"]'::jsonb),
  ('overplanning', 'Overplanning', 'Planning replaces doing.',
   '["Making another roadmap", "Need a perfect plan first"]'::jsonb),
  ('action_gap', 'Action Gap', 'Lots of discussion, little concrete action.',
   '["30 minutes of chat, no next step taken"]'::jsonb)
ON CONFLICT (pattern_id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  examples = EXCLUDED.examples,
  is_active = true;

-- =============================================================================
-- 1.6 ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pattern_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pattern_occurrences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_behavior_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intervention_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_playbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_patterns ENABLE ROW LEVEL SECURITY;

-- users
DROP POLICY IF EXISTS "users_select_own" ON public.users;
CREATE POLICY "users_select_own" ON public.users FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "users_update_own" ON public.users;
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id);

-- sessions
DROP POLICY IF EXISTS "sessions_select_own" ON public.sessions;
CREATE POLICY "sessions_select_own" ON public.sessions FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "sessions_insert_own" ON public.sessions;
CREATE POLICY "sessions_insert_own" ON public.sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "sessions_update_own" ON public.sessions;
CREATE POLICY "sessions_update_own" ON public.sessions FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "sessions_delete_own" ON public.sessions;
CREATE POLICY "sessions_delete_own" ON public.sessions FOR DELETE USING (auth.uid() = user_id);

-- messages
DROP POLICY IF EXISTS "messages_select_own" ON public.messages;
CREATE POLICY "messages_select_own" ON public.messages FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "messages_insert_own" ON public.messages;
CREATE POLICY "messages_insert_own" ON public.messages FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "messages_update_own" ON public.messages;
CREATE POLICY "messages_update_own" ON public.messages FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "messages_delete_own" ON public.messages;
CREATE POLICY "messages_delete_own" ON public.messages FOR DELETE USING (auth.uid() = user_id);

-- user_profiles
DROP POLICY IF EXISTS "user_profiles_select_own" ON public.user_profiles;
CREATE POLICY "user_profiles_select_own" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "user_profiles_insert_own" ON public.user_profiles;
CREATE POLICY "user_profiles_insert_own" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "user_profiles_update_own" ON public.user_profiles;
CREATE POLICY "user_profiles_update_own" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- session_activity_logs
DROP POLICY IF EXISTS "session_activity_logs_all_own" ON public.session_activity_logs;
CREATE POLICY "session_activity_logs_all_own" ON public.session_activity_logs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- focus_sessions
DROP POLICY IF EXISTS "focus_sessions_all_own" ON public.focus_sessions;
CREATE POLICY "focus_sessions_all_own" ON public.focus_sessions
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- pattern_definitions — read-only for authenticated users
DROP POLICY IF EXISTS "pattern_definitions_read" ON public.pattern_definitions;
CREATE POLICY "pattern_definitions_read" ON public.pattern_definitions
  FOR SELECT TO authenticated USING (is_active = true);

-- pattern_occurrences
DROP POLICY IF EXISTS "pattern_occurrences_all_own" ON public.pattern_occurrences;
CREATE POLICY "pattern_occurrences_all_own" ON public.pattern_occurrences
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- user_behavior_patterns
DROP POLICY IF EXISTS "user_behavior_patterns_all_own" ON public.user_behavior_patterns;
CREATE POLICY "user_behavior_patterns_all_own" ON public.user_behavior_patterns
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- intervention_logs
DROP POLICY IF EXISTS "intervention_logs_all_own" ON public.intervention_logs;
CREATE POLICY "intervention_logs_all_own" ON public.intervention_logs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- user_playbooks
DROP POLICY IF EXISTS "user_playbooks_all_own" ON public.user_playbooks;
CREATE POLICY "user_playbooks_all_own" ON public.user_playbooks
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- candidate_patterns — no user policies (service role / admin only via backend)
