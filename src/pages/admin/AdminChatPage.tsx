import { useEffect, useState } from "react";
import { MessageSquare, Check, UserPlus } from "lucide-react";
import { ChatWindow } from "../../components/chat/ChatWindow";
import { Button } from "../../components/ui/Button";
import { Panel } from "../../components/ui/Cards";
import { useApp } from "../../context/AppContext";
import { chatConversationService } from "../../api/chatConversationService";
import type { Conversation } from "../../types";

type ViewTab = "all" | "unassigned" | "assigned";

export function AdminChatPage() {
  const { addToast, currentUser } = useApp();
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
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
      // Both paginated and plain array responses handled
      const data = res.data;
      setConversations(Array.isArray(data) ? data : data.items ?? []);
    } catch {
      addToast({ title: "Error", message: "Failed to load conversations", tone: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, [view]);

  const handleClaimConversation = async (convId: number) => {
    try {
      await chatConversationService.assignAdmin({
        conversationId: convId,
        adminId: Number(currentUser?.id),
      });
      addToast({ title: "Assigned", message: "Conversation assigned to you", tone: "success" });
      loadConversations();
    } catch (err: any) {
      addToast({
        title: "Error",
        message: err.response?.data || "Could not assign conversation",
        tone: "error",
      });
    }
  };

  const handleCloseConversation = async () => {
    if (!selectedConversationId) return;
    try {
      await chatConversationService.closeConversation(selectedConversationId);
      addToast({ title: "Closed", message: "Conversation has been closed", tone: "success" });
      setSelectedConversationId(null);
      loadConversations();
    } catch (err: any) {
      addToast({
        title: "Error",
        message: err.response?.data || "Could not close conversation",
        tone: "error",
      });
    }
  };

  const currentConversation = conversations.find((c) => c.id === selectedConversationId);

  const tabs: { key: ViewTab; label: string }[] = [
    { key: "all", label: "All Chats" },
    { key: "unassigned", label: "Unassigned" },
    { key: "assigned", label: "Assigned to Me" },
  ];

  return (
    <div className="space-y-6">
      <Panel className="border-institution-100 bg-institution-50">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-institution-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-slate-950">Chat Management</h1>
            <p className="text-sm text-slate-700">
              Manage student conversations and support requests
            </p>
          </div>
        </div>
      </Panel>

      {/* View Tabs */}
      <div className="flex gap-2">
        {tabs.map((t) => (
          <Button
            key={t.key}
            onClick={() => {
              setView(t.key);
              setSelectedConversationId(null);
            }}
            className={`capitalize ${
              view === t.key
                ? "bg-institution-600 text-white"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
            }`}
          >
            {t.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversation List */}
        <div className="lg:col-span-1">
          <Panel>
            <h2 className="font-semibold text-slate-950 mb-4">
              {loading ? "Loading…" : `${conversations.length} Conversations`}
            </h2>
            {loading ? (
              <p className="text-slate-600 text-sm">Loading…</p>
            ) : conversations.length === 0 ? (
              <p className="text-slate-600 text-center py-8 text-sm">
                No conversations in this view
              </p>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {conversations.map((conv) => (
                  <div key={conv.id} className="space-y-1">
                    <button
                      onClick={() => setSelectedConversationId(conv.id)}
                      className={`w-full text-left p-3 rounded-md border transition ${
                        selectedConversationId === conv.id
                          ? "border-institution-700 bg-institution-50"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-slate-900">
                            {conv.chatType} {conv.isAnonymous && "(Anon)"}
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
                          className={`px-2 py-0.5 text-xs font-semibold rounded whitespace-nowrap ${
                            conv.status === "Open"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {conv.status}
                        </span>
                      </div>
                    </button>
                    {view === "unassigned" && (
                      <button
                        onClick={() => handleClaimConversation(conv.id)}
                        className="w-full flex items-center justify-center gap-1 text-xs py-1 rounded bg-institution-50 text-institution-700 hover:bg-institution-100 border border-institution-200 transition"
                      >
                        <UserPlus size={12} /> Assign to me
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          {selectedConversationId ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-950">
                  {currentConversation?.chatType}
                  {currentConversation?.isAnonymous && " (Anonymous)"}
                </h2>
                {currentConversation?.status === "Open" && (
                  <Button
                    onClick={handleCloseConversation}
                    className="bg-slate-600 hover:bg-slate-700 text-white text-sm"
                  >
                    <Check size={16} className="mr-1" />
                    Close Chat
                  </Button>
                )}
              </div>
              <ChatWindow conversationId={selectedConversationId} />
            </div>
          ) : (
            <Panel className="text-center py-12">
              <MessageSquare className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500">Select a conversation to start</p>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
