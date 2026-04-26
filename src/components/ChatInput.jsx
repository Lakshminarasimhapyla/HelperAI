import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Paperclip, SendHorizontal } from "lucide-react";
import { useChat } from "../context/ChatContext.jsx";

const MAX_CHARS = 4000;

export default function ChatInput() {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);
  const { isTyping, sendMessage, showToast } = useChat();
  const count = value.length;

  function resizeTextarea() {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }

  function handleSubmit() {
    if (!value.trim()) {
      return;
    }

    sendMessage(value);
    setValue("");

    window.requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    });
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="fixed bottom-16 left-0 right-0 z-20 px-4 pb-4 sm:bottom-0 lg:left-[300px] lg:px-8">
      <motion.div
        className="glass-panel mx-auto max-w-4xl rounded-2xl p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
      >
        <div className="flex items-end gap-2">
          <button className="icon-button shrink-0" type="button" aria-label="Attach file" onClick={() => showToast("File attachment UI is ready for integration")}>
            <Paperclip size={18} />
          </button>

          <label className="min-w-0 flex-1">
            <span className="sr-only">Message</span>
            <textarea
              ref={textareaRef}
              className="custom-scrollbar max-h-44 min-h-[48px] w-full resize-none rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm leading-6 text-slate-900 placeholder:text-slate-400 transition focus:border-cyan-400 dark:border-white/10 dark:bg-slate-950/50 dark:text-white"
              value={value}
              maxLength={MAX_CHARS}
              onChange={(event) => {
                setValue(event.target.value);
                resizeTextarea();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask HelperAI anything..."
              aria-label="Type your message"
            />
          </label>

          <button className="icon-button shrink-0" type="button" aria-label="Start voice input" onClick={() => showToast("Voice input UI is ready for integration")}>
            <Mic size={18} />
          </button>
          <button className="gradient-button h-12 shrink-0 px-4" type="button" onClick={handleSubmit} disabled={!value.trim() || isTyping} aria-label="Send message">
            <SendHorizontal size={18} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
          <span>Enter to send · Shift+Enter for a new line</span>
          <span className={count > MAX_CHARS * 0.9 ? "text-amber-500" : ""}>{count}/{MAX_CHARS}</span>
        </div>
      </motion.div>
    </div>
  );
}
