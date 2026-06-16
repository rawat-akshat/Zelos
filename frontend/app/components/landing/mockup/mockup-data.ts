export const MOCKUP_FOCUS = {
  title: "Life admin reset",
  progress: 20,
};

export const MOCKUP_STREAK = 7;

export const MOCKUP_XP = {
  current: 320,
  max: 500,
  level: 4,
};

export type MockupChatTurn =
  | { type: "user"; text: string }
  | { type: "learn"; title: string; body: string; footer?: string }
  | { type: "coach"; body: string }
  | {
      type: "task";
      badge?: string;
      title?: string;
      body: string;
      actionsLabel?: string;
      actions: string[];
      footer?: string;
    };

export const MOCKUP_CHAT: MockupChatTurn[] = [
  {
    type: "user",
    text: "Why do I procrastinate even when I genuinely want to get things done?",
  },
  {
    type: "learn",
    title: "Understanding Procrastination: It's Emotional Regulation, Not Laziness.",
    body:
      "When you freeze up, your brain isn't rejecting the task—it's rejecting the immediate discomfort, overwhelm, or dread associated with it. Your nervous system misinterprets a heavy to-do list as a threat and triggers a survival \"freeze\" response, driving you toward quick dopamine hits (like your phone) to feel safe.",
    footer: "Bypassing this loop starts with naming the load. What task is paralyzing you right now?",
  },
  {
    type: "user",
    text: "I'm completely stuck with my daily chores.",
  },
  {
    type: "coach",
    body:
      "Let's dump the weight out of your head. Drop the details right here—no matter how messy, disorganized, or massive it feels. What exactly are you facing?",
  },
  {
    type: "user",
    text:
      "My apartment is a complete mess, I have 5 outstanding bills to pay, and I need to book a dentist appointment. The sheer volume of things to do is making me dizzy, so I'm just sitting on the couch playing phone games.",
  },
  {
    type: "task",
    body:
      "Your brain is treating all of these demands as one massive, crushing multi-task emergency. You cannot physically do them all simultaneously, so we are going to do something intentionally tiny to break the inertia.",
    actionsLabel: "Your 5-Step Momentum Blueprint:",
    actions: [
      "Pick up exactly three loose items from the floor right next to the couch and toss them where they belong.",
      "Open just one bill utility portal tab in your browser window (don't pay it yet, just log in).",
      "Type the word \"Dentist\" into your phone's search bar to pull up the nearest clinic number.",
      "Fill a glass with water, drink it, and stand up for 30 seconds.",
      "Click 'Complete' on this step to log your first target streak token.",
    ],
    footer:
      "The emergency is over. You only have to do Step 1 to trigger the dopamine switch. Go.",
  },
];
