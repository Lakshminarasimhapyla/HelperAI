# HelperAI Chat

A modern React + Vite AI chat application UI with a premium SaaS feel, dark/light mode, responsive sidebar, chat history, markdown messages, typing states, export, settings, and mock AI responses.

## Setup

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
npm run preview
```

## Structure

```text
src/
  components/     Reusable UI components
  context/        Chat and theme state
  data/           Seed chats and suggestions
  services/       Mock AI service, ready for API adapters
  utils/          Formatting and export helpers
```

## Future API Integration

Replace `src/services/mockAi.js` with an adapter for OpenAI, Ollama, Hugging Face, or a LangChain backend. The UI expects a text response and already simulates streaming in `ChatContext`.
