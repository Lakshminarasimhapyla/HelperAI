import React, { memo, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageSquarePlus, Search, Settings, Sparkles, X } from "lucide-react";
import ChatList from "./ChatList.jsx";
import ProfileMenu from "./ProfileMenu.jsx";
import { useChat } from "../context/ChatContext.jsx";

function Sidebar({ isOpen, isCollapsed, onClose, onToggleCollapse, onOpenSettings }) {
  const [query, setQuery] = useState("");
  const { chats, startNewChat } = useChat();
  const filteredChats = useMemo(() => (
    chats.filter((chat) => chat.title.toLowerCase().includes(query.toLowerCase()))
  ), [chats, query]);

  const content = (
    <aside className={`glass-panel flex h-full flex-col rounded-none border-y-0 border-l-0 transition-all duration-300 ${isCollapsed ? "w-[88px]" : "w-[300px]"}`}>
      <div className="flex items-center gap-3 border-b border-slate-200/70 p-4 dark:border-white/10">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-glow">
          <Sparkles size={21} />
        </div>
        {!isCollapsed ? (
          <div className="min-w-0">
            <p className="truncate text-base font-bold">HelperAI</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Assistant workspace</p>
          </div>
        ) : null}
        <button className="icon-button ml-auto lg:hidden" type="button" onClick={onClose} aria-label="Close sidebar">
          <X size={18} />
        </button>
      </div>

      <div className="space-y-3 p-4">
        <button className="gradient-button w-full" type="button" onClick={startNewChat} aria-label="Start new chat">
          <MessageSquarePlus size={18} />
          {!isCollapsed ? <span>New Chat</span> : null}
        </button>

        {!isCollapsed ? (
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              className="w-full rounded-lg border border-slate-200/70 bg-white/80 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search chats"
              aria-label="Search chats"
            />
          </label>
        ) : null}
      </div>

      <ChatList chats={filteredChats} isCollapsed={isCollapsed} />

      <div className="mt-auto space-y-3 border-t border-slate-200/70 p-4 dark:border-white/10">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/10" type="button" onClick={onOpenSettings}>
          <Settings size={18} />
          {!isCollapsed ? <span>Settings</span> : null}
        </button>
        <ProfileMenu isCollapsed={isCollapsed} />
        <button className="hidden w-full items-center justify-center gap-2 rounded-lg border border-slate-200/70 py-2 text-sm text-slate-600 transition hover:bg-white/70 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10 lg:flex" type="button" onClick={onToggleCollapse} aria-label="Collapse sidebar">
          {isCollapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
          {!isCollapsed ? <span>Collapse</span> : null}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block">{content}</div>
      <AnimatePresence>
        {isOpen ? (
          <motion.div className="fixed inset-0 z-40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="absolute inset-0 bg-slate-950/60" type="button" aria-label="Close sidebar overlay" onClick={onClose} />
            <motion.div initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} transition={{ type: "spring", damping: 28, stiffness: 260 }} className="relative h-full">
              {content}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default memo(Sidebar);
