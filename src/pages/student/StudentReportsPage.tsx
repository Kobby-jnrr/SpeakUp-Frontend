import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { ReportTable } from "../../components/reports/ReportTable";
import { Panel, EmptyState } from "../../components/ui/Cards";
import { SearchInput, FilterDropdown } from "../../components/ui/Form";
import { Button } from "../../components/ui/Button";
import { FilePlus } from "lucide-react";

export function StudentReportsPage() {
  const { reports } = useApp();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [type, setType] = useState("All types");
  const [urgency, setUrgency] = useState("All urgency");
  const [sort, setSort] = useState("Newest");
  const filtered = useMemo(
    () =>
      reports
        .filter((report) =>
          [report.id, report.type, report.status, report.location]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .filter((report) => status === "All statuses" || report.status === status)
        .filter((report) => type === "All types" || report.type === type)
        .filter((report) => urgency === "All urgency" || report.urgency === urgency)
        .sort((a, b) =>
          sort === "Oldest"
            ? a.submittedAt.localeCompare(b.submittedAt)
            : b.submittedAt.localeCompare(a.submittedAt),
        ),
    [reports, query, status, type, urgency, sort],
  );

  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">My reports</h1>
            <p className="mt-2 text-sm text-slate-600">
              Track submitted reports, counselor responses, and current review
              state.
            </p>
          </div>
          <Link to="/student/report">
            <Button>
              <FilePlus className="h-4 w-4" /> New report
            </Button>
          </Link>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_repeat(4,180px)]">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search reports"
          />
          <FilterDropdown
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              "All statuses",
              "Pending",
              "In Review",
              "Resolved",
              "Closed",
            ]}
          />
          <FilterDropdown
            label="Type"
            value={type}
            onChange={setType}
            options={[
              "All types",
              "Sexual Abuse",
              "Physical Abuse",
              "Verbal Abuse",
              "Emotional Abuse",
              "Harassment",
              "Bullying",
              "Other",
            ]}
          />
          <FilterDropdown
            label="Urgency"
            value={urgency}
            onChange={setUrgency}
            options={["All urgency", "Standard", "Emergency"]}
          />
          <FilterDropdown
            label="Sort"
            value={sort}
            onChange={setSort}
            options={["Newest", "Oldest"]}
          />
        </div>
      </Panel>
      {reports.length === 0 ? (
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
        <ReportTable reports={filtered} />
      )}
    </div>
  );
}
