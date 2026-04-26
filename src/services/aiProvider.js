import { createMockResponse } from "./mockAi.js";
import { createOllamaResponse } from "./ollama.js";

export const AI_PROVIDER_KEY = "nova-ai-provider";
export const OLLAMA_MODEL_KEY = "nova-ollama-model";
export const OLLAMA_BASE_URL_KEY = "nova-ollama-url";

function getDefaultProvider() {
  const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

  return isLocalhost ? "ollama" : "mock";
}

export function getAiSettings() {
  return {
    provider: localStorage.getItem(AI_PROVIDER_KEY) || getDefaultProvider(),
    ollamaModel: localStorage.getItem(OLLAMA_MODEL_KEY) || import.meta.env.VITE_OLLAMA_MODEL || "llama3.2",
    ollamaBaseUrl: localStorage.getItem(OLLAMA_BASE_URL_KEY) || "http://localhost:11434"
  };
}

export function saveAiSettings(settings) {
  localStorage.setItem(AI_PROVIDER_KEY, settings.provider);
  localStorage.setItem(OLLAMA_MODEL_KEY, settings.ollamaModel.trim());
  localStorage.setItem(OLLAMA_BASE_URL_KEY, settings.ollamaBaseUrl.trim().replace(/\/$/, ""));
}

export async function createAiResponse(prompt, regenerated = false, onToken) {
  const settings = getAiSettings();

  if (settings.provider === "ollama") {
    return createOllamaResponse(prompt, settings, regenerated, onToken);
  }

  return createMockResponse(prompt, regenerated);
}
