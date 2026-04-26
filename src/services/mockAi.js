const intents = [
  {
    name: "greeting",
    patterns: ["hello", "hi", "hey", "namaste", "good morning", "good evening"],
    response: () => "Hi! I am HelperAI, your mock AI assistant UI. Ask me for code help, planning, writing, explanations, or ideas and I will shape the response around it."
  },
  {
    name: "code",
    patterns: ["code", "react", "javascript", "css", "html", "bug", "error", "component", "function"],
    response: (prompt) => `For **${prompt}**, I would handle it like a coding task:\n\n1. Reproduce the issue or define the exact behavior.\n2. Check the component state, props, and event handlers.\n3. Make the smallest clear change.\n4. Test the happy path and one edge case.\n\nExample provider shape for later real AI integration:\n\n\`\`\`ts\nexport interface AiProvider {\n  sendMessage(input: string): Promise<string>;\n  streamMessage?(input: string): AsyncIterable<string>;\n}\n\`\`\``
  },
  {
    name: "plan",
    patterns: ["plan", "roadmap", "strategy", "steps", "build", "project", "startup"],
    response: (prompt) => `Here is a practical plan for **${prompt}**:\n\n- **Goal:** define the final outcome in one sentence.\n- **Scope:** list must-have features first, then nice-to-have polish.\n- **Milestones:** design, build, test, launch, improve.\n- **Risks:** unclear requirements, too many features, missing validation.\n- **Next action:** create a small first version and get feedback quickly.`
  },
  {
    name: "summary",
    patterns: ["summarize", "summary", "short", "brief", "notes", "meeting"],
    response: (prompt) => `Summary for **${prompt}**:\n\nThe main idea is to reduce the information into clear decisions, action items, and open questions.\n\n**Suggested format:**\n\n- Key point\n- Decision made\n- Owner\n- Due date\n- Follow-up question`
  },
  {
    name: "explain",
    patterns: ["explain", "what is", "why", "how does", "learn", "teach"],
    response: (prompt) => `Let me explain **${prompt}** simply:\n\nThink of it in three layers:\n\n1. **Concept:** what it means.\n2. **Mechanism:** how it works.\n3. **Use case:** when you would use it.\n\nIf this were connected to a real model, the next step would be adding examples based on your exact skill level.`
  },
  {
    name: "creative",
    patterns: ["write", "draft", "create", "idea", "ideas", "caption", "email", "story"],
    response: (prompt) => `Here is a polished draft for **${prompt}**:\n\n**Version 1:** Clear, direct, and professional.\n\n**Version 2:** More warm and conversational.\n\n**Version 3:** Short and high-impact.\n\nTell me the tone you want and I can reshape it.`
  }
];

const fallbackResponses = [
  (prompt) => `I understand you are asking about **${prompt}**. Since this is mock AI logic, I can give a structured response, but it is not connected to a real language model yet.\n\nA useful answer would include:\n\n- What you want to achieve\n- Current context\n- Constraints\n- A clear next step`,
  (prompt) => `For **${prompt}**, I would start by clarifying the goal, then turning it into a small action plan.\n\n**Quick path:** define the result, list the inputs, choose the first task, then improve from feedback.`,
  (prompt) => `Good question: **${prompt}**\n\nHere is my mock assistant take: break it into smaller pieces, solve the most important part first, and keep the result easy to review.`
];

function findIntent(prompt) {
  const normalizedPrompt = prompt.toLowerCase();

  return intents.find((intent) =>
    intent.patterns.some((pattern) => normalizedPrompt.includes(pattern))
  );
}

function pickResponse(prompt) {
  const intent = findIntent(prompt);

  if (intent) {
    return intent.response(prompt);
  }

  const index = Math.abs([...prompt].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % fallbackResponses.length;
  return fallbackResponses[index](prompt);
}

export async function createMockResponse(prompt, regenerated = false) {
  await new Promise((resolve) => window.setTimeout(resolve, regenerated ? 500 : 850));
  const prefix = regenerated ? "Regenerated response:\n\n" : "";

  return prefix + pickResponse(prompt);
}
