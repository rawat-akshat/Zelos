# Zelos V1 (MVP) - Product Requirements Document

**Version:** 1.0 (MVP) - Streamlined  
**Target Launch:** 3 weeks  
**Platform:** Responsive Web App  
**Founder:** Akshat Rawat

**Tagline:** "Break through task paralysis in under 60 seconds"

**Vision:** An AI-powered web application that helps people overcome task paralysis by identifying psychological blockers, breaking down overwhelming tasks into micro-actions, and building a habit of taking action through simple progress tracking.

**Core Promise:** Transform "I know what to do but can't start" into "I just completed my first step" in under 60 seconds.

---

## V1 Philosophy: Lean & Focused

**Single Goal:** Prove that Zelos helps people START tasks.

**What We're Testing:**
1. Does AI correctly identify blockers?
2. Do micro-actions feel achievable?
3. Do users actually START after receiving breakdowns?
4. Do users return the next day?

**What V1 IS:**
- AI chatbot that breaks down tasks (Task Mode)
- Educational companion that explains concepts (Learn Mode)
- Simple progress tracking (XP + Streak only)
- Anonymous first use (try before signup)
- Feedback & outcome tracking (our learning engine)
- Fully responsive web app (works on mobile + desktop)
- **Free tier only** - No payment, no premium features

**What V1 IS NOT:**
- Heavy gamification (levels, achievements, fireworks) - V2
- Premium/paid tier (V2)
- Native mobile apps (V3)
- Social features like leaderboards/friends (V2)
- Voice input/output (V2)
- Weekly reports or advanced analytics (V2)

---

## 1. Target Users (V1)

**Primary Audience:**
- Students procrastinating on assignments
- Professionals stuck on projects
- ADHD/neurodivergent individuals with executive dysfunction
- High-achievers paralyzed by perfectionism
- Anyone who says "I know what to do but can't start"

---

## 2. User Flows (V1)

### 2.1 New User Flow (Anonymous First Use)

**Goal:** Let users experience value BEFORE signup

```
┌─────────────────────────────────────────────────┐
│ 1. Landing Page                                 │
│    "Break through task paralysis in 60 seconds" │
│    [Try It Now - No signup required]            │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ 2. Anonymous Chat (Client-Side Storage)        │
│    "What are you stuck on?"                     │
│    User types: "I need to write my resume"      │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ 3. AI Breakdown                                 │
│    Shows 3 micro-actions                        │
│    User reads response                          │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│ 4. Value Delivered → Soft Signup Prompt        │
│    "Want to save this and track your progress?" │
│    [Sign up to continue] [Keep using anonymously]│
└─────────────────────────────────────────────────┘
                    ↓
          ┌─────────┴─────────┐
          ↓                   ↓
    [Sign Up]          [Continue Anonymous]
          ↓                   ↓
    Dashboard          Anonymous Chat
    (Saved history,    (No history, no streak,
     streak, XP)        loses data on refresh)
```

**Why This Works:**
- ✅ 2-3x higher activation (proven pattern)
- ✅ Users experience value before friction
- ✅ Natural conversion point after value delivery
- ✅ Low barrier to entry

**Anonymous Session Limits:**
- Can use chat interface
- Can receive breakdowns
- Can regenerate (2x per breakdown)
- **Cannot:** Save history, track streak, earn XP, use Focus Mode
- Data stored in localStorage (lost on browser clear)

**Signup Triggers:**
- After first breakdown: "Sign up to save this"
- After 3 messages: "Sign up to keep your progress"
- Before using Focus Mode: "Sign up to use Focus Mode"
- Manual: "Sign Up" button always visible in header

---

### 2.2 Returning User Flow

**Goal:** Returning users land directly in their dashboard

