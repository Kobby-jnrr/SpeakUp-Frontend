import { ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  ShieldCheck,
  Home,
  Users,
  FilePlus,
  Settings,
  LogOut,
  Menu,
  X,
  UserPlus,
} from "lucide-react";
import { Button } from "../ui/Button";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: Home },
  { to: "/admin/reports", label: "Reports", icon: FilePlus },

  // SUPER ADMIN ONLY FEATURE
  { to: "/admin/create-junior-admin", label: "Create Admin", icon: UserPlus },

  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function SuperAdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  const nav = (
    <nav className="space-y-1">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold ${
              isActive
                ? "bg-institution-700 text-white"
                : "text-slate-700 hover:bg-slate-100"
            }`
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-30 border-b bg-white lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="font-bold">Super Admin</p>
          <Button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && <div className="p-4">{nav}</div>}
      </header>

      <div className="grid lg:grid-cols-[292px_1fr]">
        <aside className="hidden min-h-screen border-r bg-white p-5 lg:block">
          <div className="mb-6 flex items-center gap-3">
            <ShieldCheck />
            <div>
              <p className="font-bold">SUPER ADMIN</p>
              <p className="text-xs text-slate-500">System Control</p>
            </div>
          </div>

          {nav}

          <div className="mt-6 text-sm text-slate-600">
            <p className="font-semibold">Logged in as</p>
            <p>{currentUser?.name}</p>
          </div>

          <Button
            className="mt-4 w-full"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </aside>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
