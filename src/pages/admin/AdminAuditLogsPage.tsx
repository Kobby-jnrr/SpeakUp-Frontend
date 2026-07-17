import { useEffect, useState } from "react";
import { Panel } from "../../components/ui/Cards";
import { auditService } from "../../api/auditService";

interface AuditLog {
  id: number;
  userName: string;
  action: string;
  description: string;
  createdAt: string;
}

export function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const res = await auditService.getAll();

        setLogs(res.data);
      } catch (error) {
        console.error("Failed to load audit logs", error);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="text-2xl font-bold">Audit Logs</h1>

        <p className="text-sm text-slate-600">
          Review important administrative activities performed in the system.
        </p>
      </Panel>

      <Panel>
        {loading ? (
          <p>Loading audit logs...</p>
        ) : logs.length === 0 ? (
          <p className="text-sm text-slate-500">No audit records available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-3">Date</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>

                    <td className="p-3 font-medium">{log.userName}</td>

                    <td className="p-3">{log.action}</td>

                    <td className="p-3 text-slate-600">{log.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
