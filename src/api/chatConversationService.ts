import api from "./api";

export const chatConversationService = {
  createConversation: (data: any) => api.post("/ChatConversation/create", data),

  getMyConversations: () => api.get("/ChatConversation/my"),

  getAllAdmin: () => api.get("/ChatConversation/admin/all"),

  getUnassigned: () => api.get("/ChatConversation/admin/unassigned"),

  getAssignedToMe: () => api.get("/ChatConversation/admin/assigned-to-me"),

  getClosed: () => api.get("/ChatConversation/admin/closed"),

  assignAdmin: (data: any) => api.put("/ChatConversation/assign", data),

  getByReport: (reportId: number) =>
    api.get(`/ChatConversation/by-report/${reportId}`),

  closeConversation: (id: number) => api.put(`/ChatConversation/close/${id}`),
};
