import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Panel, EmptyState } from "../../components/ui/Cards";
import { SearchInput, FilterDropdown } from "../../components/ui/Form";
import { reportService } from "../../api/reportService";
import { useApp } from "../../context/AppContext";
import type { BackendReport } from "../../types";

export function AdminReportsPage() {
  const { addToast } = useApp();
  const [reports, setReports] = useState<BackendReport[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [confidential, setConfidential] = useState("All");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await reportService.getAllReports();
        setReports(res.data);
      } catch {
        addToast({
          title: "Error",
          message: "Failed to load reports",
          tone: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return reports
      .filter((r) =>
        [r.id, r.title, r.department, r.complainantStudentId, r.incidentLocation]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
      .filter((r) => status === "All statuses" || r.status === status)
      .filter((r) => {
        if (confidential === "Confidential") return r.confidential;
        if (confidential === "Not confidential") return !r.confidential;
        return true;
      });
  }, [reports, query, status, confidential]);

  return (
    <div className="space-y-4">
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">All Reports</h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage, claim, and update all submitted reports.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by title, department, student ID…"
          />
          <FilterDropdown
            label="Status"
            value={status}
            onChange={setStatus}
            options={["All statuses", "Pending", "InProgress", "Resolved", "Closed"]}
          />
          <FilterDropdown
            label="Confidentiality"
            value={confidential}
            onChange={setConfidential}
            options={["All", "Confidential", "Not confidential"]}
          />
        </div>
      </Panel>

      {loading ? (
        <Panel>
          <p className="text-slate-500 text-sm">Loading reports…</p>
        </Panel>
      ) : filtered.length === 0 ? (
        <EmptyState title="No reports found" message="Try adjusting your filters." />
      ) : (
        <Panel className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b bg-slate-50">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Incident Date</th>
                  <th className="px-4 py-3">Assigned To</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b hover:bg-slate-50 transition">
                    <td className="px-4 py-3 text-slate-400 text-xs">#{r.id}</td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-slate-900">{r.title}</span>
                      {r.confidential && (
                        <span className="ml-2 text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                          Confidential
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          r.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : r.status === "InProgress"
                              ? "bg-blue-100 text-blue-700"
                              : r.status === "Resolved"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{r.department || "—"}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {r.incidentDate
                        ? new Date(r.incidentDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {r.assignedAdmin
                        ? `${r.assignedAdmin.firstName} ${r.assignedAdmin.lastName}`
                        : <span className="text-amber-600">Unassigned</span>}
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/admin/reports/${r.id}`}
                        className="text-institution-600 font-semibold text-xs hover:underline"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      )}
    </div>
  );
}
