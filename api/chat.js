const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GROQ_API_KEY) {
    return response.status(500).json({ error: "Missing GROQ_API_KEY environment variable." });
  }

  try {
    const { message, model = DEFAULT_MODEL } = request.body || {};

    if (!message || typeof message !== "string") {
      return response.status(400).json({ error: "Message is required." });
    }

    const groqResponse = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "You are HelperAI, a concise and helpful AI assistant. Use markdown when useful."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7
      })
    });

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      return response.status(groqResponse.status).json({
        error: data?.error?.message || "Groq request failed."
      });
    }

    return response.status(200).json({
      content: data?.choices?.[0]?.message?.content || ""
    });
  } catch (error) {
    return response.status(500).json({
      error: error.message || "Unexpected server error."
    });
  }
}
