import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { AuthUser } from "../../utils/auth";

type Role = "Student" | "JuniorAdmin" | "SuperAdmin";

export function ProtectedRoute({
  children,
  role,
}: {
  children: ReactNode;
  role: Role;
}) {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  let user: AuthUser | null = null;

  try {
    user = JSON.parse(userStr);
  } catch {
    return <Navigate to="/login" replace />;
  }

  const userRole = (user?.role || "").toLowerCase();

  // Student pages
  if (role === "Student") {
    if (userRole !== "student") {
      return <Navigate to="/login" replace />;
    }
  }

  if (role === "JuniorAdmin") {
    if (userRole !== "junioradmin" && userRole !== "superadmin") {
      return <Navigate to="/login" replace />;
    }
  }

  // SuperAdmin-only pages
  if (role === "SuperAdmin") {
    if (userRole !== "superadmin") {
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
}
