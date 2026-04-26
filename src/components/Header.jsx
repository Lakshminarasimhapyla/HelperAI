import React from "react";
import { Download, Menu, Moon, RefreshCw, Settings, Sun } from "lucide-react";
import { useChat } from "../context/ChatContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Header({ onMenuClick, onOpenSettings, onRegenerate }) {
  const { activeChat, clearActiveChat, exportActiveChat, isTyping } = useChat();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/70 px-4 py-3 backdrop-blur-2xl dark:border-white/10 dark:bg-ink-950/65 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <button className="icon-button lg:hidden" type="button" onClick={onMenuClick} aria-label="Open sidebar">
          <Menu size={19} />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-base font-bold sm:text-lg">{activeChat?.title || "New conversation"}</h1>
            {isTyping ? <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-500">typing</span> : null}
          </div>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">Premium assistant UI ready for real AI providers</p>
        </div>

        <button className="icon-button hidden sm:inline-flex" type="button" onClick={onRegenerate} aria-label="Regenerate response">
          <RefreshCw size={18} />
        </button>
        <button className="icon-button hidden sm:inline-flex" type="button" onClick={exportActiveChat} aria-label="Export chat">
          <Download size={18} />
        </button>
        <button className="rounded-lg border border-slate-200/70 px-3 py-2 text-sm text-slate-600 transition hover:bg-white dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10" type="button" onClick={clearActiveChat}>
          Clear
        </button>
        <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="icon-button hidden md:inline-flex" type="button" onClick={onOpenSettings} aria-label="Open settings">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
