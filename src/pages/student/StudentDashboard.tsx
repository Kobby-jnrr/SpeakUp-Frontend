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
  ChevronRight,
  Hand,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { getDashboardStats } from "../../mock/dashboardStats";

import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { DashboardCard } from "../../components/ui/Cards";
import { formatDate } from "../../utils/format";

export function StudentDashboard() {
  const { currentUser, reports, notifications, resources } = useApp();

  const stats = getDashboardStats(reports);

  const unread = notifications.filter(
    (n) => n.role === "student" && !n.read,
  ).length;

  const publishedResources = resources.filter((r) => r.published);
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

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="grid gap-5 xl:grid-cols-[1fr_250px]">
        <div className="rounded-md border bg-white p-6">
          <div className="grid lg:grid-cols-[1fr_240px] gap-5">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                Welcome back, {currentUser?.name?.split(" ")[0]}
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
          </div>
        </div>

        <div className="rounded-md border bg-white p-5">
          <h2 className="font-bold">Privacy</h2>
          <p className="text-sm mt-2">
            All reports are confidential and protected.
          </p>

          <div className="mt-3 text-emerald-600">
            <ShieldAlert />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <DashboardCard
          title="Total Reports"
          value={stats.totalReports}
          detail="All time"
          icon={<Files />}
          accent="bg-blue-500"
        />

        <DashboardCard
          title="Pending"
          value={stats.pendingReports}
          detail="Awaiting review"
          icon={<Clock3 />}
          accent="bg-amber-500"
        />

        <DashboardCard
          title="In Review"
          value={stats.inReviewReports}
          detail="Processing"
          icon={<Activity />}
          accent="bg-violet-500"
        />

        <DashboardCard
          title="Resolved"
          value={stats.resolvedReports}
          detail="Completed"
          icon={<CheckCircle2 />}
          accent="bg-emerald-500"
        />

        <DashboardCard
          title="Emergency"
          value={stats.emergencyReports}
          detail="High priority"
          icon={<ShieldAlert />}
          accent="bg-red-500"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="grid gap-5 xl:grid-cols-[1fr_320px_320px]">
        {/* REPORTS TABLE */}
        <Panel className="p-0">
          <div className="border-b px-5 py-4 flex justify-between">
            <h2 className="font-bold">Recent Reports</h2>
            <Link to="/student/my-reports" className="text-blue-600">
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs">
                  <th className="p-3">ID</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Submitted</th>
                  <th className="p-3">Updated</th>
                </tr>
              </thead>

              <tbody>
                {recentReports.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="p-3">{r.id}</td>
                    <td className="p-3">{r.type}</td>
                    <td className="p-3">{r.status}</td>
                    <td className="p-3">{formatDate(r.submittedAt)}</td>
                    <td className="p-3">{formatDate(r.lastUpdated)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* QUICK ACTIONS */}
        <Panel>
          <h2 className="font-bold">Quick Actions</h2>

          <div className="mt-4 space-y-3">
            {quickActions.map((a) => (
              <Link
                key={a.title}
                to={a.to}
                className={`block p-3 border rounded ${a.tone}`}
              >
                <p className="font-bold text-sm">{a.title}</p>
                <p className="text-xs opacity-80">{a.detail}</p>
              </Link>
            ))}
          </div>
        </Panel>

        {/* CONTACTS */}
        <Panel>
          <h2 className="font-bold">Emergency Contacts</h2>

          <div className="mt-4 space-y-4">
            {contacts.map((c) => (
              <div key={c.title} className="flex gap-3">
                <div className={`p-2 rounded ${c.tone}`}>
                  <c.icon className="h-4 w-4" />
                </div>

                <div>
                  <p className="font-bold text-sm">{c.title}</p>
                  <p className="text-sm">{c.detail}</p>
                  <p className="text-xs text-gray-500">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
