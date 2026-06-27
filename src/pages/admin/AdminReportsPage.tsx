import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Panel, EmptyState } from "../../components/ui/Cards";
import { SearchInput, FilterDropdown } from "../../components/ui/Form";
import { reportService } from "../../api/reportService";
import { useApp } from "../../context/AppContext";
import type { BackendReport } from "../../types";

type ViewMode = "all" | "mine";
type ReportMode = "Full" | "Quick";

export function AdminReportsPage() {
  const { addToast } = useApp();
  const [reports, setReports] = useState<BackendReport[]>([]);
  const [loading, setLoading] = useState(true);

  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [reportMode, setReportMode] = useState<ReportMode>("Full");

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [confidential, setConfidential] = useState("All");

  const loadReports = async (mode: ViewMode) => {
    setLoading(true);
    try {
      const res =
        mode === "mine"
          ? await reportService.getAssignedToMe()
          : await reportService.getAllReports();

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

  useEffect(() => {
    loadReports(viewMode);
  }, [viewMode]);

  const filtered = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return reports
      .filter((r) => {
        const matchesSearch =
          !searchTerm ||
          [
            `rep-${String(r.id).padStart(6, "0")}`,
            r.title,
            r.description,
            r.status,
            r.department,
            r.respondentName,
            r.email,
            r.assignedAdmin?.firstName,
            r.assignedAdmin?.lastName,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm);

        const matchesStatus = status === "All statuses" || r.status === status;

        const matchesConf =
          confidential === "All"
            ? true
            : confidential === "Confidential"
              ? r.confidential
              : !r.confidential;

        const matchesType =
          reportMode === "Full" ? r.type !== "Quick" : r.type === "Quick";

        return matchesSearch && matchesStatus && matchesConf && matchesType;
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [reports, query, status, confidential, reportMode]);

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">
              {viewMode === "all"
                ? reportMode === "Full"
                  ? "All Full Reports"
                  : "All Quick Reports"
                : reportMode === "Full"
                  ? "My Full Reports"
                  : "My Quick Reports"}
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              {reportMode === "Full"
                ? "Structured case reports requiring full investigation."
                : "Fast student submissions requiring immediate attention."}
            </p>
          </div>

          {/* VIEW MODE */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("all")}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold transition ${
                viewMode === "all"
                  ? "bg-institution-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setViewMode("mine")}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold transition ${
                viewMode === "mine"
                  ? "bg-institution-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              My Cases
            </button>
          </div>
        </div>

        {/* FULL / QUICK TOGGLE */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setReportMode("Full")}
            className={`px-4 py-2 rounded text-sm font-semibold border transition ${
              reportMode === "Full"
                ? "bg-institution-600 text-white border-institution-600"
                : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            Full Reports
          </button>

          <button
            onClick={() => setReportMode("Quick")}
            className={`px-4 py-2 rounded text-sm font-semibold border transition ${
              reportMode === "Quick"
                ? "bg-institution-600 text-white border-institution-600"
                : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            Quick Reports
          </button>
        </div>

        {/* FILTERS */}
        <div className="mt-4 flex flex-wrap gap-2">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search reports…"
          />

          <FilterDropdown
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              "All statuses",
              "Pending",
              "InProgress",
              "Resolved",
              "Closed",
            ]}
          />

          <FilterDropdown
            label="Confidentiality"
            value={confidential}
            onChange={setConfidential}
            options={["All", "Confidential", "Not confidential"]}
          />
        </div>
      </Panel>

      {/* LOADING */}
      {loading ? (
        <Panel>
          <p className="text-slate-500 text-sm">Loading reports…</p>
        </Panel>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No reports found"
          message="Try adjusting filters or switching report type."
        />
      ) : reportMode === "Full" ? (
        /* ================= FULL REPORT TABLE ================= */
        <Panel className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b bg-slate-50">
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
                  <tr
                    key={r.id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">
                      REP-{String(r.id).padStart(6, "0")}
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

                    <td className="px-4 py-3 text-slate-600">
                      {r.department || "—"}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {r.incidentDate
                        ? new Date(r.incidentDate).toLocaleDateString()
                        : "—"}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {r.assignedAdmin
                        ? `${r.assignedAdmin.firstName} ${r.assignedAdmin.lastName}`
                        : "Unassigned"}
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
      ) : (
        /* ================= QUICK REPORT CARDS ================= */
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <Panel key={r.id} className="border-l-4 border-institution-600">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-slate-900">
                    REP-{String(r.id).padStart(6, "0")}
                  </p>

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
                </div>

                <p className="text-sm text-slate-700 line-clamp-2">
                  {r.title || r.description}
                </p>

                <p className="text-xs text-slate-500">
                  {r.incidentDate
                    ? new Date(r.incidentDate).toLocaleDateString()
                    : "No date"}
                </p>

                <p className="text-xs text-slate-600">
                  {r.assignedAdmin
                    ? `Assigned to ${r.assignedAdmin.firstName}`
                    : "Unassigned"}
                </p>

                <Link
                  to={`/admin/reports/${r.id}`}
                  className="text-institution-600 text-xs font-semibold hover:underline inline-block mt-2"
                >
                  Open Report →
                </Link>
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
