import type { DashboardStats, Report } from '../types';

export function getDashboardStats(reports: Report[]): DashboardStats {
  return {
    totalReports: reports.length,
    pendingReports: reports.filter((report) => report.status === 'Pending').length,
    inReviewReports: reports.filter((report) => report.status === 'In Review').length,
    resolvedReports: reports.filter((report) => report.status === 'Resolved').length,
    emergencyReports: reports.filter((report) => report.urgency === 'Emergency').length,
    anonymousReports: reports.filter((report) => report.isAnonymous).length,
    reportsThisWeek: reports.filter((report) => report.submittedAt >= '2026-05-07').length,
    reportsThisMonth: reports.filter((report) => report.submittedAt.startsWith('2026-05')).length,
  };
}
