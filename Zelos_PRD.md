# Zelos - Product Requirements Document (PRD)

## 1. Executive Summary

**Product Name:** Zelos

**Founder** Akshat Rawat

**Tagline:** "Your cognitive companion for breaking through task paralysis"

**Vision:** An AI-powered web application that helps people overcome task paralysis by identifying psychological blockers, breaking down overwhelming tasks into micro-actions, and using gamification to create an addictive habit of taking action.

**Core Promise:** Transform "I know what to do but can't start" into "I just completed my first step" in under 60 seconds.

---

## 2. Platform & Market Strategy

### Platform Approach

**Phase 1-2: Web Application (Weeks 1-6)**
- Fully responsive web app accessible via any browser
- Works on desktop, tablet, and mobile web (no installation needed)
- Mobile-first design (optimized for mobile browsers)
- Focus: Rapid launch, validate product-market fit, iterate quickly
- Web push notifications (Chrome, Edge, Firefox, Safari 16+)

**Phase 3: Native Mobile Apps (After 500+ Active Users)**
- iOS app (App Store)
- Android app (Google Play Store)
- Built with React Native (60-70% code reuse from web)
- Enables App Store discovery and organic growth
- Push notifications work more reliably
- True offline capability (view history without internet)
- Better performance and native feel

**Why This Sequence?**
- Web first = fastest time to market (2-3 weeks vs 8-12 weeks)
- Lower initial cost (one codebase, no app store fees)
- No App Store approval delays during iteration
- Validate core features and user demand before investing in native
- SEO benefits for organic acquisition
- Same backend API supports both web and native
- Proven path: Notion, Linear, Figma all started web-first

### Target Market

**Primary Markets (70% focus):**
- United States (largest revenue potential)
- United Kingdom
- Canada
- Australia
- Germany

**Why International First?**
- Higher willingness to pay: $9.99/month is standard in US/Europe
- Better conversion rates: 8-12% (vs 2-4% in emerging markets)
- Revenue per user: $100-120/year vs $15/year in India
- Less price sensitivity
- Larger productivity app market ($10B+ in US alone)

**Secondary Markets (20% focus):**
- Rest of Europe (France, Spain, Italy, Netherlands)
- Southeast Asia (Singapore, Malaysia)

**Tertiary Markets (10% focus):**
- India (high volume, low revenue - bonus market)
- Latin America
- Other emerging markets with localized pricing

**Language Strategy:**
- Launch: English only (covers 1.5B+ users)
- Phase 2: Spanish, French, German
- Phase 3: Portuguese, Japanese, Korean

**Pricing Strategy:**
- US/Europe/Australia: $9.99/month, $79/year
- Emerging markets: Regional pricing ($2-3/month)
- Single global product, localized pricing

---

## 3. Problem Statement

### The Core Problem
Millions of people experience task paralysis daily—they know what they need to do but struggle to start due to:
- **Overwhelm:** Task feels too big
- **Ambiguity:** Don't know where to begin
- **Perfectionism:** Fear of not doing it perfectly
- **Overthinking:** Analysis paralysis
- **Avoidance:** Emotional resistance to the task

### Market Gap
Existing productivity tools focus on organization (Todoist, Notion) or time management (Calendly, Clockify) but don't address the psychological barrier of getting started. Users don't need another task list—they need help taking the first step.

### Target Impact
- Reduce time from "stuck" to "started" from hours/days to under 1 minute
- Create an addictive positive habit loop around action-taking
- Build long-term behavioral intelligence about individual stuck patterns

---

## 3. Target Users

### Primary Personas

**1. The Overwhelmed Student (Ages 18-25)**
- Struggles with large assignments (papers, projects, studying)
- Procrastinates until the last minute
- Wants to start earlier but doesn't know how
- Budget-conscious but willing to pay for proven results

**2. The Perfectionist Professional (Ages 25-40)**
- Delays starting projects due to high standards
- Overthinks and researches excessively before acting
- Often misses deadlines or works late due to delayed starts
- Values efficiency and personal development

**3. The ADHD/Neurodivergent Individual (All Ages)**
- Experiences executive dysfunction regularly
- Has trouble initiating tasks even when motivated
- Needs external structure and accountability
- Active in online communities seeking tools

**4. The Career Changer (Ages 25-45)**
- Stuck on job applications, resumes, cover letters
- Knows they need to make a change but feels paralyzed
- Emotional resistance to job search tasks
- Willing to invest in career advancement

### Secondary Personas
- Creators with writer's block
- Entrepreneurs stuck on business tasks
- Homemakers overwhelmed by household management
- Anyone who frequently says "I'll do it later"

---

## 4. Core User Journey

### Primary Flow

**Step 1: User Input**
- User opens Zelos (web app in browser)
- Sees simple, inviting prompt: "What are you stuck on?"
- Types their stuck feeling/task in natural language
- Examples: "I need to write my resume but don't know where to start" or "I'm stuck on studying for biology"

**Step 2: AI Analysis (1-2 seconds)**
- AI processes the input
- Identifies the psychological blocker(s)
- Determines task type and complexity
- Generates personalized response strategy

**Step 3: Blocker Identification + Validation**
- AI displays the identified blocker with emoji/icon (e.g., 🧩 Ambiguity + Perfectionism)
- Provides brief, empathetic validation (2-3 sentences)
- Example: "It sounds like you're stuck because 'write resume' feels huge and you want it to be perfect. That's totally normal."

**Step 4: Micro-Action Breakdown**
- AI generates 3-5 micro-actions
- Each action is 2-5 minutes maximum
- Actions are concrete, specific, and immediately doable
- Each has estimated time and checkbox
- Example:
  - ☐ Open a blank doc and type your name + contact info (2 min)
  - ☐ List 3 jobs you've had, no descriptions yet (3 min)
  - ☐ Write 1 sentence about your most recent job (5 min)

**Step 5: Focus Mode (Optional)**
- User can click "Start Focus Mode" or continue chatting
- Focus Mode transforms the chat UI:
  - Actions become interactive checkboxes
  - Each action has a [▶ Start] button
  - Optional timer appears when started
  - Can exit anytime and return to chat
- User completes actions one by one
- Each completion triggers celebration animation

**Step 6: Completion & Celebration**
- After each action: Small celebration (✨ checkmark animation)
- After all actions: Bigger celebration + XP gained + streak updated
- Prompt to continue or start something new

**Step 7: Follow-Up & Accountability**
- 2 hours later: Push notification "How'd it go with your resume?"
- User can respond: "Finished!" / "Still working" / "Got stuck again"
- If stuck again, AI provides adjusted support

**Step 8: Pattern Recognition (Over Time)**
- System tracks common blockers, successful strategies, completion patterns
- Weekly report shows behavioral insights
- AI uses historical data to improve future recommendations

---

## 5. Core Features

### 5.1 Conversational AI Interface

**Chat-Based Interaction**
- Natural language input (no structured forms)
- Conversational AI that understands context
- Maintains conversation history within session
- Can handle follow-up questions and clarifications
- Supports multi-turn conversations

**AI Behavior Rules**
- Always empathetic and non-judgmental
- Never acts as therapist or medical advisor (clear disclaimers)
- Focuses on action, not analysis
- Keeps responses short and actionable (3-4 sentences max for validation)
- Every conversation ends with a concrete next step
- Uses user's language patterns and tone
- Adapts based on what works for individual user

**Dual Mode System: Task Mode vs. Learn Mode**

Zelos operates in two distinct modes based on user intent, automatically detected by AI:

**Task Mode (Primary - Action Intent)**
- **Triggered when:** User wants help getting unstuck on a specific task
- **Examples:** 
  - "I need to write my resume"
  - "I'm stuck on studying for my exam"
  - "I should clean my room but can't start"
- **Response Structure:**
  1. Blocker identification (1 line with icon)
  2. Brief validation (1-2 sentences)
  3. Scientific credibility (1 sentence with concept name)
  4. 3-5 micro-actions with time estimates
  5. Interactive tooltips on technical terms
- **Response Length:** 60-100 words (15-20 second read)
- **Goal:** Get user started immediately

**Learn Mode (Secondary - Learning Intent)**
- **Triggered when:** User wants to understand concepts, psychology, or background
- **Examples:**
  - "What is task paralysis?"
  - "Tell me more about ADHD and executive function"
  - "Why do I always procrastinate?"
- **Response Structure:**
  1. Educational explanation (200-300 words)
  2. Common causes and context
  3. Who experiences it
  4. Related concepts with links
  5. **Suggested follow-up questions** (3-4 clickable chips)
  6. CTA back to Task Mode ("Ready to overcome it?")
- **Response Length:** 200-400 words (article-style)
- **Goal:** Build understanding and trust, encourage exploration

**Suggested Follow-Up Questions (Learn Mode)**

After every Learn Mode response, show 3-4 clickable question chips that help users explore deeper or pivot to related topics.

*Visual Design:*
```
[💡 What is task paralysis?] [🧠 Why does my brain freeze?]
[🔄 How is this different from procrastination?] [✅ How do I fix this?]
```

*Generation Logic:*
- AI generates 3-4 relevant follow-up questions based on the response
- Questions are conversational and curiosity-driven
- Mix of deeper dives, related concepts, and practical applications
- Always include at least one CTA to switch to Task Mode

*Example Flow:*

**User asks:** "What is procrastination?"

**AI Response:**
> "Procrastination is when you delay tasks even though you know you should do them. It's often caused by fear of failure, perfectionism, or task paralysis.
> 
> Task paralysis is a specific type where your brain freezes because the task feels too big or unclear. Unlike general procrastination, task paralysis isn't about avoiding discomfort—it's about cognitive overwhelm."

**Suggested Questions:**
```
[💡 What is task paralysis?]
[🧠 Why does my brain freeze on tasks?]
[🔄 How is procrastination different from paralysis?]
[✅ I want to break down a task] → switches to Task Mode
```

*UX Benefits:*
- ✅ Keeps users engaged (reduces bounce rate)
- ✅ Builds knowledge graph (users explore interconnected concepts)
- ✅ Gamifies learning (curiosity loop)
- ✅ Smooth transition to Task Mode when ready
- ✅ Creates "aha" moments (Duolingo-style discovery)

*Tracking:*
- Track which follow-up questions are most clicked
- Identify popular exploration paths
- Use data to improve question generation
- A/B test different question styles

**Mixed Mode**
- **Triggered when:** User wants both help AND understanding
- **Example:** "I'm stuck on my resume but I also want to understand why this always happens"
- **Response Structure:**
  1. Quick action breakdown (collapsible)
  2. Brief explanation below
  3. Links to deeper exploration
- **Goal:** Balance immediate action with learning

**Interactive Knowledge Elements**
- **Wikipedia-Style Tooltips:** Technical terms are underlined/highlighted
- **Hover/Click Behavior:** 
  - Desktop: Tooltip appears on hover
  - Mobile: Tooltip appears on tap
- **Tooltip Content:**
  - Simple definition (40-60 words)
  - Context and examples
  - "Learn more →" link to full Learn Mode response
- **Example Terms:** task paralysis, executive dysfunction, perfectionism, ambiguity, overwhelm, activation energy

**Response Template (Task Mode):**
```
What's blocking you:
🧩 [Blocker Type]

You're experiencing [task paralysis]*—your brain freezes 
when tasks lack clear first steps. Let's break through it:

☐ [Micro-action 1] ([time estimate])
☐ [Micro-action 2] ([time estimate])
☐ [Micro-action 3] ([time estimate])

[Start Focus Mode]  [↻ Regenerate]
[Learn more about task paralysis →]

* = Interactive tooltip
```

**Regenerate Breakdown Feature**

Always shown after task breakdown generation. Critical for both UX and data collection.

*Simple Regenerate (Single Button):*
```
Not quite right?  [↻ Regenerate]
```

*Advanced Options (Expandable):*
```
Or specify what you need:
[⬇ Make steps smaller]  [⚡ Make steps faster]
[📝 More detailed]      [🔄 Different approach]
```

**Behavior:**
- Clicking "Regenerate" generates new breakdown with slight variation
- Specific buttons (smaller/faster/etc.) adjust the prompt accordingly
- Each regeneration is tracked for learning
- Free users: 2 regenerations per breakdown
- Premium users: Unlimited regenerations
- After 3 regenerations: Offer to switch to Learn Mode or human support

**Why This Matters:**
- Immediate UX win: Users get helpful breakdown without abandoning
- Data goldmine: Learn what "good" means per user
- Reduces session abandonment by 40-60% (estimated)
- Builds user's "ideal breakdown style" profile over time

**Response Template (Learn Mode):**
```
📚 Learning Mode

[Concept Name]: Understanding the Psychology

[2-3 paragraph explanation of the concept, causes, 
who experiences it, scientific backing]

Common Causes:
• [Cause 1 with brief explanation]
• [Cause 2 with brief explanation]
• [Cause 3 with brief explanation]

Related Concepts:
• [Related concept 1]* - Brief description
• [Related concept 2]* - Brief description
• [Related concept 3]* - Brief description

---

Explore more:
[💡 Follow-up question 1] [🧠 Follow-up question 2]
[🔄 Follow-up question 3] [✅ I want to break down a task →]

* = Links to other Learn Mode responses
```

