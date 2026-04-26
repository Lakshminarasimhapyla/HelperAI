import React, { memo } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { useChat } from "../context/ChatContext.jsx";
import { formatRelative } from "../utils/date.js";

function ChatList({ chats, isCollapsed }) {
  const { activeChatId, deleteChat, setActiveChatId } = useChat();

  return (
    <div className="custom-scrollbar flex-1 overflow-y-auto px-3 pb-3" aria-label="Chat history">
      <div className="space-y-1">
        {chats.map((chat) => {
          const isActive = chat.id === activeChatId;

          return (
            <div key={chat.id} className={`group flex items-center rounded-lg transition ${isActive ? "bg-blue-500/10 text-blue-600 dark:bg-white/10 dark:text-white" : "text-slate-600 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/10"}`}>
              <button className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left" type="button" onClick={() => setActiveChatId(chat.id)} aria-current={isActive ? "page" : undefined}>
                <MessageSquare size={17} className="shrink-0" />
                {!isCollapsed ? (
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{chat.title}</span>
                    <span className="text-xs text-slate-400">{formatRelative(chat.updatedAt)}</span>
                  </span>
                ) : null}
              </button>
              {!isCollapsed ? (
                <button className="mr-2 grid h-8 w-8 place-items-center rounded-md text-slate-400 opacity-0 transition hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100" type="button" onClick={() => deleteChat(chat.id)} aria-label={`Delete ${chat.title}`}>
                  <Trash2 size={15} />
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(ChatList);
