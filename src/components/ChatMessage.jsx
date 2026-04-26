import React, { memo } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Bot, Copy, RefreshCw, UserRound } from "lucide-react";
import { useChat } from "../context/ChatContext.jsx";
import { formatTime } from "../utils/date.js";

function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const { copyMessage, regenerateLastResponse } = useChat();

  return (
    <article className={`group flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser ? (
        <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-glow">
          <Bot size={18} />
        </div>
      ) : null}

      <div className={`max-w-[86%] sm:max-w-[78%] ${isUser ? "order-first" : ""}`}>
        <div className={`rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-xl ${isUser ? "rounded-tr-md border-blue-400/30 bg-blue-600 text-white" : "rounded-tl-md border-slate-200/70 bg-white/82 text-slate-800 dark:border-white/10 dark:bg-white/[0.07] dark:text-slate-100"}`}>
          <div className={`prose prose-sm max-w-none ${isUser ? "prose-invert" : "dark:prose-invert"} prose-pre:rounded-lg prose-pre:border prose-pre:border-white/10 prose-pre:bg-slate-950`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {message.content || " "}
            </ReactMarkdown>
          </div>
        </div>

        <div className={`mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 ${isUser ? "justify-end" : "justify-start"}`}>
          <span>{formatTime(message.createdAt)}</span>
          {message.isStreaming ? <span className="text-cyan-500">streaming</span> : null}
          <button className="rounded-md p-1 opacity-0 transition hover:bg-slate-900/5 group-hover:opacity-100 dark:hover:bg-white/10" type="button" onClick={() => copyMessage(message.content)} aria-label="Copy message">
            <Copy size={14} />
          </button>
          {!isUser ? (
            <button className="rounded-md p-1 opacity-0 transition hover:bg-slate-900/5 group-hover:opacity-100 dark:hover:bg-white/10" type="button" onClick={regenerateLastResponse} aria-label="Regenerate response">
              <RefreshCw size={14} />
            </button>
          ) : null}
        </div>
      </div>

      {isUser ? (
        <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-950">
          <UserRound size={18} />
        </div>
      ) : null}
    </article>
  );
}

export default memo(ChatMessage);
