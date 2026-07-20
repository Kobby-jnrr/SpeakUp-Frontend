import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Panel } from "../ui/Cards";
import { chatMessageService } from "../../api/chatMessageService";
import type { ChatMessage } from "../../types";

interface ChatWindowProps {
  conversationId: number;
  conversationStatus?: string;
  isAnonymous?: boolean;
}

export function ChatWindow({
  conversationId,
  conversationStatus,
  isAnonymous = false,
}: ChatWindowProps) {
  const { currentUser, addToast } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isNearBottomRef = useRef(true);

  /* ---------------- LOAD MESSAGES ---------------- */
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

  /* ---------------- INIT + POLLING ---------------- */
  useEffect(() => {
    loadMessages(true);

    const interval = setInterval(() => {
      loadMessages(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [conversationId]);

  /* ---------------- SCROLL TRACKING ---------------- */
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const threshold = 80;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;

    isNearBottomRef.current = distance < threshold;
  };

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    if (isNearBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  /* ---------------- MARK AS READ ---------------- */
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

  /* ---------------- SEND MESSAGE ---------------- */
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

      await loadMessages(false);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    } catch (err: any) {
      addToast({
        title: "Failed to send",
        message:
          err.response?.data?.message ||
          err.response?.data ||
          "Could not send message",
        tone: "error",
      });

      setNewMessage(text);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    } finally {
      setSending(false);
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <Panel>
        <p className="text-slate-500 text-sm text-center py-8">
          Loading messages…
        </p>
      </Panel>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <Panel className="flex flex-col h-[480px]">
      {/* MESSAGES */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto space-y-3 bg-slate-50 p-4 rounded-md mb-4"
      >
        {messages.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-8">
            No messages yet — say hello!
          </p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender?.isCurrentUser;

            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div className="flex flex-col max-w-xs md:max-w-md">
                  {/* Sender name (only receiver sees it) */}
                  {/* Sender name (only receiver sees it) */}
                  {!isMe && msg.sender && (
                    <p className="text-xs text-slate-500 font-semibold mb-1">
                      {msg.sender.name}
                    </p>
                  )}

                  {/* MESSAGE BUBBLE */}
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm shadow-sm break-words ${
                      isMe
                        ? "bg-institution-600 text-white rounded-br-sm"
                        : "bg-white border border-slate-200 text-slate-900 rounded-bl-sm"
                    }`}
                  >
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
              </div>
            );
          })
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      {conversationStatus === "Closed" ? (
        <div className="border rounded-md p-4 bg-slate-50 text-center">
          <p className="text-sm text-slate-600">
            This conversation has been closed.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Your assigned administrator closed this chat.
          </p>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            ref={inputRef}
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
