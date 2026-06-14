import type { AIResponse, Action, TaskResponse, LearnResponse } from "./types";

let sessionCounter = 100;

function makeId(): string {
  return `mock-${++sessionCounter}-${Math.random().toString(36).slice(2, 7)}`;
}

function makeActions(descriptions: Array<[string, number]>): Action[] {
  return descriptions.map(([description, estimatedMinutes], i) => ({
    id: `action-${i + 1}-${Math.random().toString(36).slice(2, 6)}`,
    description,
    estimatedMinutes,
    completed: false,
  }));
}

const taskResponses: TaskResponse[] = [
  {
    mode: "task",
    sessionId: "",
    blockerType: "perfectionism",
    blockerLabel: "Perfectionism",
    explanation:
      "You're experiencing perfectionism-driven paralysis. The pressure to make this perfect makes starting feel impossible. Your brain is trying to protect you from perceived failure — but the only way through is imperfect action.",
    concept: "Zeigarnik Effect",
    actions: makeActions([
      ["Open your current resume document (or a blank one)", 2],
      ["Read only the first section — don't change anything yet", 3],
      ["Update one single bullet point with fresher language", 5],
      ["Add one new skill or project you've overlooked", 4],
      ["Save and close — you've done enough for today", 1],
    ]),
  },
  {
    mode: "task",
    sessionId: "",
    blockerType: "overwhelm",
    blockerLabel: "Overwhelm",
    explanation:
      "The task feels too large to fit in your mind all at once, so your brain refuses to start. This is cognitive overwhelm — the antidote is making the next step so small it requires almost no mental energy.",
    concept: "Cognitive Load Theory",
    actions: makeActions([
      ["Write the task title at the top of a blank page", 1],
      ["List only the first 3 things that come to mind — rough is fine", 3],
      ["Pick the single easiest item from your list", 1],
      ["Set a timer for 10 minutes and do only that one thing", 10],
      ["Write one sentence about what you just completed", 2],
    ]),
  },
  {
    mode: "task",
    sessionId: "",
    blockerType: "ambiguity",
    blockerLabel: "Ambiguity",
    explanation:
      "You're stuck because the task doesn't have a clear starting point. When the brain can't find a defined first step, it freezes. We're going to create that clarity right now.",
    concept: "Implementation Intentions",
    actions: makeActions([
      ["Write down what 'done' looks like in one sentence", 2],
      ["Identify the single person, place, or tool you need to start", 2],
      ["Do the smallest possible version of the first action", 5],
      ["Write what you'll do next time you sit down for this", 2],
    ]),
  },
  {
    mode: "task",
    sessionId: "",
    blockerType: "avoidance",
    blockerLabel: "Avoidance",
    explanation:
      "Your brain is actively moving away from this task because it's associated with discomfort — maybe anxiety, embarrassment, or past frustration. That's a completely normal response. We'll ease in gently.",
    concept: "Approach-Avoidance Conflict",
    actions: makeActions([
      ["Acknowledge out loud (or in writing) why this feels hard", 2],
      ["Do a 2-minute version — open the document, nothing more", 2],
      ["Write one imperfect sentence or make one imperfect choice", 3],
      ["Take a short break, then do one more tiny step", 5],
    ]),
  },
  {
    mode: "task",
    sessionId: "",
    blockerType: "procrastination",
    blockerLabel: "Procrastination",
    explanation:
      "Procrastination here isn't laziness — it's a coping mechanism for something about this task that feels aversive. The two-minute rule: if you can start it in two minutes, do it now, and momentum will carry you forward.",
    concept: "Temptation Bundling",
    actions: makeActions([
      ["Set a timer for exactly 2 minutes and start — stop when it rings", 2],
      ["Notice what you felt during those 2 minutes and write it down", 2],
      ["Do one more focused 5-minute block immediately", 5],
      ["Reward yourself with something small when done", 1],
    ]),
  },
];

