import { useNavigate, useParams, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { EmptyState } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { ReportDetails } from "../../components/reports/ReportDetails";

export function StudentReportDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reports } = useApp();
  const report = reports.find((item) => item.id === id);
  if (!report)
    return (
      <EmptyState
        title="Report not found"
        message="The report reference does not exist in the current mock data."
        action={
          <Link to="/student/my-reports">
            <Button>Back to my reports</Button>
          </Link>
        }
      />
    );
  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <ReportDetails report={report} />
    </div>
  );
}
