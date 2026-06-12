import type { AbuseType, Report, ReportStatus, Urgency } from "../types";

type ApiUser = {
  id?: number | string;
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type ApiReport = {
  id?: number | string;
  title?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string | null;
  student?: ApiUser | null;
  assignedAdmin?: ApiUser | null;
  complainantStudentId?: string | null;
  complainantGender?: string | null;
  department?: string | null;
  contactNumber?: string | null;
  email?: string | null;
  incidentDate?: string;
  incidentTime?: string | null;
  incidentLocation?: string | null;
  complaintNature?: string[] | string | null;
  confidential?: boolean;
  respondentName?: string | null;
  respondentPosition?: string | null;
  respondentDepartment?: string | null;
  relationshipToComplainant?: string | null;
  witness1Name?: string | null;
  witness1Contact?: string | null;
  witness2Name?: string | null;
  witness2Contact?: string | null;
  priorReportWhere?: string | null;
  desiredOutcome?: string | null;
};

const abuseTypes: AbuseType[] = [
  "Sexual Abuse",
  "Physical Abuse",
  "Verbal Abuse",
  "Emotional Abuse",
  "Harassment",
  "Bullying",
  "Other",
];

export function normalizeReportStatus(status?: string): ReportStatus {
  const compact = (status ?? "Pending").replace(/\s/g, "").toLowerCase();
  if (compact === "inprogress" || compact === "inreview") return "In Review";
  if (compact === "resolved") return "Resolved";
  if (compact === "closed") return "Closed";
  return "Pending";
}

function normalizeComplaintNature(value: ApiReport["complaintNature"]): AbuseType {
  const first = Array.isArray(value)
    ? value[0]
    : typeof value === "string"
      ? value.split(",")[0]
      : undefined;

  const match = abuseTypes.find(
    (item) => item.toLowerCase() === (first ?? "").trim().toLowerCase(),
  );

  return match ?? "Other";
}

function fullName(user?: ApiUser | null) {
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  return name || "Unassigned";
}

export function mapApiReport(report: ApiReport): Report {
  const createdAt = report.createdAt ?? new Date().toISOString();
  const updatedAt = report.updatedAt ?? createdAt;
  const isConfidential = Boolean(report.confidential);
  const status = normalizeReportStatus(report.status);
  const type = normalizeComplaintNature(report.complaintNature);
  const assignedCounselor = fullName(report.assignedAdmin);

  return {
    id: String(report.id ?? ""),
    studentName: isConfidential ? "Anonymous" : fullName(report.student),
    studentId: report.complainantStudentId ?? null,
    studentEmail: report.email ?? report.student?.email,
    complainantGender: report.complainantGender ?? undefined,
    department: report.department ?? undefined,
    contactNumber: report.contactNumber ?? undefined,
    isAnonymous: isConfidential,
    type,
    complaintNature: Array.isArray(report.complaintNature)
      ? report.complaintNature
      : typeof report.complaintNature === "string"
        ? report.complaintNature
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
    status,
    urgency: "Standard" as Urgency,
    location: report.incidentLocation ?? "Not specified",
    incidentDate: report.incidentDate ?? createdAt,
    incidentTime: report.incidentTime ?? undefined,
    description: report.description ?? "",
    submittedAt: createdAt,
    lastUpdated: updatedAt,
    accusedPerson: report.respondentName ?? "Not specified",
    respondentName: report.respondentName ?? undefined,
    respondentPosition: report.respondentPosition ?? undefined,
    respondentDepartment: report.respondentDepartment ?? undefined,
    relationship: report.relationshipToComplainant ?? undefined,
    witness1Name: report.witness1Name ?? undefined,
    witness1Contact: report.witness1Contact ?? undefined,
    witness2Name: report.witness2Name ?? undefined,
    witness2Contact: report.witness2Contact ?? undefined,
    priorReportWhere: report.priorReportWhere ?? undefined,
    desiredOutcome: report.desiredOutcome ?? undefined,
    contactPreference: report.email ? "email" : "not specified",
    confidential: isConfidential,
    evidence: [],
    assignedCounselor,
    adminResponse:
      status === "Pending"
        ? "Your report has been received and is pending review."
        : "Your report is being handled by authorized staff.",
    timeline: [
      { label: "Report submitted", date: createdAt, actor: "Student" },
      ...(updatedAt !== createdAt
        ? [{ label: "Report updated", date: updatedAt, actor: "System" }]
        : []),
    ],
    internalNotes: [],
  };
}
