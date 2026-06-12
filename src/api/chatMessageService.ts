import api from "./api";

export const chatMessageService = {
  sendMessage: (data: any) => api.post("/ChatMessage/send", data),

  getMessages: (conversationId: number) =>
    api.get(`/ChatMessage/${conversationId}`),

  markAsRead: (messageId: number) => api.put(`/ChatMessage/read/${messageId}`),
};
