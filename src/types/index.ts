export type Role = "Student" | "JuniorAdmin" | "SuperAdmin";

export type ReportStatus = "Pending" | "InProgress" | "Resolved" | "Closed";

export type Role_UI = "Student" | "JuniorAdmin" | "SuperAdmin";

import type { ResourceCategory } from "../components/resources/resourceConfig";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  gender?: string;
  department?: string;
  phoneNumber?: string;
}

/** Matches the backend Report response (both /my and /all) */
export interface BackendReport {
  id: number;
  reportCode: string;
  title: string;
  description: string;
  type: "Full" | "Quick";
  status: string;
  createdAt: string;
  updatedAt: string | null;

  complainantGender: string;
  complainantStudentId: string;
  department: string;
  contactNumber: string;
  email: string;

  respondentName: string;
  respondentPosition: string;
  respondentDepartment: string;
  relationshipToComplainant: string;

  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;

  complaintNature: string[];

  witness1Name: string;
  witness1Contact: string;
  witness2Name: string;
  witness2Contact: string;

  priorReportWhere: string;
  desiredOutcome: string;
  isAnonymous: boolean;
  confidential: boolean;

  student?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;

  assignedAdmin?: {
    id: number;
    firstName: string;
    lastName: string;
  } | null;
}

/** Matches the ConversationListDto from the backend */
export interface Conversation {
  id: number;
  chatType: string;
  status: string;
  isAnonymous: boolean;
  createdAt: string;

  lastMessage?: string | null;
  lastMessageTime?: string | null;
  unreadCount?: number;

  reportId?: number | null;
  reportCode?: string | null;

  studentName?: string | null;
  assignedAdminId?: number | null;
  assignedAdminName?: string | null;

  student?: {
    id: number;
    firstName: string;
    lastName: string;
  } | null;
}

/** Matches the ChatMessage model returned by /api/ChatMessage/{conversationId} */
export interface ChatMessage {
  id: number;
  chatConversationId: number;
  message: string;
  sentAt: string;
  isRead: boolean;

  sender: {
    id: number;
    name: string;
    role: string;
    isCurrentUser: boolean;
  };
}

/** Matches HomePageContentDto from the backend */
export interface HomePageContentItem {
  id: number;
  type: string; // "Hero" | "Bulletin" | "SafetyTip"
  title: string;
  content: string;
  imageUrl?: string | null;
  isActive?: boolean;
  createdAt: string;
}

export interface HomePageData {
  hero: HomePageContentItem[];
  bulletin: HomePageContentItem[];
  safetyTip: HomePageContentItem | null;
}

// Legacy types kept for backward compat during migration
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
  id: number;
  title: string;
  summary?: string;
  description: string;
  category: ResourceCategory;
  link?: string | null;
  imageUrl?: string | null;
  isPublished: boolean;
  isPinned?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Keep Report as alias for BackendReport for any remaining references
export type Report = BackendReport;
