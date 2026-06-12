import api from "./api";

export const adminService = {
  createJuniorAdmin: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => api.post("/Auth/create-junior-admin", data),
};
