import api from "./api";

export const auditService = {
  getAll: () => {
    return api.get("/audit/all");
  },

  getRecent: () => {
    return api.get("/audit/recent");
  },
};
