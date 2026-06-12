# Zelos - Technical Architecture & Implementation Plan

## Document Overview

**Version:** 1.0  
**Last Updated:** June 11, 2026  
**Product:** Zelos - AI Task Paralysis Companion
**Founder** Akshat Rawat

This document outlines the complete technical architecture, tech stack, implementation phases, and development timeline for Zelos.

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [System Architecture](#2-system-architecture)
3. [Database Design](#3-database-design)
4. [API Design](#4-api-design)
5. [Frontend Architecture](#5-frontend-architecture)
6. [Backend Architecture](#6-backend-architecture)
7. [AI Integration](#7-ai-integration)
8. [Authentication & Security](#8-authentication--security)
9. [Deployment Strategy](#9-deployment-strategy)
10. [Development Phases](#10-development-phases)
11. [Testing Strategy](#11-testing-strategy)
12. [Monitoring & Analytics](#12-monitoring--analytics)
13. [Cost Estimates](#13-cost-estimates)
14. [Scalability Considerations](#14-scalability-considerations)

---

## 1. Technology Stack

### 1.1 Frontend (Web Application)

**Framework:** Next.js 14+ (App Router)
- **Why:** Server-side rendering, SEO, API routes, image optimization, production-ready
- **Version:** Latest stable (14.x+)
- **Rendering:** Hybrid (SSR + CSR where appropriate)

**Language:** TypeScript 5+
- **Why:** Type safety, better IDE support, fewer bugs, scales better
- **Config:** Strict mode enabled

**Styling:** Tailwind CSS 3+
- **Why:** Utility-first, fast development, consistent design system, great with AI coding
- **Plugins:** @tailwindcss/forms, @tailwindcss/typography

**Animation:** Framer Motion 10+
- **Why:** Powerful, declarative animations, great for gamification effects
- **Use cases:** Celebrations, page transitions, micro-interactions

**State Management:**
- **Global State:** React Context API + useReducer
- **Server State:** TanStack Query (React Query) v5
- **Why:** Built-in caching, automatic refetching, optimistic updates

**UI Components:**
- **Icons:** Lucide React (consistent, customizable)
- **Forms:** React Hook Form (performance, validation)
- **Notifications:** Sonner (beautiful toast notifications)

**Real-Time:** Supabase Realtime
- **Why:** Built-in with database, WebSocket-based, easy setup
- **Use cases:** Activity feed, live user count

---

### 1.2 Frontend (Native Mobile Apps) - Phase 2

**Framework:** React Native 0.73+
- **Why:** Cross-platform (iOS + Android), shares logic with web, large community
- **Code Reuse:** 60-70% of business logic reusable from web
- **Alternatives considered:** Flutter (rejected - different language, less code reuse)

**Language:** TypeScript 5+
- **Why:** Same as web, consistent codebase
- **Shared:** Types, API clients, business logic

**Navigation:** React Navigation 6+
- **Why:** Standard for React Native, flexible, well-documented
- **Stack Navigator:** For main app flow
- **Tab Navigator:** For bottom navigation
- **Modal:** For overlays

**Styling:** NativeWind (Tailwind for React Native)
- **Why:** Use same Tailwind classes as web
- **Benefits:** Consistent design system, faster development
- **Fallback:** StyleSheet for platform-specific styling

**State Management:**
- **Same as web:** React Context + React Query
- **Advantage:** State logic 100% reusable
- **Async Storage:** For offline data

**Native Modules:**
- **Push Notifications:** React Native Firebase (FCM)
- **Haptics:** react-native-haptic-feedback
- **Animation:** React Native Reanimated 3+ (performant native animations)
- **Gestures:** React Native Gesture Handler

**Platform-Specific:**
- **iOS:** Swift for any custom native modules
- **Android:** Kotlin for any custom native modules
- **Requirement:** macOS for iOS development

**Build & Deploy:**
- **iOS:** Xcode, TestFlight (beta), App Store
- **Android:** Android Studio, Google Play Console
- **CI/CD:** Expo Application Services (EAS) or Fastlane

**Why React Native Over Native:**
1. **Faster Development:** One codebase for both platforms
2. **Code Sharing:** Reuse web business logic
3. **Cost-Effective:** One developer can handle both platforms
4. **AI-Friendly:** AI tools understand React patterns well
5. **Proven:** Used by Facebook, Instagram, Airbnb, Discord

**Web vs Native Feature Parity:**
- ✅ Core features identical across all platforms
- ✅ Same backend API
- ✅ Same gamification system
- ✅ Same AI breakdowns
- ⚠️ Some platform-specific UI differences (navigation, gestures)
- ⚠️ Native apps get better push notifications, offline capability

---

### 1.3 Backend

**API Framework:** FastAPI 0.110+ (Python)
- **Why:** Fast, async, auto-generated docs, type hints, great for AI integration
- **Python Version:** 3.11+

**Background Jobs:** Celery + Redis
- **Why:** Reliable async task processing
- **Use cases:** Notification scheduling, weekly reports, streak checks

**Task Queue:** Redis 7+
- **Why:** In-memory, fast, simple, used by Celery
- **Additional use:** Caching API responses, rate limiting

### 1.3 Database

**Primary Database:** Supabase (PostgreSQL 15+)
- **Why:** Managed Postgres, built-in auth, realtime, row-level security, generous free tier
- **Features used:** Database, Auth, Realtime, Storage (for future user uploads)

**Caching:** Redis (same instance as task queue)
- **Why:** Fast reads, reduce database load, cache AI responses
- **TTL:** Varies by data type (5 min - 24 hours)

### 1.4 AI & LLM

**Primary LLM:** OpenAI GPT-4o-mini
- **Why:** Fast, cost-effective ($0.15/1M input tokens), good quality
- **Use case:** Task breakdown, blocker identification, personalization

**Fallback LLM:** Anthropic Claude 3.5 Sonnet
- **Why:** Backup if OpenAI is down, alternative personality
- **Cost:** $3/1M input tokens (use sparingly)

**Voice Transcription:** OpenAI Whisper API
- **Why:** Best-in-class accuracy (95%+), supports 50+ languages, affordable
- **Cost:** $0.006 per minute (~$0.10 for 15-second input)
- **Fallback:** Web Speech API (browser built-in, free but less accurate)
- **Languages:** English, Spanish, French, German, Portuguese, Hindi, Japanese, Chinese, Arabic, etc.
- **Format:** MP3, M4A, WAV, WebM
- **Max file size:** 25 MB
- **Use case:** Voice input for task descriptions (Premium feature)

**Text-to-Speech:** OpenAI TTS API
- **Why:** Natural voices, fast, affordable
- **Cost:** $15 per 1M characters (~$0.015 per breakdown response)
- **Voices:** Alloy, Echo, Fable, Onyx, Nova, Shimmer
- **Languages:** Same as Whisper (50+)
- **Format:** MP3, Opus, AAC, FLAC
- **Use case:** Voice output for AI responses (Premium feature, optional)

**Prompt Management:** LangChain (optional) or custom templates
- **Why:** Template management, prompt versioning, easier testing

### 1.5 Authentication

**Provider:** Supabase Auth
- **Methods:**
  - Magic link (passwordless email)
  - Google OAuth
  - Apple OAuth (for iOS app)
  - Email/Password (optional fallback)
- **JWT:** Automatic token management
- **Session:** 30-day expiry, refresh tokens

### 1.6 Payments

**Provider:** Stripe
- **Why:** Industry standard, great API, supports 135+ currencies, global
- **Products:**
  - Monthly subscription: $9.99/month
  - Annual subscription: $79/year
  - Regional pricing (future)
- **Features:** Webhooks, invoicing, refunds, failed payment handling

### 1.7 Notifications

**Push Notifications:** Firebase Cloud Messaging (FCM)
- **Why:** Free, reliable, works on all platforms
- **Platforms:** Web (browser notifications), iOS (Phase 3), Android (Phase 3)
- **Web Push:** Supported in Chrome, Edge, Firefox, Safari 16+ (requires user permission)

**Email Notifications:** Resend or SendGrid
- **Why:** High deliverability, templates, analytics
- **Use cases:** Weekly reports, transactional emails, marketing (opt-in)

### 1.8 Hosting & Infrastructure

**Frontend Hosting:** Vercel
- **Why:** Built for Next.js, global CDN, automatic deployments, preview environments, edge functions
- **Plan:** Pro ($20/month) after free tier
- **Custom domain:** zelos.app
- **Edge Locations:** 100+ globally for <50ms latency

**Backend Hosting:** Railway or Render
- **Why:** Easy deployment, auto-scaling, affordable, Docker support
- **Plan:** ~$20-50/month depending on traffic
- **Services:** FastAPI app, Celery workers, Redis

**Database Hosting:** Supabase Cloud
- **Why:** Managed, automatic backups, realtime, generous free tier
- **Plan:** Free → Pro ($25/month) after 10k users

**CDN:** Cloudflare (optional)
- **Why:** Additional caching, DDoS protection, analytics
- **Cost:** Free tier sufficient initially

### 1.9 Analytics & Monitoring

**Product Analytics:** PostHog
- **Why:** Open source, privacy-friendly, GDPR compliant, feature flags, session replay
- **Plan:** Free → $0.000225/event after 1M events
- **Features:** Events, funnels, retention, cohorts

**Error Tracking:** Sentry
- **Why:** Detailed error reports, stack traces, user context
- **Plan:** Free → $26/month

**Uptime Monitoring:** BetterStack (formerly Better Uptime)
- **Why:** Simple, reliable, status page
- **Plan:** Free → $18/month

**Performance:** Vercel Analytics (built-in)
- **Why:** Real user metrics, Core Web Vitals
- **Cost:** Included with Vercel Pro

### 1.10 Development Tools

**Version Control:** Git + GitHub
- **Why:** Industry standard, CI/CD integration

**AI Coding Assistants:**
- Cursor (primary)
- GitHub Copilot (backup)
- Claude Code (for architecture questions)

**API Testing:** Postman or Hoppscotch
**Database Client:** Supabase Dashboard + TablePlus
**Design:** Figma (for mockups)
**Project Management:** Linear or Notion

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Devices                        │
│  (Desktop Browser, Mobile Browser, Future: iOS/Android)    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Cloudflare CDN                          │
│              (Optional - Caching & Security)                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Frontend                         │
│                    (Vercel Hosting)                         │
│  • Server-Side Rendering                                    │
│  • Client-Side React                                        │
│  • API Routes (simple endpoints)                            │
└──────────────┬──────────────────────┬───────────────────────┘
               │                      │
               ▼                      ▼
┌──────────────────────┐   ┌─────────────────────────────────┐
│   FastAPI Backend    │   │    Supabase Services           │
│   (Railway/Render)   │   │  • PostgreSQL Database         │
│  • AI Integration    │   │  • Authentication              │
│  • Business Logic    │   │  • Realtime Subscriptions      │
│  • Stripe Webhooks   │◄──┤  • Row-Level Security          │
└──────┬───────────────┘   └─────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  • OpenAI API (GPT-4o-mini)                                 │
│  • Anthropic API (Claude - fallback)                        │
│  • Stripe API (Payments)                                    │
│  • Firebase Cloud Messaging (Push Notifications)            │
│  • Resend/SendGrid (Email)                                  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                Background Jobs (Celery)                      │
│  • Streak checks (daily)                                    │
│  • Weekly reports generation                                │
│  • Notification scheduling                                  │
│  • Analytics aggregation                                    │
└──────────────────────────────────────────────────────────────┘
```

### 2.2 Data Flow

**User Task Breakdown Flow:**
```
1. User inputs task → Frontend
2. Frontend sends to FastAPI → /api/breakdown
3. FastAPI validates & enriches with user context (from Supabase)
4. FastAPI calls OpenAI with engineered prompt
5. OpenAI returns structured breakdown
6. FastAPI saves to database (actions, session)
7. FastAPI returns to frontend with real-time update
8. Frontend displays with animations
```

**Gamification Update Flow:**
```
1. User completes action → Frontend marks complete
2. Frontend calls FastAPI → /api/actions/{id}/complete
3. FastAPI updates action status
4. FastAPI calculates XP, checks for achievements, updates streak
5. FastAPI triggers achievement unlock if applicable
6. FastAPI returns updated user stats + any new achievements
7. Frontend shows celebrations and updates UI
```

---

## 3. Database Design

### 3.1 Schema Overview

**Core Tables:**
- `users` - User accounts and metadata
- `sessions` - Task breakdown sessions
- `actions` - Individual micro-actions
- `achievements` - Achievement unlocks
- `notifications` - Notification log
- `subscriptions` - Premium subscriptions

### 3.2 Detailed Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Preferences
  timezone VARCHAR(50) DEFAULT 'America/New_York',
  ai_tone VARCHAR(50) DEFAULT 'supportive', -- supportive, motivational, neutral, playful
  notification_preferences JSONB DEFAULT '{}',
  
  -- Gamification
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_action_date DATE,
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  
  -- Subscription
  premium_status VARCHAR(20) DEFAULT 'free', -- free, premium, premium_plus
  premium_until TIMESTAMP,
  stripe_customer_id VARCHAR(255),
  
  -- Metadata
  onboarding_completed BOOLEAN DEFAULT false,
  total_actions_completed INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0
);

-- Sessions table (each task breakdown)
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Input
  task_input TEXT NOT NULL,
  blocker_type VARCHAR(50), -- ambiguity, overwhelm, perfectionism, etc.
  
  -- AI Response
  validation_message TEXT,
  ai_model VARCHAR(50), -- gpt-4o-mini, claude-3.5-sonnet
  
  -- Completion tracking
  total_actions INTEGER DEFAULT 0,
  completed_actions INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active', -- active, completed, abandoned
  
  -- Focus mode
  focus_mode_used BOOLEAN DEFAULT false,
  focus_mode_duration_seconds INTEGER DEFAULT 0,
  
  -- Context
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  device_type VARCHAR(20) -- web, ios, android
);

-- Actions table (micro-actions within sessions)
CREATE TABLE actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Action details
  description TEXT NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  order_index INTEGER NOT NULL, -- 1, 2, 3, etc.
  
  -- Completion
  status VARCHAR(20) DEFAULT 'pending', -- pending, in_progress, completed, skipped
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  actual_duration_seconds INTEGER,
  
  -- Timer
  timer_used BOOLEAN DEFAULT false
);

-- Achievements table
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP DEFAULT NOW(),
  
  -- Achievement details
  achievement_type VARCHAR(50) NOT NULL, -- first_action, week_warrior, etc.
  achievement_category VARCHAR(50), -- starter, progress, skill, time, social, special
  
  -- Metadata
  seen BOOLEAN DEFAULT false
);

-- Blocker patterns table (learned over time)
CREATE TABLE blocker_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Pattern data
  blocker_type VARCHAR(50) NOT NULL,
  occurrence_count INTEGER DEFAULT 1,
  last_occurred_at TIMESTAMP DEFAULT NOW(),
  
  -- Success rate
  total_sessions INTEGER DEFAULT 0,
  completed_sessions INTEGER DEFAULT 0,
  
  -- Insights
  effective_strategies JSONB DEFAULT '[]', -- array of what worked
  trigger_keywords TEXT[] DEFAULT ARRAY[]::TEXT[] -- common words in tasks with this blocker
);

-- Notifications table (log of sent notifications)
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Notification details
  notification_type VARCHAR(50) NOT NULL, -- streak_reminder, follow_up, achievement, etc.
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  
  -- Delivery
  sent_at TIMESTAMP,
  delivery_status VARCHAR(20), -- pending, sent, failed, clicked
  clicked_at TIMESTAMP,
  
  -- FCM
  fcm_message_id VARCHAR(255)
);

-- FCM Tokens table (for push notifications)
CREATE TABLE fcm_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  device_type VARCHAR(20), -- web, ios, android
  created_at TIMESTAMP DEFAULT NOW(),
  last_used_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions table (Stripe)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Stripe data
  stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
  stripe_customer_id VARCHAR(255) NOT NULL,
  stripe_price_id VARCHAR(255) NOT NULL,
  
  -- Subscription details
  status VARCHAR(20) NOT NULL, -- active, canceled, past_due, trialing
  plan_type VARCHAR(20) NOT NULL, -- monthly, yearly
  current_period_start TIMESTAMP NOT NULL,
  current_period_end TIMESTAMP NOT NULL,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  canceled_at TIMESTAMP,
  trial_end TIMESTAMP
);

-- Weekly reports table (pre-generated)
CREATE TABLE weekly_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Week data
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  generated_at TIMESTAMP DEFAULT NOW(),
  
  -- Stats
  total_actions INTEGER NOT NULL,
  total_sessions INTEGER NOT NULL,
  total_focus_time_minutes INTEGER NOT NULL,
  
  -- Analysis
  most_common_blocker VARCHAR(50),
  best_completion_time VARCHAR(20), -- morning, afternoon, evening
  completion_rate DECIMAL(5,2), -- percentage
  
  -- Insights (JSON)
  insights JSONB DEFAULT '{}',
  behavioral_recommendations JSONB DEFAULT '[]',
  
  -- Metadata
  viewed_at TIMESTAMP,
  shared BOOLEAN DEFAULT false
);

-- Referrals table
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referee_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Referral code
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed
  completed_at TIMESTAMP,
  
  -- Rewards
  reward_granted BOOLEAN DEFAULT false,
  reward_type VARCHAR(50), -- premium_week, etc.
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Social Competition Tables

-- Friendships table (bidirectional)
CREATE TABLE friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  friend_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Ensure no duplicate friendships
  UNIQUE(user_id, friend_id),
  CHECK (user_id != friend_id)
);

-- Friend requests table
CREATE TABLE friend_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, rejected
  created_at TIMESTAMP DEFAULT NOW(),
  responded_at TIMESTAMP,
  
  UNIQUE(sender_id, receiver_id),
  CHECK (sender_id != receiver_id)
);

-- Leagues table (weekly cohorts)
CREATE TABLE leagues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_tier VARCHAR(20) NOT NULL, -- bronze, silver, gold, platinum, diamond
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Status
  status VARCHAR(20) DEFAULT 'active', -- active, completed
  
  UNIQUE(league_tier, week_start_date)
);

-- League members table (user's position in league)
CREATE TABLE league_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Performance this week
  actions_completed INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  
  -- Rank tracking
  current_rank INTEGER,
  previous_rank INTEGER,
  
  -- Promotion/demotion
  promotion_status VARCHAR(20), -- promoted, demoted, stayed, null (if week not finished)
  shield_used BOOLEAN DEFAULT false, -- premium feature to prevent demotion
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(league_id, user_id)
);

-- Challenges table (friend challenges)
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenger_id UUID REFERENCES users(id) ON DELETE CASCADE,
  challenged_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Challenge details
  challenge_type VARCHAR(50) NOT NULL, -- complete_3_actions, complete_first, etc.
  challenge_description TEXT NOT NULL,
  target_count INTEGER NOT NULL, -- e.g., 3 actions
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- pending, accepted, declined, completed
  winner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  -- Progress tracking
  challenger_progress INTEGER DEFAULT 0,
  challenged_progress INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  accepted_at TIMESTAMP,
  completed_at TIMESTAMP,
  expires_at TIMESTAMP, -- 24 hours from creation
  
  CHECK (challenger_id != challenged_id)
);

-- Leaderboard cache (materialized view for performance)
CREATE TABLE leaderboard_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Timeframe
  timeframe VARCHAR(20) NOT NULL, -- weekly, monthly, all_time
  week_start_date DATE, -- for weekly
  
  -- Stats
  actions_completed INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  streak_length INTEGER DEFAULT 0,
  
  -- Ranking
  global_rank INTEGER,
  
  -- Metadata
  last_updated TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, timeframe, week_start_date)
);

-- Data & Learning System Tables

-- Session feedback table (post-task success tracking)
CREATE TABLE session_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Feedback data
  feedback_type VARCHAR(20) NOT NULL, -- started, partially_helpful, not_helpful, skipped
  provided_at TIMESTAMP DEFAULT NOW(),
  
  -- Additional context
  time_to_feedback_seconds INTEGER, -- time from breakdown to feedback
  actions_completed_count INTEGER DEFAULT 0,
  
  -- Optional follow-up
  follow_up_reason TEXT, -- if user selected "not_helpful", why?
  follow_up_tags TEXT[], -- [too_tired, forgot, too_large, anxiety, other]
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Outcome tracking (did user become unstuck?)
CREATE TABLE outcome_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Unstuck event metrics
  started_task BOOLEAN DEFAULT false,
  worked_5_minutes BOOLEAN DEFAULT false,
  worked_15_minutes BOOLEAN DEFAULT false,
  finished_task BOOLEAN DEFAULT false,
  
  -- Timing metrics
  time_to_first_action_seconds INTEGER,
  total_work_duration_seconds INTEGER,
  
  -- Unstuck event (core metric)
  unstuck_event BOOLEAN GENERATED ALWAYS AS (
    started_task = true AND (worked_5_minutes = true OR actions_completed_count >= 2)
  ) STORED,
  
  -- Metadata
  actions_completed_count INTEGER DEFAULT 0,
  momentum_score DECIMAL(3,2), -- did user complete next action within 10 min? (0.0-1.0)
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User behavior profiles (personalized learning)
CREATE TABLE user_behavior_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  
  -- Blocker analysis (JSON for flexibility)
  top_blockers JSONB DEFAULT '[]', -- [{ type, frequency, successRate }]
  blocker_combinations JSONB DEFAULT '[]', -- [{ types: [], frequency }]
  
  -- Trigger patterns
  trigger_patterns JSONB DEFAULT '[]', -- [{ context, confidence }]
  
  -- Intervention effectiveness
  effective_strategies JSONB DEFAULT '[]', -- [{ strategy, successRate, sampleSize }]
  ineffective_strategies JSONB DEFAULT '[]',
  
  -- Preferences (learned from behavior)
  optimal_action_count DECIMAL(3,1) DEFAULT 3.0,
  preferred_tone VARCHAR(20) DEFAULT 'supportive',
  responds_to_validation BOOLEAN DEFAULT true,
  responds_to_urgency BOOLEAN DEFAULT false,
  best_time_of_day VARCHAR(20), -- morning, afternoon, evening
  focus_mode_engagement VARCHAR(20) DEFAULT 'medium', -- low, medium, high
  
  -- Task type success rates
  task_type_success_rates JSONB DEFAULT '{}', -- { creative: 0.68, admin: 0.82, ... }
  
  -- Statistics
  total_sessions_analyzed INTEGER DEFAULT 0,
  profile_confidence DECIMAL(3,2) DEFAULT 0.0, -- 0.0-1.0 (improves with more data)
  
  -- Metadata
  last_analyzed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Failure recovery tracking
CREATE TABLE failure_recovery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Failure details
  failure_type VARCHAR(50) NOT NULL, -- abandoned, incomplete, skipped_all
  failure_reason VARCHAR(50), -- too_tired, forgot, too_large, anxiety, other
  failure_reason_text TEXT, -- free text if "other"
  
  -- Recovery attempt
  recovery_offered BOOLEAN DEFAULT false,
  recovery_accepted BOOLEAN DEFAULT false,
  recovery_session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
  recovery_successful BOOLEAN,
  
  -- Timestamps
  failed_at TIMESTAMP DEFAULT NOW(),
  recovery_offered_at TIMESTAMP,
  recovery_completed_at TIMESTAMP
);

-- Experiments (A/B testing framework)
CREATE TABLE experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  hypothesis TEXT NOT NULL,
  
  -- Experiment configuration
  variants JSONB NOT NULL, -- [{ id, description, trafficPercent }]
  primary_metric VARCHAR(100) NOT NULL,
  primary_metric_type VARCHAR(20) NOT NULL, -- conversion, numeric, duration
  secondary_metrics TEXT[],
  
  -- Status
  status VARCHAR(20) DEFAULT 'draft', -- draft, running, completed, cancelled
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  
  -- Results
  results JSONB DEFAULT '{}', -- { control: {}, variant_a: {}, ... }
  statistical_significance DECIMAL(5,4), -- p-value
  winner VARCHAR(50),
  
  -- Metadata
  created_by VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Experiment assignments (which user got which variant)
CREATE TABLE experiment_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Assignment
  variant_id VARCHAR(50) NOT NULL,
  assigned_at TIMESTAMP DEFAULT NOW(),
  
  -- Tracking
  converted BOOLEAN DEFAULT false,
  metric_value DECIMAL(10,2),
  
  UNIQUE(experiment_id, user_id)
);

-- North Star metric tracking (unstuck events)
CREATE TABLE unstuck_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  
  -- Event details
  event_timestamp TIMESTAMP DEFAULT NOW(),
  time_to_unstuck_seconds INTEGER, -- from breakdown to first action
  
  -- Context
  blocker_type VARCHAR(50),
  task_type VARCHAR(50),
  time_of_day VARCHAR(20), -- morning, afternoon, evening
  day_of_week INTEGER, -- 0-6
  
  -- Quality metrics
  full_completion BOOLEAN DEFAULT false,
  work_duration_seconds INTEGER,
  user_returned_same_day BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Retention check-ins (daily/weekly/monthly)
CREATE TABLE retention_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Check-in type
  checkin_type VARCHAR(20) NOT NULL, -- daily, weekly, monthly
  checkin_date DATE NOT NULL,
  
  -- Content sent
  message_content JSONB NOT NULL, -- full message sent to user
  
  -- User interaction
  viewed BOOLEAN DEFAULT false,
  viewed_at TIMESTAMP,
  clicked BOOLEAN DEFAULT false,
  clicked_at TIMESTAMP,
  dismissed BOOLEAN DEFAULT false,
  
  -- Insights shown (for weekly/monthly)
  insights_shown JSONB DEFAULT '[]',
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, checkin_type, checkin_date)
);

-- Analytics events (for data analysis)
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Event details
  event_name VARCHAR(100) NOT NULL, -- action_completed, focus_mode_started, etc.
  event_category VARCHAR(50), -- engagement, conversion, retention
  
  -- Event properties
  properties JSONB DEFAULT '{}',
  
  -- Context
  session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
  device_type VARCHAR(20),
  platform VARCHAR(20), -- web, ios, android
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW()
);

-- Voice usage tracking table (Premium feature)
CREATE TABLE voice_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Usage type
  type VARCHAR(20) NOT NULL, -- transcription, synthesis
  
  -- Transcription metrics
  duration_seconds DECIMAL(10,2), -- for transcription
  language_detected VARCHAR(10),
  
  -- Synthesis metrics
  characters INTEGER, -- for TTS
  voice VARCHAR(20), -- alloy, echo, fable, etc.
  
  -- Cost tracking
  cost_cents DECIMAL(10,3) DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_created_at ON sessions(created_at DESC);
CREATE INDEX idx_actions_session_id ON actions(session_id);
CREATE INDEX idx_actions_user_id ON actions(user_id);
CREATE INDEX idx_actions_status ON actions(status);
CREATE INDEX idx_achievements_user_id ON achievements(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_blocker_patterns_user_id ON blocker_patterns(user_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);

-- Social competition indexes
CREATE INDEX idx_friendships_user_id ON friendships(user_id);
CREATE INDEX idx_friendships_friend_id ON friendships(friend_id);
CREATE INDEX idx_friend_requests_receiver_id ON friend_requests(receiver_id);
CREATE INDEX idx_friend_requests_status ON friend_requests(status);
CREATE INDEX idx_league_members_league_id ON league_members(league_id);
CREATE INDEX idx_league_members_user_id ON league_members(user_id);
CREATE INDEX idx_league_members_rank ON league_members(current_rank);
CREATE INDEX idx_challenges_challenged_id ON challenges(challenged_id);
CREATE INDEX idx_challenges_status ON challenges(status);
CREATE INDEX idx_leaderboard_cache_timeframe ON leaderboard_cache(timeframe, week_start_date);
CREATE INDEX idx_leaderboard_cache_rank ON leaderboard_cache(global_rank);

-- Data & learning system indexes
CREATE INDEX idx_session_feedback_user_id ON session_feedback(user_id);
CREATE INDEX idx_session_feedback_session_id ON session_feedback(session_id);
CREATE INDEX idx_session_feedback_type ON session_feedback(feedback_type);
CREATE INDEX idx_outcome_metrics_user_id ON outcome_metrics(user_id);
CREATE INDEX idx_outcome_metrics_unstuck_event ON outcome_metrics(unstuck_event);
CREATE INDEX idx_outcome_metrics_created_at ON outcome_metrics(created_at DESC);
CREATE INDEX idx_user_behavior_profiles_user_id ON user_behavior_profiles(user_id);
CREATE INDEX idx_failure_recovery_user_id ON failure_recovery(user_id);
CREATE INDEX idx_failure_recovery_session_id ON failure_recovery(session_id);
CREATE INDEX idx_experiments_status ON experiments(status);
CREATE INDEX idx_experiment_assignments_experiment_id ON experiment_assignments(experiment_id);
CREATE INDEX idx_experiment_assignments_user_id ON experiment_assignments(user_id);
CREATE INDEX idx_unstuck_events_user_id ON unstuck_events(user_id);
CREATE INDEX idx_unstuck_events_timestamp ON unstuck_events(event_timestamp DESC);
CREATE INDEX idx_retention_checkins_user_id ON retention_checkins(user_id);
CREATE INDEX idx_retention_checkins_type_date ON retention_checkins(checkin_type, checkin_date);
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at DESC);

-- Voice usage indexes
CREATE INDEX idx_voice_usage_user_id ON voice_usage(user_id);
CREATE INDEX idx_voice_usage_type ON voice_usage(type);
CREATE INDEX idx_voice_usage_created_at ON voice_usage(created_at DESC);
```

### 3.3 Row-Level Security (Supabase RLS)

```sql
-- Users can only see their own data
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own sessions" ON sessions
  FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own actions" ON actions
  FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own achievements" ON achievements
  FOR SELECT USING (auth.uid() = user_id);

-- Social competition RLS policies
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their friendships" ON friendships
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() = friend_id);
CREATE POLICY "Users can create friendships" ON friendships
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their friendships" ON friendships
  FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE friend_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view requests they sent or received" ON friend_requests
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send friend requests" ON friend_requests
  FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can respond to requests" ON friend_requests
  FOR UPDATE USING (auth.uid() = receiver_id);

ALTER TABLE league_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all league members in their league" ON league_members
  FOR SELECT USING (
    league_id IN (SELECT league_id FROM league_members WHERE user_id = auth.uid())
  );

ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view challenges they're involved in" ON challenges
  FOR SELECT USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);
CREATE POLICY "Users can create challenges" ON challenges
  FOR INSERT WITH CHECK (auth.uid() = challenger_id);
CREATE POLICY "Users can update challenges they're involved in" ON challenges
  FOR UPDATE USING (auth.uid() = challenger_id OR auth.uid() = challenged_id);

ALTER TABLE leaderboard_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view leaderboard" ON leaderboard_cache
  FOR SELECT USING (true); -- Public leaderboard

-- Data & learning system RLS policies
ALTER TABLE session_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own feedback" ON session_feedback
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own feedback" ON session_feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE outcome_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own outcome metrics" ON outcome_metrics
  FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE user_behavior_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own behavior profile" ON user_behavior_profiles
  FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE failure_recovery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own failure recovery" ON failure_recovery
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create failure recovery" ON failure_recovery
  FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE experiment_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own experiment assignments" ON experiment_assignments
  FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE unstuck_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own unstuck events" ON unstuck_events
  FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE retention_checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own checkins" ON retention_checkins
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own checkins" ON retention_checkins
  FOR UPDATE USING (auth.uid() = user_id);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can create analytics events" ON analytics_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Voice usage RLS policies
ALTER TABLE voice_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own voice usage" ON voice_usage
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create voice usage records" ON voice_usage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Similar policies for other tables
```

---

## 4. API Design

### 4.1 API Architecture

**Pattern:** RESTful API + Real-time subscriptions  
**Base URL:** `https://api.zelos.app` (or `https://zelos.app/api`)  
**Authentication:** JWT Bearer tokens (from Supabase)  
**Rate Limiting:** 100 requests/minute per user (free), 500/minute (premium)

### 4.2 Endpoint Structure

```
/api/v1/
  /auth/
    POST   /signup
    POST   /login
    POST   /logout
    POST   /refresh
  
  /users/
    GET    /me
    PATCH  /me
    GET    /me/stats
    GET    /me/streak
  
  /sessions/
    POST   /          # Create new task breakdown
    GET    /          # List user's sessions (paginated)
    GET    /:id       # Get session details
    PATCH  /:id       # Update session
    DELETE /:id       # Delete session
  
  /actions/
    GET    /          # List actions (filtered by session)
    POST   /:id/start # Start action timer
    POST   /:id/complete # Mark action complete
    POST   /:id/skip  # Skip action
  
  /achievements/
    GET    /          # List user's achievements
    POST   /:id/seen  # Mark achievement as seen
  
  /notifications/
    POST   /register-token # Register FCM token
    GET    /preferences    # Get notification preferences
    PATCH  /preferences    # Update preferences
  
  /reports/
    GET    /weekly/:date   # Get weekly report for date
    GET    /weekly/latest  # Get most recent report
  
  /subscriptions/
    POST   /create-checkout # Create Stripe checkout session
    POST   /webhook        # Stripe webhook handler
    GET    /status         # Get subscription status
    POST   /cancel         # Cancel subscription
  
  /referrals/
    GET    /code           # Get user's referral code
    POST   /apply          # Apply referral code
    GET    /stats          # Get referral stats
  
  /friends/
    GET    /               # List all friends
    POST   /search         # Search users by username/email
    POST   /add            # Send friend request
    GET    /requests       # List pending friend requests
    POST   /requests/:id/accept   # Accept friend request
    POST   /requests/:id/reject   # Reject friend request
    DELETE /:id            # Remove friend
  
  /leaderboard/
    GET    /friends        # Leaderboard of friends only
    GET    /global         # Global leaderboard (top 100)
    GET    /league         # Current league leaderboard
    GET    /me             # User's position on leaderboard
  
  /leagues/
    GET    /me             # Get user's current league
    GET    /:id/members    # List all members in a league
    POST   /use-shield     # Use demotion shield (premium)
  
  /challenges/
    GET    /               # List active challenges
    POST   /               # Create challenge (send to friend)
    GET    /:id            # Get challenge details
    POST   /:id/accept     # Accept challenge
    POST   /:id/decline    # Decline challenge
    GET    /history        # Past challenges
  
  /feedback/
    POST   /session/:id    # Submit feedback for session
    GET    /               # Get user's feedback history
  
  /analytics/
    GET    /unstuck-score  # Get user's unstuck score
    GET    /outcome-metrics # Get outcome metrics dashboard
    POST   /track-event    # Track custom analytics event
    GET    /metrics/time-to-action  # Time to first action metrics
    GET    /metrics/intervention-success  # Intervention success rates
    GET    /metrics/repeat-usage  # 7-day repeat usage rate
    GET    /metrics/insight-accuracy  # Behavioral insight accuracy
    GET    /metrics/health-score  # Composite health score
  
  /sessions/:id/regenerate
    POST   /               # Regenerate breakdown with specific mode
```

**Regeneration Modes:**
- `smaller`: Break into smaller steps
- `faster`: Reduce time estimates, quick wins
- `detailed`: Add more specificity
- `different`: Try alternative approach
- `lowest_effort`: Minimize activation energy
- `high_momentum`: Rapid wins for dopamine
  
  /profile/
    GET    /behavior       # Get user behavior profile (premium)
    GET    /insights       # Get personalized insights
    GET    /success-rates  # Get task type success rates
  
  /recovery/
    POST   /submit-reason  # Submit failure reason
    GET    /abandoned-tasks # Get list of abandoned tasks
    POST   /retry/:session_id # Retry abandoned task
  
  /checkins/
    GET    /daily          # Get today's daily check-in
    GET    /weekly         # Get this week's weekly report
    GET    /monthly        # Get this month's transformation
    POST   /:id/view       # Mark check-in as viewed
    POST   /:id/click      # Track check-in click
  
  /voice/
    POST   /transcribe     # Transcribe audio to text (Premium)
    POST   /synthesize     # Convert text to speech (Premium)
    GET    /usage          # Get voice usage stats
```

### 4.3 Key Endpoint Details

#### POST /api/v1/sessions (Create Breakdown)

**Request:**
```json
{
  "task_input": "I need to write my resume but don't know where to start",
  "device_type": "web"
}
```

**Response:**
```json
{
  "session_id": "uuid",
  "blocker_type": "ambiguity_perfectionism",
  "validation_message": "It sounds like 'write resume' feels huge and you want it to be perfect. That's totally normal—resumes are intimidating!",
  "actions": [
    {
      "id": "uuid",
      "description": "Open a blank doc and write just the company name at the top",
      "estimated_minutes": 1,
      "order_index": 1
    },
    {
      "id": "uuid",
      "description": "Find the job posting and copy-paste 3 key requirements",
      "estimated_minutes": 2,
      "order_index": 2
    },
    {
      "id": "uuid",
      "description": "Write 1 sentence about why you're interested in this job",
      "estimated_minutes": 3,
      "order_index": 3
    }
  ],
  "created_at": "2026-06-11T22:00:00Z"
}
```

#### POST /api/v1/actions/:id/complete

**Request:**
```json
{
  "actual_duration_seconds": 120,
  "timer_used": true
}
```

**Response:**
```json
{
  "action": {
    "id": "uuid",
    "status": "completed",
    "completed_at": "2026-06-11T22:05:00Z"
  },
  "user_updates": {
    "xp_gained": 10,
    "total_xp": 150,
    "level": 2,
    "new_achievements": [
      {
        "type": "quick_starter",
        "name": "Quick Starter",
        "description": "Completed action within 1 min of breakdown",
        "icon": "⚡"
      }
    ]
  },
  "session_progress": {
    "completed_actions": 1,
    "total_actions": 3,
    "percentage": 33
  }
}
```

#### GET /api/v1/users/me/stats

**Response:**
```json
{
  "user_id": "uuid",
  "streak": {
    "current": 7,
    "longest": 14,
    "last_action_date": "2026-06-11"
  },
  "xp": {
    "total": 450,
    "level": 3,
    "next_level_xp": 600,
    "progress_percentage": 75
  },
  "actions": {
    "total_completed": 45,
    "this_week": 12,
    "this_month": 38
  },
  "achievements": {
    "total_unlocked": 8,
    "total_available": 24
  },
  "premium": {
    "status": "free",
    "trial_used": false
  }
}
```

#### GET /api/v1/friends

**Response:**
```json
{
  "friends": [
    {
      "id": "uuid",
      "name": "Alex",
      "username": "alex_codes",
      "avatar_url": "https://...",
      "current_streak": 12,
      "level": 5,
      "total_xp": 850,
      "this_week_actions": 8,
      "last_active": "2026-06-11T22:00:00Z"
    }
  ],
  "total_count": 12
}
```

#### GET /api/v1/leaderboard/friends

**Query params:** `?timeframe=weekly` (weekly, monthly, all_time)

**Response:**
```json
{
  "timeframe": "weekly",
  "week_start": "2026-06-08",
  "week_end": "2026-06-14",
  "leaderboard": [
    {
      "rank": 1,
      "user_id": "uuid",
      "name": "Sarah",
      "username": "sarah_dev",
      "avatar_url": "https://...",
      "actions_completed": 15,
      "xp_earned": 250
    },
    {
      "rank": 2,
      "user_id": "current_user_uuid",
      "name": "You",
      "username": "you",
      "avatar_url": "https://...",
      "actions_completed": 12,
      "xp_earned": 200,
      "is_current_user": true
    }
  ]
}
```

#### GET /api/v1/leagues/me

**Response:**
```json
{
  "league": {
    "id": "uuid",
    "tier": "gold",
    "week_start": "2026-06-08",
    "week_end": "2026-06-14",
    "my_rank": 12,
    "my_actions": 8,
    "my_xp": 120,
    "promotion_threshold": 10,
    "demotion_threshold": 45,
    "status_message": "Complete 2 more actions to promote to Platinum! 🏆"
  },
  "top_members": [
    {
      "rank": 1,
      "username": "user_abc",
      "actions_completed": 18,
      "xp_earned": 280
    },
    {
      "rank": 2,
      "username": "user_xyz",
      "actions_completed": 16,
      "xp_earned": 260
    }
  ],
  "nearby_members": [
    {
      "rank": 11,
      "username": "user_def",
      "actions_completed": 9,
      "xp_earned": 135
    },
    {
      "rank": 12,
      "username": "You",
      "actions_completed": 8,
      "xp_earned": 120,
      "is_current_user": true
    },
    {
      "rank": 13,
      "username": "user_ghi",
      "actions_completed": 7,
      "xp_earned": 105
    }
  ]
}
```

#### POST /api/v1/challenges

**Request:**
```json
{
  "challenged_user_id": "uuid",
  "challenge_type": "complete_first",
  "challenge_description": "Who can complete 3 actions first?",
  "target_count": 3
}
```

**Response:**
```json
{
  "challenge_id": "uuid",
  "status": "pending",
  "challenger": {
    "name": "You",
    "avatar_url": "https://..."
  },
  "challenged": {
    "name": "Alex",
    "avatar_url": "https://..."
  },
  "expires_at": "2026-06-12T22:00:00Z"
}
```

#### POST /api/v1/feedback/session/:id (Submit Feedback)

**Request:**
```json
{
  "feedback_type": "started", // started, partially_helpful, not_helpful, skipped
  "actions_completed_count": 2,
  "follow_up_reason": "too_large", // optional
  "follow_up_tags": ["too_tired", "anxiety"] // optional
}
```

**Response:**
```json
{
  "feedback_id": "uuid",
  "message": "Thanks for the feedback! We'll use this to improve your experience.",
  "recovery_offered": false
}
```

#### GET /api/v1/analytics/unstuck-score (Get Unstuck Score)

**Response:**
```json
{
  "unstuck_score": 0.78,
  "this_week": {
    "tasks_attempted": 12,
    "unstuck_events": 9,
    "unstuck_rate": 0.75,
    "avg_time_to_start_seconds": 192,
    "avg_work_duration_seconds": 1080
  },
  "best_time_of_day": {
    "morning": { "attempts": 8, "success_rate": 0.91 },
    "afternoon": { "attempts": 3, "success_rate": 0.68 },
    "evening": { "attempts": 1, "success_rate": 0.54 }
  },
  "trend": "improving" // improving, declining, stable
}
```

#### GET /api/v1/profile/behavior (Get Behavior Profile - Premium)

**Response:**
```json
{
  "user_id": "uuid",
  "profile_confidence": 0.85,
  "total_sessions_analyzed": 67,
  "top_blockers": [
    {
      "type": "ambiguity",
      "frequency": 42,
      "success_rate": 0.68,
      "most_common_context": "large_open_ended_projects"
    },
    {
      "type": "perfectionism",
      "frequency": 28,
      "success_rate": 0.55,
      "most_common_context": "creative_work"
    }
  ],
  "effective_strategies": [
    {
      "strategy": "micro_task_decomposition",
      "success_rate": 0.82,
      "sample_size": 34
    },
    {
      "strategy": "time_boxing",
      "success_rate": 0.71,
      "sample_size": 19
    }
  ],
  "ineffective_strategies": [
    {
      "strategy": "long_explanations",
      "success_rate": 0.41,
      "sample_size": 12
    }
  ],
  "preferences": {
    "optimal_action_count": 3.2,
    "preferred_tone": "supportive",
    "responds_to_validation": true,
    "responds_to_urgency": false,
    "best_time_of_day": "morning",
    "focus_mode_engagement": "high"
  },
  "task_type_success_rates": {
    "creative": 0.68,
    "admin": 0.82,
    "social": 0.59,
    "physical": 0.91
  },
  "last_analyzed": "2026-06-11T22:00:00Z"
}
```

#### POST /api/v1/recovery/submit-reason (Submit Failure Reason)

**Request:**
```json
{
  "session_id": "uuid",
  "failure_reason": "too_large", // too_tired, forgot, too_large, anxiety, other
  "failure_reason_text": "The steps were still too big for me", // if "other"
  "want_recovery": true
}
```

**Response:**
```json
{
  "message": "That makes sense! Sounds like we didn't break it down enough.",
  "recovery_offered": true,
  "suggestions": [
    "Try again with even smaller steps",
    "Switch to Learn Mode to understand the blocker better"
  ],
  "pattern_detected": false
}
```

#### GET /api/v1/checkins/weekly (Get Weekly Check-in)

**Response:**
```json
{
  "checkin_id": "uuid",
  "week_start": "2026-06-08",
  "week_end": "2026-06-14",
  "summary": {
    "unstuck_events": 9,
    "actions_completed": 27,
    "streak_maintained": true,
    "streak_length": 14,
    "achievements_unlocked": 2
  },
  "insights": [
    {
      "type": "performance",
      "message": "You struggled with 'ambiguity' blockers on Monday and Wednesday",
      "suggestion": "Try Learn Mode next time you feel ambiguous"
    },
    {
      "type": "timing",
      "message": "Your best day was Thursday (4 tasks completed)",
      "suggestion": "Schedule creative work for Thursday mornings"
    },
    {
      "type": "productivity",
      "message": "You're most productive between 9-11 AM",
      "suggestion": "Block this time for your hardest tasks"
    }
  ],
  "next_week_goals": [
    "Maintain your 15-day streak",
    "Try morning check-ins (91% success rate for you)",
    "Complete 10 unstuck events"
  ]
}
```

#### POST /api/v1/sessions/:id/regenerate (Regenerate Breakdown)

**Request:**
```json
{
  "regeneration_mode": "smaller", // smaller, faster, detailed, different, lowest_effort, high_momentum
  "user_feedback": "Steps are still too big", // optional
  "original_session_id": "uuid"
}
```

**Regeneration Modes:**

*smaller:* Break into even tinier chunks
*faster:* Reduce time estimates, focus on quick wins
*detailed:* Add specificity and context
*different:* Try alternative approach (planning vs action-first)
*lowest_effort:* Minimize activation energy, absolute easiest
*high_momentum:* Generate 5 x 2-min tasks for rapid dopamine hits

**Response:**
```json
{
  "regenerated_session_id": "uuid",
  "original_session_id": "uuid",
  "regeneration_mode": "smaller",
  "regeneration_count": 1,
  "remaining_regenerations": 1, // free tier limit
  "blocker_type": "ambiguity",
  "validation_message": "Let's make these steps even smaller...",
  "actions": [
    {
      "id": "uuid",
      "description": "Open the doc (literally just open it)",
      "estimated_minutes": 1,
      "order_index": 1
    },
    {
      "id": "uuid",
      "description": "Type your name at the top",
      "estimated_minutes": 1,
      "order_index": 2
    },
    {
      "id": "uuid",
      "description": "Add one bullet point (any bullet point)",
      "estimated_minutes": 2,
      "order_index": 3
    }
  ],
  "comparison": {
    "original_step_count": 3,
    "new_step_count": 3,
    "original_avg_time": 5,
    "new_avg_time": 1.3,
    "change_description": "Steps are now 74% smaller (5 min → 1.3 min avg)"
  }
}
```

**Example Mode Adjustments:**

*Original Breakdown:*
```json
{
  "actions": [
    {"description": "Write introduction paragraph", "estimated_minutes": 10},
    {"description": "Draft 3 main points", "estimated_minutes": 15},
    {"description": "Write conclusion", "estimated_minutes": 8}
  ]
}
```

*Mode: "smaller"*
```json
{
  "actions": [
    {"description": "Open doc and type first sentence", "estimated_minutes": 2},
    {"description": "Add 2-3 more sentences", "estimated_minutes": 3},
    {"description": "Write one main point", "estimated_minutes": 5}
  ]
}
```

*Mode: "fastest"*
```json
{
  "actions": [
    {"description": "Bullet point outline in 3 min", "estimated_minutes": 3},
    {"description": "Expand bullets to paragraphs", "estimated_minutes": 5}
  ]
}
```

*Mode: "lowest_effort"*
```json
{
  "actions": [
    {"description": "Open doc, type title", "estimated_minutes": 1},
    {"description": "Copy-paste template or old work", "estimated_minutes": 2},
    {"description": "Change one thing", "estimated_minutes": 2}
  ]
}
```

*Mode: "high_momentum"*
```json
{
  "actions": [
    {"description": "Open doc", "estimated_minutes": 1},
    {"description": "Type your name", "estimated_minutes": 1},
    {"description": "Add title", "estimated_minutes": 2},
    {"description": "Write first sentence", "estimated_minutes": 2},
    {"description": "Add one bullet", "estimated_minutes": 2}
  ],
  "optimization": "5 quick wins for dopamine boost"
}
```

#### GET /api/v1/analytics/metrics/time-to-action

**Response:**
```json
{
  "user_id": "uuid",
  "timeframe": "7_days",
  "median_seconds": 192, // 3.2 minutes
  "mean_seconds": 228,
  "best_seconds": 45,
  "worst_seconds": 720,
  "percentiles": {
    "p25": 120,
    "p50": 192,
    "p75": 300,
    "p90": 480
  },
  "trend": "improving", // +18% faster than last week
  "by_time_of_day": {
    "morning": {"median": 150, "count": 8},
    "afternoon": {"median": 210, "count": 3},
    "evening": {"median": 360, "count": 1}
  },
  "by_blocker_type": {
    "overwhelm": {"median": 165, "count": 5},
    "ambiguity": {"median": 210, "count": 4},
    "perfectionism": {"median": 280, "count": 3}
  }
}
```

#### GET /api/v1/analytics/metrics/intervention-success

**Response:**
```json
{
  "user_id": "uuid",
  "overall_success_rate": 0.74,
  "by_blocker_type": {
    "overwhelm": {"success_rate": 0.82, "sample_size": 42},
    "ambiguity": {"success_rate": 0.74, "sample_size": 38},
    "perfectionism": {"success_rate": 0.68, "sample_size": 24},
    "avoidance": {"success_rate": 0.61, "sample_size": 18}
  },
  "by_task_type": {
    "admin": {"success_rate": 0.84, "sample_size": 28},
    "physical": {"success_rate": 0.79, "sample_size": 15},
    "creative": {"success_rate": 0.71, "sample_size": 24},
    "social": {"success_rate": 0.64, "sample_size": 11}
  },
  "by_time_of_day": {
    "morning": {"success_rate": 0.83, "sample_size": 35},
    "afternoon": {"success_rate": 0.72, "sample_size": 28},
    "evening": {"success_rate": 0.59, "sample_size": 15}
  },
  "by_regeneration": {
    "original": {"success_rate": 0.68, "sample_size": 78},
    "regenerated": {"success_rate": 0.86, "sample_size": 22},
    "improvement": "+26%"
  }
}
```

#### GET /api/v1/analytics/metrics/health-score

**Response:**
```json
{
  "health_score": 76,
  "target": 80,
  "status": "near_launch_ready",
  "components": {
    "unstuck_rate": {
      "value": 0.78,
      "weight": 0.30,
      "contribution": 23.4,
      "status": "excellent"
    },
    "intervention_success": {
      "value": 0.74,
      "weight": 0.25,
      "contribution": 18.5,
      "status": "good"
    },
    "repeat_usage_7d": {
      "value": 0.62,
      "weight": 0.20,
      "contribution": 12.4,
      "status": "concerning"
    },
    "time_to_action_score": {
      "value": 0.88,
      "weight": 0.15,
      "contribution": 13.2,
      "status": "excellent"
    },
    "insight_accuracy": {
      "value": 0.81,
      "weight": 0.10,
      "contribution": 8.1,
      "status": "excellent"
    }
  },
  "focus_areas": [
    "Improve 7-day repeat rate (enable push notifications)",
    "Reduce average time to action from 3.8 min to <3 min"
  ],
  "weekly_trend": "+2 points",
  "historical": [
    {"week": "2026-06-01", "score": 74},
    {"week": "2026-06-08", "score": 76}
  ]
}
```

#### POST /api/v1/voice/transcribe (Voice Input - Premium)

**Request:**
```
Content-Type: multipart/form-data

{
  "audio": <audio_file>,  // MP3, M4A, WAV, WebM
  "language": "en",        // optional, auto-detect if not provided
  "user_id": "uuid"
}
```

**Response:**
```json
{
  "transcription": "I need to write my resume but don't know where to start",
  "confidence": 0.96,
  "language_detected": "en",
  "duration_seconds": 4.2,
  "cost_cents": 0.025,
  "model": "whisper-1",
  "editable": true,
  "suggestions": [
    "I need to write my résumé but don't know where to start",
    "I need to write my resume but I don't know where to start"
  ]
}
```

**Fallback (Web Speech API):**
```json
{
  "transcription": "I need to write my resume but don't know where to start",
  "confidence": 0.89,
  "language_detected": "en-US",
  "model": "web_speech_api",
  "note": "Lower accuracy than Whisper, but free"
}
```

**Error Responses:**
```json
// User not premium
{
  "error": "premium_required",
  "message": "Voice input requires Premium subscription",
  "upgrade_url": "/premium"
}

// Audio too long
{
  "error": "audio_too_long",
  "message": "Audio must be under 2 minutes",
  "max_duration_seconds": 120
}

// Invalid format
{
  "error": "invalid_format",
  "message": "Supported formats: MP3, M4A, WAV, WebM",
  "supported_formats": ["mp3", "m4a", "wav", "webm"]
}
```

#### POST /api/v1/voice/synthesize (Voice Output - Premium)

**Request:**
```json
{
  "text": "You're experiencing ambiguity—your brain freezes when tasks lack clear first steps. Let's break through it: 1. Open the doc and type first sentence. 2. Add 2-3 more sentences. 3. Write one main point.",
  "voice": "alloy",  // alloy, echo, fable, onyx, nova, shimmer
  "speed": 1.0,      // 0.5 to 2.0
  "language": "en"   // optional
}
```

**Response:**
```json
{
  "audio_url": "https://storage.zelos.app/tts/abc123.mp3",
  "duration_seconds": 12.5,
  "cost_cents": 0.015,
  "voice": "alloy",
  "speed": 1.0,
  "expires_at": "2026-06-12T03:00:00Z",  // URL expires in 1 hour
  "format": "mp3",
  "size_kb": 98
}
```

**Audio Streaming (Alternative):**
```
GET /api/v1/voice/stream/:id
Content-Type: audio/mpeg
Transfer-Encoding: chunked

<binary audio stream>
```

#### GET /api/v1/voice/usage (Voice Usage Stats - Premium)

**Response:**
```json
{
  "user_id": "uuid",
  "current_period": {
    "period_start": "2026-06-01",
    "period_end": "2026-07-01",
    "transcription": {
      "minutes_used": 42.3,
      "requests_count": 87,
      "total_cost_cents": 25.38,
      "unlimited": true
    },
    "synthesis": {
      "characters_generated": 45820,
      "requests_count": 34,
      "total_cost_cents": 68.73,
      "unlimited": true
    }
  },
  "all_time": {
    "transcription_minutes": 124.7,
    "synthesis_characters": 138500
  },
  "limits": {
    "free_tier": {
      "transcription_minutes": 0,
      "synthesis_characters": 0
    },
    "premium_tier": {
      "transcription_minutes": "unlimited",
      "synthesis_characters": "unlimited"
    }
  }
}
```

---

## 5. Frontend Architecture

### 5.1 Directory Structure

```
/app                    # Next.js 14 App Router
  /(auth)              # Auth pages (login, signup)
    /login/page.tsx
    /signup/page.tsx
  /(main)              # Main app pages
    /page.tsx          # Home/Chat
    /focus/page.tsx    # Focus Mode (optional separate route)
    /stats/page.tsx    # User stats and progress
    /profile/page.tsx  # User profile
    /premium/page.tsx  # Premium upgrade page
  /api                 # Next.js API routes (simple endpoints)
    /auth/route.ts
  /layout.tsx          # Root layout
  /globals.css         # Global styles

/components
  /ui                  # Reusable UI components
    /Button.tsx
    /Card.tsx
    /Input.tsx
    /Modal.tsx
    /Toast.tsx
    /Progress.tsx
    /Checkbox.tsx
  /chat
    /ChatInput.tsx
    /ChatMessage.tsx
    /ActionList.tsx
    /FocusMode.tsx
    /VoiceInput.tsx       # Voice input component (Premium)
    /VoicePlayer.tsx      # Audio playback for TTS (Premium)
  /gamification
    /StreakDisplay.tsx
    /XPProgress.tsx
    /AchievementBadge.tsx
    /LevelUpAnimation.tsx
    /Confetti.tsx
  /social
    /FriendsList.tsx
    /FriendRequest.tsx
    /Leaderboard.tsx
    /LeagueCard.tsx
    /ChallengeCard.tsx
    /ChallengeModal.tsx
    /FriendActivityFeed.tsx
  /layouts
    /Navbar.tsx
    /Footer.tsx
    /Sidebar.tsx
  /forms
    /TaskInputForm.tsx
    /ProfileForm.tsx

  /lib
  /api               # API client functions
    /sessions.ts
    /actions.ts
    /users.ts
    /achievements.ts
    /friends.ts
    /leaderboard.ts
    /leagues.ts
    /challenges.ts
  /hooks             # Custom React hooks
    /useUser.ts
    /useStreak.ts
    /useActions.ts
    /useNotifications.ts
    /useFriends.ts
    /useLeaderboard.ts
    /useLeague.ts
    /useChallenges.ts
  /utils             # Utility functions
    /date.ts
    /xp.ts
    /streaks.ts
    /animations.ts
  /constants         # Constants
    /achievements.ts
    /levels.ts
    /colors.ts
  /types             # TypeScript types
    /user.ts
    /session.ts
    /action.ts
    /achievement.ts
    /friend.ts
    /leaderboard.ts
    /league.ts
    /challenge.ts

/context
  /AuthContext.tsx   # User auth state
  /UserStatsContext.tsx # User stats (streak, XP, etc.)
  /ThemeContext.tsx  # Light/dark theme

/styles
  /animations.css    # Keyframe animations

/public
  /icons             # App icons, favicon
  /images            # Static images
  /sounds            # Optional sound effects

/config
  /site.ts           # Site configuration
  /api.ts            # API endpoints config
```

### 5.2 Key Frontend Patterns

**State Management:**
- React Context for global user state
- React Query for server state (caching, refetching)
- Local state (useState) for UI-only state

**Data Fetching:**
- Server Components for initial data (SSR)
- Client Components + React Query for dynamic data
- Optimistic updates for actions completion

**Real-time:**
- Supabase Realtime subscriptions for activity feed
- WebSocket for live user count

**Authentication:**
- Supabase Auth with JWT
- Protected routes with middleware
- Automatic token refresh

---

### 5.3 Mobile App Architecture (React Native)

#### Directory Structure

```
/mobile                 # React Native project root
  /src
    /screens            # App screens
      /auth
        /LoginScreen.tsx
        /SignupScreen.tsx
      /main
        /HomeScreen.tsx       # Chat interface
        /FocusScreen.tsx      # Focus Mode
        /StatsScreen.tsx      # User stats
        /ProfileScreen.tsx    # User profile
    
    /components         # Reusable components
      /ui               # Base UI components (Button, Card, etc.)
        /Button.tsx
        /Card.tsx
        /Input.tsx
        /Checkbox.tsx
      /chat
        /ChatMessage.tsx
        /ActionListItem.tsx
      /gamification
        /StreakBadge.tsx
        /XPProgressBar.tsx
        /AchievementCard.tsx
        /Confetti.tsx
      /navigation
        /TabBar.tsx       # Custom tab bar
    
    /navigation         # Navigation config
      /AppNavigator.tsx  # Main navigation
      /AuthNavigator.tsx # Auth flow
      /TabNavigator.tsx  # Bottom tabs
    
    /hooks              # Custom hooks (shared with web)
      /useUser.ts
      /useActions.ts
      /useStreak.ts
    
    /utils              # Utilities (shared with web)
      /date.ts
      /xp.ts
      /api.ts
    
    /types              # TypeScript types (shared with web)
      /user.ts
      /action.ts
      /session.ts
    
    /services           # Platform-specific services
      /notifications.ts  # FCM setup
      /haptics.ts       # Haptic feedback
      /storage.ts       # AsyncStorage wrapper
    
    /constants          # Constants (shared with web)
      /colors.ts
      /achievements.ts
      /levels.ts
    
    /context            # Context providers
      /AuthContext.tsx
      /UserStatsContext.tsx
  
  /ios                  # iOS-specific code
    /ZelosApp.xcodeproj
    /ZelosApp/
      /AppDelegate.mm
      /Info.plist
  
  /android              # Android-specific code
    /app/
      /src/main/
        /AndroidManifest.xml
        /java/.../MainActivity.java
  
  /assets               # Images, fonts, etc.
    /images/
    /fonts/
  
  app.json              # Expo/RN config
  package.json
  tsconfig.json
```

#### Key Patterns for Native

**Navigation Pattern:**
```typescript
// AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { user } = useAuth();
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="Focus" 
              component={FocusScreen}
              options={{ presentation: 'fullScreenModal' }}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

**Styling Pattern (NativeWind):**
```typescript
// Button.tsx (React Native)
import { TouchableOpacity, Text } from 'react-native';

function Button({ children, onPress, variant = 'primary' }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        px-6 py-4 rounded-xl
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-pink-400 to-blue-400' 
          : 'bg-gray-200'
        }
      `}
    >
      <Text className="text-white font-semibold text-center">
        {children}
      </Text>
    </TouchableOpacity>
  );
}
```

**Shared API Client:**
```typescript
// packages/shared/src/api/sessions.ts
// This file is used by BOTH web and mobile

export async function createSession(taskInput: string) {
  const response = await fetch(`${API_URL}/api/v1/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ task_input: taskInput })
  });
  return response.json();
}

// Web uses this ↑
// Mobile uses this ↑
// 100% code reuse!
```

**Push Notifications (Mobile-Specific):**
```typescript
// services/notifications.ts (React Native)
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

export async function requestNotificationPermission() {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED;
  }
  return true; // Android doesn't need explicit permission
}

export async function getFCMToken() {
  const token = await messaging().getToken();
  // Send token to backend
  await registerFCMToken(token);
  return token;
}

export function setupNotificationHandlers() {
  // Foreground notifications
  messaging().onMessage(async remoteMessage => {
    console.log('Notification received:', remoteMessage);
    // Show local notification or update UI
  });
  
  // Background/quit state notifications
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background notification:', remoteMessage);
  });
}
```

**Haptic Feedback (Mobile-Specific):**
```typescript
// services/haptics.ts
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export function triggerSuccess() {
  ReactNativeHapticFeedback.trigger('notificationSuccess');
}

export function triggerImpact() {
  ReactNativeHapticFeedback.trigger('impactMedium');
}

// Used when:
// - Action completed → triggerSuccess()
// - Checkbox tapped → triggerImpact()
// - Achievement unlocked → triggerSuccess()
```

#### Platform-Specific Considerations

**iOS:**
- **App Store Guidelines:** Must follow strictly (no mentions of competing platforms, proper privacy labels)
- **Design:** Should feel native (use iOS navigation patterns)
- **Push Notifications:** Requires APNs certificate
- **Review Time:** 7-14 days typically
- **Updates:** Same review time
- **TestFlight:** Beta testing platform

**Android:**
- **Material Design:** Follow Android design patterns
- **Back Button:** Handle properly (users expect it)
- **Permissions:** Runtime permission requests
- **Push Notifications:** FCM is built-in
- **Review Time:** 1-3 days typically
- **Updates:** Faster than iOS
- **Internal Testing:** Closed testing track

#### Shared Code Strategy

**Monorepo Structure (Recommended):**
```
/packages
  /shared          # 60-70% of codebase
    /src
      /api         # API clients (100% shared)
      /types       # TypeScript types (100% shared)
      /utils       # Utilities (90% shared)
      /hooks       # Custom hooks (90% shared)
      /constants   # Constants (100% shared)
  
  /web             # Next.js app
    /app
    /components    # Web-specific UI
    /styles
  
  /mobile          # React Native app
    /src
      /screens     # Mobile-specific screens
      /components  # Mobile-specific UI
      /navigation
```

**What Gets Shared:**
- ✅ API clients and data fetching
- ✅ Business logic (XP calculation, streak logic, etc.)
- ✅ TypeScript types
- ✅ Constants (achievement definitions, level thresholds, etc.)
- ✅ Utility functions
- ✅ State management logic

**What's Platform-Specific:**
- ❌ UI components (Button, Card, etc. - similar but different APIs)
- ❌ Navigation (web uses Next.js router, mobile uses React Navigation)
- ❌ Animations (Framer Motion vs Reanimated)
- ❌ Platform services (notifications, haptics, storage)

---

### 5.4 Design System & Visual Style

**Design Philosophy:** Zelos uses a **vibrant, celebratory, Duolingo-inspired** design system to create an addictive, dopamine-driven experience. The UI is bright, colorful, and playful—not minimal or dark.

#### Color Palette

**Primary Colors (Vibrant Gradients):**
```css
/* Main Brand Colors */
--zelos-pink: #FF6B9D;
--zelos-purple: #A855F7;
--zelos-blue: #3B82F6;
--zelos-orange: #FB923C;
--zelos-green: #10B981;
--zelos-yellow: #FBBF24;

/* Gradient Combinations (used extensively) */
--gradient-primary: linear-gradient(135deg, #FF6B9D 0%, #A855F7 100%);
--gradient-success: linear-gradient(135deg, #10B981 0%, #3B82F6 100%);
--gradient-warning: linear-gradient(135deg, #FBBF24 0%, #FB923C 100%);
--gradient-celebration: linear-gradient(135deg, #FF6B9D 0%, #FBBF24 50%, #3B82F6 100%);

/* League Tier Colors */
--league-bronze: linear-gradient(135deg, #CD7F32 0%, #E6A04A 100%);
--league-silver: linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 100%);
--league-gold: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
--league-platinum: linear-gradient(135deg, #E5E4E2 0%, #00CED1 100%);
--league-diamond: linear-gradient(135deg, #B9F2FF 0%, #00D9FF 100%);
```

**Background Colors (Light & Clean):**
```css
/* Light mode (primary) */
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-tertiary: #F3F4F6;

/* Cards and surfaces */
--card-bg: #FFFFFF;
--card-border: rgba(0, 0, 0, 0.08);

/* Dark mode (optional) */
--bg-dark-primary: #1F2937;
--bg-dark-secondary: #111827;
```

**Text Colors:**
```css
--text-primary: #111827;
--text-secondary: #6B7280;
--text-tertiary: #9CA3AF;
--text-on-gradient: #FFFFFF;
```

#### Typography

**Font Stack:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Font Weights & Sizes:**
```typescript
// Tailwind config
theme: {
  fontSize: {
    'xs': ['12px', { lineHeight: '16px', fontWeight: 500 }],
    'sm': ['14px', { lineHeight: '20px', fontWeight: 500 }],
    'base': ['16px', { lineHeight: '24px', fontWeight: 500 }],
    'lg': ['18px', { lineHeight: '28px', fontWeight: 600 }],
    'xl': ['20px', { lineHeight: '28px', fontWeight: 600 }],
    '2xl': ['24px', { lineHeight: '32px', fontWeight: 700 }],
    '3xl': ['30px', { lineHeight: '36px', fontWeight: 700 }],
  }
}
```

#### Visual Components

**1. Gradient Cards (Everywhere):**
```tsx
// Example: Achievement card
<div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-xl">
  <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
  <div className="relative z-10">
    <Trophy className="w-12 h-12 mb-3" />
    <h3 className="text-xl font-bold">First Action!</h3>
    <p className="text-white/90">You're on your way 🎉</p>
  </div>
</div>
```

**2. Streaks Display (Fire Effect):**
```tsx
<div className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full px-4 py-2 text-white shadow-lg">
  <Flame className="w-6 h-6 animate-pulse" />
  <span className="text-2xl font-bold">7</span>
  <span className="text-sm font-medium">day streak!</span>
</div>
```

**3. XP Progress Bar (Animated):**
```tsx
<div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
  <motion.div
    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500"
    initial={{ width: 0 }}
    animate={{ width: '75%' }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  />
  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
</div>
```

**4. Action Checkboxes (Satisfying Animations):**
```tsx
<motion.button
  whileTap={{ scale: 0.95 }}
  onClick={handleComplete}
  className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-green-500 transition-colors"
>
  {completed && (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center"
    >
      <Check className="w-5 h-5 text-white" />
    </motion.div>
  )}
</motion.button>
```

**5. Celebration Confetti (Action Complete):**
```tsx
import confetti from 'canvas-confetti';

function celebrateCompletion() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FF6B9D', '#A855F7', '#3B82F6', '#FBBF24']
  });
}
```

**6. Level Up Modal (Big Celebration):**
```tsx
<motion.div
  initial={{ scale: 0, rotate: -180 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
  className="bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 rounded-3xl p-8 text-white text-center shadow-2xl"
>
  <motion.div
    animate={{ 
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0]
    }}
    transition={{ 
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 1
    }}
  >
    <Star className="w-24 h-24 mx-auto mb-4" />
  </motion.div>
  <h2 className="text-4xl font-bold mb-2">Level 5!</h2>
  <p className="text-xl text-white/90">You're unstoppable! 🚀</p>
</motion.div>
```

#### Animation Principles

**1. Micro-interactions (Always):**
- Button clicks: Scale down to 0.95 on tap
- Hover states: Subtle lift (translateY: -2px) + shadow increase
- Checkbox completion: Spring animation with confetti burst
- Streak updates: Number count-up animation

**2. Celebration Moments:**
- Action complete: ✅ Checkbox spring + confetti
- Achievement unlock: 🏆 Modal slide-up + fireworks
- Level up: ⭐ Full-screen gradient flash + confetti burst
- Streak milestone: 🔥 Fire animation + shake effect

**3. Gamification Feedback:**
- XP gain: Floating "+10 XP" text that fades up
- Rank change: Arrow icon (↑/↓) with color change
- Challenge accepted: Card flip animation
- Friend passed you: Notification slide-in from right

**4. Performance:**
- Use `transform` and `opacity` only (GPU-accelerated)
- Debounce rapid animations (max 60fps)
- Reduce motion option in settings (disable springs/confetti)

#### UI Implementation Examples

**Tailwind Config:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'zelos-pink': '#FF6B9D',
        'zelos-purple': '#A855F7',
        'zelos-blue': '#3B82F6',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF6B9D 0%, #A855F7 100%)',
        'gradient-success': 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s ease-in-out infinite',
      },
      boxShadow: {
        'glow-pink': '0 0 20px rgba(255, 107, 157, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
      }
    }
  }
}
```

**Framer Motion Variants:**
```typescript
// Reusable animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const scaleIn = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 }
};

export const slideInRight = {
  initial: { x: 300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 300, opacity: 0 }
};
```

#### Design References

**Inspiration Sources:**
- **Duolingo**: Vibrant colors, celebration animations, league system UI
- **Habitica**: Gamification elements, achievement badges, XP bars
- **Calm**: Smooth transitions, soothing but colorful
- **Notion**: Clean typography, card-based layouts
- **Linear**: Polished micro-interactions, keyboard shortcuts

**Key Differences from Minimal/Dark Themes:**
- ✅ Light backgrounds (white/off-white) as default
- ✅ Vibrant gradients on cards, buttons, badges
- ✅ Playful icons and illustrations
- ✅ Frequent celebration animations
- ✅ High contrast colors for energy/excitement
- ❌ No dark navy backgrounds
- ❌ No monochrome/grayscale aesthetic
- ❌ No minimal brutalism

---

### 5.5 Code Reuse in Practice

**Example: Action Completion Logic**

```typescript
// packages/shared/src/logic/actions.ts
// 100% SHARED between web and mobile

export function calculateXPGain(action: Action): number {
  const baseXP = 10;
  const bonuses = {
    quickCompletion: action.duration < action.estimated * 60 ? 5 : 0,
    firstOfDay: isFirstActionToday() ? 10 : 0,
  };
  return baseXP + bonuses.quickCompletion + bonuses.firstOfDay;
}

export function checkAchievements(
  user: User, 
  completedAction: Action
): Achievement[] {
  const newAchievements = [];
  
  if (user.total_actions === 1) {
    newAchievements.push({ type: 'first_action' });
  }
  
  if (user.current_streak === 7) {
    newAchievements.push({ type: 'week_warrior' });
  }
  
  return newAchievements;
}
```

**Web Usage:**
```typescript
// web/app/actions/complete.ts
import { calculateXPGain, checkAchievements } from '@zelos/shared';

async function handleActionComplete(actionId: string) {
  const xp = calculateXPGain(action);
  const achievements = checkAchievements(user, action);
  // Update UI with web-specific components
}
```

**Mobile Usage:**
```typescript
// mobile/src/screens/FocusScreen.tsx
import { calculateXPGain, checkAchievements } from '@zelos/shared';

async function handleActionComplete(actionId: string) {
  const xp = calculateXPGain(action);
  const achievements = checkAchievements(user, action);
  // Update UI with native components
  // Trigger haptic feedback (mobile-only)
}
```

**Result:** Business logic written once, used everywhere!

---

## 6. Backend Architecture

### 6.1 Directory Structure

```
/backend
  /app
    /main.py           # FastAPI app initialization
    /config.py         # Configuration settings
    /database.py       # Database connection
    
    /api
      /v1
        /routes
          /auth.py
          /sessions.py
          /actions.py
          /users.py
          /achievements.py
          /notifications.py
          /subscriptions.py
        /dependencies.py  # Auth dependencies
    
    /models            # Pydantic models (API schemas)
      /user.py
      /session.py
      /action.py
      /achievement.py
    
    /services          # Business logic
      /ai_service.py   # OpenAI/Claude integration
      /gamification_service.py  # XP, levels, achievements
      /notification_service.py  # FCM integration
      /stripe_service.py        # Stripe integration
      /analytics_service.py     # PostHog tracking
    
    /core
      /security.py     # JWT, hashing
      /prompts.py      # AI prompt templates
      /utils.py        # Helper functions
    
    /tasks             # Celery tasks
      /streak_check.py
      /weekly_reports.py
      /notifications.py
  
  /tests
    /test_api.py
    /test_services.py
  
  /alembic           # Database migrations (if not using Supabase migrations)
  
  requirements.txt
  Dockerfile
  .env.example
```

### 6.2 Key Backend Patterns

**Dependency Injection:**
- FastAPI's built-in DI for database, auth
- Centralized service initialization

**Error Handling:**
- Custom exception handlers
- Structured error responses
- Sentry integration for error tracking

**Background Jobs:**
- Celery for async tasks
- Redis as broker
- Scheduled tasks (cron-like)

**AI Integration:**
- Retry logic for API failures
- Fallback to Claude if OpenAI fails
- Response caching for common queries
- Token optimization

---

## 7. AI Integration

### 7.1 Dual Mode System Architecture

Zelos uses an intelligent mode detection system to provide appropriate responses based on user intent.

**Mode Types:**
1. **Task Mode** - User wants help getting unstuck (action-oriented)
2. **Learn Mode** - User wants to understand concepts (educational)
3. **Mixed Mode** - User wants both action and understanding

**Mode Detection Flow:**
```
User Input
    ↓
Intent Classification (AI)
    ↓
├─ Task Intent → Task Mode → Blocker + Actions + Tooltips
├─ Learn Intent → Learn Mode → Educational Response
└─ Mixed Intent → Mixed Mode → Quick Actions + Explanation
```

---

### 7.2 Prompt Engineering (Task Mode)

**System Prompt for Task Mode:**
```python
TASK_MODE_SYSTEM_PROMPT = """
You are Zelos, an empathetic AI companion that helps people overcome task paralysis.

MODE: Task Mode (Action-Oriented)

Your goal: Identify psychological blockers and break down overwhelming tasks into tiny, actionable steps.

Response Structure:
1. Blocker identification (emoji + type)
2. Brief validation (1-2 sentences, empathetic)
3. Scientific credibility (1 sentence mentioning concept name)
4. 3-5 micro-actions (2-5 minutes each)

Rules:
1. Identify the blocker type (ambiguity, overwhelm, perfectionism, overthinking, avoidance, low_energy, executive_dysfunction)
2. Provide brief validation (1-2 sentences, empathetic)
3. Include one scientific/technical term (e.g., "task paralysis", "executive dysfunction") for credibility
4. Generate 3-5 micro-actions (2-5 minutes each)
5. Make the first action EXTREMELY easy (lower activation energy)
6. Use encouraging, non-judgmental language
7. Keep responses concise (60-100 words total)
8. NEVER act as a therapist or give medical advice
9. Mark technical terms with asterisks for tooltips (e.g., *task paralysis*)
10. Format response as JSON

User Context:
- Common blocker: {user_blocker_pattern}
- Successful strategies: {user_success_patterns}
- Time of day: {current_time}
- Timezone: {user_timezone}
- Previous tasks: {recent_tasks}

Response Format (JSON):
{{
  "mode": "task",
  "blocker_type": "ambiguity_perfectionism",
  "blocker_emoji": "🧩",
  "validation_message": "You're experiencing *task paralysis*—your brain freezes when tasks lack clear first steps.",
  "technical_terms": ["task paralysis"],
  "actions": [
    {{"description": "Action 1 (very easy)", "estimated_minutes": 1}},
    {{"description": "Action 2", "estimated_minutes": 2}},
    {{"description": "Action 3", "estimated_minutes": 3}}
  ]
}}
"""
```

**Example Task Mode Response:**
```json
{
  "mode": "task",
  "blocker_type": "ambiguity_perfectionism",
  "blocker_emoji": "🧩",
  "validation_message": "It sounds like 'write resume' feels huge and you want it to be perfect. You're experiencing *task paralysis*—a common response when your brain encounters tasks without clear starting points.",
  "technical_terms": ["task paralysis"],
  "actions": [
    {"description": "Open a blank doc—nothing else", "estimated_minutes": 1},
    {"description": "Type just your name and email", "estimated_minutes": 1},
    {"description": "List 3 job titles you've had (no details)", "estimated_minutes": 2}
  ]
}
```

---

### 7.3 Prompt Engineering (Learn Mode)

**System Prompt for Learn Mode:**
```python
LEARN_MODE_SYSTEM_PROMPT = """
You are Zelos, an empathetic AI companion with deep knowledge of productivity psychology.

MODE: Learn Mode (Educational)

Your goal: Provide clear, scientifically-backed explanations about task paralysis, psychology, and productivity concepts.

Response Structure:
1. Title (concept name)
2. Clear definition (2-3 sentences)
3. Common causes (3-5 bullet points)
4. Who experiences it (context)
5. Related concepts (3-5 with brief descriptions)
6. **Suggested follow-up questions (3-4 clickable prompts)**
7. CTA back to Task Mode

Rules:
1. Be educational but accessible (200-400 words)
2. Use scientific backing but avoid jargon overload
3. Provide practical context (not just theory)
4. Include related concepts with links
5. **Generate 3-4 suggested follow-up questions** that encourage exploration
6. Always end with CTA to Task Mode
7. NEVER give medical advice or diagnosis
8. Mark related concepts with asterisks for linking
9. Format response as JSON

Response Format (JSON):
{{
  "mode": "learn",
  "concept_name": "Task Paralysis",
  "definition": "2-3 sentence clear definition",
  "explanation": "2-3 paragraph detailed explanation",
  "common_causes": [
    {{"cause": "Cause 1", "description": "Brief explanation"}},
    {{"cause": "Cause 2", "description": "Brief explanation"}}
  ],
  "who_experiences": "Context about who commonly experiences this",
  "related_concepts": [
    {{"name": "Executive Dysfunction", "description": "Brief description"}},
    {{"name": "Decision Fatigue", "description": "Brief description"}}
  ],
  "suggested_questions": [
    {{"emoji": "💡", "question": "What is executive dysfunction?", "mode": "learn"}},
    {{"emoji": "🧠", "question": "Why does my brain freeze on tasks?", "mode": "learn"}},
    {{"emoji": "🔄", "question": "How is this different from ADHD?", "mode": "learn"}},
    {{"emoji": "✅", "question": "I'm ready to break down a task", "mode": "task"}}
  ],
  "cta": "Ready to overcome it? Give me a task to break down."
}}

**Suggested Questions Guidelines:**
- Generate 3-4 questions based on the response content
- Mix of: deeper dives, related concepts, practical applications
- Use emojis: 💡 (concept), 🧠 (why/how), 🔄 (comparison), ✅ (action)
- Always include at least one CTA to switch to Task Mode
- Questions should feel natural and conversational
- Avoid yes/no questions (use open-ended)
"""
```

**Example Learn Mode Response:**
```json
{
  "mode": "learn",
  "concept_name": "Task Paralysis",
  "definition": "Task paralysis is a psychological state where you know what needs to be done but struggle to initiate action. It's not laziness—it's your brain's response to specific triggers.",
  "explanation": "Task paralysis occurs when your prefrontal cortex (decision-making center) gets overloaded trying to plan the perfect approach. This creates analysis paralysis—thinking replaces doing. The task feels overwhelming, unclear, or intimidating, so your brain avoids it as a protective mechanism.\n\nThis is particularly common when tasks lack clear first steps (ambiguity), feel too large (overwhelm), or trigger perfectionism. Your brain essentially 'freezes' because it can't compute a safe path forward.",
  "common_causes": [
    {"cause": "Ambiguity", "description": "Task lacks a clear starting point"},
    {"cause": "Overwhelm", "description": "Task feels too big or complex"},
    {"cause": "Perfectionism", "description": "Fear that work won't meet standards"},
    {"cause": "Overthinking", "description": "Too much planning, not enough doing"}
  ],
  "who_experiences": "Common in people with ADHD (executive dysfunction), high-achievers, perfectionists, students, professionals facing new challenges, and anyone dealing with ambiguous tasks.",
  "related_concepts": [
    {"name": "Executive Dysfunction", "description": "ADHD-related difficulty initiating tasks despite wanting to"},
    {"name": "Decision Fatigue", "description": "Mental exhaustion from too many choices"},
    {"name": "Activation Energy", "description": "Mental effort required to start a task"}
  ],
  "suggested_questions": [
    {"emoji": "💡", "question": "What is executive dysfunction?", "mode": "learn"},
    {"emoji": "🧠", "question": "Why does perfectionism cause task paralysis?", "mode": "learn"},
    {"emoji": "🔄", "question": "How is this different from procrastination?", "mode": "learn"},
    {"emoji": "✅", "question": "I have a task I'm stuck on", "mode": "task"}
  ],
  "cta": "Ready to overcome it? Give me a task to break down."
}
```

---

### 7.4 Intent Classification Prompt

**System Prompt for Mode Detection:**
```python
INTENT_CLASSIFIER_PROMPT = """
Analyze the user's input and classify their intent.

Intent Types:
1. TASK_INTENT: User wants help getting unstuck on a specific task
   Examples: 
   - "I need to write my resume"
   - "I'm stuck on studying"
   - "I should clean my room"
   - "Can you help me start X?"
   
2. LEARN_INTENT: User wants to understand concepts/psychology
   Examples:
   - "What is task paralysis?"
   - "Tell me about ADHD"
   - "Why do I procrastinate?"
   - "Explain executive function"
   
3. MIXED_INTENT: User wants both help AND understanding
   Examples:
   - "I'm stuck on my resume but also want to know why"
   - "Help me study and explain why I get stuck"

Respond with JSON:
{{
  "intent": "task" | "learn" | "mixed",
  "confidence": 0.0-1.0,
  "reasoning": "brief explanation"
}}
"""
```

---

### 7.5 Frontend Implementation: Suggested Questions Component

**Component: `SuggestedQuestions.tsx`**

```typescript
// components/chat/SuggestedQuestions.tsx
import { motion } from 'framer-motion';

interface SuggestedQuestion {
  emoji: string;
  question: string;
  mode: 'task' | 'learn';
}

interface SuggestedQuestionsProps {
  questions: SuggestedQuestion[];
  onQuestionClick: (question: string, mode: 'task' | 'learn') => void;
}

export function SuggestedQuestions({ questions, onQuestionClick }: SuggestedQuestionsProps) {
  return (
    <div className="mt-4 space-y-2">
      <p className="text-sm text-gray-500 font-medium">Explore more:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((q, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onQuestionClick(q.question, q.mode)}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full
              text-sm font-medium transition-all
              ${q.mode === 'task' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
              }
            `}
          >
            <span>{q.emoji}</span>
            <span>{q.question}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
```

**Usage in ChatMessage Component:**

```typescript
// components/chat/ChatMessage.tsx
import { SuggestedQuestions } from './SuggestedQuestions';

interface LearnModeResponse {
  mode: 'learn';
  concept_name: string;
  explanation: string;
  common_causes: Array<{cause: string; description: string}>;
  related_concepts: Array<{name: string; description: string}>;
  suggested_questions: Array<{emoji: string; question: string; mode: string}>;
  cta: string;
}

export function ChatMessage({ message }: { message: LearnModeResponse }) {
  const handleQuestionClick = (question: string, mode: 'task' | 'learn') => {
    // If switching to task mode, show mode indicator
    if (mode === 'task') {
      // Switch UI to Task Mode
      setCurrentMode('task');
    }
    
    // Send question as new user message
    sendMessage(question);
    
    // Track analytics
    trackEvent('suggested_question_clicked', {
      question,
      mode,
      concept: message.concept_name
    });
  };

  return (
    <div className="space-y-4">
      {/* Message content */}
      <div className="prose">
        <h3>📚 {message.concept_name}</h3>
        <p>{message.explanation}</p>
        {/* ... render causes, related concepts ... */}
      </div>

      {/* Suggested questions */}
      {message.suggested_questions && (
        <SuggestedQuestions 
          questions={message.suggested_questions}
          onQuestionClick={handleQuestionClick}
        />
      )}
    </div>
  );
}
```

**Analytics Tracking:**

```typescript
// Track which questions are most clicked
interface SuggestedQuestionAnalytics {
  question: string;
  concept: string;
  mode: 'task' | 'learn';
  clicks: number;
  timestamp: Date;
}

// Store in analytics_events table
await supabase.from('analytics_events').insert({
  user_id: userId,
  event_name: 'suggested_question_clicked',
  event_category: 'engagement',
  properties: {
    question: question,
    concept: conceptName,
    target_mode: mode,
    session_id: sessionId
  }
});
```

---

### 7.6 Tooltip Content Database

**Technical Terms with Definitions:**
```python
TOOLTIP_DEFINITIONS = {
    "task_paralysis": {
        "title": "Task Paralysis",
        "definition": "A psychological state where you know what needs to be done but struggle to start due to unclear first steps, overwhelm, or fear of imperfection.",
        "context": "Common in ADHD and high-achievers. Your brain 'freezes' as a protective mechanism.",
        "learn_more_link": "/learn/task-paralysis"
    },
    "executive_dysfunction": {
        "title": "Executive Dysfunction",
        "definition": "Difficulty with brain functions that control planning, organization, and task initiation. Common in ADHD.",
        "context": "Not laziness—it's a neurological difference in how your brain processes 'starting' signals.",
        "learn_more_link": "/learn/executive-dysfunction"
    },
    "perfectionism": {
        "title": "Perfectionism Block",
        "definition": "Fear that your work won't meet high standards, leading to avoidance and procrastination.",
        "context": "Strategy: Start with 'done is better than perfect'—polish later.",
        "learn_more_link": "/learn/perfectionism"
    },
    "ambiguity": {
        "title": "Ambiguity Block",
        "definition": "Inability to start when a task lacks clear, concrete first steps.",
        "context": "Your brain needs specific instructions to initiate action.",
        "learn_more_link": "/learn/ambiguity"
    },
    "overwhelm": {
        "title": "Task Overwhelm",
        "definition": "When a task feels too large or complex, triggering avoidance.",
        "context": "Break into micro-actions (2-5 min each) to reduce perceived size.",
        "learn_more_link": "/learn/overwhelm"
    },
    "activation_energy": {
        "title": "Activation Energy",
        "definition": "The mental effort required to start a task. Lower it by making first steps extremely easy.",
        "context": "Like physics: objects at rest need energy to start moving.",
        "learn_more_link": "/learn/activation-energy"
    },
    "decision_fatigue": {
        "title": "Decision Fatigue",
        "definition": "Mental exhaustion from making too many decisions, reducing willpower and increasing procrastination.",
        "context": "Reduce decisions needed to start (e.g., 'Open doc' vs 'Write perfect intro').",
        "learn_more_link": "/learn/decision-fatigue"
    }
}
```

---

### 7.6 AI Service Implementation (Updated)

```python
# app/services/ai_service.py
import openai
from anthropic import Anthropic

class AIService:
    def __init__(self):
        self.openai_client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        self.anthropic_client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
    
    async def breakdown_task(
        self, 
        task_input: str, 
        user_context: dict
    ) -> dict:
        """
        Generate task breakdown using AI
        """
        # Build prompt with user context
        system_prompt = self._build_system_prompt(user_context)
        user_message = self._build_user_message(task_input, user_context)
        
        try:
            # Try OpenAI first (cheaper, faster)
            response = await self._call_openai(system_prompt, user_message)
            return response
        except Exception as e:
            # Fallback to Claude
            logging.warning(f"OpenAI failed, falling back to Claude: {e}")
            response = await self._call_anthropic(system_prompt, user_message)
            return response
    
    async def _call_openai(self, system_prompt: str, user_message: str) -> dict:
        response = self.openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            response_format={"type": "json_object"},
            temperature=0.7,
            max_tokens=500
        )
        return json.loads(response.choices[0].message.content)
    
    async def _call_anthropic(self, system_prompt: str, user_message: str) -> dict:
        # Similar implementation for Claude
        pass
```

---

### 7.3 Updated AI Service with Dual Mode Support

```python
# app/services/ai_service.py (UPDATED)
import openai
from anthropic import Anthropic
import json
import logging

class AIService:
    def __init__(self):
        self.openai_client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        self.anthropic_client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
        self.tooltip_definitions = TOOLTIP_DEFINITIONS
    
    async def process_user_input(
        self, 
        user_input: str, 
        user_context: dict
    ) -> dict:
        """
        Main entry point: Detect intent and route to appropriate mode
        """
        # Step 1: Classify intent
        intent = await self._classify_intent(user_input)
        
        # Step 2: Route to appropriate handler
        if intent['intent'] == 'task':
            return await self._handle_task_mode(user_input, user_context)
        elif intent['intent'] == 'learn':
            return await self._handle_learn_mode(user_input)
        else:  # mixed
            return await self._handle_mixed_mode(user_input, user_context)
    
    async def _classify_intent(self, user_input: str) -> dict:
        """Classify user intent: task, learn, or mixed"""
        response = self.openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": INTENT_CLASSIFIER_PROMPT},
                {"role": "user", "content": user_input}
            ],
            response_format={"type": "json_object"},
            temperature=0.3,
            max_tokens=100
        )
        return json.loads(response.choices[0].message.content)
    
    async def _handle_task_mode(
        self, 
        user_input: str, 
        user_context: dict
    ) -> dict:
        """Generate task breakdown with actions"""
        system_prompt = self._build_task_mode_prompt(user_context)
        
        try:
            response = await self._call_openai(system_prompt, user_input, max_tokens=500)
            response['tooltips'] = self._get_tooltips_for_terms(
                response.get('technical_terms', [])
            )
            return response
        except Exception as e:
            logging.warning(f"OpenAI failed: {e}")
            response = await self._call_anthropic(system_prompt, user_input)
            response['tooltips'] = self._get_tooltips_for_terms(
                response.get('technical_terms', [])
            )
            return response
    
    async def _handle_learn_mode(self, user_input: str) -> dict:
        """Generate educational explanation"""
        return await self._call_openai(
            LEARN_MODE_SYSTEM_PROMPT,
            user_input,
            max_tokens=800
        )
    
    async def _handle_mixed_mode(
        self, 
        user_input: str, 
        user_context: dict
    ) -> dict:
        """Generate both task breakdown and brief explanation"""
        task_response = await self._handle_task_mode(user_input, user_context)
        
        learn_prompt = f"Briefly explain (2-3 sentences) why user is stuck: {user_input}"
        explanation = await self._call_openai(
            LEARN_MODE_SYSTEM_PROMPT,
            learn_prompt,
            max_tokens=150
        )
        
        return {
            "mode": "mixed",
            "task_breakdown": task_response,
            "brief_explanation": explanation.get('explanation', ''),
            "learn_more_link": f"/learn/{task_response['blocker_type']}"
        }
    
    def _get_tooltips_for_terms(self, terms: list) -> dict:
        """Retrieve tooltip content for technical terms"""
        tooltips = {}
        for term in terms:
            term_key = term.replace(' ', '_').lower()
            if term_key in self.tooltip_definitions:
                tooltips[term] = self.tooltip_definitions[term_key]
        return tooltips
```

---

### 7.4 Frontend Tooltip Component

**React Component for Interactive Tooltips:**

```typescript
// components/chat/Tooltip.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  term: string;
  definition: {
    title: string;
    definition: string;
    context: string;
    learn_more_link: string;
  };
  children: React.ReactNode;
}

export function Tooltip({ term, definition, children }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <span className="relative inline-block">
      <span
        className="underline decoration-dotted decoration-purple-500 cursor-help"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
      </span>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 w-80 p-4 mt-2 bg-white dark:bg-dark-bg-card border rounded-xl shadow-xl"
          >
            <h4 className="font-semibold mb-2">{definition.title}</h4>
            <p className="text-sm mb-2">{definition.definition}</p>
            <p className="text-sm text-gray-600 mb-3">{definition.context}</p>
            <a href={definition.learn_more_link} className="text-sm text-purple-600 hover:underline">
              Learn more →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
```

---

### 7.5 Response Caching (Updated for Dual Mode)

```python
# Cache both Task and Learn mode responses with different TTLs
import redis

redis_client = redis.Redis(host='localhost', port=6379)

def get_cached_response(input_hash: str, mode: str) -> dict | None:
    """
    Get cached response for specific mode
    """
    cached = redis_client.get(f"{mode}:{input_hash}")
    if cached:
        return json.loads(cached)
    return None

def cache_response(input_hash: str, mode: str, response: dict):
    """
    Cache response with mode-specific TTL
    Task Mode: 1 hour (tasks vary more)
    Learn Mode: 24 hours (concepts are stable)
    """
    ttl = 3600 if mode == 'task' else 86400
    
    redis_client.setex(
        f"{mode}:{input_hash}",
        ttl,
        json.dumps(response)
    )
```

---

---

## 8. Data & Learning System Implementation

### 8.1 Feedback Loop & Outcome Tracking

**Python Service (`services/analytics_service.py`):**

```python
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import asyncio

class AnalyticsService:
    def __init__(self, supabase_client):
        self.db = supabase_client
    
    async def record_session_feedback(
        self,
        session_id: str,
        user_id: str,
        feedback_type: str,
        actions_completed: int = 0,
        follow_up_reason: Optional[str] = None,
        follow_up_tags: Optional[List[str]] = None
    ) -> Dict:
        """Record user feedback on task breakdown"""
        
        # Get session details
        session = await self.db.table('sessions').select('*').eq('id', session_id).single()
        time_since_breakdown = (datetime.now() - session['created_at']).seconds
        
        # Insert feedback
        feedback = await self.db.table('session_feedback').insert({
            'session_id': session_id,
            'user_id': user_id,
            'feedback_type': feedback_type,
            'time_to_feedback_seconds': time_since_breakdown,
            'actions_completed_count': actions_completed,
            'follow_up_reason': follow_up_reason,
            'follow_up_tags': follow_up_tags
        }).execute()
        
        # Check if recovery should be offered
        recovery_offered = await self._should_offer_recovery(
            user_id, session_id, feedback_type, follow_up_reason
        )
        
        # Update behavior profile asynchronously
        asyncio.create_task(self._update_behavior_profile(user_id, session_id))
        
        return {
            'feedback_id': feedback.data[0]['id'],
            'recovery_offered': recovery_offered
        }
    
    async def track_outcome_metrics(
        self,
        session_id: str,
        user_id: str,
        started_task: bool,
        actions_completed: int,
        total_work_duration: int
    ):
        """Track whether user became unstuck"""
        
        # Calculate metrics
        worked_5_min = total_work_duration >= 300
        worked_15_min = total_work_duration >= 900
        finished_task = await self._check_task_finished(session_id)
        
        # Get time to first action
        first_action = await self.db.table('actions')\
            .select('completed_at')\
            .eq('session_id', session_id)\
            .eq('status', 'completed')\
            .order('completed_at')\
            .limit(1)\
            .execute()
        
        session = await self.db.table('sessions')\
            .select('created_at')\
            .eq('id', session_id)\
            .single()
        
        time_to_first_action = None
        if first_action.data:
            time_to_first_action = (
                first_action.data[0]['completed_at'] - session['created_at']
            ).seconds
        
        # Calculate momentum score
        momentum_score = await self._calculate_momentum(session_id)
        
        # Insert outcome metrics
        outcome = await self.db.table('outcome_metrics').insert({
            'session_id': session_id,
            'user_id': user_id,
            'started_task': started_task,
            'worked_5_minutes': worked_5_min,
            'worked_15_minutes': worked_15_min,
            'finished_task': finished_task,
            'time_to_first_action_seconds': time_to_first_action,
            'total_work_duration_seconds': total_work_duration,
            'actions_completed_count': actions_completed,
            'momentum_score': momentum_score
        }).execute()
        
        # Track unstuck event if criteria met
        if started_task and (worked_5_min or actions_completed >= 2):
            await self._record_unstuck_event(
                user_id, session_id, time_to_first_action
            )
        
        return outcome.data[0]
    
    async def _calculate_momentum(self, session_id: str) -> float:
        """Calculate momentum score (did user complete actions quickly?)"""
        actions = await self.db.table('actions')\
            .select('completed_at, created_at')\
            .eq('session_id', session_id)\
            .eq('status', 'completed')\
            .order('order_index')\
            .execute()
        
        if len(actions.data) < 2:
            return 0.0
        
        # Check time between consecutive actions
        fast_transitions = 0
        for i in range(len(actions.data) - 1):
            time_between = (
                actions.data[i+1]['completed_at'] - 
                actions.data[i]['completed_at']
            ).seconds
            if time_between <= 600:  # 10 minutes
                fast_transitions += 1
        
        return fast_transitions / (len(actions.data) - 1)
    
    async def get_unstuck_score(self, user_id: str, days: int = 7) -> Dict:
        """Get user's unstuck score for dashboard"""
        start_date = datetime.now() - timedelta(days=days)
        
        # Get all outcome metrics
        outcomes = await self.db.table('outcome_metrics')\
            .select('*')\
            .eq('user_id', user_id)\
            .gte('created_at', start_date.isoformat())\
            .execute()
        
        total_attempts = len(outcomes.data)
        unstuck_events = sum(1 for o in outcomes.data if o['unstuck_event'])
        
        if total_attempts == 0:
            return {'unstuck_score': 0, 'insufficient_data': True}
        
        # Calculate metrics
        avg_time_to_start = sum(
            o['time_to_first_action_seconds'] or 0 
            for o in outcomes.data if o['started_task']
        ) / max(sum(1 for o in outcomes.data if o['started_task']), 1)
        
        avg_work_duration = sum(
            o['total_work_duration_seconds'] or 0 
            for o in outcomes.data
        ) / total_attempts
        
        # Group by time of day
        time_of_day_stats = self._group_by_time_of_day(outcomes.data)
        
        return {
            'unstuck_score': unstuck_events / total_attempts,
            'this_week': {
                'tasks_attempted': total_attempts,
                'unstuck_events': unstuck_events,
                'unstuck_rate': unstuck_events / total_attempts,
                'avg_time_to_start_seconds': int(avg_time_to_start),
                'avg_work_duration_seconds': int(avg_work_duration)
            },
            'best_time_of_day': time_of_day_stats,
            'trend': await self._calculate_trend(user_id)
        }
```

### 8.2 User Behavior Profile Engine

**Python Service (`services/behavior_profile_service.py`):**

```python
from collections import Counter
from typing import Dict, List
import numpy as np

class BehaviorProfileService:
    def __init__(self, supabase_client):
        self.db = supabase_client
    
    async def analyze_and_update_profile(self, user_id: str):
        """Analyze user's session history and update behavior profile"""
        
        # Get all user sessions with outcomes
        sessions = await self.db.table('sessions')\
            .select('*, outcome_metrics(*), session_feedback(*)')\
            .eq('user_id', user_id)\
            .execute()
        
        if len(sessions.data) < 3:
            # Not enough data yet
            return
        
        # Analyze blocker patterns
        top_blockers = self._analyze_blockers(sessions.data)
        
        # Analyze trigger patterns
        trigger_patterns = self._analyze_triggers(sessions.data)
        
        # Analyze intervention effectiveness
        effective_strategies = self._analyze_strategies(sessions.data, threshold=0.7)
        ineffective_strategies = self._analyze_strategies(sessions.data, threshold=0.5, inverse=True)
        
        # Learn preferences
        preferences = self._learn_preferences(sessions.data)
        
        # Calculate task type success rates
        task_type_rates = self._analyze_task_types(sessions.data)
        
        # Calculate profile confidence
        profile_confidence = min(len(sessions.data) / 50, 1.0)  # Max at 50 sessions
        
        # Update or create profile
        await self.db.table('user_behavior_profiles').upsert({
            'user_id': user_id,
            'top_blockers': top_blockers,
            'trigger_patterns': trigger_patterns,
            'effective_strategies': effective_strategies,
            'ineffective_strategies': ineffective_strategies,
            'optimal_action_count': preferences['optimal_action_count'],
            'preferred_tone': preferences['tone'],
            'responds_to_validation': preferences['validation'],
            'responds_to_urgency': preferences['urgency'],
            'best_time_of_day': preferences['best_time'],
            'focus_mode_engagement': preferences['focus_engagement'],
            'task_type_success_rates': task_type_rates,
            'total_sessions_analyzed': len(sessions.data),
            'profile_confidence': profile_confidence,
            'last_analyzed_at': datetime.now().isoformat()
        }).execute()
    
    def _analyze_blockers(self, sessions: List[Dict]) -> List[Dict]:
        """Identify top blockers and their success rates"""
        blocker_stats = {}
        
        for session in sessions:
            blocker = session['blocker_type']
            if not blocker:
                continue
            
            if blocker not in blocker_stats:
                blocker_stats[blocker] = {
                    'frequency': 0,
                    'successes': 0
                }
            
            blocker_stats[blocker]['frequency'] += 1
            
            # Check if session was successful
            if session.get('outcome_metrics') and \
               session['outcome_metrics'][0].get('unstuck_event'):
                blocker_stats[blocker]['successes'] += 1
        
        # Convert to list and sort by frequency
        top_blockers = [
            {
                'type': blocker,
                'frequency': stats['frequency'],
                'success_rate': stats['successes'] / stats['frequency']
            }
            for blocker, stats in blocker_stats.items()
        ]
        
        return sorted(top_blockers, key=lambda x: x['frequency'], reverse=True)[:5]
    
    def _learn_preferences(self, sessions: List[Dict]) -> Dict:
        """Learn user's behavioral preferences"""
        
        # Optimal action count
        successful_sessions = [
            s for s in sessions 
            if s.get('outcome_metrics') and s['outcome_metrics'][0].get('unstuck_event')
        ]
        avg_actions = np.mean([s['total_actions'] for s in successful_sessions]) \
            if successful_sessions else 3.0
        
        # Best time of day
        time_success = {'morning': [], 'afternoon': [], 'evening': []}
        for s in sessions:
            hour = datetime.fromisoformat(s['created_at']).hour
            time_period = 'morning' if hour < 12 else 'afternoon' if hour < 17 else 'evening'
            
            success = bool(
                s.get('outcome_metrics') and 
                s['outcome_metrics'][0].get('unstuck_event')
            )
            time_success[time_period].append(success)
        
        best_time = max(
            time_success.items(),
            key=lambda x: sum(x[1]) / len(x[1]) if x[1] else 0
        )[0]
        
        # Focus mode engagement
        focus_sessions = sum(1 for s in sessions if s.get('focus_mode_used'))
        focus_engagement = 'high' if focus_sessions / len(sessions) > 0.5 \
            else 'medium' if focus_sessions / len(sessions) > 0.2 \
            else 'low'
        
        return {
            'optimal_action_count': round(avg_actions, 1),
            'tone': 'supportive',  # Can be learned from feedback
            'validation': True,  # Can be learned from A/B tests
            'urgency': False,
            'best_time': best_time,
            'focus_engagement': focus_engagement
        }
    
    async def get_ai_adjusted_prompt(self, user_id: str, base_prompt: str) -> str:
        """Adjust AI prompt based on user's behavior profile"""
        
        profile = await self.db.table('user_behavior_profiles')\
            .select('*')\
            .eq('user_id', user_id)\
            .single()
        
        if not profile.data or profile.data['profile_confidence'] < 0.3:
            # Not enough data, use base prompt
            return base_prompt
        
        p = profile.data
        
        # Adjust prompt based on learned preferences
        adjustments = []
        
        if p['optimal_action_count'] < 3.5:
            adjustments.append("Generate exactly 3 micro-actions (user prefers fewer steps).")
        
        if p['responds_to_validation']:
            adjustments.append("Include a brief validation message before the action list.")
        
        if p['top_blockers'] and len(p['top_blockers']) > 0:
            top_blocker = p['top_blockers'][0]['type']
            adjustments.append(
                f"User commonly experiences '{top_blocker}' blocker. "
                f"Pre-emptively address this in your response."
            )
        
        if p['preferred_tone']:
            adjustments.append(f"Use a {p['preferred_tone']} tone.")
        
        # Append adjustments to base prompt
        if adjustments:
            adjusted_prompt = base_prompt + "\n\nPersonalization adjustments:\n" + "\n".join(f"- {adj}" for adj in adjustments)
            return adjusted_prompt
        
        return base_prompt
```

### 8.2.1 Breakdown Regeneration Service

**Python Service (`services/regeneration_service.py`):**

```python
from typing import Dict, List
from datetime import datetime

class RegenerationService:
    def __init__(self, supabase_client, ai_service):
        self.db = supabase_client
        self.ai = ai_service
    
    REGENERATION_MODES = {
        'smaller': {
            'instruction': 'Break each step into even tinier chunks. Make each step take 1-2 minutes max.',
            'target_time': 1.5,
            'target_count': lambda orig: orig + 1
        },
        'faster': {
            'instruction': 'Reduce time estimates. Focus on quick wins and speed over thoroughness.',
            'target_time': 3,
            'target_count': lambda orig: max(2, orig - 1)
        },
        'detailed': {
            'instruction': 'Add specificity and context to each step. Be very explicit about what to do.',
            'target_time': None,  # Keep same time
            'target_count': lambda orig: orig
        },
        'different': {
            'instruction': 'Try a completely different approach. If original was planning-first, try action-first. If structured, try freeform.',
            'target_time': None,
            'target_count': lambda orig: orig
        },
        'lowest_effort': {
            'instruction': 'Minimize activation energy. Make this the absolute easiest version. Include shortcuts, templates, copy-paste options.',
            'target_time': 1,
            'target_count': lambda orig: max(2, orig - 1)
        },
        'high_momentum': {
            'instruction': 'Generate 5-7 micro-actions (2 min each) for rapid dopamine hits. Optimize for quick wins and psychological momentum.',
            'target_time': 2,
            'target_count': lambda orig: min(7, orig + 2)
        }
    }
    
    async def regenerate_breakdown(
        self,
        session_id: str,
        user_id: str,
        mode: str,
        user_feedback: str = None
    ) -> Dict:
        """Regenerate task breakdown with specific mode"""
        
        # Get original session
        original = await self.db.table('sessions')\
            .select('*, actions(*)')\
            .eq('id', session_id)\
            .single()
        
        if not original.data:
            raise ValueError("Original session not found")
        
        # Check regeneration limits
        regen_count = await self._get_regeneration_count(session_id)
        user = await self.db.table('users').select('premium_status').eq('id', user_id).single()
        
        is_premium = user.data['premium_status'] in ['premium', 'premium_plus']
        max_regens = 999 if is_premium else 2
        
        if regen_count >= max_regens:
            return {
                'error': 'regeneration_limit_reached',
                'message': 'Upgrade to Premium for unlimited regenerations',
                'remaining': 0
            }
        
        # Get mode config
        mode_config = self.REGENERATION_MODES.get(mode, self.REGENERATION_MODES['smaller'])
        
        # Build adjusted prompt
        original_task = original.data['task_input']
        original_actions = original.data['actions']
        
        adjusted_prompt = f"""
Task: {original_task}

Original breakdown had {len(original_actions)} steps averaging {self._avg_time(original_actions)} minutes each.

User feedback: "{user_feedback or 'Not quite right'}"

Regeneration mode: {mode}
{mode_config['instruction']}

Generate a NEW breakdown following the mode instructions above.
"""
        
        # Call AI service
        new_breakdown = await self.ai.generate_breakdown(
            task_input=original_task,
            user_id=user_id,
            custom_prompt_override=adjusted_prompt
        )
        
        # Create new session
        new_session = await self.db.table('sessions').insert({
            'user_id': user_id,
            'task_input': original_task,
            'blocker_type': new_breakdown['blocker_type'],
            'validation_message': new_breakdown['validation'],
            'ai_model': new_breakdown['model'],
            'total_actions': len(new_breakdown['actions']),
            'device_type': original.data['device_type']
        }).execute()
        
        new_session_id = new_session.data[0]['id']
        
        # Insert new actions
        new_actions = []
        for idx, action in enumerate(new_breakdown['actions']):
            new_action = await self.db.table('actions').insert({
                'session_id': new_session_id,
                'user_id': user_id,
                'description': action['description'],
                'estimated_minutes': action['estimated_minutes'],
                'order_index': idx + 1
            }).execute()
            new_actions.append(new_action.data[0])
        
        # Track regeneration
        await self.db.table('session_regenerations').insert({
            'original_session_id': session_id,
            'regenerated_session_id': new_session_id,
            'regeneration_mode': mode,
            'regeneration_count': regen_count + 1,
            'user_feedback': user_feedback
        }).execute()
        
        # Calculate comparison
        orig_avg = self._avg_time(original_actions)
        new_avg = self._avg_time(new_actions)
        
        return {
            'regenerated_session_id': new_session_id,
            'original_session_id': session_id,
            'regeneration_mode': mode,
            'regeneration_count': regen_count + 1,
            'remaining_regenerations': max_regens - (regen_count + 1),
            'blocker_type': new_breakdown['blocker_type'],
            'validation_message': new_breakdown['validation'],
            'actions': new_actions,
            'comparison': {
                'original_step_count': len(original_actions),
                'new_step_count': len(new_actions),
                'original_avg_time': orig_avg,
                'new_avg_time': new_avg,
                'change_percentage': int(((new_avg - orig_avg) / orig_avg) * 100),
                'change_description': self._describe_change(orig_avg, new_avg, mode)
            }
        }
    
    def _avg_time(self, actions: List[Dict]) -> float:
        if not actions:
            return 0
        return sum(a['estimated_minutes'] for a in actions) / len(actions)
    
    def _describe_change(self, orig_avg: float, new_avg: float, mode: str) -> str:
        diff = int(((new_avg - orig_avg) / orig_avg) * 100)
        
        if mode == 'smaller':
            return f"Steps are now {abs(diff)}% smaller ({orig_avg:.1f} min → {new_avg:.1f} min avg)"
        elif mode == 'faster':
            return f"Steps are now {abs(diff)}% faster ({orig_avg:.1f} min → {new_avg:.1f} min avg)"
        elif mode == 'lowest_effort':
            return f"Activation energy reduced by {abs(diff)}%"
        elif mode == 'high_momentum':
            return f"Optimized for quick wins (5 x {new_avg:.0f} min tasks)"
        else:
            return f"Average time changed from {orig_avg:.1f} to {new_avg:.1f} minutes"
    
    async def _get_regeneration_count(self, session_id: str) -> int:
        result = await self.db.table('session_regenerations')\
            .select('regeneration_count', count='exact')\
            .eq('original_session_id', session_id)\
            .execute()
        
        return result.count or 0
```

### 8.2.2 Behavioral Intelligence Layer Service

**Python Service (`services/behavioral_intelligence_service.py`):**

```python
from typing import Dict, List
from collections import Counter
import json

class BehavioralIntelligenceService:
    def __init__(self, supabase_client):
        self.db = supabase_client
    
    async def generate_operating_manual(self, user_id: str) -> Dict:
        """Generate comprehensive behavioral operating manual for user"""
        
        profile = await self.db.table('user_behavior_profiles')\
            .select('*')\
            .eq('user_id', user_id)\
            .single()
        
        if not profile.data or profile.data['profile_confidence'] < 0.3:
            return {
                'insufficient_data': True,
                'sessions_needed': 10,
                'message': 'Complete 10 more sessions to unlock your behavioral profile'
            }
        
        # Get all sessions for context
        sessions = await self.db.table('sessions')\
            .select('*, outcome_metrics(*), actions(*)')\
            .eq('user_id', user_id)\
            .execute()
        
        p = profile.data
        
        # Build comprehensive manual
        manual = {
            'user_id': user_id,
            'generated_at': datetime.now().isoformat(),
            'profile_confidence': p['profile_confidence'],
            'sessions_analyzed': p['total_sessions_analyzed'],
            
            # Blocker Analysis
            'how_you_get_stuck': {
                'primary_blocker': self._format_blocker(p['top_blockers'][0]) if p['top_blockers'] else None,
                'secondary_blocker': self._format_blocker(p['top_blockers'][1]) if len(p['top_blockers']) > 1 else None,
                'all_blockers': p['top_blockers'],
                'trigger_patterns': p['trigger_patterns']
            },
            
            # What Works
            'what_works_for_you': {
                'best_strategy': p['effective_strategies'][0] if p['effective_strategies'] else None,
                'best_time': p['best_time_of_day'],
                'best_environment': self._infer_environment(sessions.data),
                'all_effective_strategies': p['effective_strategies'],
                'optimal_step_count': p['optimal_action_count'],
                'preferred_tone': p['preferred_tone']
            },
            
            # What Doesn't Work
            'what_doesnt_work': {
                'avoid_strategies': p['ineffective_strategies'],
                'avoid_times': self._worst_times(sessions.data),
                'avoid_task_types': self._worst_task_types(p['task_type_success_rates'])
            },
            
            # Success Formula
            'your_success_formula': self._generate_success_formula(p, sessions.data),
            
            # Recommendations
            'recommendations': self._generate_recommendations(p, sessions.data),
            
            # Context-Dependent Patterns
            'context_patterns': {
                'morning': self._analyze_time_context(sessions.data, 'morning'),
                'afternoon': self._analyze_time_context(sessions.data, 'afternoon'),
                'evening': self._analyze_time_context(sessions.data, 'evening')
            },
            
            # Task Type Matrix
            'task_type_matrix': p['task_type_success_rates'],
            
            # Export Options
            'export': {
                'markdown': self._export_markdown(p, sessions.data),
                'json': json.dumps(p, indent=2),
                'pdf_url': f"/api/v1/profile/operating-manual/pdf?user_id={user_id}"
            }
        }
        
        return manual
    
    def _format_blocker(self, blocker: Dict) -> Dict:
        return {
            'type': blocker['type'],
            'frequency_percent': blocker['frequency'],
            'success_rate': blocker['success_rate'],
            'most_common_context': blocker.get('context', 'Unknown')
        }
    
    def _generate_success_formula(self, profile: Dict, sessions: List[Dict]) -> List[str]:
        """Generate step-by-step success formula"""
        formula = []
        
        # Best time
        if profile['best_time_of_day']:
            formula.append(f"1. Work on important tasks in the {profile['best_time_of_day']}")
        
        # Optimal steps
        formula.append(f"2. Use {int(profile['optimal_action_count'])} micro-steps (not more)")
        
        # Best strategy
        if profile['effective_strategies']:
            best = profile['effective_strategies'][0]
            formula.append(f"3. Apply {best['strategy']} strategy ({int(best['success_rate']*100)}% success rate for you)")
        
        # Tone preference
        if not profile['responds_to_validation']:
            formula.append("4. Skip validation, go straight to actions")
        
        # Additional preferences
        if profile['focus_mode_engagement'] == 'high':
            formula.append("5. Use Focus Mode for deep work")
        
        return formula
    
    def _generate_recommendations(self, profile: Dict, sessions: List[Dict]) -> List[Dict]:
        """Generate actionable recommendations"""
        recommendations = []
        
        # Time blocking
        if profile['best_time_of_day']:
            recommendations.append({
                'category': 'scheduling',
                'priority': 'high',
                'recommendation': f"Block {profile['best_time_of_day']} for deep creative work",
                'expected_impact': '+15-20% success rate'
            })
        
        # Avoid patterns
        if profile['ineffective_strategies']:
            worst = profile['ineffective_strategies'][0]
            recommendations.append({
                'category': 'approach',
                'priority': 'high',
                'recommendation': f"Avoid {worst['strategy']} (only {int(worst['success_rate']*100)}% success for you)",
                'expected_impact': 'Reduce frustration'
            })
        
        return recommendations
    
    def _export_markdown(self, profile: Dict, sessions: List[Dict]) -> str:
        """Export as markdown document"""
        md = f"""# Your Behavioral Operating Manual

Generated from {profile['total_sessions_analyzed']} analyzed sessions
Last updated: {datetime.now().strftime('%B %d, %Y')}

## How You Get Stuck

**Primary Blocker:** {profile['top_blockers'][0]['type'].title()} ({profile['top_blockers'][0]['frequency']}%)
- Success Rate: {int(profile['top_blockers'][0]['success_rate']*100)}%

**Triggers:**
{"".join(f"- {t['context']}\n" for t in profile['trigger_patterns'])}

## What Works For You

**Best Strategy:** {profile['effective_strategies'][0]['strategy'].replace('_', ' ').title()}
- Success Rate: {int(profile['effective_strategies'][0]['success_rate']*100)}%

**Optimal Setup:**
- Best Time: {profile['best_time_of_day'].title()}
- Step Count: {int(profile['optimal_action_count'])} micro-steps
- Tone: {profile['preferred_tone'].title()}

## Your Success Formula

{"".join(f"{i}. {step}\n" for i, step in enumerate(self._generate_success_formula(profile, sessions), 1))}

---
Generated by Zelos - zelos.app
"""
        return md
```

### 8.2.3 Metrics Tracking Service

**Python Service (`services/metrics_service.py`):**

```python
from typing import Dict, List
from datetime import datetime, timedelta
import numpy as np

class MetricsService:
    def __init__(self, supabase_client):
        self.db = supabase_client
    
    async def get_time_to_action_metrics(self, user_id: str, days: int = 7) -> Dict:
        """Calculate time-to-action metrics"""
        
        start_date = datetime.now() - timedelta(days=days)
        
        outcomes = await self.db.table('outcome_metrics')\
            .select('time_to_first_action_seconds, session_id')\
            .eq('user_id', user_id)\
            .gte('created_at', start_date.isoformat())\
            .execute()
        
        times = [o['time_to_first_action_seconds'] for o in outcomes.data if o['time_to_first_action_seconds']]
        
        if not times:
            return {'insufficient_data': True}
        
        return {
            'median_seconds': int(np.median(times)),
            'mean_seconds': int(np.mean(times)),
            'best_seconds': min(times),
            'worst_seconds': max(times),
            'percentiles': {
                'p25': int(np.percentile(times, 25)),
                'p50': int(np.percentile(times, 50)),
                'p75': int(np.percentile(times, 75)),
                'p90': int(np.percentile(times, 90))
            },
            'trend': await self._calculate_trend(user_id, 'time_to_action'),
            'count': len(times)
        }
    
    async def calculate_health_score(self, user_id: str) -> Dict:
        """Calculate composite product health score"""
        
        # Get all component metrics
        unstuck_rate = await self._get_unstuck_rate(user_id)
        intervention_success = await self._get_intervention_success(user_id)
        repeat_usage = await self._get_repeat_usage_7d(user_id)
        time_to_action = await self._get_time_to_action_score(user_id)
        insight_accuracy = await self._get_insight_accuracy(user_id)
        
        # Weights
        weights = {
            'unstuck_rate': 0.30,
            'intervention_success': 0.25,
            'repeat_usage': 0.20,
            'time_to_action': 0.15,
            'insight_accuracy': 0.10
        }
        
        # Calculate weighted score
        health_score = (
            unstuck_rate * weights['unstuck_rate'] +
            intervention_success * weights['intervention_success'] +
            repeat_usage * weights['repeat_usage'] +
            time_to_action * weights['time_to_action'] +
            insight_accuracy * weights['insight_accuracy']
        ) * 100
        
        return {
            'health_score': int(health_score),
            'target': 80,
            'status': self._get_status(health_score),
            'components': {
                'unstuck_rate': {
                    'value': unstuck_rate,
                    'weight': weights['unstuck_rate'],
                    'contribution': round(unstuck_rate * weights['unstuck_rate'] * 100, 1),
                    'status': self._component_status(unstuck_rate, 0.75)
                },
                'intervention_success': {
                    'value': intervention_success,
                    'weight': weights['intervention_success'],
                    'contribution': round(intervention_success * weights['intervention_success'] * 100, 1),
                    'status': self._component_status(intervention_success, 0.75)
                },
                'repeat_usage_7d': {
                    'value': repeat_usage,
                    'weight': weights['repeat_usage'],
                    'contribution': round(repeat_usage * weights['repeat_usage'] * 100, 1),
                    'status': self._component_status(repeat_usage, 0.60)
                },
                'time_to_action_score': {
                    'value': time_to_action,
                    'weight': weights['time_to_action'],
                    'contribution': round(time_to_action * weights['time_to_action'] * 100, 1),
                    'status': self._component_status(time_to_action, 0.80)
                },
                'insight_accuracy': {
                    'value': insight_accuracy,
                    'weight': weights['insight_accuracy'],
                    'contribution': round(insight_accuracy * weights['insight_accuracy'] * 100, 1),
                    'status': self._component_status(insight_accuracy, 0.80)
                }
            }
        }
    
    def _get_status(self, score: float) -> str:
        if score >= 80:
            return 'launch_ready'
        elif score >= 70:
            return 'near_launch_ready'
        elif score >= 60:
            return 'needs_improvement'
        else:
            return 'critical'
    
    def _component_status(self, value: float, target: float) -> str:
        if value >= target * 1.1:
            return 'excellent'
        elif value >= target:
            return 'good'
        elif value >= target * 0.9:
            return 'concerning'
        else:
            return 'critical'
```

### 8.3 Experiment Framework

**Python Service (`services/experiment_service.py`):**

```python
import random
from typing import Dict, Optional
from scipy import stats

class ExperimentService:
    def __init__(self, supabase_client):
        self.db = supabase_client
    
    async def assign_user_to_experiment(
        self,
        user_id: str,
        experiment_id: str
    ) -> str:
        """Assign user to experiment variant"""
        
        # Check if already assigned
        existing = await self.db.table('experiment_assignments')\
            .select('variant_id')\
            .eq('experiment_id', experiment_id)\
            .eq('user_id', user_id)\
            .execute()
        
        if existing.data:
            return existing.data[0]['variant_id']
        
        # Get experiment config
        experiment = await self.db.table('experiments')\
            .select('*')\
            .eq('id', experiment_id)\
            .eq('status', 'running')\
            .single()
        
        if not experiment.data:
            return 'control'  # Default to control if experiment not active
        
        # Randomly assign based on traffic percentages
        variants = experiment.data['variants']
        rand = random.random() * 100
        cumulative = 0
        
        selected_variant = 'control'
        for variant in variants:
            cumulative += variant['trafficPercent']
            if rand <= cumulative:
                selected_variant = variant['id']
                break
        
        # Record assignment
        await self.db.table('experiment_assignments').insert({
            'experiment_id': experiment_id,
            'user_id': user_id,
            'variant_id': selected_variant
        }).execute()
        
        return selected_variant
    
    async def track_conversion(
        self,
        user_id: str,
        experiment_id: str,
        metric_value: Optional[float] = None
    ):
        """Track conversion event for experiment"""
        
        await self.db.table('experiment_assignments')\
            .update({
                'converted': True,
                'metric_value': metric_value
            })\
            .eq('experiment_id', experiment_id)\
            .eq('user_id', user_id)\
            .execute()
    
    async def calculate_experiment_results(self, experiment_id: str) -> Dict:
        """Calculate statistical results for experiment"""
        
        assignments = await self.db.table('experiment_assignments')\
            .select('*')\
            .eq('experiment_id', experiment_id)\
            .execute()
        
        # Group by variant
        variant_data = {}
        for assignment in assignments.data:
            variant = assignment['variant_id']
            if variant not in variant_data:
                variant_data[variant] = {
                    'conversions': 0,
                    'total': 0,
                    'metric_values': []
                }
            
            variant_data[variant]['total'] += 1
            if assignment['converted']:
                variant_data[variant]['conversions'] += 1
            
            if assignment['metric_value']:
                variant_data[variant]['metric_values'].append(
                    assignment['metric_value']
                )
        
        # Calculate conversion rates
        results = {}
        for variant, data in variant_data.items():
            conversion_rate = data['conversions'] / data['total'] if data['total'] > 0 else 0
            results[variant] = {
                'conversion_rate': conversion_rate,
                'sample_size': data['total'],
                'conversions': data['conversions']
            }
        
        # Calculate statistical significance (control vs variants)
        if 'control' in results and len(results) > 1:
            control_conversions = results['control']['conversions']
            control_total = results['control']['sample_size']
            
            for variant, data in results.items():
                if variant == 'control':
                    continue
                
                # Chi-square test for conversion rate difference
                contingency_table = [
                    [control_conversions, control_total - control_conversions],
                    [data['conversions'], data['sample_size'] - data['conversions']]
                ]
                
                chi2, p_value, _, _ = stats.chi2_contingency(contingency_table)
                results[variant]['p_value'] = p_value
                results[variant]['significant'] = p_value < 0.05
        
        # Determine winner
        best_variant = max(
            results.items(),
            key=lambda x: x[1]['conversion_rate']
        )[0]
        
        return {
            'results': results,
            'winner': best_variant if results[best_variant].get('significant') else None
        }
```

### 8.4 Retention Engine (Check-ins)

**Background Job (`jobs/retention_checkins.py`):**

```python
from datetime import datetime, timedelta
import asyncio

class RetentionCheckinService:
    def __init__(self, supabase_client, notification_service):
        self.db = supabase_client
        self.notifications = notification_service
    
    async def send_daily_checkins(self):
        """Send daily morning check-ins to all active users"""
        
        users = await self.db.table('users')\
            .select('id, timezone, last_action_date')\
            .execute()
        
        for user in users.data:
            # Check if user hasn't acted today
            if user['last_action_date'] != datetime.now().date():
                await self._send_daily_checkin(user['id'])
    
    async def _send_daily_checkin(self, user_id: str):
        """Send personalized daily check-in"""
        
        # Get user's behavior profile
        profile = await self.db.table('user_behavior_profiles')\
            .select('*')\
            .eq('user_id', user_id)\
            .single()
        
        # Get user's streak
        user = await self.db.table('users')\
            .select('current_streak')\
            .eq('id', user_id)\
            .single()
        
        # Personalize message
        if user.data['current_streak'] > 0:
            message = f"Don't break your {user.data['current_streak']}-day streak! " \
                     f"What are you avoiding today? 🤔"
        else:
            message = "What are you avoiding today? Let's break it down together. 🤔"
        
        # Create check-in record
        checkin = await self.db.table('retention_checkins').insert({
            'user_id': user_id,
            'checkin_type': 'daily',
            'checkin_date': datetime.now().date(),
            'message_content': {'message': message}
        }).execute()
        
        # Send notification
        await self.notifications.send_push(
            user_id=user_id,
            title="Good morning! ☀️",
            body=message
        )
    
    async def generate_weekly_insights(self, user_id: str) -> Dict:
        """Generate weekly insights for user"""
        
        week_start = datetime.now() - timedelta(days=7)
        
        # Get unstuck events this week
        unstuck_events = await self.db.table('unstuck_events')\
            .select('*')\
            .eq('user_id', user_id)\
            .gte('event_timestamp', week_start.isoformat())\
            .execute()
        
        # Get actions completed
        actions = await self.db.table('actions')\
            .select('*')\
            .eq('user_id', user_id)\
            .eq('status', 'completed')\
            .gte('completed_at', week_start.isoformat())\
            .execute()
        
        # Get user's current streak
        user = await self.db.table('users')\
            .select('current_streak')\
            .eq('id', user_id)\
            .single()
        
        # Get achievements this week
        achievements = await self.db.table('achievements')\
            .select('*')\
            .eq('user_id', user_id)\
            .gte('unlocked_at', week_start.isoformat())\
            .execute()
        
        # Analyze patterns
        insights = []
        
        # Blocker analysis
        blocker_counts = Counter(
            e['blocker_type'] for e in unstuck_events.data if e['blocker_type']
        )
        if blocker_counts:
            top_blocker = blocker_counts.most_common(1)[0][0]
            insights.append({
                'type': 'performance',
                'message': f"You struggled with '{top_blocker}' blockers this week",
                'suggestion': f"Try Learn Mode next time you encounter {top_blocker}"
            })
        
        # Best day analysis
        day_counts = Counter(
            datetime.fromisoformat(a['completed_at']).strftime('%A')
            for a in actions.data
        )
        if day_counts:
            best_day = day_counts.most_common(1)[0][0]
            insights.append({
                'type': 'timing',
                'message': f"Your best day was {best_day}",
                'suggestion': f"Schedule important tasks for {best_day}"
            })
        
        return {
            'summary': {
                'unstuck_events': len(unstuck_events.data),
                'actions_completed': len(actions.data),
                'streak_maintained': user.data['current_streak'] >= 7,
                'streak_length': user.data['current_streak'],
                'achievements_unlocked': len(achievements.data)
            },
            'insights': insights
        }
```

---

## 9. Authentication & Security

### 8.1 Authentication Flow

**Sign Up / Login:**
1. User enters email
2. Supabase sends magic link
3. User clicks link
4. Supabase creates session, returns JWT
5. Frontend stores JWT in httpOnly cookie
6. All API requests include JWT in Authorization header

**Protected Routes:**
```typescript
// middleware.ts (Next.js)
export async function middleware(request: NextRequest) {
  const supabase = createMiddlewareClient({ req: request })
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session && request.nextUrl.pathname.startsWith('/app')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}
```

### 8.2 API Security

**Rate Limiting:**
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/api/v1/sessions")
@limiter.limit("10/minute")  # 10 requests per minute
async def create_session(request: Request):
    pass
```

**Input Validation:**
```python
from pydantic import BaseModel, validator

class SessionCreate(BaseModel):
    task_input: str
    device_type: str | None = "web"
    
    @validator('task_input')
    def validate_task_input(cls, v):
        if len(v) < 5:
            raise ValueError("Task input too short")
        if len(v) > 500:
            raise ValueError("Task input too long")
        return v
```

**SQL Injection Prevention:**
- Supabase uses parameterized queries
- Row-Level Security prevents unauthorized access
- No raw SQL in application code

**XSS Prevention:**
- React automatically escapes output
- Content Security Policy headers
- Sanitize user input before storing

### 8.2.4 Voice Service Implementation

**Python Service (`services/voice_service.py`):**

```python
import openai
from typing import Dict, Optional
import os
from datetime import datetime, timedelta

class VoiceService:
    def __init__(self, supabase_client):
        self.db = supabase_client
        openai.api_key = os.getenv('OPENAI_API_KEY')
    
    async def transcribe_audio(
        self,
        audio_file,
        user_id: str,
        language: Optional[str] = None
    ) -> Dict:
        """Transcribe audio to text using Whisper API"""
        
        # Check premium status
        user = await self.db.table('users')\
            .select('premium_status')\
            .eq('id', user_id)\
            .single()
        
        if user.data['premium_status'] not in ['premium', 'premium_plus']:
            return {
                'error': 'premium_required',
                'message': 'Voice input requires Premium subscription'
            }
        
        # Get audio duration
        duration = self._get_audio_duration(audio_file)
        
        if duration > 120:  # 2 minutes max
            return {
                'error': 'audio_too_long',
                'message': 'Audio must be under 2 minutes'
            }
        
        try:
            # Call Whisper API
            transcript = await openai.Audio.atranscribe(
                model="whisper-1",
                file=audio_file,
                language=language,
                response_format="verbose_json"
            )
            
            # Calculate cost
            cost_cents = duration * 0.01  # $0.006/min = 0.01 cents/sec
            
            # Track usage
            await self._track_voice_usage(
                user_id=user_id,
                type='transcription',
                duration_seconds=duration,
                cost_cents=cost_cents
            )
            
            return {
                'transcription': transcript.text,
                'confidence': transcript.confidence if hasattr(transcript, 'confidence') else 0.95,
                'language_detected': transcript.language,
                'duration_seconds': duration,
                'cost_cents': round(cost_cents, 3),
                'model': 'whisper-1',
                'editable': True
            }
            
        except Exception as e:
            # Fallback to Web Speech API (handled client-side)
            return {
                'error': 'transcription_failed',
                'message': str(e),
                'fallback': 'web_speech_api'
            }
    
    async def synthesize_speech(
        self,
        text: str,
        user_id: str,
        voice: str = 'alloy',
        speed: float = 1.0,
        language: Optional[str] = None
    ) -> Dict:
        """Convert text to speech using OpenAI TTS"""
        
        # Check premium status
        user = await self.db.table('users')\
            .select('premium_status')\
            .eq('id', user_id)\
            .single()
        
        if user.data['premium_status'] not in ['premium', 'premium_plus']:
            return {
                'error': 'premium_required',
                'message': 'Voice output requires Premium subscription'
            }
        
        try:
            # Call TTS API
            response = await openai.Audio.speech.create(
                model="tts-1",
                voice=voice,  # alloy, echo, fable, onyx, nova, shimmer
                input=text,
                speed=speed
            )
            
            # Save to storage
            audio_id = self._generate_audio_id()
            audio_url = await self._save_to_storage(response.content, audio_id)
            
            # Calculate cost
            char_count = len(text)
            cost_cents = (char_count / 1000000) * 1500  # $15 per 1M chars
            
            # Track usage
            await self._track_voice_usage(
                user_id=user_id,
                type='synthesis',
                characters=char_count,
                cost_cents=cost_cents
            )
            
            return {
                'audio_url': audio_url,
                'duration_seconds': self._estimate_duration(text, speed),
                'cost_cents': round(cost_cents, 3),
                'voice': voice,
                'speed': speed,
                'expires_at': (datetime.now() + timedelta(hours=1)).isoformat(),
                'format': 'mp3',
                'size_kb': len(response.content) // 1024
            }
            
        except Exception as e:
            return {
                'error': 'synthesis_failed',
                'message': str(e)
            }
    
    async def get_voice_usage(self, user_id: str) -> Dict:
        """Get voice usage statistics"""
        
        current_month_start = datetime.now().replace(day=1, hour=0, minute=0, second=0)
        
        usage = await self.db.table('voice_usage')\
            .select('*')\
            .eq('user_id', user_id)\
            .gte('created_at', current_month_start.isoformat())\
            .execute()
        
        transcription_data = [u for u in usage.data if u['type'] == 'transcription']
        synthesis_data = [u for u in usage.data if u['type'] == 'synthesis']
        
        return {
            'user_id': user_id,
            'current_period': {
                'period_start': current_month_start.date().isoformat(),
                'period_end': (current_month_start + timedelta(days=30)).date().isoformat(),
                'transcription': {
                    'minutes_used': sum(u['duration_seconds'] for u in transcription_data) / 60,
                    'requests_count': len(transcription_data),
                    'total_cost_cents': sum(u['cost_cents'] for u in transcription_data),
                    'unlimited': True
                },
                'synthesis': {
                    'characters_generated': sum(u.get('characters', 0) for u in synthesis_data),
                    'requests_count': len(synthesis_data),
                    'total_cost_cents': sum(u['cost_cents'] for u in synthesis_data),
                    'unlimited': True
                }
            }
        }
    
    async def _track_voice_usage(
        self,
        user_id: str,
        type: str,
        duration_seconds: float = None,
        characters: int = None,
        cost_cents: float = 0
    ):
        """Track voice API usage"""
        
        await self.db.table('voice_usage').insert({
            'user_id': user_id,
            'type': type,
            'duration_seconds': duration_seconds,
            'characters': characters,
            'cost_cents': cost_cents,
            'created_at': datetime.now().isoformat()
        }).execute()
    
    def _get_audio_duration(self, audio_file) -> float:
        """Get audio file duration in seconds"""
        # Implementation depends on audio library (e.g., pydub, librosa)
        import wave
        with wave.open(audio_file, 'r') as audio:
            frames = audio.getnframes()
            rate = audio.getframerate()
            duration = frames / float(rate)
        return duration
    
    def _estimate_duration(self, text: str, speed: float) -> float:
        """Estimate audio duration from text length"""
        # Average speaking rate: 150 words/min
        words = len(text.split())
        duration_seconds = (words / 150) * 60 / speed
        return duration_seconds
    
    def _generate_audio_id(self) -> str:
        """Generate unique audio ID"""
        import uuid
        return str(uuid.uuid4())
    
    async def _save_to_storage(self, audio_content: bytes, audio_id: str) -> str:
        """Save audio to cloud storage and return URL"""
        # Implementation depends on storage provider (S3, Supabase Storage, etc.)
        # For now, return placeholder
        return f"https://storage.zelos.app/tts/{audio_id}.mp3"
```

**Frontend Component (`components/chat/VoiceInput.tsx`):**

```typescript
import { useState, useRef } from 'react';
import { Mic, Square, Loader } from 'lucide-react';
import { useUser } from '@/lib/hooks/useUser';

export function VoiceInput({ onTranscript }: { onTranscript: (text: string) => void }) {
  const { user, isPremium } = useUser();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStartRecording = async () => {
    if (!isPremium) {
      // Show upgrade modal
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        setIsProcessing(false);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Microphone access denied:', error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('language', 'en');
    formData.append('user_id', user.id);

    try {
      const response = await fetch('/api/v1/voice/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.transcription) {
        setTranscript(data.transcription);
        onTranscript(data.transcription);
      }
    } catch (error) {
      console.error('Transcription failed:', error);
      // Fallback to Web Speech API
      useFallbackSpeechRecognition();
    }
  };

  const useFallbackSpeechRecognition = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
      onTranscript(transcript);
    };

    recognition.start();
  };

  return (
    <div className="flex items-center gap-2">
      {isRecording ? (
        <button
          onClick={handleStopRecording}
          className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        >
          <Square className="w-5 h-5" />
        </button>
      ) : isProcessing ? (
        <button
          disabled
          className="p-3 bg-gray-300 text-gray-600 rounded-full cursor-not-allowed"
        >
          <Loader className="w-5 h-5 animate-spin" />
        </button>
      ) : (
        <button
          onClick={handleStartRecording}
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all"
          title={isPremium ? 'Tap to speak' : 'Premium feature'}
        >
          <Mic className="w-5 h-5" />
        </button>
      )}

      {transcript && (
        <p className="text-sm text-gray-600 italic">
          "{transcript}"
        </p>
      )}
    </div>
  );
}
```

### 8.3 Data Privacy

**GDPR Compliance:**
- User data export endpoint
- Account deletion endpoint (cascading deletes)
- Privacy policy and terms
- Cookie consent (if needed in EU)

**Data Encryption:**
- All data encrypted at rest (Supabase default)
- All traffic over HTTPS
- JWT tokens signed and verified

---

## 10. Deployment Strategy

### 9.1 Environments

**Development:**
- Local machine
- Supabase local instance (optional)
- `.env.local` for secrets

**Staging:**
- Vercel preview environment (auto-created for PRs)
- Staging backend on Railway
- Staging Supabase project
- `.env.staging`

**Production:**
- Vercel production
- Production backend on Railway
- Production Supabase project
- `.env.production`

### 9.2 CI/CD Pipeline

**GitHub Actions:**
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          npm install
          npm test
  
  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
  
  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend
```

### 9.3 Environment Variables

**Frontend (.env.local):**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
NEXT_PUBLIC_API_URL=https://api.zelos.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Backend (.env):**
```
DATABASE_URL=postgresql://user:pass@db.supabase.co:5432/postgres
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
REDIS_URL=redis://localhost:6379
SUPABASE_SERVICE_KEY=eyJxxx...
FIREBASE_CREDENTIALS={"type":"service_account",...}
SENTRY_DSN=https://xxx@sentry.io/xxx
```

### 9.4 Database Migrations

**Supabase Migrations:**
```bash
# Create migration
supabase migration new add_referrals_table

# Apply migrations
supabase db push

# Reset (dev only)
supabase db reset
```

---

## 11. Development Phases

### Phase 1: MVP (Weeks 1-3)

**Week 1: Foundation**
- [ ] Set up Next.js project
- [ ] Configure Tailwind CSS
- [ ] Set up Supabase project
- [ ] Implement authentication (magic link)
- [ ] Create database schema (core tables)
- [ ] Set up FastAPI backend
- [ ] Implement OpenAI integration
- [ ] Basic prompt engineering

**Week 2: Core Features**
- [ ] Build chat interface
- [ ] Implement task breakdown flow
- [ ] Create action list component
- [ ] Build Focus Mode UI
- [ ] Implement action completion
- [ ] Add XP and level system
- [ ] Create streak counter
- [ ] Basic animations (checkboxes, confetti)

**Week 3: Gamification & Polish**
- [ ] Implement achievement system (first 10 achievements)
- [ ] Build user stats dashboard
- [ ] Create onboarding flow
- [ ] Add notification preferences UI
- [ ] Implement FCM push notifications
- [ ] Landing page
- [ ] Pricing page
- [ ] Deploy to production

**MVP Features Included:**
- ✅ Task breakdown with AI (Task Mode + Learn Mode)
- ✅ Focus Mode
- ✅ Streaks (daily)
- ✅ XP and levels
- ✅ Basic achievements (10)
- ✅ Web push notifications (browser-based)
- ✅ Free tier (unlimited breakdowns, 3 Focus Mode/day)
- ✅ Authentication (magic link, Google OAuth)
- ✅ Responsive web app (works on all devices)

**MVP Features Excluded (Phase 2):**
- ❌ Weekly reports
- ❌ Advanced behavioral insights
- ❌ Premium tier
- ❌ Voice input/output
- ❌ Custom themes
- ❌ Referral system
- ❌ Social competition (leaderboards, friends)

### Phase 2: Growth Features (Weeks 4-6)

**Week 4: Monetization**
- [ ] Implement Stripe integration
- [ ] Build premium upgrade flow
- [ ] Add free trial (7 days)
- [ ] Create premium-only features gates
- [ ] Build subscription management
- [ ] Implement webhook handlers

**Week 5: Engagement**
- [ ] Build weekly reports system
- [ ] Implement Celery background jobs
- [ ] Create advanced achievements (20 total)
- [ ] Add daily/weekly challenges
- [ ] Build social proof (activity feed, user count)
- [ ] Implement referral system

**Week 6: Polish & Analytics**
- [ ] Add PostHog analytics
- [ ] Implement error tracking (Sentry)
- [ ] Build admin dashboard (internal)
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] A/B testing setup
- [ ] User feedback collection
- [ ] **Voice input implementation (Premium)**
  - [ ] Integrate OpenAI Whisper API
  - [ ] Build VoiceInput component
  - [ ] Add fallback to Web Speech API
  - [ ] Voice usage tracking
  - [ ] Premium gate for voice features
- [ ] **Voice output implementation (Premium - Optional)**
  - [ ] Integrate OpenAI TTS API
  - [ ] Build VoicePlayer component
  - [ ] Voice playback controls

**Phase 2 Features Added:**
- ✅ Premium tier with Stripe
- ✅ Weekly reports
- ✅ Advanced achievements
- ✅ Social proof and referral system
- ✅ **Voice input/output (Premium)**
- ✅ Analytics and monitoring

### Phase 3: Native Mobile Apps (Weeks 7-12)

**Prerequisites Before Starting Phase 3:**
- ✅ Web app has 500+ active users
- ✅ Core features validated and stable
- ✅ Free-to-premium conversion proven (>8%)
- ✅ Backend API mature and documented
- ✅ Apple Developer Account ($99/year)
- ✅ Google Play Developer Account ($25 one-time)

**Week 7: React Native Setup & Shared Logic**
- [ ] Initialize React Native project with TypeScript
- [ ] Set up NativeWind (Tailwind for RN)
- [ ] Configure React Navigation
- [ ] Extract shared logic from web to shared package
  - API clients
  - Business logic
  - Types
  - Constants
  - Utils
- [ ] Set up monorepo structure (optional but recommended):
  ```
  /packages
    /shared        # Shared code (60-70% reuse)
    /web          # Next.js app
    /mobile       # React Native app
  ```
- [ ] Configure environment variables for mobile
- [ ] Set up development builds (Expo Dev Client or bare workflow)

**Week 8: iOS Development**
- [ ] Rebuild core UI components for native:
  - Button, Card, Input, Checkbox
  - ChatMessage, ActionList
  - Streak display, XP progress
- [ ] Implement navigation:
  - Stack navigation for main flow
  - Tab navigation for home/stats/profile
  - Modal for Focus Mode
- [ ] Connect to backend API (same endpoints as web)
- [ ] Implement authentication (same flow as web)
- [ ] Build main screens:
  - Home/Chat screen
  - Focus Mode screen
  - Stats dashboard
  - Profile screen
- [ ] Test on iOS Simulator
- [ ] Test on physical iPhone (required for submit)
- [ ] Configure push notifications (APNs)
- [ ] Set up App Store Connect
- [ ] Create app listing (screenshots, description)
- [ ] Submit for TestFlight beta
- [ ] Get 5-10 beta testers feedback
- [ ] Fix critical bugs
- [ ] Submit to App Store review (7-14 days)

**Week 9-10: Android Development**
- [ ] Adapt UI for Android (Material Design considerations)
- [ ] Test on Android Emulator
- [ ] Test on physical Android devices (Pixel, Samsung)
- [ ] Configure push notifications (FCM for Android)
- [ ] Handle Android-specific:
  - Back button behavior
  - Status bar styling
  - Permissions (notifications, etc.)
- [ ] Set up Google Play Console
- [ ] Create app listing
- [ ] Internal testing track (closed beta)
- [ ] Get beta testers feedback
- [ ] Fix Android-specific bugs
- [ ] Submit to Google Play review (1-3 days typically)

**Week 11: Cross-Platform Polish**
- [ ] Fix platform-specific bugs
- [ ] Ensure feature parity between iOS/Android
- [ ] Performance optimization:
  - Reduce app size
  - Optimize animations
  - Lazy load screens
- [ ] Crash reporting (Sentry for React Native)
- [ ] Analytics implementation (PostHog for mobile)
- [ ] Deep linking setup (for notifications)
- [ ] App icon and splash screen refinement

**Week 12: Launch & Monitoring**
- [ ] Both apps approved and live
- [ ] Monitor crash rates
- [ ] Track install sources
- [ ] Collect user feedback
- [ ] Hot-fix critical bugs (OTA updates if using Expo)
- [ ] Plan for App Store Optimization (ASO)

**Native App Features Included:**
- ✅ All core web features (chat, Focus Mode, gamification)
- ✅ Native push notifications (more reliable than web push)
- ✅ True offline capability (view history, completed tasks, streak - can't generate new AI breakdowns offline)
- ✅ Haptic feedback
- ✅ Native gestures (swipe, pull-to-refresh)
- ✅ App Store discovery
- ✅ Better performance than web

**Native App Considerations:**
- **Store Approval:**
  - iOS: 7-14 days (strict guidelines)
  - Android: 1-3 days (less strict)
- **Updates:**
  - iOS: Same review time for updates
  - Android: Faster updates
  - Consider OTA updates for minor changes (Expo Updates or CodePush)
- **App Store Optimization (ASO):**
  - Keywords in title/description
  - Screenshots showing key features
  - Video preview (iOS)
  - Ratings and reviews critical
- **Size Considerations:**
  - Keep app <50MB for cellular downloads
  - Optimize images and animations

**Code Reuse Summary:**
```
Shared across Web + Mobile:
- Business logic: 100%
- API clients: 100%
- Types: 100%
- Constants: 100%
- State management logic: 100%
- Utils: 90%

Platform-Specific:
- UI components: 30-40% reuse (similar structure, different implementation)
- Navigation: 0% reuse (different paradigms)
- Animations: 50% reuse (similar concepts, different APIs)
```

---

### Alternative: Skip Native Apps Initially

**Why Web-First, Then Native?**

**Phase 1-2: Responsive Web App (Recommended)**
- ✅ **Fastest time to market** - No app store approval delays
- ✅ **Single codebase** - Easier to maintain and iterate
- ✅ **Instant updates** - Push fixes immediately
- ✅ **Works everywhere** - Desktop, mobile browsers, tablets
- ✅ **Lower initial cost** - No app store fees, simpler development
- ✅ **Market validation** - Prove product-market fit before investing in native
- ✅ **SEO benefits** - Can rank on Google (apps can't)
- ✅ **Shareable** - Send links to friends (apps require download)

**Phase 3: Native iOS/Android Apps (After 500+ Users)**
- ✅ **App Store discovery** - Huge for organic growth
- ✅ **Better user experience** - Native feel, gestures, animations
- ✅ **Reliable notifications** - Critical for daily habit formation
- ✅ **True offline mode** - View history without internet
- ✅ **Premium positioning** - Apps feel more professional
- ✅ **User preference** - Daily habit apps work best as native apps

**For Zelos Specifically:**
- Start with web to validate quickly
- Web works for early adopters and testing
- Native apps become critical at scale (daily habits need reliable notifications)
- Same backend supports both (60-70% code reuse)

---

## 12. Testing Strategy

### 11.1 Frontend Testing

**Unit Tests (Jest + React Testing Library):**
```typescript
// Button.test.tsx
import { render, fireEvent } from '@testing-library/react'
import Button from './Button'

test('button calls onClick when clicked', () => {
  const handleClick = jest.fn()
  const { getByText } = render(
    <Button onClick={handleClick}>Click me</Button>
  )
  fireEvent.click(getByText('Click me'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

**Integration Tests (Playwright):**
```typescript
// task-breakdown.spec.ts
import { test, expect } from '@playwright/test'

test('user can create task breakdown', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.fill('textarea', 'I need to write my resume')
  await page.click('button:has-text("Help me start")')
  await expect(page.locator('.action-item')).toHaveCount(3)
})
```

### 11.2 Backend Testing

**API Tests (pytest):**
```python
def test_create_session(client, auth_headers):
    response = client.post(
        "/api/v1/sessions",
        json={"task_input": "Write resume"},
        headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert "session_id" in data
    assert len(data["actions"]) >= 3
```

### 11.3 Load Testing

**k6 Load Tests:**
```javascript
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // ramp up
    { duration: '5m', target: 100 }, // stay at 100
    { duration: '2m', target: 0 },   // ramp down
  ],
};

export default function () {
  const res = http.get('https://api.zelos.app/health');
  check(res, { 'status is 200': (r) => r.status === 200 });
}
```

---

## 13. Monitoring & Analytics

### 12.1 Application Monitoring

**Sentry (Error Tracking):**
- Automatic error capture
- User context attached
- Stack traces and breadcrumbs
- Performance monitoring

**Vercel Analytics:**
- Real User Monitoring (RUM)
- Core Web Vitals
- Page load times

### 12.2 Product Analytics

**PostHog Events:**
```typescript
// Track key events
posthog.capture('task_breakdown_created', {
  blocker_type: 'ambiguity',
  actions_count: 3,
  user_streak: 7
})

posthog.capture('action_completed', {
  action_order: 1,
  duration_seconds: 120,
  timer_used: true
})

posthog.capture('achievement_unlocked', {
  achievement_type: 'first_action',
  user_level: 1
})
```

### 12.3 Business Metrics Dashboard

**Key Metrics to Track:**
- DAU, WAU, MAU
- New signups per day
- Free to premium conversion rate
- MRR growth
- Churn rate
- Average actions per user
- Streak retention (% users maintaining 7+ day streak)

---

## 14. Cost Estimates

### 13.1 Monthly Costs (Web Only - Startup Phase, 0-1000 users)

| Service | Plan | Cost |
|---------|------|------|
| Vercel (Frontend) | Hobby | $0 |
| Supabase (Database) | Free | $0 |
| Railway (Backend) | Hobby | $5 |
| OpenAI API | Pay-as-you-go | $20-50 |
| Stripe | 2.9% + 30¢ | ~$30 (if $1000 MRR) |
| PostHog (Analytics) | Free | $0 |
| Firebase (FCM) | Free | $0 |
| Domain (zelos.app) | Namecheap | $12/year (~$1/mo) |
| **Total** | | **$56-86/month** |

### 13.2 Monthly Costs (Web Only - Growth Phase, 1000-10000 users)

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Pro | $20 |
| Supabase | Pro | $25 |
| Railway | Pro | $50 |
| OpenAI API (GPT-4o-mini) | Pay-as-you-go | $200-500 |
| Voice API (Whisper + TTS) | Pay-as-you-go | ~$50-100 (10% premium users) |
| Stripe | 2.9% + 30¢ | ~$300 (if $10k MRR) |
| PostHog | Growth | $50 |
| Sentry | Team | $26 |
| **Total** | | **$721-1071/month** |

**Voice API Cost Assumptions:**
- 10% of premium users use voice features regularly
- Average 10 voice inputs per week per user (~2 min/week)
- Average 5 voice outputs per week per user (~1 min of audio)
- Whisper: $0.006/min → ~$0.012/user/week
- TTS: $15/1M chars → ~$0.005/user/week
- Total: ~$0.017/user/week × 4 weeks × 100 premium users = ~$6.80
- At scale (1000 premium users): ~$68/month

### 13.3 One-Time Costs (Native Apps)

| Item | Cost | When |
|------|------|------|
| Apple Developer Account | $99/year | Phase 3 start |
| Google Play Developer Account | $25 one-time | Phase 3 start |
| macOS Device (for iOS dev) | $0-2000 | Phase 3 start (if don't have) |
| Testing Devices | $0-1000 | Phase 3 (optional - can use simulators) |
| **Total** | | **$124-3124** |

### 13.4 Monthly Costs (With Native Apps - 1000-10000 users)

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Pro | $20 |
| Supabase | Pro | $25 |
| Railway | Pro | $50 |
| OpenAI API (GPT-4o-mini) | Pay-as-you-go | $200-500 |
| Voice API (Whisper + TTS) | Pay-as-you-go | ~$50-100 (10% premium users) |
| Stripe | 2.9% + 30¢ | ~$300 (if $10k MRR) |
| PostHog | Growth | $50 |
| Sentry | Team (Web + Mobile) | $52 |
| Firebase (FCM + Crashlytics) | Free → Blaze | $0-20 |
| Apple Developer Program | Amortized | $8/month |
| **Total** | | **$755-1125/month** |

**Notes on Native App Costs:**
- No additional hosting costs (uses same backend)
- Slightly higher Sentry cost for mobile crash reporting
- Firebase mostly free unless high volume
- Apple Developer must be renewed annually

### 13.5 Monthly Costs (Scale Phase - 10000-100000 users)

| Service | Plan | Cost |
|---------|------|------|
| Vercel | Pro | $20 |
| Supabase | Pro | $25 (may need scale plan at 50k+ users) |
| Railway | Pro + Scaling | $200-500 |
| OpenAI API (GPT-4o-mini) | Pay-as-you-go | $1000-2000 |
| Voice API (Whisper + TTS) | Pay-as-you-go | ~$200-400 (scaled usage) |
| Stripe | 2.9% + 30¢ | ~$3000 (if $100k MRR) |
| PostHog | Scale | $200 |
| Sentry | Business | $99 |
| Firebase | Blaze (Pay-as-you-go) | $50-100 |
| CDN (Cloudflare Pro) | Pro | $20 |
| Apple Developer | Amortized | $8/month |
| **Total** | | **$4822-6372/month** |

**But MRR at this scale:** $100k+  
**Profit Margin:** ~95% (very healthy SaaS margins)

### 13.6 Revenue Breakeven Analysis

**Web Only:**
- **Breakeven:** ~100 users (10 premium @ $9.99/mo = $100 MRR)
- **Costs at 100 users:** ~$55/month
- **Profit:** $45/month

**With Native Apps:**
- **Breakeven:** ~150 users (15 premium = $150 MRR)
- **Costs at 150 users:** ~$100/month
- **Profit:** $50/month

**At 1000 Users (10% conversion):**
- **Revenue:** $1000 MRR (100 premium users)
- **Costs:** ~$700/month
- **Profit:** $300/month

**At 10,000 Users (12% conversion):**
- **Revenue:** $12,000 MRR (1200 premium users)
- **Costs:** ~$1000/month
- **Profit:** $11,000/month
- **Annual Profit:** ~$132,000

**At 100,000 Users (15% conversion):**
- **Revenue:** $150,000 MRR (15,000 premium users)
- **Costs:** ~$5000/month
- **Profit:** $145,000/month
- **Annual Profit:** ~$1.74M

**Key Takeaway:** Very profitable once you reach scale. The main challenge is customer acquisition, not unit economics.

### 13.7 Cost Optimization Strategies

**AI Cost Optimization:**
- Cache common task breakdowns (30-40% cost reduction)
- Use GPT-4o-mini instead of GPT-4 (10x cheaper)
- Limit response tokens (reduce by 20%)
- Batch requests where possible
- Implement rate limiting for free users

**Infrastructure:**
- Start with free tiers, upgrade as needed
- Use CDN aggressively (reduce bandwidth)
- Optimize images and assets
- Consider reserved instances at scale

**App Store Fees:**
- iOS: Apple takes 30% of in-app purchases (first year), 15% after
- Android: Google takes 15% for subscriptions
- **Solution:** Drive users to web for signup (bypass fees)
  - "Sign up on zelos.app to get 50% off"
  - Mobile app prompts web signup
  - After signed up, can use mobile app

**Estimated Actual Revenue After Fees:**
- If 60% sign up via web: 0% platform fee
- If 40% sign up via mobile: ~25% average fee (blended iOS/Android)
- **Effective platform fee:** ~10% of total revenue
- **At $10k MRR:** ~$1k in platform fees
- **Net revenue:** ~$9k MRR

---

## 15. Scalability Considerations

### 14.1 Database Optimization

**Indexing:**
- All foreign keys indexed
- Frequently queried columns indexed
- Composite indexes for common query patterns

**Query Optimization:**
- Use SELECT only needed columns
- Implement pagination
- Use database views for complex queries
- Consider read replicas for analytics

### 14.2 Caching Strategy

**Redis Caching:**
- User stats (5 min TTL)
- AI responses for common tasks (1 hour TTL)
- Leaderboard data (15 min TTL)
- Session data (until completion)

**CDN Caching:**
- Static assets (forever)
- API responses (where appropriate)

### 14.3 Horizontal Scaling

**Stateless Backend:**
- FastAPI instances can scale horizontally
- Load balancer distributes traffic
- Shared database and Redis

**Celery Workers:**
- Can add more workers as needed
- Each worker handles background jobs independently

---

## Realistic Development Timeline

### Can We Build in 2-3 Days with AI?

**Short Answer: No, but here's the realistic timeline:**

### **Realistic MVP Timeline: 14-21 days (2-3 weeks)**

**Why not 2-3 days?**
1. **AI speeds up coding, but not everything:**
   - ✅ AI is great for: Component code, API endpoints, styling
   - ❌ AI doesn't help with: Architecture decisions, debugging integration issues, deployment setup, testing
   
2. **Integration complexity:**
   - Supabase + Next.js + FastAPI + OpenAI + Stripe + FCM
   - Each integration takes time even with AI help
   
3. **Iteration is essential:**
   - First AI-generated code rarely works perfectly
   - Need to test, debug, refine
   - UI/UX requires human judgment

### **Week-by-Week Breakdown (With AI Tools)**

**Week 1 (Days 1-7): Foundation - CRITICAL, CAN'T RUSH**
- Day 1-2: Project setup, authentication, database schema
- Day 3-4: Basic chat interface, OpenAI integration
- Day 5-6: Action completion flow, basic gamification
- Day 7: Testing and bug fixes

**Week 2 (Days 8-14): Features & Polish**
- Day 8-9: Focus Mode, animations, celebrations
- Day 10-11: Streak system, achievements, notifications
- Day 12-13: Landing page, pricing page
- Day 14: E2E testing, final bugs

**Week 3 (Days 15-21): Launch Prep**
- Day 15-16: Performance optimization
- Day 17-18: Deploy to production, DNS setup
- Day 19-20: User testing, final tweaks
- Day 21: Launch!

### **Absolute Minimum (If You RUSH): 10 days**
- **But you'll sacrifice:**
  - Polish and UX
  - Proper testing
  - Edge case handling
  - Performance optimization
  - Documentation

### **My Recommendation: 3 weeks for quality MVP**

---

**End of Technical Plan**

*Document Version: 1.0*  
*Last Updated: June 11, 2026*  
*Next Review: Start of development*
