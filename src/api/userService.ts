import api from "./api";

export const userService = {
  getStudents: () => {
    return api.get("/users/students");
  },

  // Get admins (SuperAdmin only)
  getAdmins: () => {
    return api.get("/users/admins");
  },
};
