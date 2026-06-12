import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Library,
  ShieldAlert,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { DashboardCard, Panel } from "../../components/ui/Cards";
import { ReportTable } from "../../components/reports/ReportTable";
import { formatDate } from "../../utils/format";
import { getDashboardStats } from "../../mock/dashboardStats";

export function AdminDashboard() {
  const { reports, notifications } = useApp();

  const stats = getDashboardStats(reports);
  const emergency = reports.filter((r) => r.urgency === "Emergency");
  const recentAlerts = notifications
    .filter((n) => n.role === "admin")
    .slice(0, 4);

  const statusRows = [
    {
      label: "Pending intake",
      value: stats.pendingReports,
      color: "bg-amber-500",
    },
    {
      label: "In active review",
      value: stats.inReviewReports,
      color: "bg-blue-500",
    },
    {
      label: "Resolved cases",
      value: stats.resolvedReports,
      color: "bg-green-500",
    },
    {
      label: "Emergency priority",
      value: stats.emergencyReports,
      color: "bg-red-500",
    },
  ];

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
        />
        <DashboardCard
          title="Pending"
          value={stats.pendingReports}
          icon={<Clock3 />}
        />
        <DashboardCard
          title="In Review"
          value={stats.inReviewReports}
          icon={<Activity />}
        />
        <DashboardCard
          title="Emergency"
          value={stats.emergencyReports}
          icon={<ShieldAlert />}
        />
        <DashboardCard
          title="Resolved"
          value={stats.resolvedReports}
          icon={<CheckCircle2 />}
        />
        <DashboardCard
          title="Anonymous"
          value={stats.anonymousReports}
          icon={<Users />}
        />
        <DashboardCard
          title="This Week"
          value={stats.reportsThisWeek}
          icon={<CalendarDays />}
        />
        <DashboardCard
          title="This Month"
          value={stats.reportsThisMonth}
          icon={<FileText />}
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
        {recentAlerts.map((a) => (
          <div key={a.id} className="border p-2 mt-2">
            <p className="font-semibold">{a.title}</p>
            <p>{a.message}</p>
            <small>{formatDate(a.date)}</small>
          </div>
        ))}
      </Panel>
    </div>
  );
}
