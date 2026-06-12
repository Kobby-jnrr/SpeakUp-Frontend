import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { AuthUser } from "../../utils/auth";

type Role = "student" | "junioradmin" | "superadmin";

export function ProtectedRouteMock({
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

  // STUDENT
  if (role === "student") {
    if (userRole !== "student") {
      return <Navigate to="/login" replace />;
    }
  }

  // JUNIOR ADMIN ONLY
  if (role === "junioradmin") {
    if (userRole !== "junioradmin") {
      return <Navigate to="/login" replace />;
    }
  }

  // SUPER ADMIN ONLY
  if (role === "superadmin") {
    if (userRole !== "superadmin") {
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
}
