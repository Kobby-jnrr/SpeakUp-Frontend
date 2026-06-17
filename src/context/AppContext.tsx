import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { NotificationItem, Report, Resource, Role, User } from "../types";

import { authService } from "../api/authService";
import { todayIso } from "../utils/format";

/**
 * 🔥 MAP backend number role → frontend Role string
 */
const mapRole = (role: number): Role => {
  switch (role) {
    case 0:
      return "Student";
    case 1:
      return "JuniorAdmin";
    case 2:
      return "SuperAdmin";
    default:
      return "Student";
  }
};

interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  tone?: "success" | "info" | "warning" | "error";
}

interface LoginResult {
  user: User;
  role: Role;
}

interface AppContextValue {
  currentUser: User | null;
  role: Role | null;

  login: (email: string, password: string) => Promise<LoginResult>;
  register: (data: any) => Promise<any>;
  logout: () => void;

  reports: Report[];
  resources: Resource[];
  notifications: NotificationItem[];
  toasts: ToastMessage[];

  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;

  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  /**
   * 🔁 Restore session
   */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  /**
   * 🔔 TOAST SYSTEM
   */
  const addToast = (toast: Omit<ToastMessage, "id">) => {
    const id = `toast-${Date.now()}`;
    setToasts((t) => [...t, { id, ...toast }]);

    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  };

  /**
   * 🔐 LOGIN (FIXED ROLE MAPPING)
   */
  const login = async (
    email: string,
    password: string,
  ): Promise<LoginResult> => {
    const res = await authService.login({ email, password });
    const data = res.data;

    // 🔥 FIX: convert backend number → Role string
    const role = mapRole(data.role);

    const user: User = {
      id: String(data.id),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role,
    };

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(user));

    setCurrentUser(user);

    return { user, role };
  };

  /**
   * 📝 REGISTER
   */
  const register = async (data: any) => {
    const res = await authService.register(data);
    return res.data;
  };

  /**
   * 🚪 LOGOUT
   */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  /**
   * 📦 CONTEXT VALUE
   */
  const value = useMemo<AppContextValue>(
    () => ({
      currentUser,
      role: currentUser?.role ?? null,

      login,
      register,
      logout,

      reports,
      resources,
      notifications,
      toasts,

      addToast,
      removeToast,

      setCurrentUser,
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
