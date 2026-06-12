import { useEffect, useState } from "react";
import { chatConversationService } from "../../api/chatConversationService";
import { Panel } from "../ui/Cards";

interface Conversation {
  id: number;
  chatType: string;
  status: string;
  isAnonymous: boolean;
  createdAt: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

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
    const loadConversations = async () => {
      try {
        setLoading(true);
        let response;

        if (adminMode) {
          response = await chatConversationService.getAllAdmin();
        } else {
          response = await chatConversationService.getMyConversations();
        }

        setConversations(response.data.items || response.data);
      } catch (err) {
        console.error("Failed to load conversations:", err);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [adminMode]);

  if (loading) {
    return <Panel>Loading conversations...</Panel>;
  }

  if (conversations.length === 0) {
    return (
      <Panel>
        <p className="text-center text-slate-600 py-8">No conversations yet</p>
      </Panel>
    );
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
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
            <div className="flex-1">
              <div className="font-semibold text-sm text-slate-900">
                {conv.chatType} {conv.isAnonymous && "(Anonymous)"}
              </div>
              {conv.lastMessage && (
                <p className="text-sm text-slate-600 truncate">
                  {conv.lastMessage}
                </p>
              )}
              <div className="text-xs text-slate-500 mt-1">
                {new Date(conv.createdAt).toLocaleDateString()}
              </div>
            </div>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded ${
                conv.status === "Open"
                  ? "bg-support-100 text-support-700"
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
