import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { Role, User } from "../types";
import { authService } from "../api/authService";

/**
 * 🔥 MAP backend role → frontend Role string
 * Handles any casing/spacing variation the backend might return
 */
const mapRole = (role: string | number): Role => {
  if (typeof role === "string") {
    // Strip spaces and lowercase for flexible matching
    // e.g. "SuperAdmin", "Super Admin", "superadmin" all work
    const r = role.replace(/\s+/g, "").toLowerCase();
    if (r.includes("super")) return "SuperAdmin";
    if (r.includes("junior")) return "JuniorAdmin";
    if (r.includes("student")) return "Student";
  }

  // Handle numeric roles as fallback
  switch (Number(role)) {
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
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;

  login: (email: string, password: string) => Promise<LoginResult>;
  register: (data: any) => Promise<any>;
  logout: () => void;

  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;

  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  /**
   * 🔁 Restore session from sessionStorage
   */
  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");

    if (savedUser && token) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
      }
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
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  };

  /**
   * 🔐 LOGIN
   */
  const login = async (
    email: string,
    password: string,
  ): Promise<LoginResult> => {
    const res = await authService.login({ email, password });
    const data = res.data;

    const role = mapRole(data.role);

    const user: User = {
      id: String(data.id),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role,
      gender: data.gender ?? "",
      department: data.department ?? "",
      phoneNumber: data.phoneNumber ?? "",
    };

    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify(user));

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
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setCurrentUser(null);
  };

  /**
   * 📦 CONTEXT VALUE
   */
  const value = useMemo<AppContextValue>(
    () => ({
      currentUser,
      role: currentUser?.role ?? null,
      theme,
      setTheme,
      login,
      register,
      logout,

      toasts,
      addToast,
      removeToast,

      setCurrentUser,
    }),
    [currentUser, toasts],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
