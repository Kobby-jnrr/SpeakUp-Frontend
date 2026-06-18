import { Panel } from "../../components/ui/Cards";

export function AdminNotificationsPage() {
  return (
    <div className="space-y-4">
      <Panel>
        <h1 className="text-2xl font-bold text-slate-950">Notifications</h1>
        <p className="mt-2 text-sm text-slate-500">
          In-app notifications will be displayed here once the notification service is connected.
        </p>
      </Panel>
    </div>
  );
}
