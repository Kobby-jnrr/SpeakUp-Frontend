import { useEffect, useState } from "react";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  ShieldAlert,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { DashboardCard, Panel } from "../../components/ui/Cards";
import { reportService } from "../../api/reportService";
import type { BackendReport } from "../../types";

export function AdminDashboard() {
  const { addToast } = useApp();
  const [reports, setReports] = useState<BackendReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await reportService.getAllReports();
        setReports(res.data);
      } catch {
        addToast({
          title: "Error",
          message: "Failed to load reports",
          tone: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = {
    totalReports: reports.length,
    pendingReports: reports.filter((r) => r.status === "Pending").length,
    inProgressReports: reports.filter((r) => r.status === "InProgress").length,
    resolvedReports: reports.filter((r) => r.status === "Resolved").length,
    closedReports: reports.filter((r) => r.status === "Closed").length,
    confidentialReports: reports.filter((r) => r.confidential).length,
    assignedReports: reports.filter((r) => r.assignedAdmin != null).length,
    unassignedReports: reports.filter((r) => r.assignedAdmin == null).length,
  };

  const recentReports = reports.slice(0, 5);

  return (
    <div className="space-y-6">
      <Panel className="p-6">
        <h1 className="text-2xl font-bold text-slate-950">Admin Dashboard</h1>
        <p className="text-sm text-slate-600 mt-1">
          Overview of all reports and system activity.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            to="/admin/reports"
            className="text-sm font-semibold text-institution-600 hover:underline"
          >
            View All Reports →
          </Link>
          <Link
            to="/admin/homepage-content"
            className="text-sm font-semibold text-slate-600 hover:underline"
          >
            Manage Content →
          </Link>
        </div>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total"
          value={loading ? "…" : stats.totalReports}
          icon={<FileText />}
          variant="neutral"
        />
        <DashboardCard
          title="Pending"
          value={loading ? "…" : stats.pendingReports}
          icon={<Clock3 />}
          variant="pending"
        />
        <DashboardCard
          title="In Progress"
          value={loading ? "…" : stats.inProgressReports}
          icon={<Activity />}
          variant="review"
        />
        <DashboardCard
          title="Resolved"
          value={loading ? "…" : stats.resolvedReports}
          icon={<CheckCircle2 />}
          variant="success"
        />
        <DashboardCard
          title="Closed"
          value={loading ? "…" : stats.closedReports}
          icon={<ShieldAlert />}
          variant="danger"
        />
        <DashboardCard
          title="Confidential"
          value={loading ? "…" : stats.confidentialReports}
          icon={<Users />}
          variant="info"
        />
        <DashboardCard
          title="Assigned"
          value={loading ? "…" : stats.assignedReports}
          icon={<CalendarDays />}
          variant="info"
        />
        <DashboardCard
          title="Unassigned"
          value={loading ? "…" : stats.unassignedReports}
          icon={<FileText />}
          variant="neutral"
        />
      </div>

      <Panel>
        <h2 className="font-bold text-slate-950 mb-3">Recent Reports</h2>
        {loading ? (
          <p className="text-sm text-slate-500">Loading…</p>
        ) : recentReports.length === 0 ? (
          <p className="text-sm text-slate-500">No reports yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b">
                  <th className="pb-2 pr-4">ID</th>
                  <th className="pb-2 pr-4">Title</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2 pr-4">Department</th>
                  <th className="pb-2 pr-4">Assigned To</th>
                  <th className="pb-2">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-slate-50">
                    <td className="py-2 pr-4 text-slate-500">
                      REP-{String(r.id).padStart(5, "0")}
                    </td>
                    <td className="py-2 pr-4">
                      <Link
                        to={`/admin/reports/${r.id}`}
                        className="font-medium text-institution-700 hover:underline"
                      >
                        {r.title}
                      </Link>
                    </td>
                    <td className="py-2 pr-4">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          r.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : r.status === "InProgress"
                              ? "bg-blue-100 text-blue-700"
                              : r.status === "Resolved"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-2 pr-4">{r.department || "—"}</td>
                    <td className="py-2 pr-4">
                      {r.assignedAdmin
                        ? `${r.assignedAdmin.firstName} ${r.assignedAdmin.lastName}`
                        : "Unassigned"}
                    </td>
                    <td className="py-2">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
