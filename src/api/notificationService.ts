import api from "./api";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  reportId?: number | null;
}

export const notificationService = {
  // Get logged in user's notifications
  async getNotifications(): Promise<Notification[]> {
    const response = await api.get("/notification");

    return response.data;
  },

  // Get unread count for bell badge
  async getUnreadCount(): Promise<number> {
    const response = await api.get("/notification/unread-count");

    return response.data.unreadCount;
  },

  // Mark one notification as read
  async markAsRead(id: number) {
    const response = await api.put(`/notification/read/${id}`);

    return response.data;
  },

  // Mark all notifications as read
  async markAllAsRead() {
    const response = await api.put("/notification/read-all");

    return response.data;
  },
};
