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
  const token = sessionStorage.getItem("token");
  const userStr = sessionStorage.getItem("user");

  // Not logged in at all → go to login
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
  const isAdmin = userRole === "junioradmin" || userRole === "superadmin";
  const isStudent = userRole === "student";

  // Student-only pages: admins get redirected to their dashboard
  if (role === "Student") {
    if (!isStudent) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  // JuniorAdmin pages (also accessible by SuperAdmin): students get redirected to their home
  if (role === "JuniorAdmin") {
    if (!isAdmin) {
      return <Navigate to="/student/home" replace />;
    }
  }

  // SuperAdmin-only pages: non-superadmins get redirected appropriately
  if (role === "SuperAdmin") {
    if (userRole !== "superadmin") {
      return isStudent
        ? <Navigate to="/student/home" replace />
        : <Navigate to="/admin/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
