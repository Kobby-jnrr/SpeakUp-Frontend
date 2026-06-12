/**
 * CHANGE: Centralized auth handling
 * (prevents repeating localStorage logic everywhere)
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
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): AuthUser | null => {
  const data = localStorage.getItem("user");
  if (!data) return null;

  try {
    return JSON.parse(data) as AuthUser;
  } catch {
    return null;
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
