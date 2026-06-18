/**
 * CHANGE: Centralized auth handling
 * Uses sessionStorage for per-tab session isolation
 */

export type AuthUser = {
  id: string;
  name?: string;
  email: string;
  role: "student" | "junioradmin" | "superadmin";
};

export const isAdminRole = (role?: string) => {
  if (!role) return false;
  return ["junioradmin", "superadmin"].includes(role.toLowerCase());
};

export const setAuth = (token: string, user: AuthUser) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): AuthUser | null => {
  const data = sessionStorage.getItem("user");
  if (!data) return null;

  try {
    return JSON.parse(data) as AuthUser;
  } catch {
    return null;
  }
};

export const getToken = () => {
  return sessionStorage.getItem("token");
};

export const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};
