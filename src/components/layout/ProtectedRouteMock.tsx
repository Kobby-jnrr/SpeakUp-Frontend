import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { Role } from '../../types';
import { EmptyState } from '../ui/Cards';

export function ProtectedRouteMock({ role, children }: { role: Role; children: ReactNode }) {
  const { currentUser } = useApp();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (currentUser.role !== role) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <EmptyState title="Access restricted" message="This page is available only to users with the correct demo role. Use the role switcher on the login page to continue." />
      </div>
    );
  }

  return children;
}
