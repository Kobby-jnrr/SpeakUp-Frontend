import { useEffect, useState } from "react";
import { chatConversationService } from "../../api/chatConversationService";
import type { Conversation } from "../../types";

interface ChatConversationListProps {
  onSelectConversation: (id: number) => void;
  selectedId?: number;
  adminMode?: boolean;
}

export function ChatConversationList({
  onSelectConversation,
  selectedId,
  adminMode = false,
}: ChatConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = adminMode
          ? await chatConversationService.getAllAdmin()
          : await chatConversationService.getMyConversations();
        const data = res.data;
        setConversations(Array.isArray(data) ? data : data.items ?? []);
      } catch (err) {
        console.error("Failed to load conversations:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [adminMode]);

  if (loading) {
    return (
      <div className="py-6 text-center">
        <p className="text-slate-500 text-sm">Loading conversations…</p>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-slate-400 text-sm">No conversations yet</p>
        {!adminMode && (
          <p className="text-slate-400 text-xs mt-1">
            Click "New Chat" to start one
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelectConversation(conv.id)}
          className={`w-full text-left p-3 rounded-md border transition ${
            selectedId === conv.id
              ? "border-institution-700 bg-institution-50"
              : "border-slate-200 hover:bg-slate-50"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-slate-900">
                {conv.chatType} {conv.isAnonymous && "(Anonymous)"}
              </div>
              {conv.lastMessage && (
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {conv.lastMessage}
                </p>
              )}
              <div className="text-xs text-slate-400 mt-1">
                {new Date(conv.createdAt).toLocaleDateString()}
              </div>
            </div>
            <span
              className={`px-2 py-0.5 text-xs font-semibold rounded whitespace-nowrap flex-shrink-0 ${
                conv.status === "Open"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {conv.status}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