```
┌─────────────────────────────────────────────────┐
│ User visits zelos.app                           │
└─────────────────────────────────────────────────┘
                    ↓
         ┌──────────┴──────────┐
         ↓                     ↓
    [Logged In?]         [Not Logged In]
         ↓                     ↓
    YES │                 NO → Landing Page
        │                      (Anonymous flow)
        ↓
┌─────────────────────────────────────────────────┐
│ Dashboard (Home Screen)                         │
│                                                 │
│  Good morning, Akshat! 👋                       │
│  🔥 12 day streak                               │
│  ⚡ 247 XP                                      │
│                                                 │
│  Quick Actions:                                 │
│  [+ New Chat]  [📝 Continue Last Chat]         │
│                                                 │
│  Recent Activity:                               │
│  • Resume writing (yesterday)                   │
│  • Study plan (2 days ago)                      │
│  • Room cleaning (3 days ago)                   │
│                                                 │
│  Pending Actions (3):                           │
│  ☐ Add 2-3 sentences to resume                 │
│  ☐ Review chapter 3 notes                      │
│  ☐ Put laundry in basket                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Dashboard Components:**
1. **Welcome Message** - Personalized greeting
2. **Streak Counter** - Prominent, motivating
3. **XP Display** - Simple number, no fancy progress bar yet
4. **Quick Actions** - Start new chat or continue previous
5. **Recent Activity** - Last 3-5 chat sessions
6. **Pending Actions** - Incomplete actions from past breakdowns

**Navigation:**
- Click "New Chat" → Opens fresh chat interface
- Click "Continue Last Chat" → Opens last session
- Click pending action → Opens that session + marks action as focus
- Sidebar always accessible (chat history)

---

### 2.3 Chat Interface Flow (Both New & Returning)

```
┌─────────────────────────────────────────────────┐
│  ☰  Zelos                    Profile  🔥 12     │
├──────────────┬──────────────────────────────────┤
│              │                                  │
│  [+ New Chat]│  Chat Interface                  │
│              │                                  │
│  Recent:     │  "I need to write my resume"     │
│  • Resume    │                                  │
│  • Study     │  [AI Response with breakdown]    │
│              │                                  │
│              │  Feedback:                       │
│              │  Was this helpful?               │
│              │  [👍 Yes] [😐 Partially] [👎 No]│
│              │                                  │
│              │  [Your input box here...]        │
└──────────────┴──────────────────────────────────┘
```

---

## 3. North Star Metric (V1)

**Primary Metric: Unstuck Events**

**Definition:**
User completes first micro-action within 15 minutes of receiving AI breakdown.

**Why This Matters:**
- Measures actual behavior change (not just engagement)
- Leading indicator of retention
- Proves core value proposition
- Can't be gamed (requires real action)

**How We Track:**
10 minutes after breakdown, ask: "What happened?"
- "Started" = Unstuck Event ✅
- "Worked briefly/long/finished" = Unstuck Event ✅
- "Didn't start yet" = Not Unstuck ❌

**V1 Targets:**
- Week 1: 40% unstuck rate
- Week 2: 45% unstuck rate
- Week 3: 50% unstuck rate
- Week 4: 55% unstuck rate

**Secondary Metrics:**
- Day 1 retention (% who return next day)
- Day 7 retention (% who return after 7 days)
- Feedback quality (% "Yes" to "Was this helpful?")
- Anonymous → Signed conversion rate

---

## 4. Core Features (V1)

### 4.1 Dual Mode System

**Task Mode (Primary - Action Intent)**

**Triggered when:** User wants help getting unstuck on a specific task

**Examples:**
- "I need to write my resume"
- "I'm stuck on studying for my exam"
- "Help me clean my room"

**Response Structure:**
1. Blocker identification (1 sentence with emoji)
2. Brief validation (40-60 words)
3. 3-5 micro-actions with time estimates
4. Interactive terms with tooltips
5. CTA: [Start Focus Mode] button

**Response Template:**
```
What's blocking you:
🧩 Ambiguity

You're experiencing task paralysis*—your brain freezes 
when tasks lack clear first steps. Let's break through it:

☐ Open a blank doc and type first sentence (2 min)
☐ Add 2-3 more sentences without editing (3 min)
☐ Write one main point you want to make (2 min)

[Start Focus Mode]  [↻ Regenerate]

* = Interactive tooltip (hover/tap for definition)
```

**AI Behavior:**
- Keep micro-actions TINY (2-5 min each)
- Use second-person ("you", not "user")
- Positive tone, no judgment
- Always include time estimates

---

**Learn Mode (Secondary - Learning Intent)**

**Triggered when:** User wants to understand concepts/psychology

**Examples:**
- "What is task paralysis?"
- "Why do I procrastinate?"
- "Tell me about executive dysfunction"

**Response Structure:**
1. Educational explanation (200-300 words)
2. Common causes (3-5 bullet points)
3. Who experiences it
4. Related concepts with tooltips
5. **Suggested follow-up questions** (3-4 clickable chips)
6. CTA back to Task Mode

**Response Template:**
```
📚 Learning Mode

Task Paralysis: Understanding the Psychology

Task paralysis is a cognitive freeze that happens when your brain 
encounters a task without clear next steps. Unlike procrastination 
(which is avoidance), task paralysis is pure overwhelm—you WANT 
to act but literally can't figure out where to start.

This happens because your prefrontal cortex needs clear, concrete 
actions to initiate behavior. When a task is vague ("work on project") 
or huge ("clean entire house"), your brain can't form an action plan, 
so it freezes.

Common Causes:
• Ambiguity - Task lacks concrete first step
• Overwhelm - Too many sub-tasks competing for attention
• Perfectionism - Fear of starting "wrong" blocks all starts

