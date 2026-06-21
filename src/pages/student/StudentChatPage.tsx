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

export function StudentChatPage() {
  const { addToast } = useApp();
  const navigate = useNavigate();
  const { conversationId } = useParams(); // 👈 supports /student/chat/:id

  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(conversationId ? Number(conversationId) : null);

  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [newChat, setNewChat] = useState({
    chatType: "General",
    reportId: "",
    isAnonymous: false,
  });

  useEffect(() => {
    if (selectedConversationId) {
      navigate(`/student/chat/${selectedConversationId}`, { replace: true });
    }
  }, [selectedConversationId, navigate]);

  const handleCreateConversation = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);

    try {
      const res = await chatConversationService.createConversation({
        chatType: newChat.chatType,
        isAnonymous: newChat.isAnonymous,
        reportId: newChat.reportId ? Number(newChat.reportId) : null,
      });

      const id = res.data?.id || res.data?.Id;

      setSelectedConversationId(Number(id));
      setShowNewChatForm(false);

      setNewChat({
        chatType: "General",
        reportId: "",
        isAnonymous: false,
      });

      setRefreshKey((k) => k + 1);

      addToast({
        title: "Chat started",
        message: "Conversation created successfully",
        tone: "success",
      });
    } catch (error: any) {
      addToast({
        title: "Error",
        message:
          error.response?.data?.message || "Could not create conversation",
        tone: "error",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel className="border-support-100 bg-support-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-support-600" size={32} />
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
            className="grid gap-4 md:grid-cols-[1fr_200px_auto] items-end"
            onSubmit={handleCreateConversation}
          >
            <Field label="Chat type">
              <select
                className={inputClass}
                value={newChat.chatType}
                onChange={(e) =>
                  setNewChat((c) => ({ ...c, chatType: e.target.value }))
                }
              >
                <option value="General">General</option>
                <option value="Report">Report</option>
                <option value="Emergency">Emergency</option>
              </select>
            </Field>

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

      {/* CHAT LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* LIST */}
        <Panel className="lg:col-span-1">
          <h2 className="font-semibold mb-4">My Conversations</h2>

          <ChatConversationList
            key={refreshKey}
            onSelectConversation={(id) => setSelectedConversationId(id)}
            selectedId={selectedConversationId || undefined}
          />
        </Panel>

        {/* WINDOW */}
        <div className="lg:col-span-2">
          {selectedConversationId ? (
            <ChatWindow conversationId={selectedConversationId} />
          ) : (
            <Panel className="py-12 text-center text-slate-500">
              <MessageSquare className="mx-auto mb-3" />
              Select a conversation to start chatting
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
