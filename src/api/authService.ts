import api from "./api";

export const authService = {
  login: (data: { email: string; password: string }) => {
    return api.post("/Auth/login", data);
  },

  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    department: string;
    password: string;
  }) => {
    return api.post("/Auth/register", data);
  },

  verifyEmail: (data: { email: string; code: string }) => {
    return api.post("/Auth/verify-email", data);
  },

  resendVerificationCode: (email: string) => {
    return api.post(`/Auth/resend-verification-code?email=${email}`);
  },

  // SEND PASSWORD RESET LINK
  forgotPassword: (email: string) => {
    return api.post("/Auth/forgot-password", {
      email,
    });
  },

  // RESET PASSWORD USING TOKEN
  resetPassword: (data: {
    email: string;
    token: string;
    newPassword: string;
  }) => {
    return api.post("/Auth/reset-password", data);
  },
};
