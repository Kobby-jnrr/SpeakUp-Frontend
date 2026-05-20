export type Role = 'student' | 'admin';

export type ReportStatus = 'Pending' | 'In Review' | 'Resolved' | 'Closed';
export type Urgency = 'Standard' | 'Emergency';
export type AbuseType = 'Sexual Abuse' | 'Physical Abuse' | 'Verbal Abuse' | 'Emotional Abuse' | 'Harassment' | 'Bullying' | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
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

export interface Report {
  id: string;
  studentName: string;
  studentId: string | null;
  studentEmail?: string;
  isAnonymous: boolean;
  type: AbuseType;
  status: ReportStatus;
  urgency: Urgency;
  location: string;
  incidentDate: string;
  submittedAt: string;
  lastUpdated: string;
  description: string;
  accusedPerson: string;
  contactPreference: string;
  evidence: string[];
  assignedCounselor: string;
  adminResponse: string;
  timeline: TimelineItem[];
  internalNotes: InternalNote[];
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  summary: string;
  contact?: string;
  published: boolean;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  role: Role;
  title: string;
  message: string;
  date: string;
  read: boolean;
  tone: 'info' | 'warning' | 'success' | 'urgent';
  reportId?: string;
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