**Example Learn Mode Response:**
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
```

**Mode Detection Logic**
- AI analyzes user input semantically
- Classifies intent as: action, learning, or mixed
- Routes to appropriate response type
- Visual indicator shows current mode
- User can manually switch modes anytime

**Benefits of Dual Mode:**
- ✅ Builds credibility and trust (scientific backing)
- ✅ Respects user time (short by default, deep on demand)
- ✅ Handles diverse user needs (doers vs. learners)
- ✅ Educational over time (users learn psychology gradually)
- ✅ Premium feel (interactive, intelligent system)
- ✅ Reduces user frustration (always gets appropriate response)

**Blocker Identification**
AI categorizes blockers into types:
- 🧩 **Ambiguity** - Task is unclear or undefined
- 🎯 **Overwhelm** - Task feels too big
- ✨ **Perfectionism** - Fear of not doing it perfectly
- 🔄 **Overthinking** - Analysis paralysis
- 💭 **Avoidance** - Emotional resistance
- ⚡ **Low Energy** - Lack of motivation or fatigue
- 🧠 **Executive Dysfunction** - Can't initiate despite wanting to

**Task Breakdown Algorithm**
- Generates 3-5 micro-actions (never more)
- Each action is 2-5 minutes maximum
- Actions are sequential and build on each other
- First action is always extremely easy (lower activation energy)
- Time estimates shown for each action
- Actions focus on "done is better than perfect"

### 5.2 Focus Mode

**UI Transformation**
- Same chat interface, UI changes dynamically
- Actions become interactive elements with:
  - Large, satisfying checkboxes
  - [▶ Start] button for optional timer
  - Time estimate displayed
  - Progress indicator (1 of 3, 2 of 3, etc.)
- Can exit Focus Mode anytime to return to chat
- Input field still available (can ask for help mid-Focus)

**Timer Functionality**
- Optional countdown timer for each action
- Shows remaining time
- Gentle sound/vibration when time is up
- Can extend or skip timer
- Timer pauses if user exits Focus Mode

**Progress Tracking**
- Visual progress bar showing completion
- Real-time XP counter updating
- Celebration animations on each completion
- Cumulative time tracked for session

### 5.3 Gamification System

**Streaks**
- Daily streak counter (🔥 emoji + number)
- Visible on home screen at all times
- Counts consecutive days with at least 1 completed action
- Visual calendar showing checked days
- Longest streak stat displayed
- Streak freeze option (1 per week, premium feature)

**Experience Points (XP) & Levels**
- Actions completed: +10 XP each
- All actions in session completed: +50 XP bonus
- 7-day streak: +100 XP bonus
- Achievement unlocked: +25 XP
- Level progression: 
  - Level 1: Beginner (0-100 XP)
  - Level 2: Starter (100-300 XP)
  - Level 3: Action Taker (300-600 XP)
  - Level 4: Momentum Builder (600-1000 XP)
  - Level 5: Unstoppable (1000-1500 XP)
  - Level 6-10+: Continue with increasing thresholds
- Visual progress bar showing XP to next level
- Level-up animations with confetti/celebration

**Achievements / Trophies**

*Starter Achievements:*
- 🎯 First Action - Complete your first micro-action
- ✨ First Day - Use Zelos for the first time
- 🔥 3-Day Streak - Build consistency
- 📊 10 Actions - Action Taker
- 🌟 First Week - Use Zelos for 7 days

*Progress Achievements:*
- 📊 50 Actions - Momentum Builder
- 📊 100 Actions - Unstoppable
- 📊 500 Actions - Legend
- 📊 1000 Actions - Elite

*Skill-Based Achievements:*
- 🧠 Blocker Buster - Overcome 10 different blocker types
- ⚡ Quick Starter - Complete action within 1 min of breakdown
- 🎯 Focused - Complete all actions in 5 sessions
- 🏃 Speed Demon - Complete action faster than estimated time 10 times
- 🦸 Comeback - Return and complete action after getting stuck again

*Time-Based Achievements:*
- 🔥 Week Warrior - 7-day streak
- 🔥 Month Master - 30-day streak
- 🔥 Century Club - 100-day streak
- 🦅 Morning Person - Complete 10 actions before 10am
- 🌙 Night Owl - Complete 10 actions after 10pm

*Special Achievements:*
- 🌟 Early Adopter - Join in first 500 users
- 🎉 Comeback King - Return after 30+ days away
- 🚀 Perfect Week - Complete actions every day for 7 days
- 💪 Overachiever - Complete 10+ actions in one day

*Social Achievements:*
- 🤝 Referral - Invite a friend who completes first action
- 👥 Community Builder - 5 referrals
- 🌍 Ambassador - 20 referrals

**Challenges**

*Daily Challenges:*
- Complete 3 actions before noon (Reward: 2x XP + Early Bird badge)
- Complete 5 actions today (Reward: 100 XP bonus)
- Try a new blocker type (Reward: Blocker Explorer badge)

*Weekly Challenges:*
- Complete at least 1 action every day this week (Reward: 500 XP + Consistency King trophy)
- Complete 20 actions this week (Reward: Weekly Champion badge)
- Use Focus Mode 5 times (Reward: Focus Master badge)

*Monthly Challenges:*
- 30-day streak (Reward: Month Master + 1 month premium free)
- Complete 100 actions this month (Reward: Elite Status badge)

**Visual Celebrations**
- Checkbox animations (satisfying pop/bounce)
- Confetti animation on major completions
- Level-up full-screen takeover with animation
- Achievement unlock modal with trophy display
- Progress bar fill animations
- Haptic feedback on mobile
- Sound effects (optional, can toggle off)

### 5.4 Memory & Personalization

**User Profile Data**
- Name (optional, for personalization)
- Timezone (for optimal notification timing)
- Common task types (learned automatically)
- Preferred AI tone (formal, friendly, motivational)
- Typical stuck times (morning, afternoon, evening)

**Action History**
- All completed actions stored
- Timestamps and completion duration
- Associated blocker types
- Success/skip status
- Notes or reflections (optional user input)

**Blocker Patterns**
- Tracks most common blocker types
- Identifies trigger situations (e.g., always stuck on emails)
- Recognizes time-of-day patterns
- Notices task category patterns (work vs. personal)

**Effective Strategies**
- Learns which micro-action styles work best for user
- Tracks which breakdown formats lead to completion
- Remembers which validation styles resonate
- Notes optimal action length for user (2 min vs. 5 min)

**Project Tracking**
- Identifies recurring projects (e.g., "resume" mentioned 3 times)
- Shows project history and progress
- Can continue multi-session projects
- Suggests next steps based on previous sessions

**AI Personalization**
- System prompt adapts based on user patterns
- References past successes ("Last time emails overwhelmed you, starting with one reply worked")
- Adjusts language complexity to user's style
- Remembers user preferences (e.g., "You mentioned you work better in mornings")
- Predicts likely blockers based on task type

### 5.5 Push Notifications

**Notification Types**

*Streak Maintenance:*
- Daily reminder (time chosen by user, default 9am)
- "Good morning! Ready to keep your 7-day streak? 🔥"
- If missed: "Your streak is safe until midnight—come back anytime!"
- Streak at risk (11pm if no activity): "15 minutes to keep your streak alive 🔥"

*Follow-Up Accountability:*
- 2 hours after starting Focus Mode: "How'd it go with [task]?"
- Options: "Finished!" / "Still working" / "Got stuck again"
- Adaptive based on response

*Weekly Report:*
- Sunday evening (8pm): "Your week in review is ready 📊"
- Teaser: "You completed 12 actions this week!"

*Achievement Unlocks:*
- Immediate notification when achievement earned
- "🎉 Achievement unlocked: Action Taker!"

*Challenge Reminders:*
- If enrolled in challenge: "6 hours left in Daily Challenge"
- "You're 2 actions away from completing Weekly Challenge"

*Re-engagement:*
- After 3 days inactive: "Miss you! Ready to get unstuck? 👋"
- After 7 days: "Your personal task-breaker is waiting for you ✨"
- After 30 days: "Welcome back! Let's start fresh 🌟"

*FOMO Triggers:*
- "72 people completed today's challenge. Will you?"
- "Your weekly report drops in 2 hours!"
- "You're 1 action away from beating your best week!"

**Notification Settings**
- Granular controls (can disable specific types)
- Quiet hours setting
- Frequency limits (max notifications per day)
- Tone preference (motivational, gentle, neutral)
- Can snooze notifications
- "Do Not Disturb" mode

**Notification Tone - Always Positive**
- Never guilt-inducing or shaming
- Supportive and encouraging
- Focus on fresh starts, not failures
- Example bad: "You broke your streak 😢"
- Example good: "Ready to start fresh? 🌟 Your longest streak was 7 days—you can do it again!"

### 5.6 Weekly Reports & Insights

**Report Components**

*Summary Stats:*
- Total actions completed this week
- Number of projects worked on
- Total Focus Mode time
- Streak status and changes
- XP gained this week
- Level progress
- Achievements unlocked

*Blocker Analysis:*
- Most common blocker type (with percentage)
- Blocker distribution pie chart/bar graph
- Trend compared to previous week

*Behavioral Insights:*
- Best time of day for completing actions
- Average action completion time
- Most productive day of the week
- Completion rate (actions completed vs. generated)
- Success patterns identified

*Personalized Recommendations:*
- "You complete 3x more actions when you start in the morning"
- "Your completion rate is highest for 2-minute tasks"
- "You get stuck on ambiguous tasks—try asking for more specific breakdowns"
- "Mondays are your most productive day"

*Project Progress:*
- List of projects worked on with status
- Incomplete projects needing attention
- Suggested next steps for ongoing projects

*Celebration & Comparison:*
- Comparison to personal best week
- "This is your best week yet!" callouts
- Percentage improvement over previous weeks
- Encouraging messages for tough weeks

*Shareable Stats Card:*
- Beautiful visual summary (Instagram-style)
- Can share on social media
- Shows streak, actions, level
- Branded with Zelos logo

### 5.7 Social Proof & Community

**Real-Time Activity Feed**
- Anonymous actions completed by other users
- "Someone just completed 'Write cover letter'" (2 min ago)
- Updates in real-time
- Opt-in to appear in feed (anonymous)
- Creates sense of community

**Aggregate Stats**
- Total users currently active
- Total actions completed today/all-time
- "847 people used Zelos today to get unstuck"
- Growing number builds trust

**Duolingo-Style Competition System**

*Friend System:*
- Add friends via username or invite link
- Friend list shows: avatar, current streak, level
- Friend activity feed: "Alex completed 5 actions today 🔥"
- Max 50 friends (unlimited for Premium)

*Weekly Leaderboard (Duolingo-Style):*
- Shows you + your friends by default
- "This Week" tab: Actions completed (Mon-Sun)
- "All Time" tab: Total XP earned
- Real-time updates when friends complete actions
- Your rank highlighted in different color
- Top 3 get trophy icons (🥇🥈🥉)
- Can expand to see global top 100 (opt-in)
- Anonymous mode: participate but hidden from others

*League System (Like Duolingo):*
- 5 leagues: Bronze → Silver → Gold → Platinum → Diamond
- Everyone starts in Bronze
- Top 10 in your league get promoted each week
- Bottom 5 get demoted (except Bronze)
- Each league has ~50 random users
- Creates urgency: "You're #12. Complete 2 more actions to promote!"
- Premium users get league shields (save from demotion once)

*Challenge System:*
- Send challenges to friends: "I dare you to complete 3 actions today"
- Accept/decline challenges
- Head-to-head: "Who can complete 5 actions first?"
- Winner gets bonus XP (25 XP)
- Challenge history stored in profile
- Achievement: "Challenge Champion" (win 10 challenges)

*Social Pressure Notifications:*
- "Alex just passed you on the leaderboard! 👀"
- "You're 1 action away from beating Sarah this week"
- "3 of your friends completed their streak today. Will you?"
- Can disable in settings (but defaults ON for engagement)

**Success Stories / Testimonials**
- Real user quotes (with permission)
- Before/after stories
- Video testimonials (premium users)
- Rotating display on landing page

**Referral System**
- Unique referral link for each user
- Track referrals in profile
- Rewards for successful referrals:
  - Referrer: 1 week premium free per referral
  - Referee: 1 week premium free trial
- Referral achievement badges
- Leaderboard for top referrers

**Seeding Social Proof (Early Stage)**
- Can inflate aggregate numbers ethically (e.g., 10x multiplier until 1000 users)
- "847 people used Zelos today" (really 84 users)
- Anonymous activity feed can be seeded with realistic examples
- Total actions cumulative (can start at 100,000 even with few users)
- Once real numbers are substantial, use actual data

### 5.8 Premium Features

**Free Tier Includes:**
- Unlimited task breakdowns
- Basic memory (7 days of history)
- Streak tracking
- Basic achievements
- 3 Focus Mode sessions per day
- Daily challenges
- Push notifications (limited to 3/day)
- Friend system (max 50 friends)
- Weekly leaderboards (friends only)
- League participation
- Send/receive challenges (max 3 active)

**Premium Tier ($9.99/month or $79/year):**
- Unlimited Focus Mode sessions
- Long-term memory (all history, forever)
- Advanced behavioral insights
- Weekly reports with trends
- Unlimited push notifications
- Custom notification timing
- Streak freeze (1 per week)
- Priority support
- **Voice input** (speak tasks, 50+ languages)
- **Voice output** (AI reads responses - optional)
- **Unlimited transcriptions** (no per-minute limits)
- Custom themes
- Export data (CSV/JSON)
- Behavioral Operating Manual (PDF export)
- Early access to new features
- Remove daily action limit
- Challenge history and analytics
- Project management features
- Unlimited friends
- Global leaderboard access
- League demotion shield (1 per week)
- Advanced challenge types
- Friend activity notifications
- Unlimited breakdown regenerations

### 5.9 Accessibility & Customization

**Visual Customization**
- Light/Dark mode toggle
- High contrast mode
- Font size adjustment
- Color blind friendly palettes
- Reduced motion option (disable animations)
- Custom themes (premium): Midnight, Ocean, Forest, Sunset

**Input Options**

*Text Input (Default - All Users):*
- Large, inviting textarea
- Placeholder with examples
- Paste from clipboard
- Quick action templates ("Start studying", "Write email", "Clean room")
- Auto-save drafts (in case of accidental refresh)

*Voice Input (Premium Feature):*
- **How It Works:**
  - Tap microphone icon 🎤
  - Speak your task naturally
  - Live transcription appears
  - Edit transcription if needed
  - Submit to AI
- **Technology:** OpenAI Whisper API + Web Speech API fallback
- **Languages Supported:** 50+ languages (English, Spanish, French, German, Portuguese, Hindi, Japanese, Chinese, Arabic, etc.)
- **Use Cases:**
  - Mobile users (hands-free)
  - Users with dyslexia/ADHD
  - Walking/commuting
  - Faster than typing
  - Reduces activation energy when stuck
- **Privacy:** Audio not stored, only transcription kept
- **Accuracy:** 95%+ with Whisper, editable before submit
- **Platform Support:**
  - ✅ Mobile web browsers (iOS Safari, Chrome, Android Chrome)
  - ✅ Desktop (Chrome, Edge, Safari, Firefox)
  - ✅ Native apps (Phase 3)

*Voice Output (Premium Feature - Optional):*
- AI can read responses aloud
- "Listen" button on each breakdown
- Text-to-speech (OpenAI TTS)
- Adjustable speed
- Pause/resume playback
- Great for audio learners

**Why Voice is Premium:**
- API costs (~$0.006/min transcription)
- Premium user experience
- Reduces friction significantly
- Expected feature in 2026
- Strong conversion driver

**Language & Tone**
- AI tone selection: Supportive, Motivational, Neutral, Playful
- Language support (Phase 2): Spanish, French, German, Portuguese
- Reading level adjustment
- Emoji density preference (more/less emojis)

**Platform**
- Fully responsive web app (mobile-first design)
- Works on all modern browsers (Chrome, Safari, Edge, Firefox)
- Mobile web (iOS Safari, Android Chrome) - no installation needed
- Cross-device sync via cloud
- Native iOS/Android apps (Phase 3 - after 500+ active users)

### 5.10 Onboarding

**First-Time User Experience**

*Step 1: Welcome Screen*
- "Welcome to Zelos! 👋"
- Brief value prop: "Break through task paralysis in under 60 seconds"
- Attractive visual/animation

*Step 2: Quick Setup*
- Optional: Enter name for personalization
- Choose preferred AI tone (3-4 options with examples)
- Allow notifications (explain value: "Stay on track with gentle reminders")
- Skip option for all

*Step 3: Interactive Tutorial*
- Guided first task breakdown
- "Try it now: What are you stuck on?"
- Example prompts shown: "I need to study for my exam" / "I should clean my room"
- User inputs real task or uses example
- AI breaks it down
- User completes at least one action
- Celebration + explanation of what just happened

*Step 4: Feature Highlights*
- Carousel showing: Streaks, Achievements, Focus Mode, Weekly Reports
- "You just earned your first achievement! 🎯"
- Explain XP and leveling

*Step 5: Set Daily Reminder*
- "When should we remind you?" (morning/afternoon/evening/never)
- Explain streaks benefit

**Progressive Disclosure**
- Features revealed gradually over first week
- Day 1: Just chat and basic breakdown
- Day 2: Focus Mode introduced
- Day 3: Achievements unlocked
- Day 7: Weekly report preview
- Day 14: Premium features teaser

### 5.11 Data & Privacy

**User Data Storage**
- User owns their data
- Can export anytime
- Can delete account and all data anytime

**Privacy Principles**
- No selling of user data
- No third-party tracking
- Minimal data collection (only what's needed)
- Anonymous analytics only
- GDPR compliant
- Clear privacy policy

**AI Interactions**
- Conversations with AI are private
- User can delete conversation history
- No human review of conversations unless user reports issue

### 5.12 Medical & Legal Boundaries

**What Zelos IS:**
- ✅ A productivity tool for task initiation
- ✅ A behavioral coaching system for procrastination
- ✅ An educational resource about common psychological blockers
- ✅ A gamified habit-building app
- ✅ A complement to professional support (therapy, coaching)

**What Zelos is NOT:**
- ❌ NOT a medical device or health app
- ❌ NOT a mental health treatment or therapy service
- ❌ NOT a diagnostic tool for ADHD, depression, anxiety, or any condition
- ❌ NOT a replacement for professional mental health care
- ❌ NOT qualified to handle crisis situations or emergencies
- ❌ NOT providing medical, psychiatric, or psychological advice

**Clear Disclaimers (Shown to Users):**

*During Onboarding:*
```
Important Notice

