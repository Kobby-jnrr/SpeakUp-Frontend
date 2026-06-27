import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { ReportForm } from "../../components/reports/ReportForm";
import { QuickReportForm } from "../../components/reports/QuickReportForm";

type Mode = "select" | "full" | "quick";

export function StudentReportPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("select");

  // STEP 1: Selection screen
  if (mode === "select") {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* HEADER */}
        <Panel className="text-center bg-slate-50 border-slate-200">
          <h1 className="text-2xl font-bold text-slate-950">
            Report an Incident
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Choose how you would like to submit your report.
          </p>
        </Panel>

        {/* FULL REPORT CARD */}
        <Panel className="space-y-3">
          <h2 className="text-lg font-bold text-slate-950">Full Report</h2>

          <p className="text-sm text-slate-600 leading-6">
            A detailed report that includes respondent details, witnesses,
            incident information, desired outcome, and full case context.
          </p>

          <Button className="w-full" onClick={() => setMode("full")}>
            Choose Full Report
          </Button>
        </Panel>

        {/* QUICK REPORT CARD */}
        <Panel className="space-y-3">
          <h2 className="text-lg font-bold text-slate-950">Quick Report</h2>

          <p className="text-sm text-slate-600 leading-6">
            A fast and simple report for students who want to report an incident
            immediately. Only a brief description is required and you may choose
            to remain anonymous.
          </p>

          <Button className="w-full" onClick={() => setMode("quick")}>
            Choose Quick Report
          </Button>
        </Panel>
      </div>
    );
  }

  if (mode === "full") {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setMode("select")}
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          ← Back to options
        </button>

        <ReportFormWrapper />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => setMode("select")}
        className="text-sm text-slate-600 hover:text-slate-900"
      >
        ← Back to options
      </button>

      <QuickReportFormWrapper />
    </div>
  );
}
function ReportFormWrapper() {
  return <ReportForm />;
}

function QuickReportFormWrapper() {
  return <QuickReportForm />;
}
