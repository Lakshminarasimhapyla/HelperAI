import React from "react";
import { CircleAlert } from "lucide-react";

export default function ErrorBanner({ message }) {
  return (
    <div className="mb-4 flex items-center gap-3 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300" role="alert">
      <CircleAlert size={18} />
      <span>{message}</span>
    </div>
  );
}
