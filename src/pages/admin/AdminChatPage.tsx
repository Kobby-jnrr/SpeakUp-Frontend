import { useState } from "react";
import { MessageSquare, Check } from "lucide-react";
import { ChatWindow } from "../../components/chat/ChatWindow";
import { Button } from "../../components/ui/Button";
import { Panel } from "../../components/ui/Cards";
import { useApp } from "../../context/AppContext";

interface Conversation {
  id: number;
  chatType: string;
  status: string;
  isAnonymous: boolean;
  createdAt: string;
  lastMessage?: string;
}

export function AdminChatPage() {
  const { addToast } = useApp();
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [view, setView] = useState<"all" | "unassigned" | "assigned">("all");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  // TODO: load conversations from backend, e.g.:
  // useEffect(() => {
  //   const load = async () => {
  //     setLoading(true);
  //     try {
  //       let res;
  //       if (view === "unassigned") res = await chatConversationService.getUnassigned();
  //       else if (view === "assigned") res = await chatConversationService.getAssignedToMe();
  //       else res = await chatConversationService.getAllAdmin();
  //       setConversations(res.data.items || res.data);
  //     } catch { addToast({ title: "Error", message: "Failed to load conversations", tone: "error" }); }
  //     finally { setLoading(false); }
  //   };
  //   load();
  // }, [view]);

  const handleCloseConversation = async () => {
    if (!selectedConversationId) return;

    // TODO: close conversation via backend, e.g.:
    // await chatConversationService.closeConversation(selectedConversationId);
    // then reload conversations

    addToast({ title: "Conversation closed", tone: "success" });
    setSelectedConversationId(null);
  };

  const currentConversation = conversations.find(
    (c) => c.id === selectedConversationId,
  );

  return (
    <div className="space-y-6">
      <Panel className="border-institution-100 bg-institution-50">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-institution-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-slate-950">
              Chat Management
            </h1>
            <p className="text-sm text-slate-700">
              Manage student conversations and support requests
            </p>
          </div>
        </div>
      </Panel>

      {/* View Tabs */}
      <div className="flex gap-2">
        {["all", "unassigned", "assigned"].map((v) => (
          <Button
            key={v}
            onClick={() => setView(v as any)}
            className={`capitalize ${
              view === v
                ? "bg-institution-600 text-white"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {v === "all"
              ? "All Chats"
              : v === "unassigned"
                ? "Unassigned"
                : "Assigned to Me"}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversation List */}
        <div className="lg:col-span-1">
          <Panel>
            <h2 className="font-semibold text-slate-950 mb-4">
              {loading ? "Loading..." : `${conversations.length} Conversations`}
            </h2>
            {loading ? (
              <p className="text-slate-600">Loading...</p>
            ) : conversations.length === 0 ? (
              <p className="text-slate-600 text-center py-8">
                No conversations
              </p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversationId(conv.id)}
                    className={`w-full text-left p-3 rounded-md border transition ${
                      selectedConversationId === conv.id
                        ? "border-institution-700 bg-institution-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-slate-900">
                          {conv.chatType} {conv.isAnonymous && "(Anon)"}
                        </div>
                        <p className="text-sm text-slate-600 truncate">
                          {conv.lastMessage}
                        </p>
                        <div className="text-xs text-slate-500 mt-1">
                          {new Date(conv.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded whitespace-nowrap ${
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
            )}
          </Panel>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          {selectedConversationId ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">
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
              <MessageSquare
                className="mx-auto text-slate-400 mb-4"
                size={48}
              />
              <p className="text-slate-600">Select a conversation to start</p>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
