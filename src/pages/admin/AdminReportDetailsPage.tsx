import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, UserCheck, RefreshCw } from "lucide-react";
import { Panel, EmptyState } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";
import { reportService } from "../../api/reportService";
import type { BackendReport } from "../../types";

const STATUS_OPTIONS = ["Pending", "InProgress", "Resolved", "Closed"];

export function AdminReportDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast, currentUser } = useApp();

  const [report, setReport] = useState<BackendReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await reportService.getAllReports();
        const found = res.data.find((r) => String(r.id) === id);
        setReport(found ?? null);
        if (found) setSelectedStatus(found.status);
      } catch {
        addToast({
          title: "Error",
          message: "Failed to load report",
          tone: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleClaim = async () => {
    if (!report) return;
    setClaiming(true);
    try {
      await reportService.claimReport(report.id);
      addToast({
        title: "Claimed",
        message: "Report assigned to you",
        tone: "success",
      });
      // Reload
      const res = await reportService.getAllReports();
      const found = res.data.find((r) => String(r.id) === id);
      setReport(found ?? null);
    } catch (err: any) {
      addToast({
        title: "Error",
        message: err.response?.data || "Could not claim report",
        tone: "error",
      });
    } finally {
      setClaiming(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!report || !selectedStatus) return;
    setUpdatingStatus(true);
    try {
      await reportService.updateStatus(report.id, selectedStatus);
      addToast({
        title: "Updated",
        message: "Status updated successfully",
        tone: "success",
      });
      setReport((prev) => (prev ? { ...prev, status: selectedStatus } : null));
    } catch (err: any) {
      addToast({
        title: "Error",
        message: err.response?.data || "Could not update status",
        tone: "error",
      });
    } finally {
      setUpdatingStatus(false);
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
        message="This report does not exist or you don't have access."
        action={
          <Link to="/admin/reports">
            <Button>Back to Reports</Button>
          </Link>
        }
      />
    );
  }

  const isAssigned = report.assignedAdmin != null;
  const isAssignedToMe = String(report.assignedAdmin?.id) === currentUser?.id;

  return (
    <div className="space-y-5">
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
            <h1 className="text-2xl font-bold text-slate-950">
              {report.title}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {report.reportCode} · Submitted{" "}
              {new Date(report.createdAt).toLocaleString()}
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
        {/* Main details */}
        <div className="lg:col-span-2 space-y-5">
          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">Description</h2>
            <p className="text-sm text-slate-700 whitespace-pre-wrap">
              {report.description}
            </p>
          </Panel>

          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">
              Complainant Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <Detail
                label="Name"
                value={`${report.student?.firstName} ${report.student?.lastName}`}
              />
              <Detail label="Gender" value={report.complainantGender} />
              <Detail label="Department" value={report.department} />
              <Detail label="Email" value={report.email} />
              <Detail label="Contact" value={report.contactNumber} />
            </div>
          </Panel>

          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">
              Respondent Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <Detail label="Name" value={report.respondentName} />
              <Detail label="Position" value={report.respondentPosition} />
              <Detail label="Department" value={report.respondentDepartment} />
              <Detail
                label="Relationship"
                value={report.relationshipToComplainant}
              />
            </div>
          </Panel>

          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">Incident Details</h2>
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
            </div>
            <div className="mt-3 text-sm">
              <Detail label="Desired Outcome" value={report.desiredOutcome} />
              <Detail
                label="Prior Report"
                value={report.priorReportWhere || "None"}
              />
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

        {/* Sidebar actions */}
        <div className="space-y-5">
          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">Assignment</h2>
            {isAssigned ? (
              <div className="text-sm">
                <p className="text-slate-600">Assigned to:</p>
                <p className="font-semibold text-slate-900 mt-1">
                  {report.assignedAdmin!.firstName}{" "}
                  {report.assignedAdmin!.lastName}
                </p>
                {isAssignedToMe && (
                  <p className="text-xs text-emerald-600 mt-1">That's you!</p>
                )}
              </div>
            ) : (
              <div>
                <p className="text-sm text-amber-600 mb-3">
                  This report is unassigned.
                </p>
                <Button
                  onClick={handleClaim}
                  disabled={claiming}
                  className="w-full"
                >
                  <UserCheck className="h-4 w-4" />
                  {claiming ? "Claiming…" : "Claim Report"}
                </Button>
              </div>
            )}
          </Panel>

          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">Update Status</h2>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-institution-600 mb-3"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <Button
              onClick={handleUpdateStatus}
              disabled={updatingStatus || selectedStatus === report.status}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4" />
              {updatingStatus ? "Saving…" : "Save Status"}
            </Button>
          </Panel>

          <Panel>
            <h2 className="font-bold text-slate-950 mb-3">Status Tracking</h2>

            <div className="space-y-3 text-sm border-l pl-4 border-slate-200">
              {/* Updated At only */}
              <div>
                <p className="text-slate-500 text-xs">Last Updated</p>
                <p className="text-slate-800">
                  {report.updatedAt
                    ? new Date(report.updatedAt).toLocaleString()
                    : "—"}
                </p>
              </div>
            </div>
          </Panel>

          <Panel>
            <h2 className="font-bold text-slate-950 mb-2">Sent by</h2>
            {report.student ? (
              <div className="text-sm space-y-1">
                <p className="font-semibold">
                  {report.student.firstName} {report.student.lastName}
                </p>
                <p className="text-slate-600">{report.student.email}</p>
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                Anonymous or not available
              </p>
            )}
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
