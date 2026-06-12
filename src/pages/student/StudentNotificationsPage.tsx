import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { NotificationCard } from "../../components/notifications/NotificationCard";

export function StudentNotificationsPage() {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead } =
    useApp();
  const items = notifications.filter((item) => item.role === "student");
  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">Notifications</h1>
            <p className="mt-2 text-sm text-slate-600">
              Report updates and resource notices.
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => markAllNotificationsRead("student")}
          >
            Mark all read
          </Button>
        </div>
      </Panel>
      <div className="space-y-3">
        {items.map((item) => (
          <NotificationCard
            key={item.id}
            notification={item}
            onRead={() => markNotificationRead(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
