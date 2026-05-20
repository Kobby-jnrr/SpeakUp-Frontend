import type { ReportStatus, Urgency } from '../../types';

export function StatusBadge({ status }: { status: ReportStatus }) {
  const classes: Record<ReportStatus, string> = {
    Pending: 'bg-amber-50 text-amber-800 border-amber-200',
    'In Review': 'bg-blue-50 text-blue-800 border-blue-200',
    Resolved: 'bg-green-50 text-green-800 border-green-200',
    Closed: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${classes[status]}`}>{status}</span>;
}

export function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const classes = urgency === 'Emergency' ? 'bg-red-50 text-red-800 border-red-200' : 'bg-slate-50 text-slate-700 border-slate-200';
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${classes}`}>{urgency}</span>;
}
