import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Panel, EmptyState } from "../../components/ui/Cards";
import { SearchInput, FilterDropdown } from "../../components/ui/Form";
import { Button } from "../../components/ui/Button";
import { reportService } from "../../api/reportService";
import { useApp } from "../../context/AppContext";
import { FilePlus } from "lucide-react";
import type { BackendReport } from "../../types";

export function StudentReportsPage() {
  const { addToast } = useApp();
  const [reports, setReports] = useState<BackendReport[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await reportService.getMyReports();
        setReports(res.data);
      } catch {
        addToast({ title: "Error", message: "Could not load your reports", tone: "error" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return reports
      .filter((r) =>
        [r.id, r.title, r.department, r.incidentLocation, r.status]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
      .filter((r) => status === "All statuses" || r.status === status)
      .sort((a, b) =>
        sort === "Oldest"
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt),
      );
  }, [reports, query, status, sort]);

  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">My Reports</h1>
            <p className="mt-2 text-sm text-slate-600">
              Track submitted reports, counselor responses, and current review state.
            </p>
          </div>
          <Link to="/student/report">
            <Button>
              <FilePlus className="h-4 w-4" /> New Report
            </Button>
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search reports…"
            />
          </div>
          <FilterDropdown
            label="Status"
            value={status}
            onChange={setStatus}
            options={["All statuses", "Pending", "InProgress", "Resolved", "Closed"]}
          />
          <FilterDropdown
            label="Sort"
            value={sort}
            onChange={setSort}
            options={["Newest", "Oldest"]}
          />
        </div>
      </Panel>

      {loading ? (
        <Panel>
          <p className="text-slate-500 text-sm">Loading your reports…</p>
        </Panel>
      ) : reports.length === 0 ? (
        <EmptyState
          title="No reports submitted"
          message="When you submit a report it will appear here."
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No matching reports"
          message="Adjust your search or filters to see more results."
        />
      ) : (
        <Panel className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b bg-slate-50">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Nature</th>
                  <th className="px-4 py-3">Incident Date</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t hover:bg-slate-50 transition">
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
                    <td className="px-4 py-3 text-slate-600 text-xs">
                      {Array.isArray(r.complaintNature)
                        ? r.complaintNature.slice(0, 2).join(", ")
                        : r.complaintNature || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {r.incidentDate ? new Date(r.incidentDate).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/student/reports/${r.id}`}
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
