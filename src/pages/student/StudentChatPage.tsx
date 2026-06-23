import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageSquare, Plus } from "lucide-react";

import { ChatWindow } from "../../components/chat/ChatWindow";
import { ChatConversationList } from "../../components/chat/ChatConversationList";
import { Button } from "../../components/ui/Button";
import { Panel } from "../../components/ui/Cards";
import { Field, inputClass } from "../../components/ui/Form";

import { useApp } from "../../context/AppContext";
import { chatConversationService } from "../../api/chatConversationService";
import type { Conversation } from "../../types";

export function StudentChatPage() {
  const { addToast } = useApp();
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(conversationId ? Number(conversationId) : null);

  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [creating, setCreating] = useState(false);

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [newChat, setNewChat] = useState({
    chatType: "Support", // ✅ default SUPPORT FIX
    reportId: "",
    isAnonymous: false,
  });

  useEffect(() => {
    const load = async () => {
      const res = await chatConversationService.getMyConversations();
      const data = res.data;
      setConversations(Array.isArray(data) ? data : (data.items ?? []));
    };

    load();
  }, []);

  const currentConversation = conversations.find(
    (c) => c.id === selectedConversationId,
  );

  const getChatTitle = (c?: Conversation) => {
    if (!c) return "";

    const report = c.reportId
      ? `REP-${String(c.reportId).padStart(5, "0")}`
      : c.chatType;

    const admin = c.assignedAdminName || "Unassigned Admin";

    return `${admin} (${report})`;
  };

  const handleCreateConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const res = await chatConversationService.createConversation({
        chatType: newChat.chatType, // ✅ includes SUPPORT
        isAnonymous: newChat.isAnonymous,
        reportId: newChat.reportId ? Number(newChat.reportId) : null,
      });

      const id = res.data?.id || res.data?.Id;

      setSelectedConversationId(Number(id));
      setShowNewChatForm(false);

      setNewChat({
        chatType: "Support",
        reportId: "",
        isAnonymous: false,
      });

      addToast({
        title: "Chat created",
        message: "Support conversation started",
        tone: "success",
      });
    } catch (error: any) {
      addToast({
        title: "Error",
        message: error.response?.data?.message || "Failed to create chat",
        tone: "error",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare size={32} />
            <div>
              <h1 className="text-2xl font-bold">Messaging</h1>
              <p className="text-sm text-slate-600">
                Chat with assigned administrators
              </p>
            </div>
          </div>

          <Button onClick={() => setShowNewChatForm((v) => !v)}>
            <Plus className="h-4 w-4" />
            {showNewChatForm ? "Cancel" : "New Chat"}
          </Button>
        </div>
      </Panel>

      {/* NEW CHAT FORM */}
      {showNewChatForm && (
        <Panel>
          <h2 className="text-lg font-bold mb-4">Start New Chat</h2>

          <form
            onSubmit={handleCreateConversation}
            className="grid gap-4 md:grid-cols-[1fr_200px_auto] items-end"
          >
            {/* CHAT TYPE */}
            <Field label="Chat Type">
              <select
                className={inputClass}
                value={newChat.chatType}
                onChange={(e) =>
                  setNewChat((c) => ({ ...c, chatType: e.target.value }))
                }
              >
                <option value="Support">Support</option>
                <option value="General">General</option>
                <option value="Report">Report</option>
                <option value="Emergency">Emergency</option>
              </select>
            </Field>

            {/* REPORT ID */}
            <Field label="Report ID">
              <input
                className={inputClass}
                value={newChat.reportId}
                onChange={(e) =>
                  setNewChat((c) => ({ ...c, reportId: e.target.value }))
                }
                placeholder="Optional"
              />
            </Field>

            {/* ANONYMOUS */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={newChat.isAnonymous}
                onChange={(e) =>
                  setNewChat((c) => ({
                    ...c,
                    isAnonymous: e.target.checked,
                  }))
                }
              />
              Anonymous
            </label>

            <div className="md:col-span-3">
              <Button type="submit" disabled={creating}>
                {creating ? "Creating..." : "Start Chat"}
              </Button>
            </div>
          </form>
        </Panel>
      )}

      {/* MAIN */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* LIST */}
        <Panel className="lg:col-span-1">
          <ChatConversationList
            selectedId={selectedConversationId || undefined}
            onSelectConversation={setSelectedConversationId}
          />
        </Panel>

        {/* CHAT WINDOW */}
        <div className="lg:col-span-2">
          {selectedConversationId ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">
                  {getChatTitle(currentConversation)}
                </h2>

                <span className="text-sm text-slate-500">
                  {currentConversation?.status}
                </span>
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
