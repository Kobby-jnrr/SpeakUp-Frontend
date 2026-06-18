import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Panel, EmptyState } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { reportService } from "../../api/reportService";
import { useApp } from "../../context/AppContext";
import type { BackendReport } from "../../types";

export function StudentReportDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useApp();

  const [report, setReport] = useState<BackendReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await reportService.getMyReports();
        const found = res.data.find((r) => String(r.id) === id);
        setReport(found ?? null);
      } catch {
        addToast({ title: "Error", message: "Could not load report", tone: "error" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

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
        message="This report doesn't exist or you don't have access to it."
        action={
          <Link to="/student/my-reports">
            <Button>Back to my reports</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950 transition"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      {/* Header */}
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">{report.title}</h1>
            <p className="text-sm text-slate-500 mt-1">
              Report #{report.id} · Submitted {new Date(report.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {report.confidential && (
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                Confidential
              </span>
            )}
            <span
              className={`px-3 py-1 rounded text-sm font-semibold ${
                report.status === "Pending"
                  ? "bg-amber-100 text-amber-700"
                  : report.status === "InProgress"
                    ? "bg-blue-100 text-blue-700"
                    : report.status === "Resolved"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-700"
              }`}
            >
              {report.status}
            </span>
          </div>
        </div>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">Description</h2>
            <p className="text-sm text-slate-700 whitespace-pre-wrap">{report.description}</p>
          </Panel>

          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">Incident Details</h2>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <Detail
                label="Date"
                value={report.incidentDate ? new Date(report.incidentDate).toLocaleDateString() : "—"}
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
              <Detail label="Desired Outcome" value={report.desiredOutcome} />
              <Detail label="Prior Report" value={report.priorReportWhere || "None"} />
            </div>
          </Panel>

          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">Respondent</h2>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <Detail label="Name" value={report.respondentName} />
              <Detail label="Position" value={report.respondentPosition} />
              <Detail label="Department" value={report.respondentDepartment} />
              <Detail label="Relationship" value={report.relationshipToComplainant} />
            </div>
          </Panel>

          {(report.witness1Name || report.witness2Name) && (
            <Panel>
              <h2 className="font-bold text-slate-950 mb-3">Witnesses</h2>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {report.witness1Name && (
                  <>
                    <Detail label="Witness 1" value={report.witness1Name} />
                    <Detail label="Contact 1" value={report.witness1Contact} />
                  </>
                )}
                {report.witness2Name && (
                  <>
                    <Detail label="Witness 2" value={report.witness2Name} />
                    <Detail label="Contact 2" value={report.witness2Contact} />
                  </>
                )}
              </div>
            </Panel>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">Case Status</h2>
            <div className="space-y-2 text-sm">
              <Detail label="Status" value={report.status} />
              <Detail label="Submitted" value={new Date(report.createdAt).toLocaleString()} />
              {report.updatedAt && (
                <Detail label="Last Updated" value={new Date(report.updatedAt).toLocaleString()} />
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
              You can open a chat conversation to discuss this report with your assigned counselor.
            </p>
            <Link to="/student/chat">
              <Button className="w-full">Open Chat</Button>
            </Link>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wide">{label}</p>
      <p className="text-slate-800 mt-0.5">{value || "—"}</p>
    </div>
  );
}
