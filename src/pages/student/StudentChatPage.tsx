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

  const [chatType, setChatType] = useState<"Support" | "Report" | "Counseling">(
    "Support",
  );
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reports, setReports] = useState<BackendReport[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

  const [conversations, setConversations] = useState<Conversation[]>([]);

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

  const getChatTitle = (c?: Conversation) => {
    if (!c) return "";

    const report = c.reportCode ? c.reportCode : c.chatType;

    const admin = c.assignedAdminName || "Unassigned Admin";

    return `${admin} (${report})`;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      if (chatType === "Support" || chatType === "Counseling") {
        const res = await chatConversationService.createConversation({
          chatType,
          reportId: null,
          isAnonymous,
        });

        const id = res.data?.id || res.data?.Id;
        setSelectedConversationId(Number(id));

        addToast({
          title:
            chatType === "Counseling"
              ? "Counseling Chat Started"
              : "Support Chat Started",
          message: "An admin will respond shortly",
          tone: "success",
        });

        setShowNewChatForm(false);
        return;
      }

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

        let existingId = null;

        try {
          const existing = await chatConversationService.getByReport(report.id);

          existingId = existing.data?.id;
        } catch (err: any) {
          if (err.response?.status !== 404) {
            throw err;
          }
        }

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

      {showNewChatForm && (
        <Panel>
          <h2 className="font-bold mb-4">Start Chat</h2>

          <form onSubmit={handleCreate} className="space-y-4">
            <Field label="Chat Type">
              {/* ANONYMOUS OPTION */}
              {(chatType === "Support" || chatType === "Counseling") && (
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300"
                  />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Chat anonymously
                    </p>

                    <p className="text-xs text-slate-500">
                      Your identity will not be shown to the administrator.
                    </p>
                  </div>
                </label>
              )}
              <select
                className={inputClass}
                value={chatType}
                onChange={(e) =>
                  setChatType(
                    e.target.value as "Support" | "Report" | "Counseling",
                  )
                }
              >
                <option value="Support">Support</option>
                <option value="Report">Report</option>
                <option value="Counseling">Counseling</option>
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
                      {r.reportCode} - {r.title}{" "}
                      {r.assignedAdmin
                        ? `(Assigned to ${r.assignedAdmin.firstName} ${r.assignedAdmin.lastName})`
                        : "(Pending Assignment)"}
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

              <ChatWindow
                conversationId={selectedConversationId}
                conversationStatus={currentConversation?.status}
                isAnonymous={currentConversation?.isAnonymous}
              />
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
