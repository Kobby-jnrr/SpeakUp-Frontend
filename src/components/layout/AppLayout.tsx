import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { RoleSwitcher } from './RoleSwitcher';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-base font-bold text-institution-900">Student Welfare Reporting Portal</Link>
          <RoleSwitcher />
        </div>
      </header>
      <main id="main" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
