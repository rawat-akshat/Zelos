import type { AIResponse, Action, TaskResponse, LearnResponse } from "./types";

let sessionCounter = 100;

function makeId(): string {
  return `mock-${++sessionCounter}-${Math.random().toString(36).slice(2, 7)}`;
}

type ActionInput = {
  description: string;
  minutes: number;
  subSteps?: string[];
};

function makeActions(items: ActionInput[]): Action[] {
  return items.map(({ description, minutes, subSteps }, i) => ({
    id: `action-${i + 1}-${Math.random().toString(36).slice(2, 6)}`,
    description,
    estimatedMinutes: minutes,
    completed: false,
    ...(subSteps?.length ? { subSteps } : {}),
  }));
}

function cloneActions(actions: Action[]): Action[] {
  return actions.map((a) => ({
    ...a,
    id: makeId(),
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
      {
        description: "Open your current resume document (or a blank one)",
        minutes: 2,
        subSteps: ["Locate the file on your computer", "Open the document", "Read the first page without editing"],
      },
      {
        description: "Review your experience section",
        minutes: 3,
        subSteps: ["Scroll to your work history", "Read the first bullet only", "Notice any vague wording"],
      },
      {
        description: "Update one single bullet point with fresher language",
        minutes: 5,
        subSteps: [
          "Choose a single bullet",
          "Highlight vague wording",
          "Add measurable impact",
          "Rewrite the sentence",
        ],
      },
      {
        description: "Add one new skill or project you've overlooked",
        minutes: 4,
        subSteps: ["Think of one recent win", "Write one sentence about it", "Place it in the right section"],
      },
      {
        description: "Save and close — you've done enough for today",
        minutes: 1,
        subSteps: ["Save the file", "Close the document", "Note one thing you changed"],
      },
    ]),
    alternative: {
      explanation:
        "Instead of improving the whole resume, let's lower the stakes. Today you're only going to look at it — no editing required. Reading without changing anything still moves you forward and breaks the freeze.",
      actions: makeActions([
        {
          description: "Find your resume file without opening it yet",
          minutes: 1,
          subSteps: ["Search your Downloads or Documents folder", "Confirm the file name", "Stop there"],
        },
        {
          description: "Open it and read the first section only",
          minutes: 3,
          subSteps: ["Open the document", "Read the header and summary", "Do not edit anything"],
        },
        {
          description: "Write one sentence about how it feels to read it",
          minutes: 2,
          subSteps: ["Open a notes app", "Write honestly — messy is fine", "Save the note"],
        },
        {
          description: "Close everything — that's enough for today",
          minutes: 1,
          subSteps: ["Close the resume", "Close your notes", "You're done"],
        },
      ]),
    },
    suggestedQuestions: [
      "What if I still can't open the document?",
      "Why does perfectionism make starting so hard?",
    ],
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
      {
        description: "Write the task title at the top of a blank page",
        minutes: 1,
        subSteps: ["Open a blank note", "Write the task name", "Stop writing"],
      },
      {
        description: "List only the first 3 things that come to mind — rough is fine",
        minutes: 3,
        subSteps: ["Set a 2-minute timer", "Write three items quickly", "Don't organize them"],
      },
      {
        description: "Pick the single easiest item from your list",
        minutes: 1,
        subSteps: ["Circle one item", "Ignore the rest for now", "Say it out loud"],
      },
      {
        description: "Set a timer for 10 minutes and do only that one thing",
        minutes: 10,
        subSteps: ["Start the timer", "Do only the chosen item", "Stop when the timer ends"],
      },
      {
        description: "Write one sentence about what you just completed",
        minutes: 2,
        subSteps: ["Open your note", "Write what you did", "Save it"],
      },
    ]),
    alternative: {
      explanation:
        "When everything feels urgent, picking one thing can feel impossible. Instead, let's externalize the load — get it out of your head onto paper, then walk away. No doing required today.",
      actions: makeActions([
        {
          description: "Set a timer for 5 minutes",
          minutes: 1,
          subSteps: ["Open a timer app", "Set 5 minutes", "Place your phone face-up"],
        },
        {
          description: "Brain-dump every task onto paper — no order needed",
          minutes: 5,
          subSteps: ["Write one task per line", "Keep moving — don't judge", "Stop when the timer rings"],
        },
        {
          description: "Close the list and take a 2-minute break",
          minutes: 2,
          subSteps: ["Put the list away", "Stand up", "Breathe — you're done for now"],
        },
      ]),
    },
    suggestedQuestions: [
      "I have too many tasks on my list — help me pick one",
      "What's the smallest possible first step?",
    ],
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
      {
        description: "Write down what 'done' looks like in one sentence",
        minutes: 2,
        subSteps: ["Open a note", "Finish the sentence: Done means…", "Keep it to one line"],
      },
      {
        description: "Identify the single person, place, or tool you need to start",
        minutes: 2,
        subSteps: ["Name one person OR place OR tool", "Write it down", "That's your anchor"],
      },
      {
        description: "Do the smallest possible version of the first action",
        minutes: 5,
        subSteps: ["Pick the tiniest first move", "Do it for 2 minutes max", "Stop even if unfinished"],
      },
      {
        description: "Write what you'll do next time you sit down for this",
        minutes: 2,
        subSteps: ["One sentence for future-you", "Save the note", "Close it"],
      },
    ]),
    suggestedQuestions: [
      "I still don't know where to start",
      "What does 'done' look like for a vague task?",
    ],
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
      {
        description: "Acknowledge out loud (or in writing) why this feels hard",
        minutes: 2,
        subSteps: ["Say or write one honest reason", "No fixing — just naming it", "Pause"],
      },
      {
        description: "Do a 2-minute version — open the document, nothing more",
        minutes: 2,
        subSteps: ["Open the file or app", "Look at it for 30 seconds", "Close it"],
      },
      {
        description: "Write one imperfect sentence or make one imperfect choice",
        minutes: 3,
        subSteps: ["Write one rough sentence", "Don't reread it", "Save and move on"],
      },
      {
        description: "Take a short break, then do one more tiny step",
        minutes: 5,
        subSteps: ["Step away for 2 minutes", "Return", "Do one small thing only"],
      },
    ]),
    suggestedQuestions: [
      "Why do I keep avoiding this kind of task?",
      "Help me write the first sentence of a difficult email",
    ],
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
      {
        description: "Set a timer for exactly 2 minutes and start — stop when it rings",
        minutes: 2,
        subSteps: ["Start the timer", "Begin the task", "Stop immediately when it ends"],
      },
      {
        description: "Notice what you felt during those 2 minutes and write it down",
        minutes: 2,
        subSteps: ["Name one feeling", "Write it in a note", "No analysis needed"],
      },
      {
        description: "Do one more focused 5-minute block immediately",
        minutes: 5,
        subSteps: ["Reset timer to 5 minutes", "Continue the same task", "Stop when done"],
      },
      {
        description: "Reward yourself with something small when done",
        minutes: 1,
        subSteps: ["Pick a small reward", "Enjoy it", "You're done"],
      },
    ]),
    suggestedQuestions: [
      "What's the two-minute rule?",
      "Why do I procrastinate even when I care about the task?",
    ],
  },
];