Zelos is a productivity tool, not a medical or mental health service.

We help you break down tasks and build action-taking habits, but we:
• Do NOT diagnose or treat mental health conditions
• Do NOT replace therapy, counseling, or medical care
• Do NOT provide crisis support or emergency services

If you're experiencing a mental health crisis, please contact:
• National Suicide Prevention Lifeline: 988 (US)
• Crisis Text Line: Text HOME to 741741
• Your local emergency services

By continuing, you acknowledge that Zelos is a productivity tool only.

[I Understand] [Learn More]
```

*In-App Footer (Always Visible):*
```
Zelos is a productivity tool, not a medical service. Not a substitute for professional care.
```

*AI Response Disclaimers (When Appropriate):*
- If user mentions: "depression," "suicidal," "self-harm," "crisis," "medication":
  ```
  I'm a productivity tool and can't help with medical or mental health issues. 
  If you're in crisis, please reach out to a professional:
  • National Suicide Prevention Lifeline: 988
  • Crisis Text Line: Text HOME to 741741
  
  For ongoing support, consider speaking with a therapist or counselor.
  
  I'm here to help with task breakdowns when you're ready. ❤️
  ```

**AI Prompt Guardrails:**

*System Prompt Restrictions:*
```
CRITICAL BOUNDARIES:
1. You are a productivity tool, NOT a therapist, doctor, or mental health professional
2. NEVER diagnose conditions (ADHD, depression, anxiety, etc.)
3. NEVER recommend medication, supplements, or medical treatments
4. NEVER provide therapy or mental health counseling
5. If user mentions crisis keywords (suicide, self-harm, severe distress), 
   redirect to crisis resources immediately
6. Focus ONLY on practical task breakdown, not emotional healing
7. Use educational language about "common patterns" not "your condition"
8. Frame blockers as behavioral patterns, not clinical diagnoses
```

*Trigger Keywords for Auto-Redirect:*
- suicide, suicidal, kill myself, end it all
- self-harm, cut myself, hurt myself
- crisis, emergency, can't cope
- severe depression, major depression
- meds, medication, prescription (unless clearly about task paralysis with medication)
- diagnosed with, my therapist, my psychiatrist (acknowledge but stay in lane)

**Language We Use:**

✅ Safe Language:
- "Common blocker pattern"
- "Behavioral tendency"
- "Procrastination style"
- "Getting stuck is normal"
- "This happens to many people"
- "Let's break this down into smaller steps"

❌ Avoid:
- "You have ADHD"
- "This is depression"
- "You need therapy"
- "Your mental health condition"
- "Clinical diagnosis"
- "Treatment plan"

**Legal Terms of Service:**

Required in Terms of Service:

```
MEDICAL DISCLAIMER

Zelos is a productivity and task management application. It is NOT a medical device, 
mental health service, therapy platform, or diagnostic tool.

1. No Medical Advice: The information provided by Zelos is for informational and 
   productivity purposes only. It is not a substitute for professional medical advice, 
   diagnosis, or treatment.

2. No Therapeutic Relationship: Use of Zelos does not create a therapist-patient, 
   doctor-patient, or any professional healthcare relationship.

3. Not for Crisis: Zelos is not designed for or capable of handling mental health 
   crises or emergencies. If you are experiencing a crisis, call 988 (US), 
   text HOME to 741741, or contact your local emergency services.

4. Consult Professionals: Always seek the advice of qualified healthcare providers 
   with any questions regarding medical or mental health conditions.

5. No Liability: Zelos, its creators, and operators are not liable for any health-related 
   decisions made based on information provided by the application.

By using Zelos, you acknowledge you have read and understood this disclaimer.
```

**Compliance Strategy:**

*Regulatory Position:*
- Position as "productivity software" not "health/wellness app"
- Avoid FDA regulation by NOT making health claims
- Avoid psychology board regulation by NOT providing therapy
- Comply with FTC guidelines (no misleading health claims)

*Marketing Guidelines:*
- ✅ "Productivity tool for task paralysis"
- ✅ "Habit-building system for action-takers"
- ✅ "Break through procrastination"
- ❌ "Treat ADHD symptoms"
- ❌ "Cure anxiety and depression"
- ❌ "Mental health solution"

*Partnerships:*
- Partner with ADHD coaches (not psychiatrists) for affiliates
- Partner with productivity experts (not therapists)
- Partner with life coaches (not clinical psychologists)

**Crisis Handling Protocol:**

*If User Expresses Crisis:*
1. Immediately show crisis resources (988, Crisis Text Line)
2. Stop all task-related responses
3. Log event for human review (flag account for monitoring)
4. Send follow-up email with resources (optional, not pushy)
5. Do NOT attempt to "help" or "coach" through crisis
6. Do NOT collect sensitive crisis data in analytics

*Example Response:*
```
I'm concerned about what you shared. Zelos isn't equipped to help in crisis situations, 
but there are people who can:

🆘 Immediate Help:
• Call or text 988 (National Suicide Prevention Lifeline)
• Text HOME to 741741 (Crisis Text Line)
• Call 911 or go to your nearest emergency room

Please reach out to them now. Your safety matters. ❤️

When you're ready, I'll be here to help with task breakdowns.
```

**User Testing Safeguards:**

*Beta Testing:*
- Include disclaimer at signup
- Monitor for medical/therapeutic language in user inputs
- Flag sessions with crisis keywords for review
- Refine AI prompts based on boundary violations

*Ongoing Monitoring:*
- Track % of sessions with medical keywords
- Alert if AI provides therapy-like responses
- Regular audit of AI output for boundary violations
- Update guardrails based on real usage patterns

---

### 5.13 Support & Help

**In-App Help**
- FAQ section
- Video tutorials
- Tooltips on key features
- Contextual help ("What's Focus Mode?")
- Search functionality

**User Support**
- Email support (help@zelos.app)
- Response time: <24 hours (free), <4 hours (premium)
- In-app bug reporting
- Feature request form
- Feedback mechanism after each session

### 5.14 Community
- Link to Discord/Slack community (future)
- Reddit presence (r/Zelos)
- Blog with productivity tips
- User stories section

---

## 6. Data & Learning Systems

### 6.1 Feedback Loop (Post-Task Success Tracking)

**Core Principle:** Every interaction should end with data collection to continuously improve AI effectiveness.

**Implementation:**

*Immediate Feedback (After Task Breakdown):*
- 10 minutes after receiving action plan, prompt appears:
  - "Did this help you get started?"
  - Options:
    - ✅ Yes, I started
    - 🟡 Partially helpful
    - ❌ No, still stuck
    - ⏭️ Skip (no pressure)

*Action-Level Tracking:*
- User marks actions as:
  - ✅ Completed
  - ⏭️ Skipped (optional: "Why did you skip?")
  - 🔄 Modified (user changed the action)
  - ⏸️ Paused

*Session-Level Metrics:*
- Completion rate per session
- Time to first action started
- Time between actions
- Session abandonment point

**Analytics Dashboard (Premium):**

```
Portfolio Tasks
├─ Success Rate: 82%
├─ Avg. Actions: 3.2
├─ Completion Time: 18 min
└─ Most Helpful Blocker: Ambiguity

