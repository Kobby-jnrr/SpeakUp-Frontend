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
    reportedBefore: "",
    priorReportWhere: "",
    desiredOutcome: "",
    confidential: false,
  });

  const update = (key: keyof typeof form, value: string | boolean | string[]) =>
    setForm((current) => ({ ...current, [key]: value as never }));

  const toggleListValue = (key: "complaintNature", value: string) => {
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

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);

    const complaintNature = form.complaintNature.map((item) =>
      item === "Other" && form.otherComplaintNature.trim()
        ? `Other: ${form.otherComplaintNature.trim()}`
        : item,
    );

    const payload = {
      title: "",
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

      {/* Section A */}
      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section A: Complainant Details
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Full Name" error={errors.fullName} required>
            <input className={inputClass} value={form.fullName} readOnly />
          </Field>
          <Field label="Gender" error={errors.complainantGender} required>
            <input
              className={inputClass}
              value={form.complainantGender}
              readOnly={!!currentUser?.gender}
              onChange={(e) => update("complainantGender", e.target.value)}
            />
          </Field>

          {/* ✅ Student ID REMOVED */}

          <Field label="Department/Unit">
            <input
              className={inputClass}
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
            />
          </Field>
          <Field label="Contact Number">
            <input
              className={inputClass}
              value={form.contactNumber}
              onChange={(e) => update("contactNumber", e.target.value)}
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

      {/* Section B */}
      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section B: Respondent Details
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Full Name" error={errors.respondentName} required>
            <input
              className={inputClass}
              value={form.respondentName}
              onChange={(e) => update("respondentName", e.target.value)}
            />
          </Field>
          <Field label="Position ( Student, Lecturer...)">
            <input
              className={inputClass}
              value={form.respondentPosition}
              onChange={(e) => update("respondentPosition", e.target.value)}
            />
          </Field>
          <Field label="Department/Unit">
            <input
              className={inputClass}
              value={form.respondentDepartment}
              onChange={(e) => update("respondentDepartment", e.target.value)}
            />
          </Field>
          <Field label="Relationship To Complainant">
            <input
              className={inputClass}
              value={form.relationshipToComplainant}
              onChange={(e) =>
                update("relationshipToComplainant", e.target.value)
              }
            />
          </Field>
        </div>
      </Panel>

      {/* Section C */}
      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section C: Incident Details
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Field label="Date" error={errors.incidentDate} required>
            <input
              className={inputClass}
              type="date"
              value={form.incidentDate}
              onChange={(e) => update("incidentDate", e.target.value)}
            />
          </Field>
          <Field label="Time">
            <input
              className={inputClass}
              type="time"
              value={form.incidentTime}
              onChange={(e) => update("incidentTime", e.target.value)}
            />
          </Field>
          <Field label="Location" error={errors.incidentLocation} required>
            <div className="mt-2 flex flex-col gap-2">
              {["Physical", "Online", "Both"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={form.incidentLocation === option}
                    onChange={() =>
                      update(
                        "incidentLocation",
                        form.incidentLocation === option ? "" : option,
                      )
                    }
                  />
                  {option}
                </label>
              ))}
            </div>
          </Field>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold text-slate-800">
            Nature of Complaint *
          </p>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {complaintOptions.map((option) => (
              <label
                key={option}
                className="flex gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm"
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

          {form.complaintNature.includes("Other") && (
            <input
              className={`${inputClass} mt-3`}
              placeholder="Specify other"
              value={form.otherComplaintNature}
              onChange={(e) => update("otherComplaintNature", e.target.value)}
            />
          )}
        </div>

        <div className="mt-5">
          <Field label="Description" error={errors.description} required>
            <textarea
              className={`${inputClass} min-h-44`}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </Field>
        </div>
      </Panel>

      {/* Section D */}
      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section D: Witnesses
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Field label="Witness 1 Name">
            <input
              className={inputClass}
              value={form.witness1Name}
              onChange={(e) => update("witness1Name", e.target.value)}
            />
          </Field>
          <Field label="Witness 1 Contact">
            <input
              className={inputClass}
              value={form.witness1Contact}
              onChange={(e) => update("witness1Contact", e.target.value)}
            />
          </Field>
          <Field label="Witness 2 Name">
            <input
              className={inputClass}
              value={form.witness2Name}
              onChange={(e) => update("witness2Name", e.target.value)}
            />
          </Field>
          <Field label="Witness 2 Contact">
            <input
              className={inputClass}
              value={form.witness2Contact}
              onChange={(e) => update("witness2Contact", e.target.value)}
            />
          </Field>
        </div>
      </Panel>

      {/* Section F */}
      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section F: Prior Action
        </h2>
        <div className="mt-4 flex gap-4">
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

        {form.reportedBefore === "Yes" && (
          <div className="mt-4">
            <Field label="If yes, where?">
              <input
                className={inputClass}
                value={form.priorReportWhere}
                onChange={(e) => update("priorReportWhere", e.target.value)}
              />
            </Field>
          </div>
        )}
      </Panel>

      {/* Section G */}
      <Panel>
        <h2 className="text-lg font-bold text-slate-950">
          Section G: Desired Outcome
        </h2>
        <Field label="What outcome are you seeking?">
          <textarea
            className={`${inputClass} min-h-28`}
            value={form.desiredOutcome}
            onChange={(e) => update("desiredOutcome", e.target.value)}
          />
        </Field>
      </Panel>

      {/* Section H */}
      <Panel>
        <label className="flex gap-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-semibold">
          <input
            type="checkbox"
            checked={form.confidential}
            onChange={(e) => update("confidential", e.target.checked)}
          />
          I request confidentiality that my identity be kept confidential
          (subject to investigation requirements and university policies).{" "}
          <br></br>I understand that this may limit the university's ability to
          investigate or take action on my complaint, but I prioritize my
          privacy and safety.
        </label>
      </Panel>

      <div className="flex justify-end">
        <Button loading={loading} onClick={submit}>
          Submit Complaint
        </Button>
      </div>
    </div>
  );
}
