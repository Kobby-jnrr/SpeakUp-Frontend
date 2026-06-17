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
import { ReportTable } from "../../components/reports/ReportTable";
import { formatDate } from "../../utils/format";

export function AdminDashboard() {
  const { reports, notifications } = useApp();

  const stats = {
    totalReports: reports.length,
    pendingReports: reports.filter((r) => r.status === "Pending").length,
    inReviewReports: reports.filter((r) => r.status === "In Review").length,
    resolvedReports: reports.filter((r) => r.status === "Resolved").length,
    emergencyReports: reports.filter((r) => r.urgency === "Emergency").length,
    anonymousReports: reports.filter((r) => r.isAnonymous).length,
    reportsThisWeek: 0,
    reportsThisMonth: 0,
  };

  const emergency = reports.filter((r) => r.urgency === "Emergency");

  // ✅ FIXED
  const recentAlerts = notifications
    .filter((n) => n.role === "JuniorAdmin" || n.role === "SuperAdmin")
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <Panel className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="mt-4 flex gap-3">
          <Link to="/admin/reports">View Reports</Link>

          <Link to="/admin/resources">Resources</Link>
        </div>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total"
          value={stats.totalReports}
          icon={<FileText />}
          variant="neutral"
        />

        <DashboardCard
          title="Pending"
          value={stats.pendingReports}
          icon={<Clock3 />}
          variant="pending"
        />

        <DashboardCard
          title="In Review"
          value={stats.inReviewReports}
          icon={<Activity />}
          variant="review"
        />

        <DashboardCard
          title="Emergency"
          value={stats.emergencyReports}
          icon={<ShieldAlert />}
          variant="danger"
        />

        <DashboardCard
          title="Resolved"
          value={stats.resolvedReports}
          icon={<CheckCircle2 />}
          variant="success"
        />

        <DashboardCard
          title="Anonymous"
          value={stats.anonymousReports}
          icon={<Users />}
          variant="info"
        />

        <DashboardCard
          title="This Week"
          value={stats.reportsThisWeek}
          icon={<CalendarDays />}
          variant="info"
        />

        <DashboardCard
          title="This Month"
          value={stats.reportsThisMonth}
          icon={<FileText />}
          variant="info"
        />
      </div>

      <Panel>
        <h2 className="font-bold">Priority Reports</h2>

        <ReportTable
          reports={emergency.length ? emergency : reports.slice(0, 3)}
          admin
        />
      </Panel>

      <Panel>
        <h2 className="font-bold">Recent Activity</h2>

        {recentAlerts.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            No recent notifications.
          </p>
        ) : (
          recentAlerts.map((a) => (
            <div key={a.id} className="mt-2 border p-2">
              <p className="font-semibold">{a.title}</p>

              <p>{a.message}</p>

              <small>{formatDate(a.date)}</small>
            </div>
          ))
        )}
      </Panel>
    </div>
  );
}
