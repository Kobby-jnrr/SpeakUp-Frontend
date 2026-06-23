import { useEffect, useState } from "react";
import { MessageSquare, Check, UserPlus } from "lucide-react";

import { ChatWindow } from "../../components/chat/ChatWindow";
import { ChatConversationList } from "../../components/chat/ChatConversationList";
import { Button } from "../../components/ui/Button";
import { Panel } from "../../components/ui/Cards";

import { useApp } from "../../context/AppContext";
import { chatConversationService } from "../../api/chatConversationService";
import type { Conversation } from "../../types";

type ViewTab = "all" | "unassigned" | "assigned";
type ChatFilter = "all" | "report" | "support";

export function AdminChatPage() {
  const { addToast, currentUser } = useApp();

  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

  const [view, setView] = useState<ViewTab>("all");
  const [chatFilter, setChatFilter] = useState<ChatFilter>("all");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- LOAD ---------------- */

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

  /* ---------------- FILTER LOGIC ---------------- */

  const filteredConversations = conversations.filter((c: Conversation) => {
    if (chatFilter === "all") return true;
    if (chatFilter === "report") return c.chatType === "Report";
    if (chatFilter === "support") return c.chatType === "Support";
    return true;
  });

  /* ---------------- CLAIM CHAT ---------------- */

  const handleClaim = async (convId: number) => {
    try {
      await chatConversationService.assignAdmin({
        conversationId: convId,
        adminId: Number(currentUser?.id),
      });

      addToast({
        title: "Chat claimed",
        message: "You are now assigned to this conversation",
        tone: "success",
      });

      await loadConversations();
      setSelectedConversationId(convId);
    } catch (err: any) {
      addToast({
        title: "Error",
        message: err.response?.data || "Could not claim chat",
        tone: "error",
      });
    }
  };

  /* ---------------- CLOSE CHAT ---------------- */

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

  /* ---------------- TITLE ---------------- */

  const getChatName = (c?: Conversation) => {
    if (!c) return "";

    const report = c.reportId
      ? `REP-${String(c.reportId).padStart(5, "0")}`
      : c.chatType;

    const student = c.studentName || "Unknown Student";

    return `${student} (${report})`;
  };

  const currentConversation = filteredConversations.find(
    (c: Conversation) => c.id === selectedConversationId,
  );

  /* ---------------- UI ---------------- */

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

        {/* FILTER BUTTONS */}
        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => setChatFilter("all")}
            className={chatFilter === "all" ? "bg-slate-800 text-white" : ""}
          >
            All Chats
          </Button>

          <Button
            onClick={() => setChatFilter("report")}
            className={chatFilter === "report" ? "bg-slate-800 text-white" : ""}
          >
            Report Chats
          </Button>

          <Button
            onClick={() => setChatFilter("support")}
            className={
              chatFilter === "support" ? "bg-slate-800 text-white" : ""
            }
          >
            Support Chats
          </Button>
        </div>
      </Panel>

      {/* MAIN */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* LIST */}
        <Panel className="lg:col-span-1">
          <ChatConversationList
            adminMode
            conversations={filteredConversations}
            selectedId={selectedConversationId || undefined}
            onSelectConversation={setSelectedConversationId}
          />
        </Panel>

        {/* CHAT */}
        <div className="lg:col-span-2">
          {selectedConversationId ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">
                  {getChatName(currentConversation)}
                </h2>

                <div className="flex gap-2 items-center">
                  {!currentConversation?.assignedAdminId &&
                    currentConversation?.chatType === "Support" && (
                      <Button
                        onClick={() => handleClaim(currentConversation.id)}
                        className="bg-green-600 text-white text-sm"
                      >
                        <UserPlus size={14} />
                        Claim
                      </Button>
                    )}

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