const learnResponses: LearnResponse[] = [
  {
    mode: "learn",
    sessionId: "",
    title: "What is Task Paralysis?",
    summary:
      "Task paralysis is a state where you know what needs to be done, but feel completely unable to start or continue — even when you want to. It's not laziness. It's your nervous system under cognitive overload.",
    sections: [
      {
        title: "What it is",
        content:
          "Task paralysis occurs when the mental resources required to plan and execute a task exceed what your brain has available in that moment. It often manifests as staring at a screen, making endless lists, or switching between tasks without completing any.",
      },
      {
        title: "Why it happens",
        content:
          "Common causes include perfectionism (fear of doing it wrong), overwhelm (task feels too large), ambiguity (unclear starting point), emotional avoidance (task associated with past failure), and executive dysfunction (difficulty initiating actions, common in ADHD and anxiety).",
      },
      {
        title: "Who experiences it",
        content:
          "Everyone — but it's significantly more common in people with ADHD, anxiety disorders, perfectionism tendencies, or high-stakes performance environments. Students, professionals, and creative workers report it most frequently.",
      },
      {
        title: "What actually helps",
        content:
          "The most evidence-backed approach is radical task reduction: make the first step so small it requires almost no decision-making. Two-minute rules, body doubling, implementation intentions, and self-compassion all show strong research support.",
      },
    ],
    suggestedQuestions: [
      "What is the two-minute rule?",
      "How is task paralysis different from procrastination?",
      "Why does ADHD cause task paralysis?",
      "Help me break down a task I'm stuck on",
    ],
  },
  {
    mode: "learn",
    sessionId: "",
    title: "Why Do I Procrastinate?",
    summary:
      "Procrastination is rarely about time management — it's almost always about emotion management. When a task triggers anxiety, boredom, self-doubt, or resentment, your brain chooses immediate relief over future reward.",
    sections: [
      {
        title: "The emotional root",
        content:
          "Research by Dr. Fuschia Sirois shows that procrastination is primarily a failure of emotion regulation, not time management. Tasks associated with negative emotions (fear of failure, perfectionism, boredom) get delayed in favor of tasks that feel better right now.",
      },
      {
        title: "The avoidance cycle",
        content:
          "Delay → temporary relief → guilt → more anxiety → more delay. This cycle is self-reinforcing. Each time you avoid a task, avoidance gets stronger as a coping strategy, making future avoidance more likely.",
      },
      {
        title: "Common triggers",
        content:
          "Tasks that are unclear (ambiguous), aversive (boring or anxiety-inducing), complex (many steps), personally meaningful (high stakes), or associated with past failure are all high-risk for procrastination.",
      },
      {
        title: "Breaking the pattern",
        content:
          "Start with self-compassion — research consistently shows that being kind to yourself after procrastinating reduces future procrastination. Then reduce the task to a laughably small first step. Then begin.",
      },
    ],
    suggestedQuestions: [
      "What is task paralysis?",
      "How do I stop avoiding tasks I hate?",
      "What is the Zeigarnik Effect?",
      "I keep procrastinating on my resume — help me start",
    ],
  },
  {
    mode: "learn",
    sessionId: "",
    title: "Understanding Executive Dysfunction",
    summary:
      "Executive dysfunction is the difficulty in planning, starting, prioritizing, or completing tasks — even when you're motivated and know what needs to be done. It's the neurological gap between intention and action.",
    sections: [
      {
        title: "What it is",
        content:
          "Executive functions are a set of cognitive skills managed by the prefrontal cortex: working memory, cognitive flexibility, and inhibitory control. When these work poorly, even simple tasks can feel impossible to initiate.",
      },
      {
        title: "How it shows up",
        content:
          "Forgetting steps mid-task, struggling to start without external pressure, losing track of priorities, difficulty transitioning between tasks, time blindness (underestimating how long things take), and emotional dysregulation under cognitive load.",
      },
      {
        title: "Who it affects",
        content:
          "ADHD, depression, anxiety, autism, and chronic stress all significantly impair executive function. But executive dysfunction exists on a spectrum — most people experience it situationally under stress, sleep deprivation, or emotional dysregulation.",
      },
      {
        title: "Practical supports",
        content:
          "External structure (checklists, timers, body doubling), reducing task complexity, environmental design (removing distractions before starting), and emotion regulation before attempting high-demand tasks all meaningfully improve executive performance.",
      },
    ],
    suggestedQuestions: [
      "What is task paralysis?",
      "How does ADHD affect productivity?",
      "What is body doubling?",
      "Help me build a study plan",
    ],
  },
];

function detectMode(input: string): "task" | "learn" {
  const lower = input.toLowerCase();
  const learnKeywords = [
    "what is",
    "what are",
    "why do i",
    "why does",
    "explain",
    "tell me",
    "how does",
    "understand",
    "meaning",
    "definition",
    "difference between",
    "learn",
  ];
  for (const kw of learnKeywords) {
    if (lower.includes(kw)) return "learn";
  }
  return "task";
}

function pickTaskResponse(input: string): TaskResponse {
  const lower = input.toLowerCase();
  if (lower.includes("resume") || lower.includes("cv") || lower.includes("job"))
    return taskResponses[0];
  if (
    lower.includes("overwhelm") ||
    lower.includes("too much") ||
    lower.includes("so much")
  )
    return taskResponses[1];
  if (
    lower.includes("don't know") ||
    lower.includes("where to start") ||
    lower.includes("not sure")
  )
    return taskResponses[2];
  if (
    lower.includes("email") ||
    lower.includes("avoid") ||
    lower.includes("keep putting off")
  )
    return taskResponses[3];
  if (
    lower.includes("procrastinat") ||
    lower.includes("later") ||
    lower.includes("keep delaying")
  )
    return taskResponses[4];
  return taskResponses[Math.floor(Math.random() * taskResponses.length)];
}

function pickLearnResponse(input: string): LearnResponse {
  const lower = input.toLowerCase();
  if (lower.includes("procrastinat")) return learnResponses[1];
  if (
    lower.includes("executive") ||
    lower.includes("adhd") ||
    lower.includes("dysfunction")
  )
    return learnResponses[2];
  return learnResponses[0];
}

export async function generateMockResponse(input: string): Promise<AIResponse> {
  await new Promise((r) => setTimeout(r, 1800 + Math.random() * 800));

  const mode = detectMode(input);
  const sessionId = makeId();

  if (mode === "learn") {
    const base = pickLearnResponse(input);
    return { ...base, sessionId };
  } else {
    const base = pickTaskResponse(input);
    const freshActions = base.actions.map((a) => ({
      ...a,
      id: makeId(),
      completed: false,
    }));
    return { ...base, sessionId, actions: freshActions };
  }
}