Interview Prep
├─ Success Rate: 63%
├─ Avg. Actions: 4.5
├─ Completion Time: 35 min
└─ Most Helpful Blocker: Overwhelm

Cleaning Tasks
├─ Success Rate: 91%
├─ Avg. Actions: 2.8
├─ Completion Time: 12 min
└─ Most Helpful Blocker: Avoidance
```

**AI Learning Loop:**
1. Collect feedback on every breakdown
2. Tag sessions by task type (study, work, personal, health)
3. Identify patterns: Which blocker + task type = highest success?
4. Adjust future prompts based on historical success rate
5. Premium users get "Your AI has learned from 47 past tasks"

**Advanced Feedback Systems:**

*1. Breakdown Quality Feedback*

Shown immediately after task breakdown is generated:

```
Were these steps:
○ Too easy
○ Just right  ✓
○ Too hard
```

**Purpose:** Improve task decomposition quality. Learn optimal granularity per user.

**Data Collected:**
- Step difficulty rating
- Correlation with completion rate
- User preference patterns

*2. Blocker Classification Validation*

After AI identifies blocker:

```
AI detected: Primary blocker is Ambiguity

Is this accurate?
○ Accurate ✓
○ Somewhat accurate
○ Incorrect
```

**Purpose:** Improve blocker detection accuracy. Build labeled behavioral data for ML.

**Data Collected:**
- Blocker classification accuracy
- False positive patterns
- User self-awareness alignment

*3. Outcome Feedback ("What Happened Next?")*

10-30 minutes after session ends, non-intrusive notification:

```
Quick check: What happened with [task name]?

○ Started task ✓
○ Worked briefly (< 5 min)
○ Worked for a while (5-15 min)
○ Finished task
○ Didn't start

[Optional: Why not?]
```

**Purpose:** Measure real-world effectiveness (not just user satisfaction).

**Data Collected:**
- Actual behavior vs. intention
- Time-delayed success measurement
- Abandonment reasons

*4. Breakdown Failure Analysis*

Triggered when user selects "Not Helpful" or "Still Stuck":

```
What made this breakdown unhelpful?

□ Steps too large
□ Steps too small
□ Didn't understand my situation
□ Already knew this
□ Wrong blocker identified
□ Not specific enough
□ Too overwhelming still
□ Other: [text field]
```

**Purpose:** Understand why interventions fail. Identify AI weakness areas.

**Data Collected:**
- Failure modes by category
- Patterns in failed sessions
- User expectation mismatches

*5. Step-Level Friction Detection*

If user abandons checklist midway (e.g., completes 2/5 actions then leaves):

```
We noticed you stopped at step 3. What happened?

○ Step became too difficult
○ Ran out of time
○ Lost motivation
○ Distracted by something else
○ Realized I needed different steps
○ [Skip this question]
```

**Purpose:** Identify failure points in generated plans. Find "friction steps."

**Data Collected:**
- Abandonment point analysis
- Which step types cause drop-off
- Sequential vs. jump-around patterns

*6. Alternative Solution Capture*

When user marks all actions "Skipped" but later reports "Finished Task":

```
Great! You finished it! 🎉

Since you didn't follow our steps, how did you solve it?

[Free text field]

Examples:
• "I asked a friend for help"
• "I found a template online"
• "I just forced myself to start without planning"
```

**Purpose:** Discover interventions the AI doesn't currently know. Expand strategy library.

**Data Collected:**
- Alternative approaches users find
- Workarounds for common blockers
- Community-sourced solutions

*7. Behavioral Pattern Confirmation*

Inside weekly report (Section 6.4):

```
Based on 8 sessions this week, your biggest blocker appears to be:

🎯 Ambiguity (appeared in 5 of 8 tasks)

Is this correct?
○ Yes, that's accurate ✓
○ Partially correct
○ No, I don't think so
```

**Purpose:** Prevent inaccurate long-term behavioral profiles. User-confirmed labels.

**Data Collected:**
- User self-perception vs. AI detection
- Profile confidence scores
- Long-term pattern validation

*8. Intervention Effectiveness Tracking*

Track success rate by intervention strategy automatically:

```
Your Intervention Success Rates:

Micro-Steps         ███████████ 82% (12 uses)
Timeboxing          ███████     61% (8 uses)
Brain Dump          ████        44% (5 uses)
Reflection Prompts  ███         38% (3 uses)
Accountability      ██████      58% (2 uses)

[View Details]
```

**Purpose:** Enable future personalization. Show users what works for them.

**Data Collected:**
- Strategy effectiveness per user
- Strategy combinations that work
- Context-dependent success (morning vs evening, work vs personal)

*9. Abandonment Analytics*

Track where users leave the flow (automatic, no user prompt):

**Funnel Stages:**
1. Task input submitted
2. Blocker detection shown
3. Validation message shown
4. Checklist generated
5. First action started
6. Focus mode entered
7. Multiple actions completed
8. Session marked complete

**Purpose:** Identify UX bottlenecks. Find where experience breaks down.

**Data Collected:**
- Drop-off points by stage
- Time spent at each stage
- Device/browser correlations
- Power user vs. casual user patterns

*10. Regenerate Breakdown Variants ("This Doesn't Help" Button)*

**Critical Feature:** Always show "Regenerate" button after breakdown.

```
Not quite right?

[↻ Regenerate]

Or specify what you need:

[⬇ Smaller Steps]      [⚡ Faster Steps]
[📝 More Detailed]      [🔄 Different Strategy]
[💤 Lowest Effort]      [🚀 High Momentum]
```

**Regeneration Modes:**

*Smaller Steps:*
- Break actions into even tinier chunks
- Example: "Write intro" → "Open doc and type first 5 words"

*Faster Steps:*
- Reduce time estimates, focus on speed over thoroughness
- Example: "Research 3 sources (15 min)" → "Skim 1 source (5 min)"

*More Detailed:*
- Add specificity and context to each step
- Example: "Send email" → "Draft 3-sentence email to Jane about project deadline"

*Different Strategy:*
- Try alternative approach (planning vs. action-first, structured vs. freeform)
- Example: "Plan structure" → "Brain dump everything, organize later"

*Lowest Effort Possible:*
- Minimize activation energy, absolute easiest version
- Example: "Start presentation" → "Open slides, add title slide with your name"

*High Momentum Mode:*
- Focus on rapid wins, build psychological momentum
- Example: Generate 5 x 2-minute tasks instead of 3 x 5-minute tasks
- Optimizes for dopamine hits

**When user clicks:**
- Log which variant they requested
- Generate new breakdown with adjustment
- Track if new breakdown was more successful
- Learn user's preferred breakdown style

**Example Adjustments:**

*"Make steps smaller":*
```
Original: "Write introduction paragraph"
Adjusted: "Open doc and type first sentence"
```

*"Make steps faster":*
```
Original: "Research 3 sources (15 min each)"
Adjusted: "Skim 1 source for key quotes (5 min)"
```

*"Different approach":*
```
Original: "Plan out structure first"
Adjusted: "Brain dump everything, organize later"
```

**Purpose:** 
- Immediate UX win (users get helpful breakdown)
- Data goldmine (learn what "good" looks like per user)
- Reduces session abandonment
- Builds preference model

**Data Collected:**
- Regeneration frequency
- Which adjustments users request
- Success rate: original vs. regenerated
- User's "ideal breakdown style" over time

**Regeneration Limits:**
- Free users: 2 regenerations per breakdown
- Premium users: Unlimited regenerations
- After 3 regenerations: "Want to chat instead?" (switch to Learn Mode)

---

### 6.2 Outcome Tracking (Did User Become Unstuck?)

**Problem:** Most apps track "tasks completed" but we care about "user became unstuck"

**Metrics We Track:**

*Primary Outcome Metrics:*
- **Started Task?** (Binary: Yes/No)
  - Tracked via: First action marked complete OR user confirms "I started"
- **Worked for >5 minutes?** (Short engagement)
  - Tracked via: Timer data OR second action completed
- **Worked for >15 minutes?** (Deep work achieved)
  - Tracked via: Focus Mode duration OR 3+ actions completed
- **Finished Task?** (Full completion)
  - Tracked via: All actions marked complete OR user confirms "Task finished"

*Secondary Metrics:*
- Time from breakdown to first action (speed to unstuck)
- Momentum score: Did user complete next action within 10 min?
- Return rate: Did user come back for next task same day?
- Blocker recurrence: Same blocker type across multiple sessions?

**Success Definition:**

```
Unstuck Event = True IF:
  - User started task (within 30 min of breakdown)
  AND
  - User worked for >5 minutes
  OR
  - User completed ≥2 actions
```

**Dashboard Visualization:**

```
Your Unstuck Score: 78% 🔥

This Week:
├─ 12 tasks attempted
├─ 9 became unstuck (75%)
├─ Avg. time to start: 3.2 minutes
└─ Avg. work duration: 18 minutes

Best Time to Get Unstuck:
├─ Morning (9-11 AM): 91% success
├─ Afternoon (2-4 PM): 68% success
└─ Evening (7-9 PM): 54% success
```

**Why This Matters:**
- Traditional todo apps: "15 tasks completed" (but user procrastinated for days)
- Zelos: "You got unstuck 9 times this week in an average of 3.2 minutes"

---

### 6.3 User State Model (Personalized Behavior Profile)

**Core Moat:** Every user gets a unique behavior profile that makes Zelos increasingly effective over time.

**Data Collected (Passive Learning):**

*Blocker Patterns:*
- Top 3 blockers by frequency
- Blocker combinations (e.g., ambiguity + perfectionism)
- Time-of-day blocker distribution
- Context triggers (work vs personal tasks)

*Task Characteristics:*
- Task types user gets stuck on most (creative, admin, social, physical)
- Task size preference (micro-tasks vs larger chunks)
- Estimated time accuracy (overestimate/underestimate pattern)

*Behavioral Insights:*
- Optimal number of actions per breakdown (2-3 vs 5-7)
- Response to validation messages (helps vs distracts)
- Focus Mode usage patterns
- Completion time distribution

*Intervention Effectiveness:*
- Which AI tone works best (supportive, motivational, neutral)
- Task Mode vs Learn Mode preference ratio
- Tooltip engagement rate
- Challenge acceptance rate (social feature)

**User Profile Structure:**

```typescript
interface UserBehaviorProfile {
  // Blocker Analysis
  topBlockers: [
    { type: 'ambiguity', frequency: 42, successRate: 0.68 },
    { type: 'perfectionism', frequency: 28, successRate: 0.55 },
    { type: 'overwhelm', frequency: 19, successRate: 0.71 }
  ],
  
  // Common Triggers
  triggerPatterns: [
    { context: 'large_open_ended_projects', confidence: 0.85 },
    { context: 'morning_tasks', confidence: 0.72 }
  ],
  
  // Best Interventions (What Works)
  effectiveStrategies: [
    { strategy: 'micro_task_decomposition', successRate: 0.82 },
    { strategy: 'time_boxing', successRate: 0.71 },
    { strategy: 'accountability_nudge', successRate: 0.65 }
  ],
  
  // Worst Interventions (What Doesn't Work)
  ineffectiveStrategies: [
    { strategy: 'long_explanations', successRate: 0.41 },
    { strategy: 'generic_motivation', successRate: 0.38 }
  ],
  
  // Preferences
  preferences: {
    optimalActionCount: 3.2,
    preferredTone: 'supportive',
    respondsToValidation: true,
    respondsToUrgency: false,
    bestTimeOfDay: 'morning',
    focusModeEngagement: 'high'
  }
}
```

**How AI Uses This (Behind the Scenes):**

1. **New Task Arrives:**
   - AI checks: "Similar task type flagged 'ambiguity' blocker 82% of time"
   - AI adjusts prompt to pre-emptively address ambiguity

2. **Generates Breakdown:**
   - User prefers 3 actions (not 5)
   - AI limits to 3 micro-tasks
   - User responds better to "supportive" tone
   - AI uses validation message

3. **User Stuck Again:**
   - AI notices: "Perfectionism blocker on creative tasks"
   - AI includes: "Remember: Done is better than perfect" message
   - Historical success rate with this intervention: 71%

**Premium Feature: "Your AI Profile"**

User can view their profile:

```
Your Behavior Profile

Top Blockers:
1. 🎯 Ambiguity (42 occurrences)
   ├─ Most common: Large open-ended projects
   └─ Success Rate: 68%

2. ✨ Perfectionism (28 occurrences)
   ├─ Most common: Creative work
   └─ Success Rate: 55%

What Works For You:
✅ Breaking tasks into 2-3 micro-steps (82% success)
✅ Timeboxing with Focus Mode (71% success)
✅ Morning task attempts (91% success)

What Doesn't Work:
❌ Long explanations (41% success)
❌ Generic motivation (38% success)

