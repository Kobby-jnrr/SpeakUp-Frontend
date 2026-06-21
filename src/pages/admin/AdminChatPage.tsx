import { useEffect, useState } from "react";
import { MessageSquare, UserPlus, Check } from "lucide-react";

import { ChatWindow } from "../../components/chat/ChatWindow";
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
    } catch {
      addToast({
        title: "Error",
        message: "Failed to load conversations",
        tone: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, [view]);

  // ✅ DISPLAY NAME LOGIC (IMPORTANT)
  const getChatName = (c: Conversation) => {
    if (c.isAnonymous) return "Anonymous User";

    const studentName = c.student
      ? `${c.student.firstName} ${c.student.lastName}`
      : null;

    const adminName = c.assignedAdmin
      ? `${c.assignedAdmin.firstName} ${c.assignedAdmin.lastName}`
      : null;

    // Admin view: show student
    return studentName || adminName || `Chat #${c.id}`;
  };

  const currentConversation = conversations.find(
    (c) => c.id === selectedConversationId,
  );

  const handleClaim = async (convId: number) => {
    try {
      await chatConversationService.assignAdmin({
        conversationId: convId,
        adminId: Number(currentUser?.id),
      });

      addToast({
        title: "Assigned",
        message: "Conversation assigned to you",
        tone: "success",
      });

      await loadConversations();
      setSelectedConversationId(convId);
    } catch (err: any) {
      addToast({
        title: "Error",
        message: err.response?.data || "Could not assign conversation",
        tone: "error",
      });
    }
  };

  const handleClose = async () => {
    if (!selectedConversationId) return;

    try {
      await chatConversationService.closeConversation(selectedConversationId);

      addToast({
        title: "Closed",
        message: "Conversation closed",
        tone: "success",
      });

      setSelectedConversationId(null);
      loadConversations();
    } catch (err: any) {
      addToast({
        title: "Error",
        message: err.response?.data || "Could not close chat",
        tone: "error",
      });
    }
  };

  const tabs: { key: ViewTab; label: string }[] = [
    { key: "all", label: "All Chats" },
    { key: "unassigned", label: "Unassigned" },
    { key: "assigned", label: "Assigned to Me" },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel className="border-institution-100 bg-institution-50">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-institution-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold">Chat Management</h1>
            <p className="text-sm text-slate-600">
              Manage student support conversations
            </p>
          </div>
        </div>
      </Panel>

      {/* TABS */}
      <div className="flex gap-2">
        {tabs.map((t) => (
          <Button
            key={t.key}
            onClick={() => {
              setView(t.key);
              setSelectedConversationId(null);
            }}
            className={
              view === t.key
                ? "bg-institution-600 text-white"
                : "bg-slate-200 text-slate-700"
            }
          >
            {t.label}
          </Button>
        ))}
      </div>

      {/* MAIN */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* LIST */}
        <Panel className="lg:col-span-1">
          <h2 className="font-semibold mb-4">
            {loading ? "Loading..." : `${conversations.length} Conversations`}
          </h2>

          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversationId(conv.id)}
              className={`w-full text-left p-3 border rounded mb-2 ${
                selectedConversationId === conv.id
                  ? "border-institution-700 bg-institution-50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              {/* 👇 CHAT NAME HERE */}
              <div className="font-semibold text-sm">{getChatName(conv)}</div>

              <div className="text-xs text-slate-500">{conv.chatType}</div>

              {conv.lastMessage && (
                <p className="text-xs text-slate-400 truncate">
                  {conv.lastMessage}
                </p>
              )}
            </button>
          ))}
        </Panel>

        {/* CHAT WINDOW */}
        <div className="lg:col-span-2">
          {selectedConversationId ? (
            <div className="space-y-3">
              {/* 👇 TOP HEADER NAME */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">
                  {getChatName(currentConversation!)}
                </h2>

                {currentConversation?.status === "Open" && (
                  <Button
                    onClick={handleClose}
                    className="bg-slate-600 text-white text-sm"
                  >
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
