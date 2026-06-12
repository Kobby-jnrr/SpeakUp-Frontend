import { useState } from "react";
import { MessageSquare, Plus } from "lucide-react";
import { chatConversationService } from "../../api/chatConversationService";
import { ChatConversationList } from "../../components/chat/ChatConversationList";
import { ChatWindow } from "../../components/chat/ChatWindow";
import { Button } from "../../components/ui/Button";
import { Panel } from "../../components/ui/Cards";
import { Field, inputClass } from "../../components/ui/Form";
import { useApp } from "../../context/AppContext";

export function StudentChatPage() {
  const { addToast } = useApp();
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newChat, setNewChat] = useState({
    chatType: "General",
    reportId: "",
    isAnonymous: false,
  });

  const handleCreateConversation = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);

    try {
      const response = await chatConversationService.createConversation({
        chatType: newChat.chatType,
        isAnonymous: newChat.isAnonymous,
        reportId: newChat.reportId ? Number(newChat.reportId) : null,
      });
      const id = response.data.id ?? response.data.Id;
      setSelectedConversationId(Number(id));
      setShowNewChatForm(false);
      setNewChat({ chatType: "General", reportId: "", isAnonymous: false });
      addToast({ title: "Conversation started", tone: "success" });
    } catch (error: any) {
      addToast({
        title: "Could not start chat",
        message:
          error.response?.data?.message ||
          error.response?.data ||
          "Please try again.",
        tone: "error",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
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
          <Button onClick={() => setShowNewChatForm((value) => !value)}>
            <Plus className="h-4 w-4" />
            New chat
          </Button>
        </div>
      </Panel>

      {showNewChatForm ? (
        <Panel>
          <h2 className="text-lg font-bold text-slate-950">Start a chat</h2>
          <form
            className="mt-4 grid gap-4 md:grid-cols-[1fr_180px_auto]"
            onSubmit={handleCreateConversation}
          >
            <Field label="Chat type">
              <select
                className={inputClass}
                value={newChat.chatType}
                onChange={(event) =>
                  setNewChat((current) => ({
                    ...current,
                    chatType: event.target.value,
                  }))
                }
              >
                <option value="General">General support</option>
                <option value="Report">Report follow-up</option>
                <option value="Emergency">Urgent concern</option>
              </select>
            </Field>
            <Field label="Report ID">
              <input
                className={inputClass}
                inputMode="numeric"
                placeholder="Optional"
                value={newChat.reportId}
                onChange={(event) =>
                  setNewChat((current) => ({
                    ...current,
                    reportId: event.target.value,
                  }))
                }
              />
            </Field>
            <label className="flex items-end gap-2 pb-3 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={newChat.isAnonymous}
                onChange={(event) =>
                  setNewChat((current) => ({
                    ...current,
                    isAnonymous: event.target.checked,
                  }))
                }
              />
              Anonymous
            </label>
            <div className="md:col-span-3">
              <Button disabled={creating} type="submit">
                {creating ? "Starting..." : "Start conversation"}
              </Button>
            </div>
          </form>
        </Panel>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversation List */}
        <div className="lg:col-span-1">
          <Panel>
            <h2 className="font-semibold text-slate-950 mb-4">Conversations</h2>
            <ChatConversationList
              onSelectConversation={setSelectedConversationId}
              selectedId={selectedConversationId || undefined}
            />
          </Panel>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          {selectedConversationId ? (
            <ChatWindow conversationId={selectedConversationId} />
          ) : (
            <Panel className="text-center py-12">
              <MessageSquare
                className="mx-auto text-slate-400 mb-4"
                size={48}
              />
              <p className="text-slate-600">
                Select a conversation to start messaging
              </p>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
