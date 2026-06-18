import api from "./api";
import type { Conversation } from "../types";

export const chatConversationService = {
  createConversation: (data: {
    chatType: string;
    isAnonymous: boolean;
    reportId?: number | null;
  }) => api.post("/ChatConversation/create", data),

  getMyConversations: (page = 1, pageSize = 20) =>
    api.get("/ChatConversation/my", { params: { page, pageSize } }),

  getAllAdmin: (page = 1, pageSize = 50) =>
    api.get("/ChatConversation/admin/all", { params: { page, pageSize } }),

  getUnassigned: () => api.get("/ChatConversation/admin/unassigned"),

  getAssignedToMe: () => api.get("/ChatConversation/admin/assigned-to-me"),

  getClosed: () => api.get("/ChatConversation/admin/closed"),

  assignAdmin: (data: { conversationId: number; adminId: number }) =>
    api.put("/ChatConversation/assign", data),

  getByReport: (reportId: number) =>
    api.get(`/ChatConversation/by-report/${reportId}`),

  closeConversation: (id: number) => api.put(`/ChatConversation/close/${id}`),
};
