import {
  BookOpen,
  Shield,
  MessageCircle,
  FileText,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";

import type { Resource } from "../../types";

export const RESOURCE_CATEGORIES = [
  "General",
  "Counseling",
  "Safety",
  "ReportingGuide",
  "ChatGuide",
  "AcademicHelp",
] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];

/* ---------------- ICONS ---------------- */
export const RESOURCE_CATEGORY_ICONS: Record<ResourceCategory, any> = {
  General: BookOpen,
  Counseling: Shield,
  Safety: AlertTriangle,
  ReportingGuide: FileText,
  ChatGuide: MessageCircle,
  AcademicHelp: GraduationCap,
};

/* ---------------- LABELS (optional UI) ---------------- */
export const RESOURCE_CATEGORY_LABELS: Record<ResourceCategory, string> = {
  General: "General",
  Counseling: "Counseling",
  Safety: "Safety",
  ReportingGuide: "Reporting Guide",
  ChatGuide: "Chat Guide",
  AcademicHelp: "Academic Help",
};

/* ---------------- CATEGORY COUNTS (SHARED LOGIC) ---------------- */
export type CategoryCountMap = Record<ResourceCategory, number>;

export function buildCategoryCounts(resources: Resource[]): CategoryCountMap {
  const map: CategoryCountMap = {
    General: 0,
    Counseling: 0,
    Safety: 0,
    ReportingGuide: 0,
    ChatGuide: 0,
    AcademicHelp: 0,
  };

  for (const r of resources) {
    map[r.category] = (map[r.category] || 0) + 1;
  }

  return map;
}
