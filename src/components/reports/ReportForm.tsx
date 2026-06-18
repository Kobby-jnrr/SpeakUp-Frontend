import { Upload } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Button } from "../ui/Button";
import { Panel } from "../ui/Cards";
import { Field, inputClass } from "../ui/Form";
import { reportService } from "../../api/reportService";

const complaintOptions = [
  "Unwelcome sexual comments",
  "Sexual advances",
  "Inappropriate touching",
  "Sexual harassment online (messages, images, etc.)",
  "Coercion/pressure for sexual favours",
  "Other",
];

const evidenceOptions = [
  "Screenshots",
  "Emails",
  "Audio/Video",
  "Medical report",
  "Other",
];

const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];

export function ReportForm() {
  const { currentUser, addToast } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    fullName:
      [currentUser?.firstName, currentUser?.lastName]
        .filter(Boolean)
        .join(" ") ?? "",
    complainantGender: currentUser?.gender ?? "",
    complainantStudentId: currentUser?.id ?? "",
    department: currentUser?.department ?? "",
    contactNumber: currentUser?.phoneNumber ?? "",
    email: currentUser?.email ?? "",
    respondentName: "",
    respondentPosition: "",
    respondentDepartment: "",
    relationshipToComplainant: "",
    incidentDate: "",
    incidentTime: "",
    incidentLocation: "",
    complaintNature: [] as string[],
    otherComplaintNature: "",
    description: "",
    witness1Name: "",
    witness1Contact: "",
    witness2Name: "",
    witness2Contact: "",
    evidenceTypes: [] as string[],
    otherEvidence: "",
    reportedBefore: "",
    priorReportWhere: "",
    desiredOutcome: "",
    confidential: false,
  });

  const update = (key: keyof typeof form, value: string | boolean | string[]) =>
    setForm((current) => ({ ...current, [key]: value as never }));

  const toggleListValue = (
    key: "complaintNature" | "evidenceTypes",
    value: string,
  ) => {
    setForm((current) => {
      const list = current[key];
      return {
        ...current,
        [key]: list.includes(value)
          ? list.filter((item) => item !== value)
          : [...list, value],
      };
    });
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Enter your full name.";
    if (!form.complainantGender.trim())
      nextErrors.complainantGender = "Enter your gender.";
    if (!form.email.trim()) nextErrors.email = "Enter your email address.";
    if (!form.respondentName.trim())
      nextErrors.respondentName = "Enter the respondent's full name.";
    if (!form.incidentDate)
      nextErrors.incidentDate = "Enter the incident date.";
    if (form.incidentDate && new Date(form.incidentDate) > new Date()) {
      nextErrors.incidentDate = "Incident date cannot be in the future.";
    }
    if (!form.incidentLocation.trim())
      nextErrors.incidentLocation = "Enter the incident location.";
    if (form.complaintNature.length === 0)
      nextErrors.complaintNature = "Select at least one complaint nature.";
    if (form.description.trim().length < 40) {
      nextErrors.description =
        "Provide at least 40 characters describing the incident.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;

    const accepted: File[] = [];
    Array.from(selected).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        addToast({
          title: "File type not accepted",
          message: `${file.name} must be PNG, JPG, or PDF.`,
          tone: "warning",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        addToast({
          title: "File too large",
          message: `${file.name} is over 5MB.`,
          tone: "warning",
        });
        return;
      }

      accepted.push(file);
    });

    setFiles((current) => [...current, ...accepted]);
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);

    const complaintNature = form.complaintNature.map((item) =>
      item === "Other" && form.otherComplaintNature.trim()
        ? `Other: ${form.otherComplaintNature.trim()}`
        : item,
    );

    const payload = {
      title: `Sexual Harassment Complaint - ${form.fullName}`,
      description: form.description,
      complainantGender: form.complainantGender,
      complainantStudentId: form.complainantStudentId,
      department: form.department,
      contactNumber: form.contactNumber,
      email: form.email,
      respondentName: form.respondentName,
      respondentPosition: form.respondentPosition,
      respondentDepartment: form.respondentDepartment,
      relationshipToComplainant: form.relationshipToComplainant,
      incidentDate: form.incidentDate,
      incidentTime: form.incidentTime || "Not specified",
      incidentLocation: form.incidentLocation,
      complaintNature,
      witness1Name: form.witness1Name,
      witness1Contact: form.witness1Contact,
      witness2Name: form.witness2Name,
      witness2Contact: form.witness2Contact,
      priorReportWhere:
        form.reportedBefore === "Yes" ? form.priorReportWhere : "No",
      desiredOutcome: form.desiredOutcome,
      confidential: form.confidential,
    };

    try {
      const response = await reportService.createReport(payload);
      addToast({
        title: "Report submitted",
        message: `Report ${response.data.id} created successfully.`,
        tone: "success",
      });
      navigate("/student/my-reports");
    } catch (err: any) {
      addToast({
        title: "Submission failed",
        message:
          err.response?.data?.message ||
          err.message ||
          "Could not submit report",
        tone: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Panel className="border-institution-100 bg-institution-50 text-center">
        <p className="text-sm font-bold uppercase text-institution-700">
          University of Cape Coast
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950">
          Sexual Harassment Complaint Form
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          College of Humanities and Legal Studies, Faculty of Social Sciences,
          Centre for Gender Research, Advocacy and Documentation (CEGRAD)
        </p>
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section A: Complainant Details
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Full Name" error={errors.fullName} required>
            <input
              className={inputClass}
              value={form.fullName}
              readOnly
            />
          </Field>
          <Field label="Gender" error={errors.complainantGender} required>
            <input
              className={inputClass}
              value={form.complainantGender}
              readOnly={!!currentUser?.gender}
              onChange={(event) =>
                update("complainantGender", event.target.value)
              }
            />
          </Field>
          <Field label="Student/Staff ID">
            <input
              className={inputClass}
              value={form.complainantStudentId}
              readOnly
            />
          </Field>
          <Field label="Department/Unit">
            <input
              className={inputClass}
              value={form.department}
              readOnly={!!currentUser?.department}
              onChange={(event) => update("department", event.target.value)}
            />
          </Field>
          <Field label="Contact Number">
            <input
              className={inputClass}
              value={form.contactNumber}
              readOnly={!!currentUser?.phoneNumber}
              onChange={(event) => update("contactNumber", event.target.value)}
            />
          </Field>
          <Field label="Email Address" error={errors.email} required>
            <input
              className={inputClass}
              type="email"
              value={form.email}
              readOnly
            />
          </Field>
        </div>
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section B: Respondent Details
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Full Name" error={errors.respondentName} required>
            <input
              className={inputClass}
              value={form.respondentName}
              onChange={(event) => update("respondentName", event.target.value)}
            />
          </Field>
          <Field label="Position (Student/Staff/Other)">
            <input
              className={inputClass}
              value={form.respondentPosition}
              onChange={(event) =>
                update("respondentPosition", event.target.value)
              }
            />
          </Field>
          <Field label="Department/Unit">
            <input
              className={inputClass}
              value={form.respondentDepartment}
              onChange={(event) =>
                update("respondentDepartment", event.target.value)
              }
            />
          </Field>
          <Field label="Relationship to Complainant">
            <input
              className={inputClass}
              value={form.relationshipToComplainant}
              onChange={(event) =>
                update("relationshipToComplainant", event.target.value)
              }
            />
          </Field>
        </div>
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section C: Incident Details
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Field
            label="Date(s) of Incident"
            error={errors.incidentDate}
            required
          >
            <input
              className={inputClass}
              type="date"
              value={form.incidentDate}
              onChange={(event) => update("incidentDate", event.target.value)}
            />
          </Field>
          <Field label="Time">
            <input
              className={inputClass}
              type="time"
              value={form.incidentTime}
              onChange={(event) => update("incidentTime", event.target.value)}
            />
          </Field>
          <Field
            label="Location (Physical/Online)"
            error={errors.incidentLocation}
            required
          >
            <input
              className={inputClass}
              value={form.incidentLocation}
              onChange={(event) =>
                update("incidentLocation", event.target.value)
              }
            />
          </Field>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold text-slate-800">
            Nature of Complaint <span className="text-red-700">*</span>
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {complaintOptions.map((option) => (
              <label
                key={option}
                className="flex gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={form.complaintNature.includes(option)}
                  onChange={() => toggleListValue("complaintNature", option)}
                />
                {option}
              </label>
            ))}
          </div>
          {errors.complaintNature ? (
            <p className="mt-2 text-sm text-red-700">
              {errors.complaintNature}
            </p>
          ) : null}
          {form.complaintNature.includes("Other") ? (
            <input
              className={`${inputClass} mt-3`}
              placeholder="Specify other complaint nature"
              value={form.otherComplaintNature}
              onChange={(event) =>
                update("otherComplaintNature", event.target.value)
              }
            />
          ) : null}
        </div>

        <div className="mt-5">
          <Field
            label="Description of Incident"
            error={errors.description}
            required
          >
            <textarea
              className={`${inputClass} min-h-44`}
              value={form.description}
              onChange={(event) => update("description", event.target.value)}
            />
          </Field>
        </div>
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section D: Witnesses
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Witness 1 Name">
            <input
              className={inputClass}
              value={form.witness1Name}
              onChange={(event) => update("witness1Name", event.target.value)}
            />
          </Field>
          <Field label="Witness 1 Contact">
            <input
              className={inputClass}
              value={form.witness1Contact}
              onChange={(event) =>
                update("witness1Contact", event.target.value)
              }
            />
          </Field>
          <Field label="Witness 2 Name">
            <input
              className={inputClass}
              value={form.witness2Name}
              onChange={(event) => update("witness2Name", event.target.value)}
            />
          </Field>
          <Field label="Witness 2 Contact">
            <input
              className={inputClass}
              value={form.witness2Contact}
              onChange={(event) =>
                update("witness2Contact", event.target.value)
              }
            />
          </Field>
        </div>
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section E: Evidence
        </h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {evidenceOptions.map((option) => (
            <label
              key={option}
              className="flex gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700"
            >
              <input
                type="checkbox"
                checked={form.evidenceTypes.includes(option)}
                onChange={() => toggleListValue("evidenceTypes", option)}
              />
              {option}
            </label>
          ))}
        </div>
        {form.evidenceTypes.includes("Other") ? (
          <input
            className={`${inputClass} mt-3`}
            placeholder="Specify other evidence"
            value={form.otherEvidence}
            onChange={(event) => update("otherEvidence", event.target.value)}
          />
        ) : null}
        <div className="mt-5 rounded-md border-2 border-dashed border-slate-300 p-6 text-center">
          <Upload className="mx-auto mb-2 text-slate-400" size={32} />
          <input
            className="cursor-pointer text-sm"
            type="file"
            multiple
            onChange={(event) => handleFiles(event.target.files)}
          />
          <p className="mt-2 text-xs text-slate-500">
            PNG, JPG, PDF. Max 5MB each.
          </p>
        </div>
        {files.length > 0 ? (
          <div className="mt-4 space-y-2">
            {files.map((file) => (
              <div
                className="rounded-md bg-slate-50 p-2 text-sm text-slate-700"
                key={`${file.name}-${file.lastModified}`}
              >
                {file.name}
              </div>
            ))}
          </div>
        ) : null}
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section F: Prior Action
        </h2>
        <div className="mt-4 flex flex-wrap gap-4">
          {["Yes", "No"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold"
            >
              <input
                type="radio"
                name="reportedBefore"
                checked={form.reportedBefore === option}
                onChange={() => update("reportedBefore", option)}
              />
              {option}
            </label>
          ))}
        </div>
        {form.reportedBefore === "Yes" ? (
          <div className="mt-4">
            <Field label="If yes, where?">
              <input
                className={inputClass}
                value={form.priorReportWhere}
                onChange={(event) =>
                  update("priorReportWhere", event.target.value)
                }
              />
            </Field>
          </div>
        ) : null}
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section G: Desired Action/Outcome
        </h2>
        <div className="mt-4">
          <Field label="What outcome are you seeking?">
            <textarea
              className={`${inputClass} min-h-28`}
              value={form.desiredOutcome}
              onChange={(event) => update("desiredOutcome", event.target.value)}
            />
          </Field>
        </div>
      </Panel>

      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section H: Confidentiality
        </h2>
        <label className="mt-4 flex gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={form.confidential}
            onChange={(event) => update("confidential", event.target.checked)}
          />
          I request that my identity be kept confidential, subject to
          investigation requirements.
        </label>
      </Panel>

      <div className="flex justify-end">
        <Button disabled={loading} onClick={submit}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </Button>
      </div>
    </div>
  );
}