Your AI has learned from 67 past tasks.
```

**Competitive Moat:**
- After 3 months: Your Zelos AI knows you better than any generic AI
- Switching cost: New app = starting from zero
- Network effect: More usage = smarter AI = better results = more usage

---

### 6.3.1 Behavioral Intelligence Layer (The Moat)

**Core Concept:** Every user accumulates a personalized behavioral operating manual.

This is the future competitive advantage of Zelos. Over time, each user builds a comprehensive profile that makes generic AI assistants obsolete.

**What Gets Accumulated:**

*Blocker Distribution:*
```
Your Top Blockers (67 sessions analyzed):
├─ Ambiguity: 42% (28 occurrences)
├─ Perfectionism: 28% (19 occurrences)
├─ Overwhelm: 19% (13 occurrences)
└─ Avoidance: 11% (7 occurrences)
```

*Trigger Patterns:*
```
You get stuck when:
├─ Open-ended projects (73% correlation)
├─ Career decisions (68% correlation)
├─ Creative work (61% correlation)
└─ Social commitments (45% correlation)
```

*Effective Interventions (What Works):*
```
Strategies That Work For You:
├─ Micro-steps: 84% success rate (used 34 times)
├─ Timeboxing: 72% success rate (used 18 times)
├─ Body-doubling: 68% success rate (used 9 times)
└─ 5-minute sprints: 63% success rate (used 12 times)
```

*Failed Interventions (What Doesn't Work):*
```
Strategies That Don't Work For You:
├─ Long explanations: 41% success rate
├─ Reflection-first flows: 37% success rate
├─ Planning before action: 35% success rate
└─ Generic motivation: 28% success rate
```

*Context-Dependent Patterns:*
```
Morning (9-11 AM):
├─ Best for: Creative work (91% success)
├─ Worst for: Admin tasks (54% success)
├─ Preferred: 2-3 micro-steps

Afternoon (2-4 PM):
├─ Best for: Admin tasks (82% success)
├─ Worst for: Deep thinking (48% success)
├─ Preferred: 4-5 quick wins

Evening (7-9 PM):
├─ Best for: Low-stakes tasks (67% success)
├─ Worst for: Important decisions (31% success)
├─ Preferred: Single easy task
```

*Task Type Success Matrix:*
```
Creative Work:
├─ Success Rate: 68%
├─ Best Blocker Match: Ambiguity → Micro-steps
├─ Best Time: Morning
├─ Optimal Actions: 2-3

Admin Tasks:
├─ Success Rate: 82%
├─ Best Blocker Match: Avoidance → Timeboxing
├─ Best Time: Afternoon
├─ Optimal Actions: 4-5

Social Tasks:
├─ Success Rate: 59%
├─ Best Blocker Match: Anxiety → Pre-written templates
├─ Best Time: Morning
├─ Optimal Actions: 1-2
```

**How This Gets Used:**

*AI Prompt Adjustment (Automatic):*
```python
# Before: Generic prompt
"Break down this task into actionable steps"

# After 50+ sessions: Personalized prompt
"Break down this task into 2-3 micro-steps (user prefers fewer).
User commonly experiences 'ambiguity' blocker (42% frequency).
Pre-emptively address ambiguity with specific examples.
Avoid long explanations (41% success rate for this user).
User responds well to timeboxing (72% success).
It's morning (user's best time for creative work - 91% success)."
```

*Intervention Selection (Smart):*
- User stuck on creative work + morning + ambiguity blocker
- System automatically selects: Micro-steps (84% success for this user)
- System avoids: Reflection-first (37% success for this user)
- System suggests: "Try 2 steps (your sweet spot), 5 min each"

*Proactive Insights:*
```
📊 Pattern Detected

You've attempted "creative writing" tasks 5 times.

Success: 2 times (40%)
Failure: 3 times (60%)

Common thread: All failures happened in the evening.
All successes happened in the morning.

Suggestion: Schedule creative work for 9-11 AM.
```

**Behavioral Operating Manual (Premium Feature):**

Users can view and export their full behavioral profile:

```markdown
# Your Behavioral Operating Manual

## How You Get Stuck
- **Primary Blocker:** Ambiguity (42%)
- **Secondary Blocker:** Perfectionism (28%)
- **Trigger:** Open-ended projects with no clear first step

## What Works For You
- **Best Strategy:** Break tasks into 2-3 micro-steps
- **Best Time:** Morning (9-11 AM)
- **Best Environment:** Alone, no distractions
- **Best Intervention:** Timeboxing with 5-minute timer

## What Doesn't Work
- Avoid: Long planning sessions before action
- Avoid: Reflection-first approaches
- Avoid: Evening creative work
- Avoid: Generic "just start" advice

## Your Success Formula
1. Work on creative tasks in the morning
2. Use 2-3 micro-steps (not 5-7)
3. Set 5-minute timer for first step
4. Skip validation, go straight to actions
5. Use body-doubling for admin tasks

## Recommendations
- Book 9-11 AM for deep creative work
- Use Zelos for task breakdown
- Delegate admin tasks to afternoon
- Avoid evening commitments when possible

Generated from 67 analyzed sessions.
Last updated: June 12, 2026
```

**Export Options:**
- PDF download
- Notion integration
- Email to therapist/coach
- Share with accountability partner

**Why This Is The Moat:**

*Switching Cost:*
- After 6 months: 100+ sessions analyzed
- Behavioral profile is 95% accurate
- AI knows exactly what works for you
- Switching to ChatGPT = starting from zero

*Network Effect (Individual):*
- More usage → Better profile → Better results → More usage
- Virtuous cycle creates lock-in

*Competitive Advantage:*
- Generic AI: "Here's a task breakdown"
- Zelos: "Based on 67 past sessions, here's what works for YOU"

*Defensibility:*
- Can't be copied with better AI models
- Requires time + user data to build
- Personalization compounds over time
- First-mover advantage: user builds profile once

**Data Privacy:**
- User owns their behavioral profile
- Can export anytime
- Can delete anytime
- Never shared or sold
- Fully encrypted at rest

This is what turns Zelos from "AI task helper" into "irreplaceable behavioral intelligence system."

---

### 6.4 Retention Engine (Daily/Weekly/Monthly Check-ins)

**Goal:** Keep users engaged through self-insight and pattern recognition

**Daily Check-ins (Push Notification + In-App):**

*Morning (9 AM):*
- "What are you avoiding today? 🤔"
- Quick input field
- Optional: "Let's break it down now" CTA

*Evening (7 PM - if no activity):*
- "You haven't checked in today. Everything okay?"
- Options:
  - "I got stuff done!" (celebrate)
  - "I'm stuck" (offer help)
  - "Just a busy day" (acknowledge)

*Streak Reminder (if at risk):*
- "Don't break your 12-day streak! Complete 1 action today 🔥"
- Shows: Time left in day

**Weekly Check-ins (Sunday Evening):**

*Weekly Reflection Email + In-App Card:*

```
Your Week at a Glance 📊

This week you:
├─ Got unstuck 9 times
├─ Completed 27 actions
├─ Maintained your 14-day streak 🔥
└─ Earned 2 new achievements

Here's what we noticed:
🎯 You struggled with "ambiguity" blockers on Monday and Wednesday
✅ Your best day was Thursday (4 tasks completed)
⏰ You're most productive between 9-11 AM

Try this next week:
💡 Schedule creative work for Thursday mornings
💡 Use Learn Mode when feeling ambiguous (69% success rate for you)

[View Full Report]
```

*Pattern Highlights:*
- "You completed 3x more tasks when you started before 10 AM"
- "Your streak days have 2x higher task completion"
- "You skip 'explanation' tasks 80% of the time—we'll show fewer"

**Monthly Check-ins (First of Month):**

*Monthly Transformation Email:*

```
How You've Changed in May 🚀

30 Days Ago:
├─ Success Rate: 58%
├─ Avg. Time to Start: 12 minutes
├─ Top Blocker: Overwhelm

Today:
├─ Success Rate: 78% (+20%! 🎉)
├─ Avg. Time to Start: 3.2 minutes
├─ Top Blocker: Still overwhelm, but you're handling it better

Your Growth:
📈 Completed 47 more actions than last month
🏆 Unlocked 8 new achievements
🔥 Longest streak: 21 days

What's Working:
✅ You discovered Focus Mode works for you (18 sessions)
✅ You respond well to morning reminders (91% open rate)
✅ Micro-task breakdowns are your superpower

Your AI has learned:
🧠 47 new behavior patterns
🎯 Your optimal task count is 3 actions (not 5)
⏰ You peak between 9-11 AM

Keep Going:
💪 You're in the top 15% of active users
🎯 Next goal: Maintain 30-day streak
```

**Why This Works:**
- People love self-insight ("I didn't realize I'm a morning person!")
- Progress visualization creates motivation
- Pattern recognition feels like magic
- Monthly transformation = shareable moment (social proof)

---

### 6.5 Experiment Framework (A/B Testing System)

**Core Principle:** Build based on data, not intuition.

**Experiment Structure:**

```typescript
interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'running' | 'completed' | 'cancelled';
  
  variants: [
    { id: 'control', description: string, trafficPercent: number },
    { id: 'variant_a', description: string, trafficPercent: number },
    { id: 'variant_b', description: string, trafficPercent: number }
  ];
  
  primaryMetric: {
    name: string; // e.g., 'completion_rate'
    type: 'conversion' | 'numeric' | 'duration';
    successThreshold: number;
  };
  
  secondaryMetrics: string[];
  
  results: {
    control: { metric: number, sampleSize: number },
    variant_a: { metric: number, sampleSize: number },
    variant_b: { metric: number, sampleSize: number },
    statisticalSignificance: number, // p-value
    winner: string | null
  };
}
```

**Example Experiments:**

*Experiment 1: Validation Message Impact*
```
Hypothesis:
Showing validation message before task breakdown increases action completion rate.

Control (50%):
User input → AI generates task breakdown (no validation)

Variant A (50%):
User input → Validation message → Task breakdown

Track:
├─ Primary: Action completion rate (% who complete ≥1 action)
├─ Secondary: Time to first action
├─ Secondary: User satisfaction rating
└─ Secondary: Return rate (next day)

Sample Size: 1,000 users per variant
Duration: 7 days
Expected Lift: +15% completion rate
```

*Experiment 2: Optimal Action Count*
```
Hypothesis:
3-action breakdowns have higher completion rate than 5-action breakdowns.

Control (33%): 5 actions
Variant A (33%): 3 actions
Variant B (33%): 4 actions

Track:
├─ Primary: Full session completion rate
├─ Secondary: Time to complete all actions
└─ Secondary: Abandonment point (which action user stops at)

Sample Size: 1,500 users per variant
Duration: 14 days
Expected Lift: +20% completion for 3-action group
```

*Experiment 3: AI Tone Effectiveness*
```
Hypothesis:
"Supportive" tone drives higher engagement than "Motivational" tone.

Control: Neutral tone
Variant A: Supportive tone ("It's okay, let's break this down...")
Variant B: Motivational tone ("You've got this! Let's crush it...")

Track:
├─ Primary: Return rate (7-day)
├─ Secondary: Completion rate
├─ Secondary: User sentiment (feedback ratings)
└─ Secondary: Streak length

Sample Size: 2,000 users per variant
Duration: 21 days
```

**Experiment Dashboard (Internal):**

```
Active Experiments:

🟢 Validation Message Test
   ├─ Status: Running (Day 4 of 7)
   ├─ Control: 68% completion rate (n=523)
   ├─ Variant A: 74% completion rate (n=517)
   ├─ Lift: +8.8% (trending positive ✅)
   └─ Significance: p=0.08 (not yet significant)

🟡 Action Count Test
   ├─ Status: Running (Day 9 of 14)
   ├─ Control (5 actions): 61% completion (n=842)
   ├─ Variant A (3 actions): 79% completion (n=838)
   ├─ Variant B (4 actions): 72% completion (n=851)
   ├─ Winner: Variant A (+29.5%! 🎉)
   └─ Significance: p=0.002 (highly significant ✅✅)

Completed Experiments:

✅ AI Tone Test
   ├─ Winner: Supportive Tone
   ├─ Lift: +18% return rate
   ├─ Launched: 100% rollout on May 15
```

**Experimentation Principles:**
- Always run experiments (not opinions)
- Track both engagement AND quality metrics
- Ship winners fast (don't wait for perfection)
- Document learnings for future reference
- Prioritize high-impact, low-effort tests

---

### 6.6 Failure Recovery (Learning from Incomplete Tasks)

**Problem:** Most apps punish failure (guilt, negative UX). We should learn from it.

**Failure Recovery Flow:**

*Scenario: User abandoned task breakdown*

**24 Hours Later (Gentle Check-in):**

```
In-App Notification:
"Hey, we noticed you didn't finish [writing portfolio]. No pressure—but we're curious what got in the way? 🤔"

Options:
1. ⏰ Too tired
2. 🧠 Forgot about it
3. 📦 Task still felt too large
4. 😰 Anxiety/avoidance
5. 🤷 Other (free text)
6. ✅ Actually, I did finish! (mark complete)
```

**User Selects Option → AI Responds:**

*If "Task still felt too large":*
```
That makes sense! Sounds like we didn't break it down enough.

Want to try again with even smaller steps?

