import { Activity, AlertTriangle, CalendarDays, CheckCircle2, Clock3, FileText, Library, ShieldAlert, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NotificationCard } from '../components/notifications/NotificationCard';
import { ReportDetails } from '../components/reports/ReportDetails';
import { ReportTable } from '../components/reports/ReportTable';
import { ResourceCard } from '../components/resources/ResourceCard';
import { Button } from '../components/ui/Button';
import { DashboardCard, EmptyState, Panel } from '../components/ui/Cards';
import { Field, FilterDropdown, inputClass, SearchInput } from '../components/ui/Form';
import { ConfirmDialog, Modal } from '../components/ui/Modal';
import { reportStatuses, useApp } from '../context/AppContext';
import { getDashboardStats } from '../mock/dashboardStats';
import type { ReportStatus, Resource } from '../types';
import { formatDate } from '../utils/format';

export function AdminDashboard() {
  const { reports, notifications } = useApp();
  const stats = getDashboardStats(reports);
  const emergency = reports.filter((report) => report.urgency === 'Emergency');
  const recentAlerts = notifications.filter((item) => item.role === 'admin').slice(0, 4);
  const statusRows = [
    { label: 'Pending intake', value: stats.pendingReports, color: 'bg-amber-500' },
    { label: 'In active review', value: stats.inReviewReports, color: 'bg-blue-500' },
    { label: 'Resolved cases', value: stats.resolvedReports, color: 'bg-green-500' },
    { label: 'Emergency priority', value: stats.emergencyReports, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <Panel className="overflow-hidden p-0">
        <div className="grid gap-0 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="p-6">
            <p className="text-sm font-bold uppercase tracking-wide text-institution-700">Case management</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Operational dashboard</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Monitor report intake, prioritize urgent cases, and manage support resources from a flat institutional admin workspace.</p>
            <div className="mt-6 flex flex-wrap gap-3"><Link to="/admin/reports"><Button><FileText className="h-4 w-4" /> Review reports</Button></Link><Link to="/admin/resources"><Button variant="secondary"><Library className="h-4 w-4" /> Manage resources</Button></Link></div>
          </div>
          <div className="border-t border-slate-200 bg-slate-50 p-6 xl:border-l xl:border-t-0">
            <p className="text-sm font-bold text-slate-950">Today at a glance</p>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3"><span className="text-slate-600">Emergency queue</span><span className="font-bold text-red-700">{emergency.length}</span></div>
              <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3"><span className="text-slate-600">Reports this week</span><span className="font-bold text-slate-950">{stats.reportsThisWeek}</span></div>
              <div className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-4 py-3"><span className="text-slate-600">Unread admin alerts</span><span className="font-bold text-slate-950">{notifications.filter((item) => item.role === 'admin' && !item.read).length}</span></div>
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Total reports" value={stats.totalReports} detail="All mock cases" icon={<FileText className="h-5 w-5" />} accent="bg-blue-500" />
        <DashboardCard title="Pending" value={stats.pendingReports} detail="Needs triage" icon={<Clock3 className="h-5 w-5" />} accent="bg-amber-500" />
        <DashboardCard title="In review" value={stats.inReviewReports} detail="Counselor active" icon={<Activity className="h-5 w-5" />} accent="bg-cyan-500" />
        <DashboardCard title="Emergency" value={stats.emergencyReports} detail="Highest priority" icon={<ShieldAlert className="h-5 w-5" />} accent="bg-red-500" />
        <DashboardCard title="Resolved" value={stats.resolvedReports} detail="Closed support loop" icon={<CheckCircle2 className="h-5 w-5" />} accent="bg-green-500" />
        <DashboardCard title="Anonymous" value={stats.anonymousReports} detail="Identity protected" icon={<Users className="h-5 w-5" />} accent="bg-slate-600" />
        <DashboardCard title="This week" value={stats.reportsThisWeek} detail="Recent intake" icon={<CalendarDays className="h-5 w-5" />} accent="bg-violet-500" />
        <DashboardCard title="This month" value={stats.reportsThisMonth} detail="Monthly total" icon={<FileText className="h-5 w-5" />} accent="bg-institution-600" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-lg font-bold text-slate-950">Case status breakdown</h2><p className="mt-1 text-sm text-slate-500">Operational distribution across active report states.</p></div><Link to="/admin/reports"><Button variant="secondary">Open reports</Button></Link></div>
          <div className="mt-6 space-y-5">
            {statusRows.map((row) => {
              const percent = stats.totalReports ? Math.max(8, Math.round((row.value / stats.totalReports) * 100)) : 0;
              return <div key={row.label}><div className="mb-2 flex items-center justify-between text-sm"><span className="font-semibold text-slate-700">{row.label}</span><span className="font-bold text-slate-950">{row.value}</span></div><div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${row.color}`} style={{ width: `${percent}%` }} /></div></div>;
            })}
          </div>
        </Panel>
        <Panel>
          <h2 className="text-lg font-bold text-slate-950">Recent activity</h2>
          <div className="mt-5 space-y-3">
            {recentAlerts.map((alert) => <div key={alert.id} className="rounded-md border border-slate-200 bg-slate-50 p-4"><div className="flex items-start gap-3"><span className={`mt-1 h-2.5 w-2.5 rounded-full ${alert.tone === 'urgent' ? 'bg-red-600' : 'bg-institution-600'}`} /><div><p className="font-bold text-slate-950">{alert.title}</p><p className="mt-1 text-sm leading-6 text-slate-600">{alert.message}</p><p className="mt-2 text-xs font-semibold text-slate-500">{formatDate(alert.date)}</p></div></div></div>)}
          </div>
        </Panel>
      </div>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-lg font-bold text-slate-950">Priority reports</h2><p className="mt-1 text-sm text-slate-500">Emergency reports appear here for rapid triage.</p></div><span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-800">{emergency.length} priority</span></div>
        <div className="mt-5"><ReportTable reports={emergency.length ? emergency : reports.slice(0, 3)} admin /></div>
      </Panel>
    </div>
  );
}

export function AdminReportsPage() {
  const { reports } = useApp();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [type, setType] = useState('All types');
  const [emergency, setEmergency] = useState('All reports');
  const filtered = useMemo(() => reports.filter((report) => [report.id, report.studentName, report.type, report.assignedCounselor].join(' ').toLowerCase().includes(query.toLowerCase())).filter((report) => status === 'All statuses' || report.status === status).filter((report) => type === 'All types' || report.type === type).filter((report) => emergency === 'All reports' || report.urgency === 'Emergency'), [reports, query, status, type, emergency]);
  return <div className="space-y-6"><Panel><div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-bold text-slate-950">Reports management</h1><p className="mt-2 text-sm text-slate-600">Search, filter, assign, and review submitted reports.</p></div><span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-bold text-slate-700">{filtered.length} visible cases</span></div><div className="mt-5 grid gap-3 lg:grid-cols-[1fr_repeat(3,190px)]"><SearchInput value={query} onChange={setQuery} placeholder="Search cases" /><FilterDropdown label="Status" value={status} onChange={setStatus} options={['All statuses', 'Pending', 'In Review', 'Resolved', 'Closed']} /><FilterDropdown label="Type" value={type} onChange={setType} options={['All types', 'Sexual Abuse', 'Physical Abuse', 'Verbal Abuse', 'Emotional Abuse', 'Harassment', 'Bullying', 'Other']} /><FilterDropdown label="Emergency" value={emergency} onChange={setEmergency} options={['All reports', 'Emergency only']} /></div></Panel>{filtered.length ? <ReportTable reports={filtered} admin /> : <EmptyState title="No matching reports" message="Adjust your filters to view more cases." />}</div>;
}

export function AdminReportDetailsPage() {
  const { id } = useParams();
  const { reports, updateReport, addInternalNote, addToast } = useApp();
  const report = reports.find((item) => item.id === id);
  const [note, setNote] = useState('');
  const [response, setResponse] = useState(report?.adminResponse ?? '');
  if (!report) return <EmptyState title="Report not found" message="The report reference does not exist in mock data." action={<Link to="/admin/reports"><Button>Back to reports</Button></Link>} />;
  return <div className="space-y-6"><ReportDetails report={report} admin /><Panel><h2 className="text-lg font-bold text-slate-950">Admin actions</h2><div className="mt-4 grid gap-4 lg:grid-cols-3"><Field label="Status"><select className={inputClass} value={report.status} onChange={(event) => { updateReport(report.id, { status: event.target.value as ReportStatus }, 'Status updated'); addToast({ title: 'Status updated', tone: 'success' }); }}>{reportStatuses.map((item) => <option key={item}>{item}</option>)}</select></Field><Field label="Assigned counselor"><input className={inputClass} value={report.assignedCounselor} onChange={(event) => updateReport(report.id, { assignedCounselor: event.target.value }, 'Counselor assignment updated')} /></Field><div className="flex items-end gap-2"><Button variant="secondary" onClick={() => { window.print(); addToast({ title: 'Print dialog opened', tone: 'info' }); }}>Print</Button><Button variant="secondary" onClick={() => addToast({ title: 'Mock PDF export ready', message: 'No file was generated because this is a frontend-only demo.', tone: 'success' })}>Export</Button></div></div><div className="mt-5 grid gap-4 lg:grid-cols-2"><Field label="Internal note"><textarea className={`${inputClass} min-h-28`} value={note} onChange={(event) => setNote(event.target.value)} /></Field><Field label="Response to student"><textarea className={`${inputClass} min-h-28`} value={response} onChange={(event) => setResponse(event.target.value)} /></Field></div><div className="mt-4 flex flex-wrap gap-3"><Button onClick={() => { if (note.trim()) { addInternalNote(report.id, note); setNote(''); addToast({ title: 'Internal note added', tone: 'success' }); } }}>Add note</Button><Button onClick={() => { updateReport(report.id, { adminResponse: response }, 'Response sent'); addToast({ title: 'Response saved', tone: 'success' }); }}>Send response</Button><Button variant="secondary" onClick={() => { updateReport(report.id, { status: 'Resolved' }, 'Resolved'); addToast({ title: 'Report resolved', tone: 'success' }); }}>Resolve report</Button></div></Panel><Panel><h2 className="text-lg font-bold text-slate-950">Internal notes</h2><div className="mt-4 space-y-3">{report.internalNotes.map((item) => <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm" key={item.id}><p>{item.note}</p><p className="mt-2 font-semibold text-slate-600">{item.author} · {formatDate(item.date)}</p></div>)}</div></Panel></div>;
}

export function AdminResourcesPage() {
  const { resources, addResource, updateResource, deleteResource, addToast } = useApp();
  const blank: Omit<Resource, 'id' | 'updatedAt'> = { title: '', category: 'Counseling support', summary: '', contact: '', published: true };
  const [editing, setEditing] = useState<Resource | null>(null);
  const [deleting, setDeleting] = useState<Resource | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState(blank);
  const openModal = (resource?: Resource) => { setEditing(resource ?? null); setDraft(resource ? { title: resource.title, category: resource.category, summary: resource.summary, contact: resource.contact ?? '', published: resource.published } : blank); setModalOpen(true); };
  const closeModal = () => { setEditing(null); setDraft(blank); setModalOpen(false); };
  const save = () => { if (editing) { updateResource(editing.id, draft); addToast({ title: 'Resource updated', tone: 'success' }); } else { addResource(draft); addToast({ title: 'Resource added', tone: 'success' }); } closeModal(); };
  return <div className="space-y-6"><Panel><div className="flex flex-wrap justify-between gap-3"><div><h1 className="text-2xl font-bold text-slate-950">Resources management</h1><p className="mt-2 text-sm text-slate-600">Add, edit, publish, and remove student support resources.</p></div><Button onClick={() => openModal()}>Add resource</Button></div></Panel><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{resources.map((resource) => <ResourceCard key={resource.id} resource={resource} admin onEdit={() => openModal(resource)} onToggle={() => { updateResource(resource.id, { published: !resource.published }); addToast({ title: resource.published ? 'Resource unpublished' : 'Resource published', tone: 'success' }); }} onDelete={() => setDeleting(resource)} />)}</div><Modal title={editing ? 'Edit resource' : 'Add resource'} open={modalOpen} onClose={closeModal}><div className="space-y-4"><Field label="Title"><input className={inputClass} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></Field><Field label="Category"><input className={inputClass} value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} /></Field><Field label="Summary"><textarea className={`${inputClass} min-h-24`} value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} /></Field><Field label="Contact"><input className={inputClass} value={draft.contact} onChange={(event) => setDraft({ ...draft, contact: event.target.value })} /></Field><label className="flex gap-2 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm"><input type="checkbox" checked={draft.published} onChange={(event) => setDraft({ ...draft, published: event.target.checked })} /> Published</label><Button onClick={save} disabled={!draft.title || !draft.summary}>Save resource</Button></div></Modal><ConfirmDialog open={Boolean(deleting)} title="Delete resource" message="This mock resource will be removed from local state." onCancel={() => setDeleting(null)} onConfirm={() => { if (deleting) { deleteResource(deleting.id); addToast({ title: 'Resource deleted', tone: 'success' }); setDeleting(null); } }} /></div>;
}

export function AdminNotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const items = notifications.filter((item) => item.role === 'admin');
  return <div className="space-y-6"><Panel><div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-bold text-slate-950">Admin notifications</h1><p className="mt-2 text-sm text-slate-600">Operational reminders and report alerts.</p></div><Button variant="secondary" onClick={() => markAllNotificationsRead('admin')}>Mark all read</Button></div></Panel><div className="space-y-3">{items.map((item) => <NotificationCard key={item.id} notification={item} onRead={() => markNotificationRead(item.id)} />)}</div></div>;
}

export function AdminSettingsPage() {
  const { addToast } = useApp();
  return <div className="space-y-6"><Panel><h1 className="text-2xl font-bold text-slate-950">Settings</h1><p className="mt-2 text-sm text-slate-600">Local-only administrative preferences for the demo workspace.</p></Panel><Panel><div className="grid gap-4 md:grid-cols-2"><Field label="Institution name"><input className={inputClass} defaultValue="University Student Welfare Directorate" /></Field><Field label="Department/unit name"><input className={inputClass} defaultValue="Student Affairs and Counseling Unit" /></Field><Field label="Emergency contact"><input className={inputClass} defaultValue="+233 30 000 0123" /></Field><Field label="Default counselor"><input className={inputClass} defaultValue="Dr. Mensah" /></Field><label className="flex gap-2 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm"><input type="checkbox" defaultChecked /> Email notifications</label><label className="flex gap-2 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm"><input type="checkbox" defaultChecked /> Emergency alerts</label></div><Button className="mt-5" onClick={() => addToast({ title: 'Settings saved locally', tone: 'success' })}>Save settings</Button></Panel><Panel><h2 className="text-lg font-bold text-slate-950">Password change</h2><p className="mt-2 text-sm text-slate-600">Password management will be connected after authentication backend integration.</p></Panel></div>;
}
