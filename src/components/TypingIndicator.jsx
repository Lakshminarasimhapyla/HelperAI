import React from "react";
import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-3" aria-live="polite" aria-label="AI is typing">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-white">
        <Bot size={18} />
      </div>
      <div className="glass-panel flex items-center gap-1 rounded-2xl rounded-tl-md px-4 py-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.2s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.1s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400" />
      </div>
    </div>
  );
}