const learnResponses: LearnResponse[] = [
  {
    mode: "learn",
    sessionId: "",
    explanation:
      "Procrastination is rarely about time management — it's almost always about emotion management. When a task triggers anxiety, boredom, self-doubt, or resentment, your brain chooses immediate relief over future reward. Delay brings temporary relief, then guilt, which makes the task feel even harder next time. The pattern isn't laziness; it's your nervous system trying to avoid discomfort.",
    suggestedQuestions: [
      "What's the difference between procrastination and task paralysis?",
      "Help me break down a task I'm stuck on",
      "What is the two-minute rule?",
    ],
  },
  {
    mode: "learn",
    sessionId: "",
    explanation:
      "Task paralysis is when you know what needs to be done but feel unable to start — even when you want to. It's not laziness. Your brain is overloaded by perfectionism, overwhelm, or unclear next steps, and freezes to protect you from perceived failure. The most reliable way through is making the first step small enough that starting feels safe.",
    suggestedQuestions: [
      "Why does ADHD make this worse?",
      "What actually helps when I'm frozen?",
      "I have a specific task I'm avoiding — help me start",
    ],
  },
  {
    mode: "learn",
    sessionId: "",
    explanation:
      "Executive dysfunction is the gap between intention and action — difficulty planning, starting, prioritizing, or finishing even when you're motivated. ADHD, anxiety, depression, and stress all make this worse, but most people feel it situationally when tired or emotionally loaded. External structure, smaller steps, and lowering the stakes on the first move are what actually help.",
    suggestedQuestions: [
      "What is body doubling?",
      "How do I build a study plan without getting overwhelmed?",
      "What's one tiny step I could take right now?",
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

function buildTaskResponse(base: TaskResponse, useAlternative: boolean): TaskResponse {
  if (useAlternative && base.alternative) {
    return {
      ...base,
      explanation: base.alternative.explanation,
      actions: cloneActions(base.alternative.actions),
    };
  }
  return {
    ...base,
    actions: cloneActions(base.actions),
  };
}

export async function generateMockResponse(
  input: string,
  options?: { alternative?: boolean }
): Promise<AIResponse> {
  await new Promise((r) => setTimeout(r, 1800 + Math.random() * 800));

  const mode = detectMode(input);
  const sessionId = makeId();
  const useAlternative = options?.alternative ?? false;

  if (mode === "learn") {
    const base = pickLearnResponse(input);
    return { ...base, sessionId };
  }

  const base = pickTaskResponse(input);
  const built = buildTaskResponse(base, useAlternative);
  return { ...built, sessionId };
}
