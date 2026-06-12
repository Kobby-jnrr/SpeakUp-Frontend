import { useApp } from "../../context/AppContext";
import { Panel } from "../../components/ui/Cards";

export function AdminNotificationsPage() {
  const { notifications } = useApp();

  const items = notifications.filter((n) => n.role === "admin");

  return (
    <div className="space-y-4">
      <Panel>
        <h1>Notifications</h1>
      </Panel>

      {items.map((n) => (
        <div key={n.id} className="border p-2">
          {n.title}
        </div>
      ))}
    </div>
  );
}