[Yes, let's try] [No, maybe later]
```

*If "Too tired":*
```
Totally fair. Energy matters!

What time of day do you usually have the most energy?

[Morning] [Afternoon] [Evening]

→ We'll remind you then next time 💪
```

*If "Anxiety/avoidance":*
```
We get it. Some tasks trigger that response.

Would it help to talk through what feels scary about this?

[Yes, let's talk] [No, just remind me later]

→ Switches to Learn Mode for emotional support
```

**Failure Pattern Detection:**

*After 3 Similar Failures:*
```
We've noticed a pattern 🔍

You've started 3 "creative writing" tasks but didn't finish any.

Common thread: All had "perfectionism" blocker.

Here's what might help:
💡 Set a timer for "imperfect first draft" (works for 71% of users with this pattern)
💡 Use Learn Mode to understand why perfectionism shows up for you
💡 Try smaller word counts (50 words instead of 500)

Want to try one of these next time?
```

**Failure Analytics Dashboard (Premium):**

```
Your Incomplete Tasks 📋

This Month:
├─ Started: 24 tasks
├─ Completed: 18 tasks (75%)
└─ Abandoned: 6 tasks (25%)

Why Tasks Were Abandoned:
1. Task felt too large (3 tasks)
2. Got distracted/forgot (2 tasks)
3. Anxiety/avoidance (1 task)

What We Learned:
🎯 "Interview prep" tasks have 50% abandonment rate
   → Try breaking into smaller prep sessions
🎯 Evening tasks abandoned 2x more than morning tasks
   → Schedule important tasks for morning
🎯 Tasks with >5 actions rarely get finished
   → Your sweet spot is 3 actions
```

**Failure Recovery Prompts (AI-Generated):**

*Week Later:*
```
Remember [writing portfolio]?

We noticed you didn't finish, but that's okay!

Fun fact: 68% of users who abandon a task and try again within 7 days end up finishing it the second time.

Want to give it another shot? We can make it easier.

[Try again] [Not now] [Delete this task]
```

**Why This Matters:**
- Removes guilt/shame from incompletion
- Collects invaluable behavioral data
- Surfaces blockers AI couldn't detect initially
- Creates adaptive system that improves over time
- Users feel understood (not judged)

**Gold Data Collected:**
- Blocker accuracy (was AI's diagnosis correct?)
- Task sizing accuracy (were actions too big/small?)
- Timing patterns (time-of-day energy levels)
- Emotional triggers (anxiety, perfectionism patterns)
- Intervention effectiveness (did re-breakdown work?)

---

### 6.7 North Star Metric (Unstuck Events)

**Definition:**

An **Unstuck Event** occurs when:
1. User receives a task breakdown (action plan generated)
2. User completes at least one action (within 30 minutes)

This is the core moment of value delivery.

**Why This Metric:**
- Captures the instant user goes from "stuck" to "moving"
- More meaningful than "tasks completed" (lagging indicator)
- More meaningful than "logins" (vanity metric)
- Directly tied to product value prop
- Actionable: Team can optimize every step

**Metric Breakdown:**

```typescript
// Primary North Star
Unstuck Events per User per Week (UEPU/Week)

Target: 5 UEPU/Week (engaged user)
Goal: Increase from 3.2 → 5.0 by Q3

// Supporting Metrics
1. Unstuck Rate (% of breakdowns that lead to unstuck event)
   - Target: 75%
   
2. Time to Unstuck (minutes from breakdown to first action)
   - Target: <5 minutes
   
3. Unstuck Retention (% of users who had ≥1 unstuck event last week)
   - Target: 40% WAU
```

**Dashboard Visualization:**

```
Zelos North Star Dashboard

Unstuck Events (This Week)
├─ Total: 14,250 events
├─ Per Active User: 3.8 events
├─ Week-over-Week: +12% ✅
└─ Target: 5.0 events (76% of goal)

Breakdown:
├─ New Users (<7 days): 2.1 UEPU 🟡
├─ Active Users (7-30 days): 4.5 UEPU ✅
├─ Power Users (>30 days): 7.2 UEPU 🔥
└─ At-Risk Users (no event in 7 days): 850 users ⚠️

Funnel:
├─ Task Input: 18,200 users
├─ Breakdown Generated: 17,850 users (98%) ✅
├─ First Action Started: 14,250 users (78%) 🟡
└─ Full Task Completed: 10,180 users (56%)

Conversion: 78% Unstuck Rate
(Target: 80%)
```

**How Every Team Uses This Metric:**

*Product Team:*
- Which features increase unstuck events?
- Which UI changes decrease time-to-unstuck?
- Where do users drop off in the funnel?

*Engineering Team:*
- AI latency impact on unstuck rate?
- Performance optimizations to reduce time-to-unstuck?

*Growth Team:*
- What acquisition channels bring highest UEPU users?
- How does onboarding flow affect first unstuck event?

*Retention Team:*
- Users with 5+ UEPU/week have 85% retention
- Users with <2 UEPU/week have 20% retention
- Goal: Move everyone to 5+ UEPU/week

**Weekly All-Hands:**

```
This Week's Numbers:

🎯 Unstuck Events: 14,250 (+12%)
📊 UEPU: 3.8 (↑ from 3.4 last week)
⏱️ Time to Unstuck: 4.2 min (↓ from 5.1 min)
✅ Unstuck Rate: 78% (target: 80%)

Wins:
✅ Onboarding flow redesign increased first unstuck event by 18%
✅ Validation message experiment shipped (+8% unstuck rate)
✅ Notification timing optimization (+15% evening unstuck events)

Focus This Week:
🎯 Ship "Failure Recovery" flow (expected +5% unstuck rate)
🎯 Reduce AI response time from 3.2s → 2.0s
🎯 A/B test 3-action vs 5-action breakdowns
```

**Why This Works:**
- Single metric everyone can rally behind
- Ties directly to user value
- Leading indicator (predicts retention/revenue)
- Easy to explain to investors/team
- Drives product decisions

**Analogy:**
- Uber: Completed rides
- Duolingo: Lessons completed
- Spotify: Songs played
- Zelos: **Unstuck events**

### 6.7.1 Additional Success Metrics

Beyond the primary North Star (Unstuck Events), these metrics measure different aspects of product effectiveness:

**1. Time to First Action**

**Definition:** Minutes from breakdown generation to user starting first action.

**Target:** <5 minutes (median)

**Why It Matters:**
- Measures immediacy of intervention
- Shorter = less overthinking/hesitation
- Direct correlation with success rate

**Tracking:**
```typescript
time_to_first_action = first_action_started_at - breakdown_generated_at
```

**Benchmarks:**
- <3 min: Excellent (minimal friction)
- 3-5 min: Good (acceptable)
- 5-10 min: Concerning (user hesitating)
- >10 min: Poor (likely to abandon)

**Dashboard:**
```
Your Response Time:

This Week:
├─ Median: 3.2 minutes ✅
├─ Best: 45 seconds (Thursday 9 AM)
├─ Worst: 12 minutes (Monday evening)

Trend: Improving (+18% faster than last week)
```

---

**2. Intervention Success Rate**

**Definition:** % of generated breakdowns that lead to user taking action (completing ≥1 step).

**Target:** 75% success rate

**Formula:**
```typescript
intervention_success_rate = (sessions_with_action / total_sessions) * 100
```

**Why It Matters:**
- Measures AI effectiveness
- Identifies which interventions work
- Tracks improvement over time

**Breakdown By Type:**
```
Intervention Success Rates:

By Blocker Type:
├─ Overwhelm: 82% (42 sessions)
├─ Ambiguity: 74% (38 sessions)
├─ Perfectionism: 68% (24 sessions)
└─ Avoidance: 61% (18 sessions)

By Task Type:
├─ Admin: 84%
├─ Physical: 79%
├─ Creative: 71%
└─ Social: 64%

By Time of Day:
├─ Morning: 83%
├─ Afternoon: 72%
└─ Evening: 59%
```

---

**3. Repeat Usage Rate (7-Day)**

**Definition:** % of users who return within 7 days after successful intervention.

**Target:** 60% 7-day repeat rate

**Formula:**
```typescript
repeat_rate_7d = (users_returning_within_7_days / users_with_success) * 100
```

**Why It Matters:**
- Measures habit formation
- Indicates product-market fit
- Predicts long-term retention

**Cohort Analysis:**
```
7-Day Repeat Usage by Cohort:

Week 1 (New Users):
├─ Had success: 342 users
├─ Returned within 7 days: 178 users (52%)

Week 2 (Activated):
├─ Had success: 178 users
├─ Returned within 7 days: 124 users (70%)

Week 3 (Engaged):
├─ Had success: 124 users
├─ Returned within 7 days: 105 users (85%)

Pattern: Repeat rate increases with usage (habit forming)
```

**Triggers for Repeat Usage:**
- Push notifications (+18% repeat rate)
- Streak reminders (+25% repeat rate)
- Weekly insights email (+12% repeat rate)
- Friend activity (+22% repeat rate)

---

**4. Behavioral Insight Accuracy**

**Definition:** % of times users agree with AI-generated behavioral assessments.

**Target:** 80% user agreement

**Measured Via:**
- Blocker validation ("Is this accurate?")
- Pattern confirmation ("Is this your biggest blocker?")
- Intervention preference ("Did this work for you?")
- Profile review ("Does this sound like you?")

**Formula:**
```typescript
insight_accuracy = (user_confirmations / total_validations) * 100
```

**Why It Matters:**
- Measures AI's understanding of user
- Builds trust in personalization
- Validates behavioral profile quality

**Accuracy by Confidence Level:**
```
Behavioral Insight Accuracy:

Low Confidence (<30% profile data):
├─ User agreement: 64%
├─ Sample size: 342 validations
└─ Conclusion: Need more data

Medium Confidence (30-70% profile):
├─ User agreement: 78%
├─ Sample size: 1,248 validations
└─ Conclusion: Approaching reliable

High Confidence (>70% profile):
├─ User agreement: 89%
├─ Sample size: 3,124 validations
└─ Conclusion: Highly accurate
```

**Improvement Loop:**
- Low accuracy sessions flagged for analysis
- Patterns in disagreement identified
- AI model updated with corrections
- Accuracy tracked over time

---

**5. Session Abandonment Rate**

**Definition:** % of sessions where user leaves before completing any action.

**Target:** <25% abandonment rate

**Formula:**
```typescript
abandonment_rate = (sessions_with_0_actions / total_sessions) * 100
```

**Why It Matters:**
- Identifies UX friction points
- Measures breakdown quality
- Highlights opportunities for improvement

**Abandonment Funnel:**
```
Session Completion Funnel:

100% - Task input submitted (10,000 sessions)
├─ 98% - Breakdown generated (9,800)
├─ 78% - First action started (7,800)
├─ 64% - Multiple actions (6,400)
└─ 56% - Session completed (5,600)

Drop-off Points:
├─ 2% - AI generation failure
├─ 20% - Breakdown not helpful (OPPORTUNITY!)
├─ 14% - Momentum lost after first action
└─ 8% - Incomplete sessions (time constraints)
```

**Intervention Points:**
- 20% drop at breakdown: Add "Regenerate" button (DONE)
- 14% drop after first action: Add momentum prompts
- 8% incomplete: Add "Save for later" feature

---

**6. Composite Health Score**

**Overall Product Health:** Weighted combination of all metrics.

**Formula:**
```typescript
health_score = (
  unstuck_rate * 0.30 +
  intervention_success * 0.25 +
  repeat_usage_7d * 0.20 +
  time_to_action_score * 0.15 +
  insight_accuracy * 0.10
) * 100
```

**Current Status:**
```
Zelos Health Score: 76/100 🟡

Breakdown:
├─ Unstuck Rate: 78% (23.4 points) ✅
├─ Intervention Success: 74% (18.5 points) ✅
├─ 7-Day Repeat: 62% (12.4 points) 🟡
├─ Time to Action: 3.8 min (13.2 points) ✅
└─ Insight Accuracy: 81% (8.1 points) ✅

Target: 80/100 (Launch Ready)
Current: 76/100 (Near Launch)

Focus Areas:
🎯 Improve 7-day repeat rate (push notifications)
🎯 Reduce time to action (remove friction)
```

---

**Metric Dashboard (Internal):**

```
Zelos Product Metrics - Week of June 8, 2026

North Star:
├─ Unstuck Events: 14,250 (+12% WoW)
├─ UEPU/Week: 3.8 (Target: 5.0)

Supporting Metrics:
├─ Unstuck Rate: 78% (Target: 75%) ✅
├─ Time to First Action: 3.8 min (Target: <5 min) ✅
├─ Intervention Success: 74% (Target: 75%) 🟡
├─ 7-Day Repeat: 62% (Target: 60%) ✅
├─ Insight Accuracy: 81% (Target: 80%) ✅
├─ Abandonment Rate: 22% (Target: <25%) ✅

Health Score: 76/100 (Target: 80/100)

Wins This Week:
✅ Time to action improved 12%
✅ Unstuck rate hit 78% (all-time high)
✅ 7-day repeat crossed 60% threshold

Focus Next Week:
🎯 Ship regenerate button (expected: -5% abandonment)
🎯 Improve intervention success to 75%
🎯 Launch weekly insights email (expected: +8% repeat rate)
```

---

## 7. Design System

### 6.1 Brand Identity

**Name:** Zelos
- From Greek god of zeal, dedication, and emulation
- Conveys energy, action, drive

**Visual Style:**
- Modern, clean, friendly
- Not clinical or corporate
- Energetic but not aggressive
- Approachable and supportive

**Brand Colors:**

*Primary Palette:*
- Zelos Blue: #4A90E2 (primary action color)
- Success Green: #7ED321 (completions, positive)
- Warning Orange: #F5A623 (urgency, streaks at risk)
- Background: #F8F9FA (light mode), #1A1D23 (dark mode)

*Accent Colors (Gamification):*
- Gold: #FFD700 (achievements, premium)
- Purple: #9B59B6 (special events, premium features)
- Red: #E74C3C (challenges, limited time)
- Pink: #FF6B9D (celebrations, level-ups)

### 6.2 UI Components

**Buttons:**
- Primary: Blue gradient, white text, shadow
- Secondary: White background, gray border, gray text
- Ghost: Transparent, hover state
- Danger: Red background, white text

**Cards:**
- White/dark background with subtle shadow
- Rounded corners (12px)
- Border in light mode, no border in dark mode
- Hover state: slight lift + increased shadow

**Inputs:**
- Large, inviting textarea for main input
- Rounded corners (16px)
- Placeholder text with examples
- Focus state: blue ring
- Character count (optional)

**Checkboxes:**
- Large, tappable (48x48px minimum)
- Custom styled (not native)
- Satisfying animation on check
- Sound effect (optional)

**Progress Bars:**
- Gradient fill (blue to green)
- Smooth animations
- Percentage or fraction shown
- Pulsing effect when active

**Modals:**
- Centered overlay
- Dark backdrop (80% opacity)
- Smooth slide-up animation
- Close button always visible
- Escape key closes

**Toasts/Notifications:**
- Bottom-right corner (desktop)
- Top of screen (mobile)
- Auto-dismiss after 3-5 seconds
- Can be dismissed manually
- Stack multiple notifications

### 6.3 Animation Principles

**Micro-interactions:**
- Button hover: Scale up 102%
- Button press: Scale down 98%
- Checkbox check: Pop + rotate
- Card hover: Lift 4px + increase shadow

**Page Transitions:**
- Fade + slight slide (100ms)
- Respect prefers-reduced-motion

**Celebrations:**
- Confetti: Particles falling from top
- Level-up: Full-screen takeover with animation
- Achievement unlock: Modal with bounce-in
- Streak milestone: Fire emoji animation

**Loading States:**
- Skeleton screens (not spinners)
- Progressive loading
- Shimmer effect for placeholders

---

## 8. Success Metrics

### 7.1 Acquisition Metrics
- Daily/Weekly/Monthly New Signups
- Signup Conversion Rate (visitor → signup)
- Traffic Sources (organic, referral, paid)
- Referral Rate (% of users who refer)
- Cost Per Acquisition (CPA)

### 7.2 Engagement Metrics
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Monthly Active Users (MAU)
- DAU/MAU Ratio (stickiness)
- Average Session Duration
- Actions Generated per User
- Actions Completed per User
- Completion Rate (completed / generated)
- Focus Mode Adoption Rate
- Average Streak Length
- % Users with 7+ Day Streak

### 7.3 Retention Metrics
- Day 1 Retention
- Day 7 Retention
- Day 30 Retention
- Cohort Retention Analysis
- Churn Rate
- Resurrection Rate (returned after 30+ days)

### 7.4 Monetization Metrics
- Free to Premium Conversion Rate
- Monthly Recurring Revenue (MRR)
- Average Revenue Per User (ARPU)
- Customer Lifetime Value (LTV)
- Churn Rate (premium users)
- Trial to Paid Conversion

### 7.5 Product-Specific Metrics
- Average Blocker Types per User
- Most Common Blocker Type
- Average Micro-Actions per Breakdown
- Average Action Duration
- Peak Usage Times
- Achievement Unlock Rate
- Notification Click-Through Rate
- Weekly Report Open Rate

### 7.6 Qualitative Metrics
- Net Promoter Score (NPS)
- Customer Satisfaction (CSAT)
- User feedback sentiment
- Support ticket volume
- Feature request themes

### 7.7 North Star Metric
**Primary:** Actions Completed per User per Week
- This metric best represents core value delivery
- Balances engagement and utility
- Directly correlates with habit formation

---

## 9. Monetization Strategy

### 8.1 Pricing Structure

**Free Tier:**
- Core value always accessible
- Unlimited task breakdowns
- 3 Focus Mode sessions per day
- 7 days of history
- Basic achievements
- Limited notifications (3/day)

**Premium Tier:**
- $9.99/month (paid monthly)
- $79/year (save 34%, paid annually)
- All free features plus:
  - Unlimited Focus Mode
  - Lifetime history and insights
  - Advanced behavioral analytics
  - Unlimited notifications
  - Weekly detailed reports
  - Streak freeze (1/week)
  - Voice input
  - Custom themes
  - Priority support
  - Export data
  - Early access to features

**Premium Plus (Future):**
- $19.99/month
- Everything in Premium plus:
  - Team features (share projects)
  - Coach mode (accountability partner)
  - API access
  - Advanced integrations
  - White-label option

### 8.2 Conversion Tactics

**Free Trial:**
- 7-day premium trial for all new users
- Full access to premium features
- Email reminders before trial ends
- Easy cancellation (no dark patterns)

**Paywall Placement:**
- Soft gates (show feature, then upgrade prompt)
- After 3 Focus Mode sessions in free tier: "Upgrade for unlimited"
- When trying to view insights older than 7 days
- Gentle prompts, never blocking core value

**Value Demonstration:**
- Show what premium unlocks in context
- "Premium users complete 2x more actions" (social proof)
- Highlight premium features in weekly report preview
- Success stories from premium users

**Upgrade Prompts:**
- After major milestone (10 actions completed): "Go premium to track unlimited progress"
- When streak reaches 7 days: "Protect your streak with Streak Freeze (premium)"
- Natural moments when user would want premium features

### 8.3 Revenue Projections (Conservative)

**Year 1:**
- 5,000 total signups
- 10% premium conversion = 500 premium users
- Avg $8/month (mix of monthly/annual) = $4,000 MRR
- Annual Revenue: ~$48,000

**Year 2:**
- 25,000 total users
- 12% premium conversion = 3,000 premium users
- Avg $8/month = $24,000 MRR
- Annual Revenue: ~$288,000

---

## 10. Go-to-Market Strategy

### 9.1 Launch Plan

**Phase 1: Friends & Family (Week 1-2)**
- 20-30 beta testers
- Personal invitations
- Collect feedback and testimonials
- Fix critical bugs
- Seed initial social proof numbers

**Phase 2: Soft Launch (Week 3-4)**
- Open to public with waitlist
- Launch on Product Hunt
- Post on Reddit (r/productivity, r/ADHD, r/getdisciplined)
- Personal network outreach
- Goal: 500 signups

**Phase 3: Public Launch (Month 2)**
- Full marketing push
- Press outreach
- Influencer partnerships
- Paid advertising begins
- Goal: 2,000 signups

### 9.2 Acquisition Channels

**Content Marketing:**
- SEO-optimized blog posts ("How to overcome task paralysis", "ADHD productivity hacks")
- YouTube videos demonstrating the tool
- Twitter threads about productivity psychology
- LinkedIn articles for professionals
- TikTok short-form content (productivity tips)

**Community Marketing:**
- Active in Reddit communities (r/ADHD, r/productivity, r/getdisciplined, r/neurodiversity)
- Hacker News Show HN post
- Discord communities for productivity
- ADHD Facebook groups
- College/university subreddits

**Partnerships:**
- ADHD coaches and therapists (affiliate program)
- Productivity YouTubers and influencers
- Student organizations
- Career coaches

**Paid Advertising (Later Stage):**
- Google Ads (keywords: "task paralysis", "can't start", "ADHD productivity")
- Facebook/Instagram Ads (target ADHD, productivity interests)
- Reddit Ads (targeted subreddits)

**Referral Program:**
- Built-in viral loop
- Easy sharing after wins
- Incentivized referrals (both parties get premium)

### 9.3 Launch Messaging

**Primary Value Prop:**
"Turn 'I can't start' into 'I just finished' in under 60 seconds"

**Supporting Messages:**
- "AI that understands why you're stuck"
- "Break through task paralysis instantly"
- "The productivity app that actually helps you start"
- "Your cognitive companion for getting unstuck"

**Target Pain Points:**
- "Tired of staring at your to-do list without acting?"
- "Know what to do but can't seem to start?"
- "Overwhelmed by where to even begin?"

---

## 11. Competitive Analysis & Success Case Studies

### 10.1 Successful Reference Products (What We Can Learn)

#### **Calm - Meditation & Mental Wellness**

**Background:**
- **Founded:** 2012
- **Valuation:** $2B+ (2022)
- **Revenue:** $300-400M/year
- **Users:** 100M+ downloads, 4-6M paying subscribers
- **Pricing:** $14.99/month, $69.99/year

**What Made Them Successful:**
1. **Perfect Timing:** Launched during mindfulness/wellness boom (2012-2017)
2. **Celebrity Partnerships:** LeBron James, Matthew McConaughey sleep stories
3. **Apple App of the Year 2017:** Massive visibility boost
4. **Content Library Strategy:** 
   - Sleep stories, music, meditations (100+ hours)
   - New content weekly = reason to return
5. **B2B Pivot:** Sold to companies for employee wellness (higher ACV)
6. **Beautiful, Simple UX:** Minimalist design, low friction
7. **Free Trial Success:** 7-day trial converts 4-8% (industry-leading)
8. **Daily Habit Building:** 
   - Daily Calm meditation (new every day)
   - Streaks and reminders
9. **Platform Strategy:**
   - Started as website (2012)
   - iOS app (2014)
   - Android app (2015)
   - Now on smart watches, TVs, Alexa

**Key Lessons for Zelos:**
- ✅ Launch simple, add features gradually
- ✅ Partner with influencers/celebrities for credibility
- ✅ Consider B2B for revenue acceleration
- ✅ New daily content keeps users returning
- ✅ Free trial is essential for conversion
- ✅ Start web, expand to mobile apps

**Timeline to Profitability:** ~5 years (2017)

---

#### **Duolingo - Language Learning with Gamification**

**Background:**
- **Founded:** 2011
- **IPO:** 2021, $6.5B valuation
- **Revenue:** $500M+ (2023)
- **DAU:** 30M+ daily active users
- **Pricing:** $12.99/month, $79.99/year (Super Duolingo)

**What Made Them Successful:**
1. **Gamification Mastery:**
   - Streaks (🔥 most powerful retention tool)
   - XP, levels, leaderboards
   - Hearts (lives) system
   - Achievements and trophies
2. **Addictive Loop:**
   - 5-10 min lessons (micro-commitments)
   - Daily reminder notifications
   - Duo (owl mascot) passive-aggressive reminders
   - Social competition with friends
3. **Free Tier Excellence:**
   - Fully functional free product
   - Ads between lessons (revenue)
   - Premium removes ads + unlimited hearts
4. **Behavioral Psychology:**
   - Loss aversion (don't break streak!)
   - Variable rewards (surprise achievements)
   - Social pressure (friends see your progress)
5. **Mobile-First:**
   - Built for mobile from day 1
   - iOS and Android simultaneously
   - Web as secondary platform
6. **Localization:** 
   - 100+ languages
   - Global market from start
7. **Platform Expansion:**
   - Duolingo ABC (kids reading)
   - Duolingo English Test (certification)
   - Multiple revenue streams

**Key Metrics:**
- **DAU/MAU:** ~40% (extremely sticky)
- **Conversion:** ~8% free to premium
- **Retention:** 55% of users return next day

**Key Lessons for Zelos:**
- ✅ Streaks are THE killer feature for retention
- ✅ Make actions tiny (2-5 min like Duolingo's lessons)
- ✅ Gamification must be core, not add-on
- ✅ Notifications should be persistent but not annoying
- ✅ Free tier should be genuinely useful
- ✅ Mobile is critical for daily habit apps
- ✅ Loss aversion (streak) > gains (rewards)

**Timeline to Profitability:** ~6 years (2017)

---

#### **Habitica - RPG-Style Habit Tracker**

**Background:**
- **Founded:** 2013 (as HabitRPG)
- **Revenue:** $1-2M/year (bootstrapped)
- **Users:** 5M+ registered
- **Pricing:** $4.99/month, $29.99/year

**What Made Them Successful:**
1. **Unique Positioning:** Gamify YOUR life (RPG mechanics)
2. **Strong Niche:** 
   - Gamers + productivity nerds
   - Reddit-driven growth (r/Habitica)
   - Cult following
3. **Gamification Elements:**
   - Your avatar levels up with real tasks
   - Earn gold, buy armor/pets
   - Boss battles with friends
   - Guilds (communities)
4. **Social Features:**
   - Party challenges
   - Guild accountability
   - Trading system
5. **Open Source:**
   - Community-driven development
   - Passionate user base
6. **Bootstrapped:** 
   - No VC pressure
   - Focused on core users
   - Sustainable business model

**Why It's Limited:**
- Niche audience (gamers only)
- Complex UI (learning curve)
- Doesn't solve "getting started" problem

**Key Lessons for Zelos:**
- ✅ Niche positioning can work (don't need to be everything)
- ✅ Community builds loyalty
- ✅ Gamification attracts specific personality types
- ✅ Can be profitable without VC funding
- ❌ Don't make UI too complex (accessibility matters)

---

#### **Headspace - Meditation & Mindfulness**

**Background:**
- **Founded:** 2010
- **Revenue:** $100-150M/year
- **Users:** 70M+ downloads, 2-3M paying subscribers
- **Pricing:** $12.99/month, $69.99/year

**What Made Them Successful:**
1. **Brand Positioning:** "Gym membership for your mind"
2. **Celebrity Founder:** Andy Puddicombe (former monk) = credibility
3. **Animations:** Beautiful, calming animations throughout app
4. **Guided Approach:** Structured programs, not random meditations
5. **B2B Strategy:** Enterprise wellness programs
6. **Partnerships:**
   - Nike (meditation for athletes)
   - Netflix (Headspace Guide to Meditation series)
7. **Scientific Backing:** Published research on effectiveness
8. **Progressive Onboarding:** 10-day beginner course

**Key Lessons for Zelos:**
- ✅ Founder story/credibility matters
- ✅ Beautiful design = premium positioning
- ✅ Structure > overwhelming options
- ✅ B2B can accelerate growth
- ✅ Content partnerships (Netflix, YouTube)

**Timeline to Profitability:** ~7 years (2017)

---

#### **Notion - All-in-One Workspace**

**Background:**
- **Founded:** 2013
- **Valuation:** $10B (2021)
- **Revenue:** $1B+ ARR (2023)
- **Users:** 30M+
- **Pricing:** $8-15/month per user

**What Made Them Successful:**
1. **Viral Growth:**
   - Templates marketplace (users create, share)
   - Twitter/YouTube tutorials
   - Community-driven adoption
2. **Freemium Done Right:**
   - Generous free tier (unlimited pages)
   - Upgrade when teams need collaboration
3. **Bottom-Up Adoption:**
   - Individuals bring it to companies
   - No traditional sales team initially
4. **Flexibility:**
   - Database + docs + wikis + tasks
   - Users build their own systems
5. **Beautiful UX:**
   - Aesthetic, customizable
   - Icons, covers, templates
6. **Platform Strategy:**
   - Web first, then desktop apps
   - Mobile apps later
   - API for integrations

**Why It's Different from Zelos:**
- Notion is for organization
- Zelos is for initiation (getting started)

**Key Lessons for Zelos:**
- ✅ Templates/examples accelerate adoption
- ✅ Community-created content (user breakdowns?)
- ✅ Generous free tier drives growth
- ✅ Bottom-up adoption (individuals → teams)
- ✅ Web first, native apps later works

---

### 10.2 Direct Competitors (Productivity/Task Management)

#### **Motion - AI Calendar & Task Manager**
- **Focus:** Automatic scheduling, time management
- **Pricing:** $19/month (expensive)
- **Gap:** Doesn't address psychological barriers to starting
- **Zelos Advantage:** Focuses on initiation, not organization

#### **Sunsama - Daily Planning**
- **Focus:** Intentional daily planning, time-blocking
- **Pricing:** $16/month
- **Gap:** Still requires you to start tasks yourself
- **Zelos Advantage:** Breaks down overwhelm into tiny actions

#### **Todoist - Task Manager**
- **Focus:** Todo lists, project management
- **Users:** 30M+
- **Gap:** Lists don't help with "where to start"
- **Zelos Advantage:** AI breaks down ambiguous tasks

#### **Structured - ADHD-Specific**
- **Focus:** Visual timers, reminders tailored for ADHD
- **Gap:** Less intelligent about task breakdown
- **Zelos Advantage:** AI-powered personalization, learns patterns

#### **AI Assistants (ChatGPT, Claude)**
- **Focus:** General-purpose AI
- **Gap:** No habit-building, gamification, or tracking
- **Zelos Advantage:** Purpose-built for task paralysis with engagement loop

---

### 10.3 Indirect Competitors (Wellness/Habits)

#### **Therapy/Coaching Apps (BetterHelp, Talkspace)**
- **Pricing:** $60-100/week ($240-400/month)
- **Gap:** Expensive, clinical, not for daily task help
- **Zelos Position:** Complement to therapy, not replacement

#### **Habit Trackers (Streaks, Habitica)**
- **Focus:** Track existing habits
- **Gap:** Don't help create actions or overcome blocks
- **Zelos Advantage:** Creates new actions, breaks through paralysis

#### **Focus Apps (Forest, Focus@Will)**
- **Focus:** Stay focused while working
- **Gap:** Assume you've already started
- **Zelos Advantage:** Helps you start before you need focus

---

### 10.4 Market Positioning & Differentiation

**Zelos Unique Combination:**
```
AI Task Breakdown + Duolingo-Style Gamification + Calm-Style Wellness Approach
```

**Why This Hasn't Been Done:**
1. **AI is new:** GPT-4 quality only available since 2023
2. **Intersection is unique:** Productivity apps lack gamification, games lack AI intelligence
3. **Problem is specific:** Task paralysis is real but underserved

**Positioning Statement:**
> "Zelos is Duolingo for getting unstuck. We combine AI task breakdown with addictive gamification to help you overcome task paralysis and build an action-taking habit."

**Competitive Moat:**
1. **AI Prompt Engineering:** Custom prompts for blocker identification
2. **Behavioral Data:** Learns user patterns over time (personalization moat)
3. **Gamification System:** Streaks + XP + achievements optimized for action-taking
4. **Brand Position:** First to own "task paralysis" category

**What We Won't Compete On:**
- ❌ Task organization (Notion, Todoist do this better)
- ❌ Time management (Motion, Sunsama have this)
- ❌ Meditation/therapy (Calm, Headspace own this)
- ❌ General AI (ChatGPT is broader)

**What We Win On:**
- ✅ Breaking through psychological blocks (AI-powered)
- ✅ Addictive action-taking habit (gamification)
- ✅ Personalized insights (behavioral intelligence)
- ✅ Dopamine-driven engagement (like Duolingo)

---

### 10.5 Market Validation

**Evidence Task Paralysis Market Exists:**
1. **Reddit communities:**
   - r/ADHD: 1.8M members
   - r/productivity: 2M members
   - r/getdisciplined: 1.3M members
2. **Search volume:**
   - "task paralysis": 10k searches/month
   - "can't start": 20k searches/month
   - "ADHD productivity": 30k searches/month
3. **ADHD market:** 10M+ adults diagnosed in US alone
4. **Adjacent success:** Calm ($2B), Duolingo ($6.5B) prove demand for habit + gamification apps

**Market Size (TAM):**
- **Productivity app market:** $10B+ globally
- **Mental wellness apps:** $15B+ globally
- **Intersection (our niche):** $500M-1B (conservative)

---

## 12. Risks & Mitigation

### 11.1 Product Risks

**Risk:** Users don't come back after first use
- **Mitigation:** Push notifications, streak system, gamification hooks

**Risk:** AI gives unhelpful or wrong breakdowns
- **Mitigation:** Prompt engineering, user feedback loop, ability to regenerate

**Risk:** Users don't complete generated actions
- **Mitigation:** Start with extremely small actions, positive validation, no guilt

**Risk:** Feature overwhelm (too many features)
- **Mitigation:** Progressive disclosure, clean UI, optional features

### 11.2 Business Risks

**Risk:** Low free-to-premium conversion
- **Mitigation:** Strong free tier value, clear premium benefits, free trial

**Risk:** High churn rate
- **Mitigation:** Constant value delivery, engagement features, exit interviews

**Risk:** Can't acquire users cost-effectively
- **Mitigation:** Content marketing, referral program, organic channels first

### 11.3 Technical Risks

**Risk:** LLM API costs too high
- **Mitigation:** Use cost-effective models, caching, rate limiting, optimize prompts

**Risk:** Scalability issues
- **Mitigation:** Modern architecture, CDN, database optimization

**Risk:** Data privacy concerns
- **Mitigation:** Clear privacy policy, minimal data collection, user data ownership

### 11.4 Market Risks

**Risk:** Market too small (not enough people with task paralysis)
- **Mitigation:** Broad positioning, multiple user personas, general productivity angle

**Risk:** Existing solutions are "good enough"
- **Mitigation:** Emphasize unique AI + gamification combination

---

## 13. Future Vision

### Long-Term Evolution (Year 2-3+)

**Predictive Intelligence:**
- AI predicts when you'll get stuck before it happens
- "You usually get stuck on Monday mornings—here's a task to start your week"
- Proactive suggestions based on patterns

**Team / Collaborative Version:**
- Managers help unblock team members
- Shared projects and accountability
- Team streaks and challenges

**Integration Ecosystem:**
- Calendar integration (Google, Outlook)
- Todo app integration (Todoist, Things)
- Slack/Discord bots
- Email integration (Gmail, Outlook)

**Advanced Personalization:**
- Voice cloning for AI responses (user's preferred voice)
- Fully customizable AI personality
- Learning style adaptation

**Expanded Use Cases:**
- Study mode (specifically for students)
- Job search mode (specifically for career changers)
- Creative mode (for writers, artists)
- Health mode (for building health habits)

**Platform Expansion:**
- Native iOS/Android apps
- Browser extension (quick help button)
- Desktop apps (Mac, Windows, Linux)
- Smart watch app (quick actions on wrist)
- Voice assistant integration (Alexa, Google Home)

---

## 14. Example User Flows

### Flow 1: First-Time User
1. Visits zelos.app
2. Sees landing page with clear value prop
3. Clicks "Get Started Free"
4. Quick signup (magic link or OAuth)
5. Onboarding tutorial
6. First task breakdown and completion
7. Achievement unlocked: First Action
8. Prompted to enable notifications
9. Becomes engaged daily user

### Flow 2: Returning User (Morning Routine)
1. Gets notification: "Good morning! Ready for day 8? 🔥"
2. Opens app (from notification or bookmark)
3. Sees streak counter prominently
4. Has a task already in mind
5. Types it in chat
6. Gets breakdown in 2 seconds
7. Enters Focus Mode
8. Completes first action
9. Gets celebration
10. Continues or closes app
11. Streak maintained

### Flow 3: User Considering Premium
1. Hits 3 Focus Mode limit on free tier
2. Sees upgrade prompt: "Upgrade for unlimited Focus Mode"
3. Clicks "Learn More"
4. Sees premium benefits clearly
5. 7-day free trial offered
6. One-click upgrade
7. Gets access to all premium features
8. Uses advanced insights
9. Sees value, converts after trial

---

## 15. AI Prompt Examples

### System Prompt (Core)
```
You are Zelos, an empathetic AI companion that helps people overcome task paralysis. Your goal is to identify psychological blockers and break down overwhelming tasks into tiny, actionable steps.

CRITICAL BOUNDARIES - MUST FOLLOW:
1. You are a PRODUCTIVITY TOOL, NOT a therapist, doctor, or mental health professional
2. NEVER diagnose conditions (ADHD, depression, anxiety, etc.)
3. NEVER recommend medication, supplements, or medical treatments
4. NEVER provide therapy or counseling
5. If user mentions suicide, self-harm, or crisis keywords, IMMEDIATELY redirect to:
   "I'm concerned about what you shared. Please contact 988 (Suicide Prevention Lifeline) 
   or text HOME to 741741 (Crisis Text Line) for immediate help."
6. Focus ONLY on practical task breakdown, not emotional healing
7. Use "common pattern" language, NOT clinical diagnoses

Task Breakdown Rules:
1. Identify the blocker type (ambiguity, overwhelm, perfectionism, etc.)
2. Provide brief validation (2-3 sentences)
3. Generate 3-5 micro-actions (2-5 minutes each)
4. Make the first action extremely easy
5. Use encouraging, non-judgmental language
6. Keep responses concise and actionable

User context:
- Common blocker: {user_blocker_pattern}
- Successful strategies: {user_success_patterns}
- Time of day: {current_time}
```

### Example Interaction
```
User: "I need to write a cover letter but I don't know where to start"

Zelos: "What's blocking you:
🧩 Ambiguity + Perfectionism

It sounds like 'write a cover letter' feels huge and you want it to be perfect. That's totally normal—cover letters are intimidating!

Let's break it down:
☐ Open a blank doc and write just the company name at the top (1 min)
☐ Find the job posting and copy-paste 3 key requirements (2 min)
☐ Write 1 sentence about why you're interested in this job (3 min)

[Start Focus Mode]"
```

---

**End of PRD**

*Document Version: 1.0*  
*Last Updated: June 11, 2026*  
*Product: Zelos*
