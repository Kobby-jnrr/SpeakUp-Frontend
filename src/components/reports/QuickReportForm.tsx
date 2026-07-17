import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/Button";
import { Panel } from "../ui/Cards";
import { inputClass } from "../ui/Form";
import { reportService } from "../../api/reportService";

export function QuickReportForm() {
  const navigate = useNavigate();
  const { addToast } = useApp();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    description: "",
    isAnonymous: false,
  });

  const update = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.description.trim()) {
      setError("Please describe the incident.");
      return false;
    }

    if (form.description.trim().length < 20) {
      setError("Description should be at least 20 characters.");
      return false;
    }

    setError("");
    return true;
  };

  const submit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await reportService.createQuickReport({
        description: form.description,
        isAnonymous: form.isAnonymous,
      });

      addToast({
        title: "Quick report submitted",
        message: `Report ${res.data.id} created successfully.`,
        tone: "success",
      });

      navigate("/student/my-reports");
    } catch (err: any) {
      addToast({
        title: "Submission failed",
        message:
          err.response?.data?.message ||
          err.message ||
          "Could not submit quick report",
        tone: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* HEADER */}
      <Panel className="text-center bg-slate-50 border-slate-200">
        <h1 className="text-2xl font-bold text-slate-950">Quick Report</h1>
        <p className="text-sm text-slate-600 mt-2">
          Submit a brief report. You can provide more details later.
        </p>
      </Panel>

      {/* FORM */}
      <Panel>
        <div className="space-y-4">
          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Describe what happened *
            </label>

            <textarea
              className={`${inputClass} min-h-40 mt-2`}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Briefly describe the incident..."
            />

            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          </div>

          {/* ANONYMOUS OPTION */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={form.isAnonymous}
                onChange={(e) => update("isAnonymous", e.target.checked)}
                className="h-4 w-4"
              />
              Submit anonymously
            </label>

            {form.isAnonymous && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <h3 className="text-sm font-semibold text-amber-800 mb-2">
                  Anonymous Report Notice
                </h3>

                <p className="text-sm text-amber-700 leading-relaxed">
                  Your identity will not be attached to this report. This means
                  the report will{" "}
                  <strong>not appear in your account history</strong> and you
                  will not be identified as the person who submitted it.
                </p>

                <p className="text-sm text-amber-700 leading-relaxed mt-2">
                  Please note that anonymous reports may take longer to process
                  because administrators cannot contact you directly for
                  clarification or additional information.
                </p>

                <p className="text-sm text-amber-700 leading-relaxed mt-2">
                  If you are comfortable sharing your identity, submitting a
                  normal report may allow faster follow-up and resolution.
                </p>
              </div>
            )}
          </div>
        </div>
      </Panel>

      {/* ACTIONS */}
      <div className="flex justify-end">
        <Button loading={loading} onClick={submit}>
          Submit Quick Report
        </Button>
      </div>
    </div>
  );
}
