import { useEffect, useState } from "react";
import { chatConversationService } from "../../api/chatConversationService";
import type { Conversation } from "../../types";
import { useApp } from "../../context/AppContext";

interface ChatConversationListProps {
  onSelectConversation: (id: number) => void;
  selectedId?: number;
  adminMode?: boolean;

  // ✅ NEW: allow external control
  conversations?: Conversation[];
}

export function ChatConversationList({
  onSelectConversation,
  selectedId,
  adminMode = false,
  conversations: externalConversations,
}: ChatConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useApp();

  const isControlled = !!externalConversations;
  const data = isControlled ? externalConversations! : conversations;

  useEffect(() => {
    if (isControlled) return;

    const load = async () => {
      setLoading(true);
      try {
        const res = adminMode
          ? await chatConversationService.getAllAdmin()
          : await chatConversationService.getMyConversations();

        const data = res.data;
        setConversations(Array.isArray(data) ? data : (data.items ?? []));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [adminMode, isControlled]);

  const isAdmin = currentUser?.role !== "Student";

  const formatTitle = (c: Conversation) => {
    const report = c.reportId
      ? `REP-${String(c.reportId).padStart(6, "0")}`
      : c.chatType;

    const name = isAdmin
      ? c.studentName || "Unknown Student"
      : c.assignedAdminName || "Unassigned Admin";

    return `${name} (${report})`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!isControlled && loading) {
    return <p className="text-sm p-3 text-slate-500">Loading conversations…</p>;
  }

  if (data.length === 0) {
    return <p className="text-sm p-3 text-slate-400">No conversations yet</p>;
  }

  return (
    <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
      {data.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelectConversation(conv.id)}
          className={`w-full text-left p-3 border rounded transition ${
            selectedId === conv.id
              ? "border-institution-700 bg-institution-50"
              : "border-slate-200 hover:bg-slate-50"
          }`}
        >
          <div className="font-semibold text-sm truncate">
            {formatTitle(conv)}
          </div>

          <div className="flex justify-between items-center">
            {conv.lastMessage && (
              <div className="text-xs text-slate-500 truncate flex-1">
                {conv.lastMessage}
              </div>
            )}

            {(conv.unreadCount ?? 0) > 0 && (
              <span className="ml-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                {conv.unreadCount}
              </span>
            )}
          </div>

          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>{formatDate(conv.lastMessageTime || conv.createdAt)}</span>

            <span
              className={
                conv.status === "Open"
                  ? "text-emerald-600 font-semibold"
                  : "text-slate-500"
              }
            >
              {conv.status}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
