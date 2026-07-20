import { useEffect, useMemo, useState } from "react";
import { MessageSquare, Check, UserPlus, Shield } from "lucide-react";

import { ChatWindow } from "../../components/chat/ChatWindow";
import { ChatConversationList } from "../../components/chat/ChatConversationList";
import { Button } from "../../components/ui/Button";
import { Panel, EmptyState } from "../../components/ui/Cards";

import { useApp } from "../../context/AppContext";
import { chatConversationService } from "../../api/chatConversationService";
import type { Conversation } from "../../types";

type ViewTab = "all" | "mine" | "unassigned" | "assigned";
type SubFilter = "all" | "report" | "support";

export function AdminChatPage() {
  const { addToast, currentUser } = useApp();

  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [view, setView] = useState<ViewTab>("all");
  const [subFilter, setSubFilter] = useState<SubFilter>("all");

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  const isSuperAdmin = currentUser?.role === "SuperAdmin";
  const userId = Number(currentUser?.id);

  /* ---------------- LOAD ---------------- */

  const loadConversations = async () => {
    setLoading(true);
    try {
      let res;

      if (view === "unassigned") {
        res = await chatConversationService.getUnassigned();
      } else if (view === "mine") {
        res = await chatConversationService.getAssignedToMe();
      } else if (view === "assigned") {
        // SuperAdmin only global assigned view
        res = await chatConversationService.getAllAdmin();
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

  /* ---------------- FILTER ---------------- */

  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      if (view === "all") {
        if (subFilter === "report" && c.chatType !== "Report") return false;
        if (subFilter === "support" && c.chatType !== "Support") return false;
      }

      // SuperAdmin "assigned" tab should show all assigned chats only
      if (view === "assigned" && !c.assignedAdminId) return false;

      return true;
    });
  }, [conversations, view, subFilter]);

  /* ---------------- ACTIONS ---------------- */

  const handleClaim = async (convId: number) => {
    try {
      await chatConversationService.assignAdmin({
        conversationId: convId,
        adminId: userId,
      });

      addToast({
        title: "Chat assigned",
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

  const handleClose = async () => {
    if (!selectedConversationId) return;

    try {
      await chatConversationService.closeConversation(selectedConversationId);

      addToast({
        title: "Conversation closed",
        message: "Chat successfully closed",
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

  /* ---------------- UI HELPERS ---------------- */

  const getChatName = (c?: Conversation) => {
    if (!c) return "";

    const report = c.reportCode ? c.reportCode : c.chatType;

    const studentName = c.isAnonymous
      ? "Anonymous User"
      : c.studentName || "Unknown";

    return `${studentName} (${report})`;
  };

  const currentConversation = filteredConversations.find(
    (c) => c.id === selectedConversationId,
  );

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-institution-600 p-2 text-white">
              <MessageSquare size={20} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-950">
                Chat Management
              </h1>
              <p className="text-sm text-slate-600">
                Handle reports and support conversations
              </p>
            </div>
          </div>
        </div>

        {/* TABS (4 tabs) */}
        <div className="flex gap-2 rounded-md bg-slate-100 p-1">
          {[
            { key: "all", label: "All" },
            { key: "mine", label: "Assigned to Me" },
            { key: "unassigned", label: "Unassigned" },
            ...(isSuperAdmin
              ? [{ key: "assigned", label: "Assigned (All)" }]
              : []),
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setView(t.key as ViewTab)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition ${
                view === t.key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* SUB FILTER */}
        {view === "all" && (
          <div className="flex gap-2">
            {(["all", "report", "support"] as SubFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setSubFilter(f)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  subFilter === f
                    ? "bg-institution-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </Panel>

      {/* MAIN GRID */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* LIST */}
        <Panel className="lg:col-span-1 p-3">
          {loading ? (
            <div className="p-4 text-sm text-slate-500">Loading chats...</div>
          ) : filteredConversations.length === 0 ? (
            <EmptyState title="No conversations" message="No chats found." />
          ) : (
            <ChatConversationList
              adminMode
              conversations={filteredConversations}
              selectedId={selectedConversationId || undefined}
              onSelectConversation={setSelectedConversationId}
            />
          )}
        </Panel>

        {/* CHAT */}
        <Panel className="lg:col-span-2">
          {selectedConversationId ? (
            <div className="space-y-4">
              {/* HEADER */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    {getChatName(currentConversation)}
                  </h2>

                  {currentConversation?.assignedAdminId && (
                    <p className="mt-1 text-xs text-slate-500">
                      <Shield className="inline h-3 w-3" /> Assigned to:{" "}
                      {currentConversation.assignedAdminName ??
                        currentConversation.assignedAdminId}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  {!currentConversation?.assignedAdminId && (
                    <Button
                      variant="success"
                      onClick={() => handleClaim(currentConversation!.id)}
                    >
                      <UserPlus size={14} />
                      Claim
                    </Button>
                  )}

                  {currentConversation?.assignedAdminId === userId &&
                    currentConversation?.status === "Open" && (
                      <Button variant="danger" onClick={handleClose}>
                        <Check size={14} />
                        Close
                      </Button>
                    )}
                </div>
              </div>

              {/* CHAT */}
              <ChatWindow
                conversationId={selectedConversationId}
                conversationStatus={currentConversation?.status}
                isAnonymous={currentConversation?.isAnonymous}
              />
            </div>
          ) : (
            <EmptyState
              title="No chat selected"
              message="Select a conversation to begin"
            />
          )}
        </Panel>
      </div>
    </div>
  );
}
