import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import { Panel } from "../../components/ui/Cards";

export function StudentNotificationsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <Panel>
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-institution-600" />
          <h1 className="text-2xl font-bold text-slate-950">Notifications</h1>
        </div>
        <p className="text-sm text-slate-500">
          In-app notifications will appear here. Report status updates and
          important announcements will be shown when the notification service
          is connected.
        </p>
      </Panel>
    </div>
  );
}
