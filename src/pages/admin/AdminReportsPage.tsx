import { useMemo, useState } from "react";
import { useApp } from "../../context/AppContext";
import { Panel, EmptyState } from "../../components/ui/Cards";
import { ReportTable } from "../../components/reports/ReportTable";
import { SearchInput, FilterDropdown } from "../../components/ui/Form";

export function AdminReportsPage() {
  const { reports } = useApp();

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [type, setType] = useState("All types");
  const [emergency, setEmergency] = useState("All reports");

  const filtered = useMemo(() => {
    return reports
      .filter((r) =>
        [r.id, r.studentName, r.type]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
      .filter((r) => status === "All statuses" || r.status === status)
      .filter((r) => type === "All types" || r.type === type)
      .filter((r) => emergency === "All reports" || r.urgency === "Emergency");
  }, [reports, query, status, type, emergency]);

  return (
    <div className="space-y-4">
      <Panel>
        <h1>Reports</h1>

        <div className="flex gap-2">
          <SearchInput value={query} onChange={setQuery} placeholder="Search" />

          <FilterDropdown
            label="Status"
            value={status}
            onChange={setStatus}
            options={["All statuses", "Pending", "In Review", "Resolved"]}
          />

          <FilterDropdown
            label="Type"
            value={type}
            onChange={setType}
            options={["All types", "Sexual Abuse", "Physical Abuse"]}
          />

          <FilterDropdown
            label="Emergency"
            value={emergency}
            onChange={setEmergency}
            options={["All reports", "Emergency only"]}
          />
        </div>
      </Panel>

      {filtered.length ? (
        <ReportTable reports={filtered} admin />
      ) : (
        <EmptyState title="No reports" message="Try changing filters" />
      )}
    </div>
  );
}
