import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/speaks.png"
              alt="SpeakUp Logo"
              className="h-12 w-auto"
            />
          </Link>
          <div className="flex gap-2">
            <Link
              to="/login"
              className="text-sm font-medium text-institution-700 hover:text-institution-900 transition"
            >
              Login
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              to="/register"
              className="text-sm font-medium text-institution-700 hover:text-institution-900 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
