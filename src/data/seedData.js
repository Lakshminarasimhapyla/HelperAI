export const suggestions = [
  "Draft a go-to-market plan for a new AI workspace",
  "Explain retrieval augmented generation with an example",
  "Write a React component checklist for production quality",
  "Turn these rough meeting notes into a clear action plan"
];

export const seedChats = [
  {
    id: "chat-welcome",
    title: "Welcome to HelperAI",
    updatedAt: new Date().toISOString(),
    messages: [
      {
        id: "msg-welcome-1",
        role: "assistant",
        content: "Welcome to **HelperAI**. Ask me to brainstorm, code, summarize, debug, or design a workflow.\n\n```js\nconst idea = 'premium AI assistant platform';\nconsole.log(`Build ${idea}`);\n```",
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: "chat-product",
    title: "Product strategy ideas",
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    messages: []
  },
  {
    id: "chat-code",
    title: "Code review checklist",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    messages: []
  }
];
