import React from "react";
import { MessageSquarePlus, Settings, Sparkles } from "lucide-react";

export default function MobileBottomNav({ onNewChat, onOpenSettings }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200/70 bg-white/85 px-5 py-2 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/85 sm:hidden" aria-label="Mobile navigation">
      <div className="mx-auto flex max-w-sm items-center justify-between">
        <button className="grid place-items-center gap-1 text-xs text-slate-600 dark:text-slate-300" type="button" onClick={onNewChat}>
          <MessageSquarePlus size={20} />
          New
        </button>
        <button className="grid -translate-y-4 place-items-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 p-4 text-white shadow-glow" type="button" aria-label="HelperAI home">
          <Sparkles size={22} />
        </button>
        <button className="grid place-items-center gap-1 text-xs text-slate-600 dark:text-slate-300" type="button" onClick={onOpenSettings}>
          <Settings size={20} />
          Settings
        </button>
      </div>
    </nav>
  );
}
