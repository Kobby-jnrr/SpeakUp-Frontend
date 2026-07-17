import {
  Activity,
  AlertTriangle,
  Bell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FilePlus,
  Files,
  Home,
  Info,
  Lock,
  LogOut,
  Mail,
  Megaphone,
  MessageSquare,
  Menu,
  Search,
  Settings,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/Button";

const mainLinks = [
  { to: "/student/home", label: "Home", icon: Home },
  { to: "/student/dashboard", label: "Dashboard", icon: Activity },
  { to: "/student/report", label: "Report Incident", icon: FilePlus },
  { to: "/student/my-reports", label: "My Reports", icon: Files },
  { to: "/student/chat", label: "Chat", icon: MessageSquare },
  { to: "/student/resources", label: "Resources", icon: BookOpen },
  { to: "/student/emergency", label: "Emergency Help", icon: AlertTriangle },
  { to: "/student/settings", label: "Settings", icon: Settings },
];

const moreLinks = [
  { to: "/student/faqs", label: "FAQs", icon: CircleHelp },
  { to: "/student/privacy", label: "Privacy Policy", icon: Lock },
  { to: "/student/about", label: "About Us", icon: Info },
  { to: "/student/contact", label: "Contact Us", icon: Mail },
];

export function StudentLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const unread = 0;
  const initials =
    [currentUser?.firstName?.[0] ?? "", currentUser?.lastName?.[0] ?? ""]
      .join("")
      .toUpperCase() || "ST";

  const renderLink = ({
    to,
    label,
    icon: Icon,
  }: {
    to: string;
    label: string;
    icon: typeof Home;
  }) => (
    <NavLink
      key={`${label}-${to}`}
      to={to}
      onClick={() => setOpen(false)}
      title={label}
      className={({ isActive }) =>
        `group flex items-center rounded-md py-3 text-sm font-semibold transition ${isActive ? "bg-blue-600 text-white" : "text-blue-50/85 hover:bg-white/10 hover:text-white"} ${collapsed ? "justify-center px-2" : "justify-between px-3"}`
      }
    >
      <span
        className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        {!collapsed && <span>{label}</span>}
      </span>
      {null}
    </NavLink>
  );

  const renderMoreLink = ({
    to,
    label,
    icon: Icon,
  }: {
    to: string;
    label: string;
    icon: typeof Home;
  }) => (
    <NavLink
      key={`${label}-${to}`}
      to={to}
      onClick={() => setOpen(false)}
      title={label}
      className={({ isActive }) =>
        `group flex items-center rounded-md py-3 text-sm font-semibold transition ${isActive ? "bg-blue-600 text-white" : "text-blue-50/85 hover:bg-white/10 hover:text-white"} ${collapsed ? "justify-center px-2" : "justify-between px-3"}`
      }
    >
      <span
        className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        {!collapsed && <span>{label}</span>}
      </span>
    </NavLink>
  );

  const sidebar = (
    <aside
      className={`flex h-full min-h-screen flex-col overflow-x-hidden bg-[#082642] py-5 text-white transition-all ${collapsed ? "w-[72px] items-center px-2" : "w-[260px] px-4"}`}
    >
      <div
        className={`flex items-center ${collapsed ? "justify-center px-0" : "justify-between px-1"}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white">
            <img
              src="/images/speaks2.png"
              alt="SpeakUp Logo"
              className="h-9 w-9 object-contain"
            />
          </div>
          {!collapsed && (
            <div>
              <p className="text-lg font-bold leading-5">SpeakUp</p>
              <p className="text-xs font-medium text-blue-100/80">
                Student Support
              </p>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="rounded-md p-1.5 text-blue-100/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mt-4 flex h-9 w-9 items-center justify-center rounded-md text-blue-100/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      <nav className="mt-8 w-full space-y-2" aria-label="Student navigation">
        {mainLinks.map(renderLink)}
      </nav>

      <div className="mt-7 w-full border-t border-white/10 pt-4">
        {!collapsed && (
          <p className="px-1 text-xs font-semibold text-blue-100/70">More</p>
        )}
        <nav
          className={`mt-3 space-y-2 ${collapsed ? "" : ""}`}
          aria-label="Student secondary navigation"
        >
          {moreLinks.map(renderMoreLink)}
        </nav>
      </div>

      {!collapsed ? (
        <div className="mt-4 rounded-md border border-white/10 bg-white/5 p-3">
          <p className="text-sm font-semibold">Need immediate help?</p>
          <p className="mt-1 text-xs leading-5 text-blue-100/75">
            Contact emergency support
          </p>
          <Button
            variant="danger"
            className="mt-3 w-full border-red-400 bg-red-500/15 text-red-100 hover:bg-red-500/25"
            onClick={() => navigate("/student/emergency")}
          >
            Emergency Call
          </Button>
        </div>
      ) : (
        <div className="mt-auto flex flex-col items-center gap-3">
          <button
            onClick={() => navigate("/student/emergency")}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-red-500/15 text-red-100 transition hover:bg-red-500/25"
            aria-label="Emergency Call"
          >
            <AlertTriangle className="h-4 w-4" />
          </button>
        </div>
      )}

      <Button
        variant="ghost"
        className={`mt-3 w-full text-white hover:bg-white/15 hover:text-white ${collapsed ? "justify-center px-2" : "justify-start"}`}
        onClick={() => {
          logout();
          navigate("/login");
        }}
        title="Sign out"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        {!collapsed && <span className="ml-3">Sign out</span>}
      </Button>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f6f9fd]">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <img
              src="/images/speaks2.png"
              alt="SpeakUp Logo"
              className="h-7 w-7 object-contain"
            />

            <p className="font-bold text-slate-950">SpeakUp</p>
          </div>
          <Button
            variant="secondary"
            className="px-3"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        {open ? (
          <div className="fixed inset-x-0 top-[57px] z-40 h-[calc(100vh-57px)] overflow-y-auto lg:hidden">
            {sidebar}
          </div>
        ) : null}
      </header>

      <div
        className={`min-h-screen lg:grid ${collapsed ? "lg:grid-cols-[72px_minmax(0,1fr)]" : "lg:grid-cols-[260px_minmax(0,1fr)]"}`}
      >
        <div className="no-print sticky top-0 hidden h-screen overflow-x-hidden overflow-y-auto lg:block">
          {sidebar}
        </div>
        <div className="min-w-0">
          <div className="hidden border-b border-slate-200 bg-white px-6 py-4 lg:flex lg:items-center lg:justify-between">
            <label className="flex w-full max-w-md items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500">
              <Search className="h-4 w-4" aria-hidden="true" />
              <input
                className="w-full bg-transparent outline-none"
                placeholder="Search for resources, help articles, etc."
              />
            </label>
            <div className="flex items-center gap-5">
              <button
                className="relative rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                aria-label="Notifications"
                onClick={() => navigate("/student/notifications")}
              >
                <Bell className="h-5 w-5" />
                {unread > 0 ? (
                  <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
                ) : null}
              </button>
              <button
                className="flex items-center gap-3"
                onClick={() => navigate("/student/settings")}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                  {initials}
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold text-slate-950">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </span>
                  <span className="block text-xs text-slate-500">Student</span>
                </span>
              </button>
            </div>
          </div>
          <main id="main" className="min-w-0 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
