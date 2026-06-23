import { useEffect, useState } from "react";
import { MessageSquare, Check } from "lucide-react";

import { ChatWindow } from "../../components/chat/ChatWindow";
import { ChatConversationList } from "../../components/chat/ChatConversationList";
import { Button } from "../../components/ui/Button";
import { Panel } from "../../components/ui/Cards";

import { useApp } from "../../context/AppContext";
import { chatConversationService } from "../../api/chatConversationService";
import type { Conversation } from "../../types";

type ViewTab = "all" | "unassigned" | "assigned";

export function AdminChatPage() {
  const { addToast, currentUser } = useApp();

  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [view, setView] = useState<ViewTab>("all");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  const loadConversations = async () => {
    setLoading(true);
    try {
      let res;

      if (view === "unassigned") {
        res = await chatConversationService.getUnassigned();
      } else if (view === "assigned") {
        res = await chatConversationService.getAssignedToMe();
      } else {
        res = await chatConversationService.getAllAdmin();
      }

      const data = res.data;
      setConversations(Array.isArray(data) ? data : (data.items ?? []));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, [view]);

  const getChatName = (c?: Conversation) => {
    if (!c) return "";

    const report = c.reportId
      ? `REP-${String(c.reportId).padStart(5, "0")}`
      : c.chatType;

    const isAdmin = currentUser?.role !== "Student";

    const name = isAdmin
      ? c.studentName || "Unknown Student"
      : c.assignedAdminName || "Unassigned Admin";

    return `${name} (${report})`;
  };

  const currentConversation = conversations.find(
    (c) => c.id === selectedConversationId,
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel>
        <div className="flex items-center gap-3">
          <MessageSquare size={32} />
          <div>
            <h1 className="text-2xl font-bold">Chat Management</h1>
            <p className="text-sm text-slate-600">
              Manage student support conversations
            </p>
          </div>
        </div>
      </Panel>

      {/* MAIN */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* LIST */}
        <Panel className="lg:col-span-1">
          <ChatConversationList
            adminMode
            selectedId={selectedConversationId || undefined}
            onSelectConversation={setSelectedConversationId}
          />
        </Panel>

        {/* CHAT WINDOW */}
        <div className="lg:col-span-2">
          {selectedConversationId ? (
            <div className="space-y-3">
              {/* HEADER (FIXED) */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">
                  {getChatName(currentConversation)}
                </h2>

                {currentConversation?.status === "Open" && (
                  <Button className="bg-slate-600 text-white text-sm">
                    <Check size={14} />
                    Close
                  </Button>
                )}
              </div>

              <ChatWindow conversationId={selectedConversationId} />
            </div>
          ) : (
            <Panel className="text-center py-12 text-slate-500">
              <MessageSquare className="mx-auto mb-3" />
              Select a conversation
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
