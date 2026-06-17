export type Role = "Student" | "JuniorAdmin" | "SuperAdmin";

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
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export interface NotificationItem {
  id: string;
  role: Role;
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

export interface Report {
  id: string;
  studentName: string;
  studentId: string | null;
  studentEmail?: string;
  department?: string;
  isAnonymous: boolean;

  type: AbuseType;
  status: ReportStatus;
  urgency: Urgency;

  location: string;
  incidentDate: string;

  description: string;

  submittedAt: string;
  lastUpdated: string;

  accusedPerson: string;

  assignedCounselor: string;
  adminResponse: string;

  evidence: string[];

  timeline: TimelineItem[];
  internalNotes: InternalNote[];
}
