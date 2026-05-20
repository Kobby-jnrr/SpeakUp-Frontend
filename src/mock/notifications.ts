import type { NotificationItem } from '../types';

export const mockNotifications: NotificationItem[] = [
  { id: 'not-001', role: 'student', title: 'Report received', message: 'REP-2026-002 has been received by the counseling unit.', date: '2026-05-09', read: false, tone: 'info', reportId: 'REP-2026-002' },
  { id: 'not-002', role: 'student', title: 'Status changed', message: 'REP-2026-001 is now under review.', date: '2026-05-12', read: false, tone: 'success', reportId: 'REP-2026-001' },
  { id: 'not-003', role: 'student', title: 'Resource update', message: 'Campus safety contact information was updated.', date: '2026-05-08', read: true, tone: 'info' },
  { id: 'not-004', role: 'admin', title: 'Emergency report received', message: 'REP-2026-001 requires priority review.', date: '2026-05-11', read: false, tone: 'urgent', reportId: 'REP-2026-001' },
  { id: 'not-005', role: 'admin', title: 'New report submitted', message: 'REP-2026-002 is waiting for counselor assignment.', date: '2026-05-09', read: false, tone: 'warning', reportId: 'REP-2026-002' },
  { id: 'not-006', role: 'admin', title: 'Status update reminder', message: 'Pending reports should be reviewed within the standard response window.', date: '2026-05-13', read: true, tone: 'info' },
];
