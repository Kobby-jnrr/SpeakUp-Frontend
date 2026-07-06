import {
  Bell,
  FileText,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  ShieldCheck,
  Wrench,
  Zap,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  User,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/Button";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: Home },
    { to: "/admin/reports", label: "Reports", icon: FileText },
    { to: "/admin/chat", label: "Chat", icon: MessageSquare },
    { to: "/admin/homepage-content", label: "Homepage Content", icon: Zap },
    { to: "/admin/resources", label: "Resources", icon: Wrench },
    { to: "/admin/settings", label: "Settings", icon: Settings },

    // ✅ SUPER ADMIN ONLY
    ...(currentUser?.role === "SuperAdmin"
      ? [
          {
            to: "/admin/create-junior-admin",
            label: "Create Admin",
            icon: UserPlus,
          },
          {
            to: "/admin/users",
            label: "Users",
            icon: User,
          },
        ]
      : []),
  ];

  const renderLink = ({
    to,
    label,
    icon: Icon,
  }: {
    to: string;
    label: string;
    icon: any;
  }) => (
    <NavLink
      key={to}
      to={to}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `group flex items-center rounded-md py-3 text-sm font-semibold transition
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-blue-50/85 hover:bg-white/10 hover:text-white"
        }
        ${collapsed ? "justify-center px-2" : "justify-between px-3"}`
      }
    >
      <span
        className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {!collapsed && <span>{label}</span>}
      </span>
    </NavLink>
  );

  const sidebar = (
    <aside
      className={`flex flex-col overflow-y-auto overflow-x-hidden
    bg-[#082642] py-5 text-white transition-all
    h-screen sticky top-0
    ${collapsed ? "w-[72px] items-center px-2" : "w-[260px] px-4"}`}
    >
      <div
        className={`flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-600">
            <ShieldCheck className="h-6 w-6" />
          </div>

          {!collapsed && (
            <div>
              <p className="text-lg font-bold leading-5">SpeakUp</p>
              <p className="text-xs text-blue-100/80">Admin Panel</p>
            </div>
          )}
        </div>

        {!collapsed && (
          <button onClick={() => setCollapsed(true)}>
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {collapsed && (
        <button onClick={() => setCollapsed(false)} className="mt-4">
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      <nav className="mt-8 space-y-2">{links.map(renderLink)}</nav>

      {!collapsed && (
        <div className="mt-6 rounded-md border border-white/10 bg-white/5 p-3">
          <p className="text-xs text-blue-100/70">Logged in as</p>
          <p className="font-semibold">
            {currentUser?.firstName} {currentUser?.lastName}
          </p>
          <p className="text-xs text-blue-100/70">{currentUser?.role}</p>
        </div>
      )}

      <Button
        variant="ghost"
        className={`mt-auto w-full text-white ${
          collapsed ? "justify-center" : "justify-start"
        }`}
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        <LogOut className="h-4 w-4" />
        {!collapsed && <span className="ml-3">Sign out</span>}
      </Button>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f6f9fd]">
      <div
        className={`min-h-screen lg:grid ${
          collapsed
            ? "lg:grid-cols-[72px_minmax(0,1fr)]"
            : "lg:grid-cols-[260px_minmax(0,1fr)]"
        }`}
      >
        <div className="hidden lg:block">{sidebar}</div>
        <main className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
