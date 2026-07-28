import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  FileText,
  MessageSquare,
  Megaphone,
  ShieldAlert,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  notificationService,
  type Notification,
} from "../../api/notificationService";

interface NotificationDropdownProps {
  onUnreadChange?: (count: number) => void;
}

export function NotificationDropdown({
  onUnreadChange,
}: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    onUnreadChange?.(unreadCount);
  }, [unreadCount, onUnreadChange]);

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const data = await notificationService.getNotifications();

      setNotifications(data);
    } catch (error) {
      console.error("Unable to load notifications", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notification: Notification) => {
    if (notification.isRead) {
      return;
    }

    try {
      await notificationService.markAsRead(notification.id);

      setNotifications((previous) =>
        previous.map((item) =>
          item.id === notification.id
            ? {
                ...item,
                isRead: true,
              }
            : item,
        ),
      );
    } catch (error) {
      console.error("Failed to mark notification", error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "Report":
        return <FileText className="h-5 w-5 text-blue-600" />;

      case "Chat":
        return <MessageSquare className="h-5 w-5 text-green-600" />;

      case "Announcement":
        return <Megaphone className="h-5 w-5 text-purple-600" />;

      default:
        return <ShieldAlert className="h-5 w-5 text-orange-600" />;
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}

      <button
        onClick={() => setOpen(!open)}
        className="
          relative
          rounded-full
          border
          border-slate-200
          p-2
          text-slate-600
          hover:bg-slate-50
          transition
        "
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <span
            className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-red-500
                text-[11px]
                font-bold
                text-white
              "
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            transition={{
              duration: 0.15,
            }}
            className="
              absolute
              right-0
              mt-3
              w-96
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-xl
              z-50
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                px-4
                py-3
              "
            >
              <h3
                className="
                  font-bold
                  text-slate-900
                "
              >
                Notifications
              </h3>

              {unreadCount > 0 && (
                <button
                  onClick={async () => {
                    await notificationService.markAllAsRead();

                    setNotifications((previous) =>
                      previous.map((item) => ({
                        ...item,
                        isRead: true,
                      })),
                    );
                  }}
                  className="
                      text-xs
                      font-semibold
                      text-blue-600
                      hover:underline
                    "
                >
                  Mark all read
                </button>
              )}
            </div>

            <div
              className="
                max-h-[420px]
                overflow-y-auto
              "
            >
              {loading && (
                <div
                  className="
                    p-5
                    text-center
                    text-sm
                    text-slate-500
                  "
                >
                  Loading notifications...
                </div>
              )}

              {!loading && notifications.length === 0 && (
                <div
                  className="
                    p-6
                    text-center
                    text-sm
                    text-slate-500
                  "
                >
                  No notifications yet.
                </div>
              )}

              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => markAsRead(notification)}
                  className={`
                    flex
                    w-full
                    gap-3
                    border-b
                    px-4
                    py-4
                    text-left
                    transition

                    ${notification.isRead ? "bg-white" : "bg-blue-50"}

                    hover:bg-slate-50
                  `}
                >
                  <div
                    className="
                      mt-1
                    "
                  >
                    {getIcon(notification.type)}
                  </div>

                  <div
                    className="
                      flex-1
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <p
                        className="
                          text-sm
                          font-semibold
                          text-slate-900
                        "
                      >
                        {notification.title}
                      </p>

                      {!notification.isRead && (
                        <span
                          className="
                              h-2
                              w-2
                              rounded-full
                              bg-blue-600
                            "
                        />
                      )}
                    </div>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-600
                      "
                    >
                      {notification.message}
                    </p>

                    <p
                      className="
                        mt-2
                        text-[11px]
                        text-slate-400
                      "
                    >
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
