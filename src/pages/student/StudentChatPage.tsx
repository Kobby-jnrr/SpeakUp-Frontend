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
import { reportService } from "../../api/reportService";
import type { Conversation, BackendReport } from "../../types";

export function StudentChatPage() {
  const { addToast } = useApp();
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(conversationId ? Number(conversationId) : null);

  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [creating, setCreating] = useState(false);

  const [chatType, setChatType] = useState<"Support" | "Report">("Support");

  const [reports, setReports] = useState<BackendReport[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  const [conversations, setConversations] = useState<Conversation[]>([]);

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {
    const load = async () => {
      const [chatRes, reportRes] = await Promise.all([
        chatConversationService.getMyConversations(),
        reportService.getMyReports(),
      ]);

      setConversations(
        Array.isArray(chatRes.data) ? chatRes.data : (chatRes.data.items ?? []),
      );

      setReports(reportRes.data);
    };

    load();
  }, []);

  const currentConversation = conversations.find(
    (c) => c.id === selectedConversationId,
  );

  /* ---------------- CHAT TITLE ---------------- */

  const getChatTitle = (c?: Conversation) => {
    if (!c) return "";

    const report = c.reportId
      ? `REP-${String(c.reportId).padStart(6, "0")}`
      : c.chatType;

    const admin = c.assignedAdminName || "Unassigned Admin";

    return `${admin} (${report})`;
  };

  /* ---------------- CREATE CHAT ---------------- */

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      // ================= SUPPORT CHAT =================
      if (chatType === "Support") {
        const res = await chatConversationService.createConversation({
          chatType: "Support",
          reportId: null,
          isAnonymous: false,
        });

        const id = res.data?.id || res.data?.Id;
        setSelectedConversationId(Number(id));

        addToast({
          title: "Support Chat Started",
          message: "Any admin can now claim your chat",
          tone: "success",
        });

        setShowNewChatForm(false);
        return;
      }

      // ================= REPORT CHAT =================
      if (chatType === "Report") {
        const report = reports.find((r) => r.id === selectedReportId);

        if (!report) {
          addToast({
            title: "Select Report",
            message: "Please select a report first",
            tone: "error",
          });
          return;
        }

        if (!report.assignedAdmin) {
          addToast({
            title: "Not Available",
            message: "This report has no assigned admin yet",
            tone: "warning",
          });
          return;
        }

        const existing = await chatConversationService.getByReport(report.id);

        const existingId = existing.data?.id;
        if (existingId) {
          setSelectedConversationId(existingId);
          return;
        }

        const created = await chatConversationService.createConversation({
          chatType: "Report",
          reportId: report.id,
          isAnonymous: false,
        });

        const newId = created.data?.id || created.data?.Id;
        setSelectedConversationId(Number(newId));
      }

      setShowNewChatForm(false);
    } catch (err: any) {
      addToast({
        title: "Error",
        message: err.response?.data?.message || "Failed to create chat",
        tone: "error",
      });
    } finally {
      setCreating(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Messaging</h1>
            <p className="text-sm text-slate-600">
              Support & Report conversations
            </p>
          </div>

          <Button onClick={() => setShowNewChatForm((v) => !v)}>
            <Plus className="h-4 w-4" />
            {showNewChatForm ? "Cancel" : "New Chat"}
          </Button>
        </div>
      </Panel>

      {/* NEW CHAT */}
      {showNewChatForm && (
        <Panel>
          <h2 className="font-bold mb-4">Start Chat</h2>

          <form onSubmit={handleCreate} className="space-y-4">
            {/* CHAT TYPE */}
            <Field label="Chat Type">
              <select
                className={inputClass}
                value={chatType}
                onChange={(e) =>
                  setChatType(e.target.value as "Support" | "Report")
                }
              >
                <option value="Support">Support</option>
                <option value="Report">Report</option>
              </select>
            </Field>

            {/* REPORT SELECT ONLY IF REPORT CHAT */}
            {chatType === "Report" && (
              <Field label="Select Report">
                <select
                  className={inputClass}
                  value={selectedReportId ?? ""}
                  onChange={(e) => setSelectedReportId(Number(e.target.value))}
                >
                  <option value="">-- Select Report --</option>

                  {reports.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}{" "}
                      {r.assignedAdmin ? "(Assigned)" : "(No Admin Yet)"}
                    </option>
                  ))}
                </select>
              </Field>
            )}

            <Button type="submit" disabled={creating}>
              {creating ? "Creating..." : "Start Chat"}
            </Button>
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

        {/* CHAT */}
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
