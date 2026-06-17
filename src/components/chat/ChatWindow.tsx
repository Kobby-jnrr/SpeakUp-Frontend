import { useState } from "react";
import { Send } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Panel } from "../ui/Cards";

interface Message {
  id: number;
  message: string;
  senderId: number;
  senderName?: string;
  sentAt: string;
  isRead: boolean;
}

interface ChatWindowProps {
  conversationId: number;
}

export function ChatWindow({ conversationId }: ChatWindowProps) {
  const { currentUser, addToast } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // TODO: load messages from backend, e.g.:
  // useEffect(() => {
  //   const load = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await chatMessageService.getMessages(conversationId);
  //       setMessages(res.data);
  //     } catch { addToast({ title: "Error", message: "Could not load messages", tone: "error" }); }
  //     finally { setLoading(false); }
  //   };
  //   load();
  //   const interval = setInterval(load, 3000);
  //   return () => clearInterval(interval);
  // }, [conversationId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      // TODO: send message via backend, e.g.:
      // await chatMessageService.sendMessage({ conversationId, message: newMessage });
      // const res = await chatMessageService.getMessages(conversationId);
      // setMessages(res.data);

      throw new Error("Chat messaging not yet connected to backend");
    } catch (err) {
      addToast({
        title: "Failed to send",
        message: "Could not send your message",
        tone: "error",
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <Panel>Loading messages...</Panel>;
  }

  return (
    <Panel className="flex flex-col h-full max-h-96">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 bg-slate-50 p-4 rounded-md">
        {messages.length === 0 ? (
          <p className="text-center text-slate-600 py-8">No messages yet</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === Number(currentUser?.id)
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.senderId === Number(currentUser?.id)
                    ? "bg-institution-600 text-white rounded-br-none"
                    : "bg-white border border-slate-200 text-slate-900 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <div
                  className={`text-xs mt-1 ${
                    msg.senderId === Number(currentUser?.id)
                      ? "text-institution-100"
                      : "text-slate-500"
                  }`}
                >
                  {new Date(msg.sentAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-institution-600"
        />
        <button
          onClick={handleSend}
          disabled={sending || !newMessage.trim()}
          className="p-2 bg-institution-600 text-white rounded-md hover:bg-institution-700 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </Panel>
  );
}
