export async function createOllamaResponse(prompt, settings, regenerated = false, onToken) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 120000);

  const response = await fetch(`${settings.ollamaBaseUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    signal: controller.signal,
    body: JSON.stringify({
      model: settings.ollamaModel,
      stream: Boolean(onToken),
      messages: [
        {
          role: "system",
          content: "You are HelperAI, a concise and helpful AI assistant inside a modern chat UI. Use markdown when useful."
        },
        {
          role: "user",
          content: regenerated ? `Regenerate and improve this answer: ${prompt}` : prompt
        }
      ]
    })
  }).finally(() => {
    if (!onToken) {
      window.clearTimeout(timeoutId);
    }
  });

  if (!response.ok) {
    window.clearTimeout(timeoutId);
    throw new Error(`Ollama returned ${response.status}. Check that model "${settings.ollamaModel}" is installed.`);
  }

  if (onToken) {
    return readOllamaStream(response, onToken, timeoutId);
  }

  const data = await response.json();
  window.clearTimeout(timeoutId);
  const content = data?.message?.content?.trim();

  if (!content) {
    throw new Error("Ollama returned an empty response.");
  }

  return content;
}

async function readOllamaStream(response, onToken, timeoutId) {
  const reader = response.body?.getReader();

  if (!reader) {
    window.clearTimeout(timeoutId);
    throw new Error("This browser could not read the Ollama stream.");
  }

  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.trim()) {
        continue;
      }

      const data = JSON.parse(line);
      const token = data?.message?.content || "";

      if (token) {
        fullText += token;
        onToken(token, fullText);
      }

      if (data.done) {
        window.clearTimeout(timeoutId);
        return fullText.trim();
      }
    }
  }

  window.clearTimeout(timeoutId);

  if (!fullText.trim()) {
    throw new Error("Ollama returned an empty response.");
  }

  return fullText.trim();
}
