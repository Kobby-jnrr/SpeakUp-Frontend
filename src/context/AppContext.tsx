import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import { mockNotifications } from "../mock/notifications";
import { mockReports } from "../mock/reports";
import { mockResources } from "../mock/resources";
import { mockUsers } from "../mock/users";

import type {
  NotificationItem,
  Report,
  ReportStatus,
  Resource,
  Role,
  User,
} from "../types";

import { todayIso } from "../utils/format";
import { authService } from "../api/authService";
import { reportService } from "../api/reportService";
import { mapApiReport } from "../utils/reportMapper";
import { mapRole } from "../utils/roleMapper";

interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  tone?: "success" | "info" | "warning" | "error";
}

interface AppContextValue {
  currentUser: User | null;
  role: Role | null;
  reports: Report[];
  resources: Resource[];
  notifications: NotificationItem[];
  toasts: ToastMessage[];

  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => Promise<void>;

  loginAs: (role: Role) => void;
  logout: () => void;

  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;

  submitReport: (
    report: Omit<
      Report,
      | "id"
      | "submittedAt"
      | "lastUpdated"
      | "status"
      | "timeline"
      | "internalNotes"
      | "adminResponse"
      | "assignedCounselor"
    >,
  ) => Report;

  updateReport: (
    id: string,
    update: Partial<Report>,
    activity?: string,
  ) => void;

  addInternalNote: (id: string, note: string) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (role: Role) => void;

  addResource: (resource: Omit<Resource, "id" | "updatedAt">) => void;
  updateResource: (id: string, update: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(mockNotifications);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // load user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // load reports
  useEffect(() => {
    const loadReports = async () => {
      if (!currentUser) return;

      try {
        const response =
          currentUser.role === "junioradmin" ||
          currentUser.role === "superadmin"
            ? await reportService.getAllReports()
            : await reportService.getMyReports();

        setReports(response.data.map(mapApiReport));
      } catch (error) {
        console.warn("Using local report data", error);
      }
    };

    loadReports();
  }, [currentUser]);

  const addToast = (toast: Omit<ToastMessage, "id">) => {
    const id = `toast-${Date.now()}`;
    setToasts((items) => [...items, { id, ...toast }]);

    window.setTimeout(() => {
      setToasts((items) => items.filter((t) => t.id !== id));
    }, 3800);
  };

  const value = useMemo<AppContextValue>(
    () => ({
      currentUser,
      role: currentUser?.role ?? null,
      reports,
      resources,
      notifications,
      toasts,

      login: async (email, password) => {
        try {
          const res = await authService.login({ email, password });
          const { token, firstName, lastName, role } = res.data;
          const id = res.data.id ?? res.data.Id;

          const normalizedRole = mapRole(role);

          const user: User = {
            id: String(id),
            name: `${firstName} ${lastName}`,
            email,
            role: normalizedRole,
            backendRole: String(role ?? ""),
          };

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          setCurrentUser(user);

          addToast({ title: "Login successful", tone: "success" });
        } catch (err: any) {
          addToast({
            title: "Login failed",
            message: err.response?.data?.message || "Invalid credentials",
            tone: "error",
          });
          throw err;
        }
      },

      register: async (data) => {
        try {
          await authService.register(data);
          addToast({
            title: "Account created",
            message: "You can now login",
            tone: "success",
          });
        } catch (err: any) {
          addToast({
            title: "Registration failed",
            message: err.response?.data?.message || "Error",
            tone: "error",
          });
          throw err;
        }
      },

      loginAs: (role) => {
        const user = mockUsers.find((u) => u.role === role) ?? null;
        setCurrentUser(user);

        addToast({
          title:
            role === "superadmin"
              ? "Super Admin session active"
              : role === "junioradmin"
                ? "Junior Admin session active"
                : "Student session active",
          tone: "success",
        });
      },

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setCurrentUser(null);
      },

      addToast,
      removeToast: (id) =>
        setToasts((items) => items.filter((t) => t.id !== id)),

      submitReport: (reportDraft) => {
        const now = todayIso();

        const report: Report = {
          ...reportDraft,
          id: `REP-2026-${String(reports.length + 1).padStart(3, "0")}`,
          status: "Pending",
          submittedAt: now,
          lastUpdated: now,
          assignedCounselor: "Unassigned",
          adminResponse: "Report received.",
          timeline: [{ label: "Submitted", date: now, actor: "Student" }],
          internalNotes: [],
        };

        setReports((r) => [report, ...r]);
        return report;
      },

      updateReport: (id, update) => {
        const now = todayIso();

        setReports((items) =>
          items.map((r) =>
            r.id === id ? { ...r, ...update, lastUpdated: now } : r,
          ),
        );
      },

      addInternalNote: (id, note) => {
        const now = todayIso();

        setReports((items) =>
          items.map((r) =>
            r.id === id
              ? {
                  ...r,
                  internalNotes: [
                    ...r.internalNotes,
                    {
                      id: `note-${Date.now()}`,
                      note,
                      author: currentUser?.name ?? "Admin",
                      date: now,
                    },
                  ],
                }
              : r,
          ),
        );
      },

      markNotificationRead: (id) =>
        setNotifications((items) =>
          items.map((n) => (n.id === id ? { ...n, read: true } : n)),
        ),

      markAllNotificationsRead: (role) =>
        setNotifications((items) =>
          items.map((n) => (n.role === role ? { ...n, read: true } : n)),
        ),

      addResource: (resource) =>
        setResources((items) => [
          { ...resource, id: `res-${Date.now()}`, updatedAt: todayIso() },
          ...items,
        ]),

      updateResource: (id, update) =>
        setResources((items) =>
          items.map((r) =>
            r.id === id ? { ...r, ...update, updatedAt: todayIso() } : r,
          ),
        ),

      deleteResource: (id) =>
        setResources((items) => items.filter((r) => r.id !== id)),
    }),
    [currentUser, reports, resources, notifications, toasts],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export const reportStatuses: ReportStatus[] = [
  "Pending",
  "In Review",
  "Resolved",
  "Closed",
];
