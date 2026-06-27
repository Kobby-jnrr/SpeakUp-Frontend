import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Panel } from "../ui/Cards";
import { chatMessageService } from "../../api/chatMessageService";
import type { ChatMessage } from "../../types";

interface ChatWindowProps {
  conversationId: number;
  conversationStatus?: string;
}

export function ChatWindow({
  conversationId,
  conversationStatus,
}: ChatWindowProps) {
  const { currentUser, addToast } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadMessages = async (showLoader = false) => {
    if (showLoader) setLoading(true);
    try {
      const res = await chatMessageService.getMessages(conversationId);
      setMessages(res.data);
    } catch {
      if (showLoader) {
        addToast({
          title: "Error",
          message: "Could not load messages",
          tone: "error",
        });
      }
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  // Initial load + 3-second polling
  useEffect(() => {
    loadMessages(true);
    const interval = setInterval(() => loadMessages(false), 3000);
    return () => clearInterval(interval);
  }, [conversationId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const markAsRead = async () => {
      try {
        await chatMessageService.markConversationAsRead(conversationId);
      } catch (err) {
        console.error("Failed to mark as read", err);
      }
    };

    markAsRead();
  }, [conversationId]);

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;

    const text = newMessage.trim();
    setNewMessage("");
    setSending(true);

    try {
      await chatMessageService.sendMessage({
        conversationId,
        message: text,
      });
      // Immediately reload to show the sent message
      await loadMessages(false);
    } catch (err: any) {
      addToast({
        title: "Failed to send",
        message:
          err.response?.data?.message ||
          err.response?.data ||
          "Could not send your message",
        tone: "error",
      });
      // Restore the typed text on failure
      setNewMessage(text);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <Panel>
        <p className="text-slate-500 text-sm text-center py-8">
          Loading messages…
        </p>
      </Panel>
    );
  }

  return (
    <Panel className="flex flex-col h-[480px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 bg-slate-50 p-4 rounded-md mb-4">
        {messages.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-8">
            No messages yet — say hello!
          </p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === Number(currentUser?.id);
            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    isMe
                      ? "bg-institution-600 text-white rounded-br-none"
                      : "bg-white border border-slate-200 text-slate-900 rounded-bl-none"
                  }`}
                >
                  {!isMe && msg.sender && (
                    <p
                      className={`text-xs font-semibold mb-1 ${
                        isMe ? "text-institution-100" : "text-slate-500"
                      }`}
                    >
                      {msg.sender.firstName} {msg.sender.lastName}
                    </p>
                  )}
                  <p>{msg.message}</p>
                  <div
                    className={`text-xs mt-1 ${
                      isMe ? "text-institution-100" : "text-slate-400"
                    }`}
                  >
                    {new Date(msg.sentAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {/* Input */}
      {conversationStatus === "Closed" ? (
        <div className="border rounded-md p-4 bg-slate-50 text-center">
          <p className="text-sm text-slate-600">
            This conversation has been closed.
          </p>

          <p className="text-xs text-slate-500 mt-1">
            The assigned administrator closed this chat.
          </p>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Type a message…"
            disabled={sending}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-institution-600 disabled:opacity-50"
          />

          <button
            onClick={handleSend}
            disabled={sending || !newMessage.trim()}
            className="p-2 bg-institution-600 text-white rounded-md hover:bg-institution-700 disabled:opacity-50 transition"
          >
            <Send size={18} />
          </button>
        </div>
      )}
    </Panel>
  );
}