Related Concepts:
• Executive Dysfunction* - Difficulty with planning and initiation
• Activation Energy* - Mental effort needed to start a task
• Decision Fatigue* - Overwhelm from too many micro-decisions

---

Explore more:
[💡 What is executive dysfunction?] [🧠 Why perfectionism causes freezing]
[🔄 How is this different from ADHD?] [✅ I'm ready to break down a task →]

* = Interactive tooltip
```

**Suggested Follow-Up Questions:**
- AI generates 3-4 relevant questions after each response
- Mix of: deeper dives, related concepts, practical CTAs
- Emojis: 💡 (concept), 🧠 (why/how), 🔄 (comparison), ✅ (action)
- Always include at least one CTA to switch to Task Mode

---

**Mixed Mode**

**Triggered when:** User wants both help AND understanding

**Example:** "I'm stuck on my resume but also want to understand why this always happens"

**Response Structure:**
1. Quick task breakdown (collapsible)
2. Brief explanation below
3. Links to deeper Learn Mode topics

---

**Mode Detection:**
- AI analyzes input semantically
- Classifies as: `task`, `learn`, or `mixed`
- Routes to appropriate response type
- Visual badge shows current mode
- User can manually switch modes anytime

---

### 4.2 Feedback Collection System (CRITICAL)

**Goal:** Learn what works and what doesn't

**After Every Task Breakdown:**

```
[AI shows breakdown with 3-5 micro-actions]

─────────────────────────
Was this helpful?
[👍 Yes] [😐 Partially] [👎 No]
─────────────────────────
```

**If User Clicks "No" or "Partially":**

```
What went wrong? (select all that apply)
□ Steps are too big
□ Steps are too small
□ Didn't understand my situation
□ Wrong diagnosis of blocker
□ Something else: [text input]

[Submit Feedback]
```

**Database Schema:**
```sql
breakdown_feedback (
  id UUID PRIMARY KEY,
  session_id UUID,
  user_id UUID,
  helpful BOOLEAN, -- true/false/null (partially)
  feedback_reasons TEXT[], -- array: ['steps_too_big', 'wrong_diagnosis']
  custom_feedback TEXT,
  created_at TIMESTAMP
)
```

**Why This Is Critical:**
- Shows what AI is getting wrong
- Identifies patterns in failures
- Guides prompt engineering improvements
- User feels heard

---

### 4.3 Outcome Tracking (THE MOST IMPORTANT METRIC)

**Goal:** Did the user actually START?

**10 Minutes After Breakdown:**

Show non-intrusive popup or notification:

```
┌─────────────────────────────────────────┐
│ Quick check-in: What happened?          │
│                                         │
│ ○ Started (even just 1 minute)         │
│ ○ Worked briefly (5-10 min)            │
│ ○ Worked for a while (30+ min)         │
│ ○ Finished the task                    │
│ ○ Didn't start yet                     │
│                                         │
│ [Optional: Tell us more] [Skip]        │
└─────────────────────────────────────────┘
```

**If "Didn't start yet":**

```
What's blocking you now?
○ Steps still feel too big
○ Got distracted
○ Lost motivation
○ Don't have time right now
○ Something else: [text input]

[Submit]
```

**Database Schema:**
```sql
outcome_tracking (
  id UUID PRIMARY KEY,
  session_id UUID,
  user_id UUID,
  outcome TEXT, -- 'started', 'worked_briefly', 'worked_long', 'finished', 'not_started'
  minutes_after_breakdown INT, -- 10
  blocker_reason TEXT,
  created_at TIMESTAMP
)
```

**Implementation:**
- Trigger: 10 minutes after breakdown sent
- Method: Browser notification (if enabled) OR in-app popup on next visit
- Frequency: Once per breakdown
- Skippable: Yes (don't be annoying)

**Why This Is Gold:**
- **Best leading indicator** of product value
- Answers "Do people actually start?"
- Identifies friction points post-breakdown
- Builds behavioral intelligence over time

---

### 4.4 Behavioral Data Collection (Future Moat)

**Goal:** Learn which blockers we diagnose correctly

**After Every Task Mode Response:**

AI identifies blocker: "Ambiguity" / "Perfectionism" / "Overwhelm" / etc.

**Ask User to Confirm:**

```
[AI Breakdown shown]

Does this sound right?
"You're experiencing ambiguity—your brain freezes 
when tasks lack clear first steps."

[✓ Yes, that's exactly it]  [✗ No, not quite]  [? Unsure]
```

**If "No, not quite":**

```
What's actually blocking you?
(Your answer helps us improve)

[text input: "Actually, I'm scared of failing..."]

[Submit]
```

**Database Schema:**
```sql
blocker_confirmation (
  id UUID PRIMARY KEY,
  session_id UUID,
  user_id UUID,
  ai_detected_blocker TEXT, -- 'ambiguity', 'perfectionism', 'overwhelm'
  user_confirmed BOOLEAN, -- true/false/null (unsure)
  user_actual_blocker TEXT, -- if disagreed, what they said
  created_at TIMESTAMP
)
```

**Why This Matters:**
- Learn AI's diagnostic accuracy
- Improve prompt engineering over time
- Build personalized blocker patterns per user
- **This is your moat** - competitors can't replicate your dataset

**V1 Implementation:**
- Show confirmation after every Task Mode response
- Optional (can skip)
- Non-intrusive (single line + buttons)
- Store all responses for analysis

---

### 4.5 Interactive Tooltips (Knowledge Layer)

**What:** Technical terms are underlined/highlighted with hover/tap tooltips

**Behavior:**
- **Desktop:** Tooltip appears on hover
- **Mobile:** Tooltip appears on tap (outside tap to close)

**Tooltip Content:**
- Simple definition (40-60 words)
- Context and examples
- "Learn more →" link opens full Learn Mode response

**V1 Terms (Pre-defined - ~20 total):**
- Task paralysis
- Executive dysfunction
- Perfectionism
- Procrastination
- Ambiguity
- Overwhelm
- Activation energy
- Decision fatigue
- Cognitive overload
- Analysis paralysis
- ADHD
- Executive function
- Initiation difficulty
- Avoidance behavior
- Fear of failure
- Imposter syndrome
- Dopamine seeking
- Habit formation
- Micro-actions
- Focus mode

**Implementation:**
- Pre-defined dictionary stored in database
- AI marks terms with asterisks in response
- Frontend renders as tooltips automatically

---

### 4.6 Focus Mode

**What:** Distraction-free timer mode for completing actions

**When:** User clicks [Start Focus Mode] after task breakdown

**UI:**
```
🎯 Focus Mode - Resume Writing

Time: 07:23 / 10:00

☑ Open blank doc and type first sentence (2 min) ✓
☐ Add 2-3 more sentences without editing (3 min)
☐ Write one main point you want to make (2 min)

[Complete This Action]

[Exit Focus Mode]
```

**Features:**
- Timer counting up (not down - no pressure)
- Checklist of actions
- Mark actions complete → XP awarded
- Exit anytime (progress saved)
- Completion triggers confetti + XP celebration

**V1 Limits:**
- **Free users:** 3 Focus Mode sessions per day
- Sessions reset at midnight
- Clear counter: "2/3 Focus Mode sessions used today"

---

### 4.7 Simple Progress Tracking (Streamlined Gamification)

**Philosophy:** Progress visible, not distracting

**V1 Includes ONLY:**

**1. XP System (Simple Progress Counter)**
- Complete action: +10 XP
- Complete all actions in breakdown: +20 XP bonus
- Display: "⚡ 247 XP" (just a number, no progress bar)
- No levels, no leaderboards, no complex systems

**Why:**
- Shows progress over time
- Motivating but not overwhelming
- Easy to implement
- Focus stays on STARTING tasks, not earning points

**2. Daily Streak (Habit Formation)**
- Track consecutive days of action completion
- Resets if user misses a day
- Display: "🔥 12 day streak"
- Simple counter, prominent in header

**Why:**
- Proven habit formation mechanism (Duolingo, Snapchat)
- Fear of losing streak drives daily returns
- Critical for retention

**What's REMOVED from V1:**
- ❌ Levels (1-10) → V2
- ❌ Achievements/Badges → V2
- ❌ Confetti/Fireworks → V2
- ❌ Screen shake → V2
- ❌ Celebration sounds → V2
- ❌ Complex animations → V2
- ❌ Progress bars → V2

**Visual Feedback (Minimal):**
- Action completed → Simple checkmark ✓ + "+10 XP" text (no animation)
- Streak continues → Fire emoji updates: 🔥 13
- That's it. Clean and focused.

**Why This Is Better:**
- Saves 20-25% build time
- Keeps focus on core value: "Did Zelos help you start?"
- Less visual noise = clearer product testing
- Can add gamification in V2 after validating core value

---

### 4.8 Chat History & Storage

**What:** All conversations are saved and browsable

**Features:**
- **New Chat** button (always visible)
- **Chat history sidebar** - List of past conversations
- **Session titles** - Auto-generated from first message
- **Delete conversations** - User can clear history
- **Search history** - Find past breakdowns (V2 - exclude from V1)

**Sidebar UI:**
```
[+ New Chat]

Today
• Resume writing help
• Understanding procrastination
• Cleaning room breakdown

Yesterday
• Study plan for exam
• Why I avoid tasks

Last Week
• ...
```

**Storage:**
- Save to PostgreSQL (Supabase)
- Real-time sync (user sees message immediately)
- Session grouping (messages belong to sessions)

---

### 4.9 Regenerate Breakdown

**What:** Let users refine breakdowns if first attempt doesn't feel right

**UI:**
```
Not quite right?  [↻ Regenerate]

Or specify what you need:
[⬇ Smaller steps]  [⚡ Faster steps]  [📝 More detailed]
```

**Behavior:**
- Default "Regenerate" → slight variation
- Specific buttons → adjust AI prompt accordingly
- Track which options users click (learning data)

**V1 Limits:**
- **Free users:** 2 regenerations per breakdown
- After 2 regenerations: Show message "Try rephrasing your task or switch to Learn Mode"

---

### 4.10 Authentication

**Methods:**
1. **Email Magic Link** (no password)
   - User enters email
   - Receives link via email
   - Click to login (auto-login)

2. **Google OAuth**
   - "Continue with Google" button
   - One-click signup/login

**User Profile (Minimal for V1):**
- Name (from Google or manual entry)
- Email
- Avatar (Gravatar or Google photo)
- Join date
- Current streak
- Total XP
- Level

**Profile Page:**
```
👤 Akshat Rawat
Level 5 ⚡ 1,247 XP
🔥 12 day streak

Stats:
• 43 actions completed
• 8 Focus Mode sessions
• 5 achievements unlocked

[Edit Profile]  [Logout]
```

---

### 4.11 Onboarding Flow (Post-Signup Only)

**Philosophy:** Users already experienced value anonymously. Onboarding is minimal.

**When:** Triggered ONLY after user signs up (not on landing)

**Step 1: Welcome Back**
```
Welcome to Zelos, [Name]! 👋

Your progress is now saved.

You'll earn:
⚡ XP for completing actions
🔥 Daily streaks for building habits

[Start Your First Saved Chat]
```

**Step 2: Dashboard**
- Land directly on dashboard
- See empty state:
  - "No chats yet. Let's get started!"
  - [+ New Chat] button (prominent)

**That's it.** No lengthy tutorial. They already know how to use it from anonymous experience.

---

## 5. User Interface (V1)

### 5.1 Design System

**Visual Style:** Duolingo-inspired - vibrant, playful, encouraging

**Colors:**
- Primary gradient: Blue → Purple (`from-blue-500 to-purple-500`)
- Success: Green (`#10b981`)
- Warning: Orange (`#f59e0b`)
- Error: Red (`#ef4444`)
- Neutral: Gray scale (`gray-50` to `gray-900`)

**Typography:**
- Font: Inter (Google Fonts)
- Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Headings: Bold, larger sizes
- Body: Regular, readable (16px base)

**Components:**
- Rounded corners (border-radius: 12-16px)
- Subtle shadows for depth
- Gradient buttons for primary actions
- Card-based layout
- Light background (#fafafa)

**Animations:**
- Smooth transitions (200-300ms)
- Bounce effects on celebrations
- Confetti on achievements
- Slide-in for modals/tooltips

---

### 5.2 Layout

**Desktop (1024px+):**
```
┌─────────────────────────────────────────────────┐
│  Zelos Logo    [New Chat]    Profile  Streak   │
├──────────────┬──────────────────────────────────┤
│              │                                  │
│  Sidebar     │                                  │
│  (Chat       │       Main Chat Area             │
│  History)    │       (Messages)                 │
│              │                                  │
│  Today       │                                  │
│  • Chat 1    │                                  │
│  • Chat 2    │                                  │
│              │                                  │
│  Yesterday   │                                  │
│  • Chat 3    │       [Input Box]                │
│              │       [Send Button]              │
└──────────────┴──────────────────────────────────┘
```

**Mobile (<768px):**
```
┌───────────────────────┐
│  ☰  Zelos    Profile  │
├───────────────────────┤
│                       │
│                       │
│   Main Chat Area      │
│   (Full Width)        │
│                       │
│                       │
│                       │
│                       │
│   [Input Box]         │
│   [Send Button]       │
└───────────────────────┘

(Sidebar slides in from left when ☰ tapped)
```

---

### 5.3 Key Screens

**1. Landing Page**
- Hero: "Break through task paralysis in under 60 seconds"
- Subheading: "Try it now - no signup required"
- [Try It Now] button (prominent, gradient)
- Value props (3 columns: Fast, Smart, Simple)
- How it works (3 steps with icons)
- **Social proof: Real stats only**
  - "Join 247 people using Zelos" (real waitlist count)
  - "Be one of the first 100 users"
  - Screenshots of actual interface
- CTA: "Get Unstuck Now" (big gradient button)

**NO fake testimonials. NEVER.**

**2. Dashboard (Logged-In Home)**
```
Good morning, Akshat! 👋
🔥 12 day streak  |  ⚡ 247 XP

[+ New Chat]  [📝 Continue Last Chat]

Recent Activity:
• Resume writing (yesterday)
• Study plan (2 days ago)

Pending Actions (3):
☐ Add 2-3 sentences to resume
☐ Review chapter 3 notes
☐ Put laundry in basket
```

**3. Chat Interface**
- Clean, minimal
- Messages with timestamps
- User messages: Right-aligned, blue bubble
- AI messages: Left-aligned, gray bubble
- Mode badge: Visual indicator (Task/Learn/Mixed)
- **Feedback buttons after each AI response**

**4. Focus Mode**
- Full-screen overlay
- Timer at top
- Checklist in center
- Exit button (top-left)
- Simple progress (X/Y actions completed)

**5. Profile Page (Minimal for V1)**
- Avatar + name
- Streak counter: 🔥 12 days
- Total XP: ⚡ 247 XP
- Actions completed: 43
- [Edit Profile]  [Logout]

---

## 6. Technical Architecture (V1)

### 6.1 Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript 5
- Tailwind CSS 3
- Framer Motion (animations)
- React Query (server state)
- React Context (global state)

**Backend:**
- FastAPI (Python 3.11+)
- PostgreSQL (Supabase)
- OpenAI GPT-4o-mini

**Infrastructure:**
- Vercel (frontend hosting)
- Railway (backend hosting)
- Supabase Cloud (database + auth)

**Authentication:**
- Supabase Auth (magic link, Google OAuth)

**AI:**
- OpenAI GPT-4o-mini ($0.15/1M tokens)

---

### 6.2 Database Schema (V1 Tables)

**Users:**
```sql
users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  avatar_url TEXT,
  current_streak INT DEFAULT 0,
  total_xp INT DEFAULT 0,
  current_level INT DEFAULT 1,
  created_at TIMESTAMP,
  last_active_date DATE
)
```

**Sessions (Conversations):**
```sql
sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title TEXT,
  first_message TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

**Messages:**
```sql
messages (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  user_id UUID REFERENCES users(id),
  role TEXT, -- 'user' or 'assistant'
  content TEXT,
  mode TEXT, -- 'task', 'learn', 'mixed'
  created_at TIMESTAMP
)
```

**Actions (From Task Breakdowns):**
```sql
actions (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  user_id UUID REFERENCES users(id),
  description TEXT,
  time_estimate INT, -- minutes
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'skipped'
  completed_at TIMESTAMP
)
```

**Streaks:**
```sql
streaks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE,
  actions_completed INT DEFAULT 0
)
```

**Breakdown Feedback (V1 - CRITICAL):**
```sql
breakdown_feedback (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  user_id UUID REFERENCES users(id),
  helpful BOOLEAN, -- true/false/null (partially)
  feedback_reasons TEXT[], -- ['steps_too_big', 'wrong_diagnosis']
  custom_feedback TEXT,
  created_at TIMESTAMP
)
```

**Outcome Tracking (V1 - CRITICAL):**
```sql
outcome_tracking (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  user_id UUID REFERENCES users(id),
  outcome TEXT, -- 'started', 'worked_briefly', 'finished', 'not_started'
  minutes_after_breakdown INT DEFAULT 10,
  blocker_reason TEXT,
  created_at TIMESTAMP
)
```

**Blocker Confirmation (V1 - Future Moat):**
```sql
blocker_confirmation (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  user_id UUID REFERENCES users(id),
  ai_detected_blocker TEXT, -- 'ambiguity', 'perfectionism', 'overwhelm'
  user_confirmed BOOLEAN, -- true/false/null
  user_actual_blocker TEXT,
  created_at TIMESTAMP
)
```

---

### 6.3 API Endpoints (V1)

**Authentication:**
- `POST /auth/magic-link` - Send magic link email
- `POST /auth/google` - Google OAuth
- `GET /auth/me` - Get current user

**Chat:**
- `POST /sessions` - Create new chat session
- `GET /sessions` - Get user's chat history
- `DELETE /sessions/:id` - Delete session
- `POST /sessions/:id/messages` - Send message (AI responds)

**Actions:**
- `PATCH /actions/:id/complete` - Mark action complete (+XP)
- `GET /actions/pending` - Get user's pending actions

**Gamification:**
- `GET /users/me/stats` - Get XP, streak

**Feedback (V1 - CRITICAL):**
- `POST /feedback/breakdown` - Submit breakdown feedback
- `POST /feedback/outcome` - Submit outcome tracking
- `POST /feedback/blocker` - Submit blocker confirmation

---

### 6.4 AI Prompt Engineering (V1)

**System Prompts:** (See full prompts in main Technical Plan)

**Key Principles:**
- Detect intent (task vs learn vs mixed)
- Keep micro-actions TINY (2-5 min)
- Mark technical terms with asterisks for tooltips
- Generate 3-4 suggested follow-up questions in Learn Mode
- Always stay in productivity/behavioral domain (NOT medical)
- Return structured JSON responses

---

## 7. Non-Functional Requirements (V1)

### 7.1 Performance

- Initial page load: <2 seconds
- AI response time: <3 seconds
- Real-time message sync: <500ms latency
- Mobile optimized: Works on 3G

### 7.2 Accessibility

- Keyboard navigation support
- Screen reader compatible
- High contrast mode option
- Font size adjustable

### 7.3 Browser Support

- Chrome 90+ (primary)
- Safari 14+ (iOS support)
- Firefox 88+
- Edge 90+

### 7.4 Security

- HTTPS everywhere
- JWT tokens for auth
- Row-level security (Supabase RLS)
- No medical advice (legal boundary)
- Clear disclaimers in onboarding

---

## 8. Success Metrics (V1)

**North Star Metric:**
- **Unstuck Events:** % of users who start within 15 min of breakdown
  - Week 1: 40%
  - Week 4: 55%

**Primary Metrics:**
1. **Anonymous → Signup Conversion:** % of anonymous users who sign up (target: >30%)
2. **Day 1 Retention:** % who return next day (target: >40%)
3. **Day 7 Retention:** % who return after 7 days (target: >25%)
4. **Feedback Quality:** % "Yes" to "Was this helpful?" (target: >70%)

**Secondary Metrics:**
- Time to first action (from landing)
- Average session duration
- Mode preference ratio (Task vs Learn)
- Regeneration rate (% who click regenerate)
- Focus Mode completion rate

**Learning Metrics (For Product Improvement):**
- Blocker confirmation accuracy (% AI correct)
- Top reasons for "Not helpful" feedback
- Most common outcome: Started vs Didn't Start
- Friction points after breakdown

**Health Metrics:**
- AI response accuracy (manual review)
- App crash rate (<1%)
- API error rate (<2%)
- Page load time (<2s)

---

## 9. Out of Scope (V1)

**Explicitly NOT in V1:**
- ❌ Levels (1-10) - V2
- ❌ Achievements/badges - V2
- ❌ Confetti/fireworks/animations - V2
- ❌ Celebration sounds - V2
- ❌ Premium tier / Payments / Stripe - V2
- ❌ Voice input/output - V2
- ❌ Social features (leaderboards, friends, challenges, leagues) - V2
- ❌ Weekly reports - V2
- ❌ Advanced behavioral insights dashboard - V2
- ❌ Email/push notifications - V2
- ❌ Referral system - V2
- ❌ Custom themes - V2
- ❌ Multi-language support - V2
- ❌ Data export - V2
- ❌ Native mobile apps - V3
- ❌ Offline mode - V3
- ❌ Search chat history - V2
- ❌ Fake testimonials - NEVER

**Why:** Focus on proving core value: "Does Zelos help people START?" Everything else is polish for V2.

---

## 10. Launch Checklist (V1)

### Pre-Launch
- [ ] Landing page live (real stats only, no fake testimonials)
- [ ] Anonymous chat works (no signup required)
- [ ] Chat interface functional
- [ ] Task Mode working (AI breakdowns)
- [ ] Learn Mode working (explanations + tooltips + suggested questions)
- [ ] Focus Mode timer functional
- [ ] **Feedback collection working** (helpful? why not?)
- [ ] **Outcome tracking working** (10-min check-in)
- [ ] **Blocker confirmation working** (does this sound right?)
- [ ] XP system working (simple counter)
- [ ] Streak tracking accurate
- [ ] Authentication (magic link + Google)
- [ ] Anonymous → Signed conversion flow
- [ ] Dashboard for returning users
- [ ] Chat history saves and displays
- [ ] Responsive on mobile (test iPhone + Android)
- [ ] Tooltips work on hover/tap
- [ ] Legal pages: Privacy Policy, Terms of Service, Disclaimers

### Launch Day
- [ ] Domain set up (zelos.app)
- [ ] SSL certificate active
- [ ] Error monitoring (Sentry) configured
- [ ] Analytics tracking (PostHog) active
- [ ] Share on Twitter, Reddit, Indie Hackers
- [ ] Post in ADHD communities (Reddit, Discord)

### Post-Launch (Week 1)
- [ ] Monitor error logs daily
- [ ] Track North Star Metric (Unstuck Events %)
- [ ] Review feedback data daily (helpful? why not?)
- [ ] Review outcome tracking data (started vs didn't start)
- [ ] Review blocker confirmation accuracy
- [ ] Fix critical bugs immediately
- [ ] Adjust AI prompts based on feedback
- [ ] Watch anonymous → signup conversion rate
- [ ] Monitor day 1 retention

---

## 11. Timeline (V1 - Streamlined)

**Week 1: Foundation + Anonymous Flow**
- Day 1-2: Setup (Next.js, Supabase, FastAPI, OpenAI)
- Day 3-4: Anonymous chat (client-side, no auth)
- Day 4-5: Auth system (magic link + Google OAuth)
- Day 6-7: Anonymous → Signed conversion flow

**Week 2: Core AI + Feedback Systems**
- Day 1-3: Dual mode system (Task + Learn + Mixed)
- Day 4: Interactive tooltips (~20 terms)
- Day 5: **Feedback collection** (helpful? why not?)
- Day 6: **Outcome tracking** (10-min check-in)
- Day 7: **Blocker confirmation** (does this sound right?)

**Week 3: Features + Dashboard**
- Day 1-2: Focus Mode (timer, checklist)
- Day 3: XP system (simple counter) + Streak tracking
- Day 4: Dashboard for returning users
- Day 5: Regenerate breakdown
- Day 6-7: Chat history + storage

**Week 4: Polish & Launch (Minimal Week)**
- Day 1-2: Landing page (real stats, no fake testimonials)
- Day 3-4: Mobile responsive fixes
- Day 5: Bug fixes + performance
- Day 6: Legal pages (Privacy, Terms, Disclaimers)
- Day 7: Deploy + Launch 🚀

**Total: 3 weeks** (streamlined from 4 weeks by removing gamification bloat)

---

## 12. Future Roadmap (Post-V1)

**V2 (Weeks 4-7):**
- Levels system (1-50)
- Achievements (20+ badges)
- Visual celebrations (confetti, animations)
- Premium tier ($9.99/month)
- Stripe integration
- Weekly reports
- Voice input/output
- Social competition (leaderboards, friends)
- Advanced behavioral insights dashboard

**V3 (After 500+ Users):**
- Native iOS app (React Native)
- Native Android app (React Native)
- App Store launch
- Better offline mode
- Native notifications

---

## Appendix: V1 vs V2 Feature Comparison

| Feature | V1 (MVP - 3 weeks) | V2 (Growth - Weeks 4-7) | V3 (Scale) |
|---------|----------|-------------|------------|
| **Core Features** | | | |
| Task Mode | ✅ | ✅ | ✅ |
| Learn Mode | ✅ | ✅ | ✅ |
| Mixed Mode | ✅ | ✅ | ✅ |
| Suggested Questions | ✅ | ✅ | ✅ |
| Interactive Tooltips | ✅ | ✅ | ✅ |
| Chat History | ✅ | ✅ | ✅ |
| Focus Mode | ✅ (3/day) | ✅ (unlimited) | ✅ |
| Regenerate | ✅ (2/breakdown) | ✅ (unlimited) | ✅ |
| **User Flow** | | | |
| Anonymous First Use | ✅ | ✅ | ✅ |
| Dashboard (Returning Users) | ✅ | ✅ | ✅ |
| Auth (Magic Link + Google) | ✅ | ✅ | ✅ |
| **Progress Tracking** | | | |
| XP System | ✅ (simple counter) | ✅ (with progress bars) | ✅ |
| Daily Streak | ✅ | ✅ | ✅ |
| Levels | ❌ | ✅ (1-50) | ✅ |
| Achievements | ❌ | ✅ (20+) | ✅ |
| Visual Celebrations | ❌ | ✅ (confetti, animations) | ✅ |
| **Learning Systems** | | | |
| Feedback Collection | ✅ | ✅ | ✅ |
| Outcome Tracking | ✅ | ✅ | ✅ |
| Blocker Confirmation | ✅ | ✅ | ✅ |
| Weekly Reports | ❌ | ✅ | ✅ |
| Behavioral Dashboard | ❌ | ✅ | ✅ |
| **Monetization** | | | |
| Premium Tier | ❌ | ✅ | ✅ |
| Stripe Integration | ❌ | ✅ | ✅ |
| Voice Input/Output | ❌ | ✅ | ✅ |
| **Social Features** | | | |
| Leaderboards | ❌ | ✅ | ✅ |
| Friends System | ❌ | ✅ | ✅ |
| Challenges | ❌ | ✅ | ✅ |
| **Platform** | | | |
| Responsive Web App | ✅ | ✅ | ✅ |
| Native iOS App | ❌ | ❌ | ✅ |
| Native Android App | ❌ | ❌ | ✅ |

---

**End of V1 PRD**

Ready to build! 🚀
