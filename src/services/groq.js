export async function createGroqResponse(prompt, regenerated = false) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: regenerated ? `Regenerate and improve this answer: ${prompt}` : prompt
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Groq request failed.");
  }

  if (!data.content?.trim()) {
    throw new Error("Groq returned an empty response.");
  }

  return data.content.trim();
}
