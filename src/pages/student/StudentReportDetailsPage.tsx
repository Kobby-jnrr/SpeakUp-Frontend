import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Panel, EmptyState } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { reportService } from "../../api/reportService";
import { chatConversationService } from "../../api/chatConversationService";
import { useApp } from "../../context/AppContext";
import type { BackendReport } from "../../types";

export function StudentReportDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useApp();

  const [report, setReport] = useState<BackendReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [chatBlockedOpen, setChatBlockedOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await reportService.getMyReports();
        const found = res.data.find((r) => String(r.id) === id);
        setReport(found ?? null);
      } catch {
        addToast({
          title: "Error",
          message: "Could not load report",
          tone: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleOpenChat = async () => {
    if (!report) return;

    if (!report.assignedAdmin) {
      setChatBlockedOpen(true);
      return;
    }

    try {
      const existing = await chatConversationService.getByReport(report.id);
      const conversationId = existing.data?.id;

      if (conversationId) {
        navigate(`/student/chat/${conversationId}`);
        return;
      }
    } catch {
      // ignore 404
    }

    try {
      const created = await chatConversationService.createConversation({
        chatType: "Report",
        reportId: report.id,
        isAnonymous: false,
      });

      const newId = created.data?.id || created.data?.Id;
      navigate(`/student/chat/${newId}`);
    } catch (err: any) {
      addToast({
        title: "Chat error",
        message: err.response?.data?.message || "Could not start chat",
        tone: "error",
      });
    }
  };

  if (loading) {
    return (
      <Panel>
        <p className="text-slate-500 text-sm">Loading report…</p>
      </Panel>
    );
  }

  if (!report) {
    return (
      <EmptyState
        title="Report not found"
        message="This report doesn't exist or you don't have access."
        action={
          <Link to="/student/my-reports">
            <Button>Back to my reports</Button>
          </Link>
        }
      />
    );
  }

  const isQuick = report.type === "Quick";

  return (
    <div className="space-y-6">
      {/* CHAT BLOCKED MODAL */}
      <Modal
        title="Chat unavailable"
        open={chatBlockedOpen}
        onClose={() => setChatBlockedOpen(false)}
      >
        <p className="text-sm text-slate-600">
          This report has not been assigned to an administrator yet. You can
          only chat once an admin has claimed this report.
        </p>
      </Modal>

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950 transition"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      {/* HEADER */}
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">
              {report.title}
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Submitted {new Date(report.createdAt).toLocaleString()}
            </p>

            <p className="text-sm text-slate-600 mt-1">
              Assigned Admin:{" "}
              {report.assignedAdmin
                ? `${report.assignedAdmin.firstName} ${report.assignedAdmin.lastName}`
                : "Not yet assigned"}
            </p>

            {/* TYPE BADGE */}
            <p className="text-xs mt-2 inline-block px-2 py-1 rounded bg-slate-100 text-slate-600">
              {isQuick ? "Quick Report" : "Full Report"}
            </p>
          </div>

          <span className="px-3 py-1 rounded text-sm font-semibold bg-slate-200">
            {report.status}
          </span>
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* MAIN */}
        <div className="lg:col-span-2 space-y-5">
          {/* DESCRIPTION */}
          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">Description</h2>
            <p className="text-sm text-slate-700 whitespace-pre-wrap">
              {report.description}
            </p>
          </Panel>

          {/* FULL REPORT ONLY SECTION */}
          {!isQuick && (
            <>
              <Panel>
                <h2 className="font-bold text-slate-950 mb-3">
                  Incident Details
                </h2>

                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <Detail
                    label="Date"
                    value={
                      report.incidentDate
                        ? new Date(report.incidentDate).toLocaleDateString()
                        : "—"
                    }
                  />
                  <Detail label="Time" value={report.incidentTime} />
                  <Detail label="Location" value={report.incidentLocation} />
                  <Detail
                    label="Nature of Complaint"
                    value={
                      Array.isArray(report.complaintNature)
                        ? report.complaintNature.join(", ")
                        : report.complaintNature
                    }
                  />
                  <Detail
                    label="Desired Outcome"
                    value={report.desiredOutcome}
                  />
                  <Detail
                    label="Prior Report"
                    value={report.priorReportWhere || "None"}
                  />
                </div>
              </Panel>

              <Panel>
                <h2 className="font-bold text-slate-950 mb-3">Respondent</h2>

                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <Detail label="Name" value={report.respondentName} />
                  <Detail label="Position" value={report.respondentPosition} />
                  <Detail
                    label="Department"
                    value={report.respondentDepartment}
                  />
                  <Detail
                    label="Relationship"
                    value={report.relationshipToComplainant}
                  />
                </div>
              </Panel>
            </>
          )}

          {/* QUICK REPORT EXTRA INFO */}
          {isQuick && (
            <Panel>
              <h2 className="font-bold text-slate-950 mb-3">
                Quick Report Info
              </h2>

              <div className="space-y-2 text-sm">
                <Detail
                  label="Confidential"
                  value={report.confidential ? "Yes" : "No"}
                />
                <Detail
                  label="Type"
                  value="This is a quick report with minimal details."
                />
              </div>
            </Panel>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="space-y-5">
          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">Case Status</h2>

            <div className="space-y-2 text-sm">
              <Detail label="Status" value={report.status} />
              <Detail
                label="Submitted"
                value={new Date(report.createdAt).toLocaleString()}
              />
              {report.updatedAt && (
                <Detail
                  label="Last Updated"
                  value={new Date(report.updatedAt).toLocaleString()}
                />
              )}
            </div>
          </Panel>

          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">Assigned Admin</h2>

            {report.assignedAdmin ? (
              <p className="text-sm text-slate-700">
                {report.assignedAdmin.firstName} {report.assignedAdmin.lastName}
              </p>
            ) : (
              <p className="text-sm text-amber-600">Not yet assigned</p>
            )}
          </Panel>

          <Panel>
            <h2 className="font-bold text-slate-950 mb-2">Need to Talk?</h2>

            <p className="text-sm text-slate-600 mb-3">
              Chat with your assigned administrator about this report.
            </p>

            <Button className="w-full" onClick={handleOpenChat}>
              Open Chat
            </Button>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
      <p className="text-slate-800 mt-0.5">{value || "—"}</p>
    </div>
  );
}
