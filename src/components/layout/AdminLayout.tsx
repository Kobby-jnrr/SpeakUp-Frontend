import { Bell, FileText, Home, LogOut, Menu, Settings, ShieldCheck, Wrench } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { to: '/admin/reports', label: 'Reports', icon: FileText },
  { to: '/admin/resources', label: 'Resources', icon: Wrench },
  { to: '/admin/notifications', label: 'Notifications', icon: Bell },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const nav = (
    <nav className="space-y-1" aria-label="Admin navigation">
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold ${isActive ? 'bg-institution-700 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
          <Icon className="h-4 w-4" aria-hidden="true" />{label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="font-bold text-institution-900">Case Management</p>
          <Button variant="secondary" className="px-3" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation"><Menu className="h-4 w-4" /></Button>
        </div>
        {open ? <div className="border-t border-slate-200 px-4 py-3">{nav}</div> : null}
      </header>
      <div className="grid lg:grid-cols-[292px_1fr]">
        <aside className="no-print hidden min-h-screen border-r border-slate-200 bg-white p-5 lg:block">
          <div className="mb-8 flex items-start gap-3">
            <div className="rounded-md bg-institution-700 p-2 text-white"><ShieldCheck className="h-5 w-5" /></div>
            <div>
              <p className="font-bold text-institution-900">Student Affairs</p>
              <p className="text-sm text-slate-600">Case management workspace</p>
            </div>
          </div>
          {nav}
          <div className="mt-8 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Authorized user</p>
            <p>{currentUser?.name}</p>
            <p>{currentUser?.title}</p>
          </div>
          <Button variant="ghost" className="mt-4 w-full justify-start" onClick={() => { logout(); navigate('/login'); }}><LogOut className="h-4 w-4" /> Sign out</Button>
        </aside>
        <main id="main" className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
