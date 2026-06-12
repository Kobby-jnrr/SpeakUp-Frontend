export type Role = "student" | "junioradmin" | "superadmin";

export type ReportStatus = "Pending" | "In Review" | "Resolved" | "Closed";

export type Urgency = "Standard" | "Emergency";

export type AbuseType =
  | "Sexual Abuse"
  | "Physical Abuse"
  | "Verbal Abuse"
  | "Emotional Abuse"
  | "Harassment"
  | "Bullying"
  | "Other";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  backendRole?: string;
  studentId?: string;
  department?: string;
  title?: string;
}

export interface TimelineItem {
  label: string;
  date: string;
  actor: string;
}

export interface InternalNote {
  id: string;
  note: string;
  author: string;
  date: string;
}

export interface NotificationItem {
  id: string;
  role: "student" | "admin";
  title: string;
  message: string;
  date: string;
  read: boolean;
  tone: "info" | "success" | "warning" | "error" | "urgent";
  reportId?: string;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  summary: string;
  published: boolean;
  updatedAt: string;
  contact?: string;
}

export interface DashboardStats {
  totalReports: number;
  pendingReports: number;
  inReviewReports: number;
  resolvedReports: number;
  emergencyReports: number;
  anonymousReports: number;
  reportsThisWeek: number;
  reportsThisMonth: number;
}

export interface Report {
  // core identity
  id: string;
  studentName: string;
  studentId: string | null;
  studentEmail?: string;
  complainantGender?: string;
  department?: string;
  contactNumber?: string;
  isAnonymous: boolean;

  type: AbuseType;
  complaintNature?: string[];
  status: ReportStatus;
  urgency: Urgency;

  location: string;
  incidentDate: string;
  incidentTime?: string;

  description: string;

  submittedAt: string;
  lastUpdated: string;

  accusedPerson: string;

  respondentName?: string;
  respondentPosition?: string;
  respondentDepartment?: string;
  relationship?: string;

  witness1Name?: string;
  witness1Contact?: string;
  witness2Name?: string;
  witness2Contact?: string;

  contactPreference: string;
  confidential?: boolean;
  priorReportWhere?: string;
  desiredOutcome?: string;

  evidence: string[];
  evidenceDescription?: string;

  assignedCounselor: string;
  adminResponse: string;

  timeline: TimelineItem[];
  internalNotes: InternalNote[];
}
