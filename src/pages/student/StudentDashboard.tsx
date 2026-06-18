import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Clock3,
  FilePlus,
  Files,
  HeartHandshake,
  Shield,
  ShieldAlert,
  PhoneCall,
  Hand,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Panel, DashboardCard } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { reportService } from "../../api/reportService";
import type { BackendReport } from "../../types";

const contacts = [
  {
    title: "Campus Security",
    detail: "+233 30 123 4567",
    note: "24/7 Available",
    icon: Shield,
    tone: "bg-red-50 text-red-700",
  },
  {
    title: "Counseling Center",
    detail: "+233 30 987 6543",
    note: "Mon - Fri, 8AM - 6PM",
    icon: HeartHandshake,
    tone: "bg-blue-50 text-blue-700",
  },
  {
    title: "National Helpline",
    detail: "0800 111 222",
    note: "24/7 Available",
    icon: PhoneCall,
    tone: "bg-emerald-50 text-emerald-700",
  },
];

export function StudentDashboard() {
  const { currentUser, addToast } = useApp();
  const [reports, setReports] = useState<BackendReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await reportService.getMyReports();
        setReports(res.data);
      } catch {
        addToast({ title: "Error", message: "Could not load your reports", tone: "error" });
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
  };

  const recentReports = reports.slice(0, 5);

  const quickActions = [
    {
      title: "Submit a New Report",
      detail: "Report an incident",
      to: "/student/report",
      icon: FilePlus,
      tone: "bg-blue-50 text-blue-700 border-blue-100",
    },
    {
      title: "View My Reports",
      detail: "Track your reports",
      to: "/student/my-reports",
      icon: Files,
      tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      title: "Emergency Help",
      detail: "Get immediate support",
      to: "/student/emergency",
      icon: AlertTriangle,
      tone: "bg-red-50 text-red-700 border-red-100",
    },
    {
      title: "Browse Resources",
      detail: "Helpful information",
      to: "/student/resources",
      icon: BookOpen,
      tone: "bg-violet-50 text-violet-700 border-violet-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grid gap-5 xl:grid-cols-[1fr_250px]">
        <div className="rounded-md border bg-white p-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Welcome back, {currentUser?.firstName}
            <Hand className="h-6 w-6 text-amber-500" />
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            We're here to support you. Your safety and well-being matter.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/student/report">
              <Button>
                <FilePlus className="h-4 w-4" /> Report Incident
              </Button>
            </Link>
            <Link to="/student/resources">
              <Button variant="secondary">
                <BookOpen className="h-4 w-4" /> Resources
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-md border bg-white p-5">
          <h2 className="font-bold text-slate-950">Privacy</h2>
          <p className="text-sm mt-2 text-slate-600">
            All reports are confidential and protected.
          </p>
          <div className="mt-3 text-emerald-600">
            <ShieldAlert />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <DashboardCard
          title="Total Reports"
          value={loading ? "…" : stats.totalReports}
          detail="All time"
          icon={<Files />}
          variant="info"
        />
        <DashboardCard
          title="Pending"
          value={loading ? "…" : stats.pendingReports}
          detail="Awaiting review"
          icon={<Clock3 />}
          variant="pending"
        />
        <DashboardCard
          title="In Progress"
          value={loading ? "…" : stats.inProgressReports}
          detail="Processing"
          icon={<Activity />}
          variant="review"
        />
        <DashboardCard
          title="Resolved"
          value={loading ? "…" : stats.resolvedReports}
          detail="Completed"
          icon={<CheckCircle2 />}
          variant="success"
        />
        <DashboardCard
          title="Closed"
          value={loading ? "…" : stats.closedReports}
          detail="Archived"
          icon={<ShieldAlert />}
          variant="danger"
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        {/* Recent reports */}
        <Panel className="p-0">
          <div className="border-b px-5 py-4 flex justify-between items-center">
            <h2 className="font-bold text-slate-950">Recent Reports</h2>
            <Link to="/student/my-reports" className="text-sm text-institution-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b bg-slate-50">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-slate-400 text-sm">
                      Loading reports…
                    </td>
                  </tr>
                ) : recentReports.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-slate-400 text-sm">
                      No reports yet.
                    </td>
                  </tr>
                ) : (
                  recentReports.map((r) => (
                    <tr key={r.id} className="border-t hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-400 text-xs">#{r.id}</td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/student/reports/${r.id}`}
                          className="font-medium text-institution-700 hover:underline"
                        >
                          {r.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
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
                      <td className="px-4 py-3 text-slate-500 text-xs">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* Quick actions */}
        <Panel>
          <h2 className="font-bold text-slate-950">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            {quickActions.map((a) => (
              <Link
                key={a.title}
                to={a.to}
                className={`block p-3 border rounded-md transition hover:opacity-90 ${a.tone}`}
              >
                <p className="font-bold text-sm">{a.title}</p>
                <p className="text-xs opacity-80">{a.detail}</p>
              </Link>
            ))}
          </div>

          <h2 className="font-bold text-slate-950 mt-6 mb-3">Emergency Contacts</h2>
          <div className="space-y-3">
            {contacts.map((c) => (
              <div key={c.title} className="flex gap-3">
                <div className={`p-2 rounded flex-shrink-0 ${c.tone}`}>
                  <c.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">{c.title}</p>
                  <p className="text-sm text-slate-700">{c.detail}</p>
                  <p className="text-xs text-slate-500">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
