import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Panel, EmptyState } from "../../components/ui/Cards";
import { ReportDetails } from "../../components/reports/ReportDetails";
import { Button } from "../../components/ui/Button";

export function AdminReportDetailsPage() {
  const { id } = useParams();
  const { reports } = useApp();

  const report = reports.find((r) => r.id === id);
  const [note, setNote] = useState("");

  if (!report)
    return (
      <EmptyState
        title="Not found"
        message="Report does not exist"
        action={<Link to="/admin/reports">Back</Link>}
      />
    );

  return (
    <div className="space-y-4">
      <ReportDetails report={report} admin />

      <Panel>
        <h2>Admin Actions</h2>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border p-2"
        />

        <Button>Add Note</Button>
      </Panel>
    </div>
  );
}
