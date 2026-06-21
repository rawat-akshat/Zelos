# Supabase — Zelos Database

Postgres hosted on Supabase. Schema migrations live in `migrations/`.

## Phase 1 (V3 behavioral coach)

**Migration file:** `migrations/20260317120000_phase1_v3_schema.sql`

### What it does

1. Creates base tables if missing (`users`, `sessions`, `messages`)
2. Extends `users` — `subscription_plan`, `onboarding_completed`, auth provider fields
3. Extends `sessions` — `goal`, `goal_history`, `task_status`, time tracking fields
4. Extends `messages` — `metadata` JSONB
5. Creates new tables:
   - `user_profiles`
   - `session_activity_logs`
   - `focus_sessions`
   - `pattern_definitions`
   - `pattern_occurrences`
   - `user_behavior_patterns`
   - `intervention_logs`
   - `user_playbooks`
   - `candidate_patterns`
6. Seeds 12 V1 patterns into `pattern_definitions`
7. Enables RLS on all tables

### How to run

**Option A — Supabase Dashboard (easiest)**

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project
2. Go to **SQL Editor**
3. Paste contents of `migrations/20260317120000_phase1_v3_schema.sql`
4. Click **Run**
5. Verify in **Table Editor** — you should see new tables and 12 rows in `pattern_definitions`

**Option B — Supabase CLI**

```bash
# From repo root (requires supabase CLI linked to project)
supabase db push
```

### Verify seed

```sql
SELECT pattern_id, name FROM pattern_definitions ORDER BY pattern_id;
-- Expect 12 rows
```

### Verify session columns

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'sessions'
  AND column_name IN ('goal', 'goal_history', 'task_status', 'total_time_spent_seconds');
```

### FastAPI + service role

The FastAPI backend uses `SUPABASE_SERVICE_KEY` for server-side operations (bypasses RLS).  
Browser/client should use Supabase Auth + anon key with RLS policies.

### Python schemas

Matching Pydantic models:

- `backend/app/models/enums.py`
- `backend/app/models/phase1_schemas.py`

### Next step

Phase 2 — Auth + wire repositories to these tables.

## Email confirmation (required for production)

Zelos requires a verified inbox for email/password signups (Google OAuth is pre-verified).

**Supabase Dashboard → Authentication → Providers → Email**

1. Enable **Confirm email**
2. **Authentication → URL Configuration** — add redirect URLs:
   - `http://localhost:3000/auth/callback` (dev)
   - `https://your-domain.com/auth/callback` (prod)

After signup, users land on `/auth/verify-email` until they click the link in their inbox.
Confirmation links redirect to `/auth/callback`, then the app sends them to the workspace.
