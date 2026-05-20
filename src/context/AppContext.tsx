import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { mockNotifications } from '../mock/notifications';
import { mockReports } from '../mock/reports';
import { mockResources } from '../mock/resources';
import { mockUsers } from '../mock/users';
import type { NotificationItem, Report, ReportStatus, Resource, Role, User } from '../types';
import { todayIso } from '../utils/format';

interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  tone?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextValue {
  currentUser: User | null;
  role: Role | null;
  reports: Report[];
  resources: Resource[];
  notifications: NotificationItem[];
  toasts: ToastMessage[];
  loginAs: (role: Role) => void;
  logout: () => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  submitReport: (report: Omit<Report, 'id' | 'submittedAt' | 'lastUpdated' | 'status' | 'timeline' | 'internalNotes' | 'adminResponse' | 'assignedCounselor'>) => Report;
  updateReport: (id: string, update: Partial<Report>, activity?: string) => void;
  addInternalNote: (id: string, note: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (role: Role) => void;
  addResource: (resource: Omit<Resource, 'id' | 'updatedAt'>) => void;
  updateResource: (id: string, update: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]);
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}`;
    setToasts((items) => [...items, { id, ...toast }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 3800);
  };

  const value = useMemo<AppContextValue>(() => ({
    currentUser,
    role: currentUser?.role ?? null,
    reports,
    resources,
    notifications,
    toasts,
    loginAs: (role) => {
      const user = mockUsers.find((item) => item.role === role) ?? null;
      setCurrentUser(user);
      addToast({ title: role === 'admin' ? 'Admin demo session active' : 'Student demo session active', tone: 'success' });
    },
    logout: () => setCurrentUser(null),
    addToast,
    removeToast: (id) => setToasts((items) => items.filter((item) => item.id !== id)),
    submitReport: (reportDraft) => {
      const now = todayIso();
      const report: Report = {
        ...reportDraft,
        id: `REP-2026-${String(reports.length + 1).padStart(3, '0')}`,
        status: 'Pending',
        submittedAt: now,
        lastUpdated: now,
        assignedCounselor: 'Unassigned',
        adminResponse: 'Your report has been received. Authorized staff will review it according to university procedure.',
        timeline: [{ label: 'Report submitted', date: now, actor: 'Student' }, { label: 'Report received', date: now, actor: 'System' }],
        internalNotes: [],
      };
      setReports((items) => [report, ...items]);
      setNotifications((items) => [
        { id: `not-${Date.now()}`, role: 'admin', title: report.urgency === 'Emergency' ? 'Emergency report received' : 'New report submitted', message: `${report.id} is ready for review.`, date: now, read: false, tone: report.urgency === 'Emergency' ? 'urgent' : 'info', reportId: report.id },
        ...items,
      ]);
      return report;
    },
    updateReport: (id, update, activity) => {
      const now = todayIso();
      setReports((items) => items.map((report) => report.id === id ? {
        ...report,
        ...update,
        lastUpdated: now,
        timeline: activity ? [...report.timeline, { label: activity, date: now, actor: currentUser?.name ?? 'Admin' }] : report.timeline,
      } : report));
    },
    addInternalNote: (id, note) => {
      const now = todayIso();
      setReports((items) => items.map((report) => report.id === id ? {
        ...report,
        lastUpdated: now,
        internalNotes: [...report.internalNotes, { id: `note-${Date.now()}`, note, author: currentUser?.name ?? 'Admin', date: now }],
        timeline: [...report.timeline, { label: 'Internal note added', date: now, actor: currentUser?.name ?? 'Admin' }],
      } : report));
    },
    markNotificationRead: (id) => setNotifications((items) => items.map((item) => item.id === id ? { ...item, read: true } : item)),
    markAllNotificationsRead: (role) => setNotifications((items) => items.map((item) => item.role === role ? { ...item, read: true } : item)),
    addResource: (resource) => setResources((items) => [{ ...resource, id: `res-${Date.now()}`, updatedAt: todayIso() }, ...items]),
    updateResource: (id, update) => setResources((items) => items.map((item) => item.id === id ? { ...item, ...update, updatedAt: todayIso() } : item)),
    deleteResource: (id) => setResources((items) => items.filter((item) => item.id !== id)),
  }), [currentUser, notifications, reports, resources, toasts]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return context;
}

export const reportStatuses: ReportStatus[] = ['Pending', 'In Review', 'Resolved', 'Closed'];
