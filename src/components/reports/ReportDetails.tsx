import type { Report } from '../../types';
import { formatDate } from '../../utils/format';
import { StatusBadge, UrgencyBadge } from '../ui/Badges';
import { Panel } from '../ui/Cards';
import { Timeline } from './Timeline';

export function ReportDetails({ report, admin = false }: { report: Report; admin?: boolean }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <Panel>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Case file</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-950">{report.id}</h1>
              <p className="mt-1 text-slate-600">{report.type} · submitted {formatDate(report.submittedAt)}</p>
            </div>
            <div className="flex flex-wrap gap-2"><StatusBadge status={report.status} /><UrgencyBadge urgency={report.urgency} /></div>
          </div>
        </Panel>
        <Panel>
          <h2 className="text-lg font-bold text-slate-950">Incident information</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div><dt className="text-sm font-semibold text-slate-600">Incident date</dt><dd className="mt-1 text-slate-950">{formatDate(report.incidentDate)}</dd></div>
            <div><dt className="text-sm font-semibold text-slate-600">Location</dt><dd className="mt-1 text-slate-950">{report.location}</dd></div>
            <div><dt className="text-sm font-semibold text-slate-600">Accused person information</dt><dd className="mt-1 text-slate-950">{report.accusedPerson}</dd></div>
            <div><dt className="text-sm font-semibold text-slate-600">Contact preference</dt><dd className="mt-1 text-slate-950">{report.contactPreference}</dd></div>
          </dl>
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-slate-600">Description</h3>
            <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-800">{report.description}</p>
          </div>
        </Panel>
        <Panel>
          <h2 className="text-lg font-bold text-slate-950">Evidence files</h2>
          {report.evidence.length ? <ul className="mt-4 grid gap-2">{report.evidence.map((file) => <li key={file} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">{file}</li>)}</ul> : <p className="mt-2 text-sm text-slate-600">No evidence files were attached.</p>}
        </Panel>
        <Panel>
          <h2 className="text-lg font-bold text-slate-950">Counselor response</h2>
          <p className="mt-3 rounded-md bg-institution-50 p-4 text-slate-800">{report.adminResponse}</p>
        </Panel>
      </div>
      <aside className="space-y-6">
        <Panel>
          <h2 className="text-lg font-bold text-slate-950">Privacy note</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{report.isAnonymous ? 'This report was submitted anonymously. Student identity is hidden in admin views.' : 'Only authorized staff should access student-identifying information.'}</p>
        </Panel>
        {admin ? (
          <Panel>
            <h2 className="text-lg font-bold text-slate-950">Student information</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="font-semibold text-slate-600">Name</dt><dd>{report.isAnonymous ? 'Anonymous' : report.studentName}</dd></div>
              <div><dt className="font-semibold text-slate-600">Student ID</dt><dd>{report.studentId ?? 'Hidden'}</dd></div>
              <div><dt className="font-semibold text-slate-600">Assigned counselor</dt><dd>{report.assignedCounselor}</dd></div>
            </dl>
          </Panel>
        ) : null}
        <Panel>
          <h2 className="text-lg font-bold text-slate-950">Activity timeline</h2>
          <div className="mt-4"><Timeline items={report.timeline} /></div>
        </Panel>
      </aside>
    </div>
  );
}
