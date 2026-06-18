import { useEffect, useState, useRef } from "react";
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
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [newChat, setNewChat] = useState({
    chatType: "General",
    reportId: "",
    isAnonymous: false,
  });

  const handleCreateConversation = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);

    try {
      const res = await chatConversationService.createConversation({
        chatType: newChat.chatType,
        isAnonymous: newChat.isAnonymous,
        reportId: newChat.reportId ? Number(newChat.reportId) : null,
      });

      const newId = res.data?.id ?? res.data?.Id;
      setSelectedConversationId(Number(newId));
      setShowNewChatForm(false);
      setNewChat({ chatType: "General", reportId: "", isAnonymous: false });
      // Trigger conversation list refresh
      setRefreshKey((k) => k + 1);

      addToast({
        title: "Chat started",
        message: "Your conversation has been created",
        tone: "success",
      });
    } catch (error: any) {
      addToast({
        title: "Could not start chat",
        message:
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "Please try again.",
        tone: "error",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Panel className="border-support-100 bg-support-50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-support-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-slate-950">Messaging</h1>
              <p className="text-sm text-slate-700">
                Chat directly with counselors about your report or concerns
              </p>
            </div>
          </div>
          <Button onClick={() => setShowNewChatForm((v) => !v)}>
            <Plus className="h-4 w-4" />
            {showNewChatForm ? "Cancel" : "New Chat"}
          </Button>
        </div>
      </Panel>

      {/* New chat form */}
      {showNewChatForm && (
        <Panel>
          <h2 className="text-lg font-bold text-slate-950 mb-4">Start a New Chat</h2>
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
                <option value="General">General support</option>
                <option value="Report">Report follow-up</option>
                <option value="Emergency">Urgent concern</option>
              </select>
            </Field>
            <Field label="Report ID (optional)">
              <input
                className={inputClass}
                inputMode="numeric"
                placeholder="e.g. 42"
                value={newChat.reportId}
                onChange={(e) =>
                  setNewChat((c) => ({ ...c, reportId: e.target.value }))
                }
              />
            </Field>
            <label className="flex items-center gap-2 pb-2 text-sm font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={newChat.isAnonymous}
                onChange={(e) =>
                  setNewChat((c) => ({ ...c, isAnonymous: e.target.checked }))
                }
                className="rounded"
              />
              Anonymous
            </label>
            <div className="md:col-span-3">
              <Button disabled={creating} type="submit">
                {creating ? "Starting…" : "Start Conversation"}
              </Button>
            </div>
          </form>
        </Panel>
      )}

      {/* Chat layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Panel>
            <h2 className="font-semibold text-slate-950 mb-4">My Conversations</h2>
            <ChatConversationList
              key={refreshKey}
              onSelectConversation={setSelectedConversationId}
              selectedId={selectedConversationId || undefined}
            />
          </Panel>
        </div>

        <div className="lg:col-span-2">
          {selectedConversationId ? (
            <ChatWindow conversationId={selectedConversationId} />
          ) : (
            <Panel className="text-center py-12">
              <MessageSquare className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500">Select a conversation to start messaging</p>
              <p className="text-sm text-slate-400 mt-1">
                Or click "New Chat" to start a fresh conversation
              </p>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
