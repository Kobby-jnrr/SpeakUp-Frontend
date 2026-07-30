import api from "./api";

export const adminService = {
  createAdminInvitation: (data: {
    email: string;
    role: "JuniorAdmin" | "SuperAdmin";
  }) => api.post("/Auth/create-admin-invitation", data),

  deleteUser: (id: number) => api.delete(`/Auth/delete-user/${id}`),
};
