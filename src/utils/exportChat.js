export function exportChatAsMarkdown(chat) {
  const body = chat.messages
    .map((message) => `## ${message.role === "user" ? "You" : "HelperAI"}\n\n${message.content}`)
    .join("\n\n");
  const blob = new Blob([`# ${chat.title}\n\n${body}`], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `${chat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "chat"}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
}
