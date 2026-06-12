import api from "./api";
import type { Report } from "../types";

export interface CreateReportPayload {
  title: string;
  description: string;
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
  confidential: boolean;
}

export const reportService = {
  // STUDENT: CREATE REPORT
  createReport: (data: CreateReportPayload) =>
    api.post<Report>("/Report/create", data),

  // STUDENT: GET MY REPORTS
  getMyReports: () => api.get<Report[]>("/Report/my"),

  // ADMIN: GET ALL REPORTS
  getAllReports: () => api.get<Report[]>("/Report/all"),

  // ADMIN: CLAIM REPORT
  claimReport: (reportId: number) => api.post(`/Report/claim/${reportId}`),

  // ADMIN: UPDATE STATUS
  updateStatus: (reportId: number, status: string) =>
    api.put(`/Report/status/${reportId}`, { status }),

  // SUPER ADMIN: REASSIGN REPORT
  reassignReport: (reportId: number, newAdminId: number) =>
    api.put(`/Report/reassign/${reportId}`, null, {
      params: { newAdminId },
    }),
};
