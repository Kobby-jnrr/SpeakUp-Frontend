import api from "./api";

export const authService = {
  login: (data: { email: string; password: string }) =>
    api.post("/Auth/login", data),

  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => api.post("/Auth/register", data),
};
