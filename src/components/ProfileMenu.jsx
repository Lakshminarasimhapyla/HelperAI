import React from "react";
import { ChevronDown, Crown } from "lucide-react";

export default function ProfileMenu({ isCollapsed }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-lg border border-slate-200/70 bg-white/60 p-2 text-left transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10" type="button" aria-label="Open profile menu">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-amber-300 to-rose-400 text-slate-950">
        <Crown size={17} />
      </div>
      {!isCollapsed ? (
        <>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold">Pavan</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Pro workspace</span>
          </span>
          <span className="relative">
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
            <ChevronDown size={16} />
          </span>
        </>
      ) : null}
    </button>
  );
}
