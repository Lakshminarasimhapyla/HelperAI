import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4" aria-label="Loading conversations">
      {[0, 1, 2].map((item) => (
        <div key={item} className="glass-panel relative overflow-hidden rounded-2xl p-5">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          <div className="h-4 w-1/3 rounded bg-slate-300/60 dark:bg-white/10" />
          <div className="mt-3 h-3 w-full rounded bg-slate-300/50 dark:bg-white/10" />
          <div className="mt-2 h-3 w-3/4 rounded bg-slate-300/50 dark:bg-white/10" />
        </div>
      ))}
    </div>
  );
}
