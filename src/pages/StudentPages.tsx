import { Activity, AlertTriangle, ArrowLeft, ArrowRight, BookOpen, Calendar, CheckCircle2, ChevronDown, ChevronRight, Clock3, ClipboardList, ExternalLink, FilePlus, Files, Hand, HeartHandshake, LifeBuoy, Lightbulb, Mail, MapPin, Megaphone, MessageCircle, Phone, PhoneCall, Shield, ShieldAlert, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NotificationCard } from '../components/notifications/NotificationCard';
import { ReportDetails } from '../components/reports/ReportDetails';
import { ReportForm } from '../components/reports/ReportForm';
import { ReportTable } from '../components/reports/ReportTable';
import { ResourceCard } from '../components/resources/ResourceCard';
import { StatusBadge, UrgencyBadge } from '../components/ui/Badges';
import { Button } from '../components/ui/Button';
import { DashboardCard, EmptyState, Panel } from '../components/ui/Cards';
import { Field, FilterDropdown, inputClass, SearchInput } from '../components/ui/Form';
import { useApp } from '../context/AppContext';
import { getDashboardStats } from '../mock/dashboardStats';
import { formatDate } from '../utils/format';

const newsSlides = [
  { id: 1, category: 'Safety', title: 'New Campus Safety Walk Program', description: 'Volunteer-led evening escorts now available across all residence halls.', date: '2026-05-12', bg: 'bg-blue-700' },
  { id: 2, category: 'Policy', title: 'Updated Reporting Guidelines', description: 'Clearer steps and faster response times for all report types.', date: '2026-05-10', bg: 'bg-institution-700' },
  { id: 3, category: 'Event', title: 'Wellness Week Starts Monday', description: 'Free counseling sessions, yoga, and peer support drop-ins.', date: '2026-05-08', bg: 'bg-emerald-600' },
];

const bulletins = [
  { id: 1, type: 'Notice', text: 'Library hours extended until midnight during exam period.', date: '2026-05-13', icon: Megaphone, tone: 'bg-blue-50 text-blue-700' },
  { id: 2, type: 'Workshop', text: 'Consent and Communication workshop — JCR Hall, 2PM.', date: '2026-05-14', icon: Users, tone: 'bg-violet-50 text-violet-700' },
  { id: 3, type: 'Policy', text: 'Revised student code of conduct now live on the portal.', date: '2026-05-11', icon: Shield, tone: 'bg-amber-50 text-amber-700' },
  { id: 4, type: 'Meeting', text: 'Student Representative Council meeting — SRC Office, 4PM.', date: '2026-05-15', icon: Calendar, tone: 'bg-emerald-50 text-emerald-700' },
];

const events = [
  { id: 1, day: '18', month: 'May', title: 'Self-Defense Basics', location: 'Sports Complex, 3PM' },
  { id: 2, day: '21', month: 'May', title: 'Mental Health Check-In', location: 'Counseling Center, 10AM' },
  { id: 3, day: '24', month: 'May', title: 'Campus Safety Town Hall', location: 'Main Auditorium, 5PM' },
];

const supportCards = [
  { title: 'How Reporting Works', icon: ClipboardList, to: '/student/resources', tone: 'bg-blue-50 text-blue-700 border-blue-100' },
  { title: 'Know Your Rights', icon: Shield, to: '/student/resources', tone: 'bg-amber-50 text-amber-700 border-amber-100' },
  { title: 'Counseling Services', icon: MessageCircle, to: '/student/resources', tone: 'bg-violet-50 text-violet-700 border-violet-100' },
  { title: 'Safety Guide', icon: Lightbulb, to: '/student/resources', tone: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
];

const tips = [
  { id: 1, title: 'Trust your instincts.', text: 'If something feels wrong, remove yourself from the situation and seek help.', icon: Shield },
  { id: 2, title: 'Stay in public areas.', text: 'When walking at night, stick to well-lit, populated paths and avoid shortcuts.', icon: Shield },
  { id: 3, title: 'Keep emergency numbers handy.', text: 'Save campus security and counseling contacts in your phone for quick access.', icon: Shield },
];

export function StudentHomePage() {
  const [slide, setSlide] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  const quickActions = [
    { title: 'Submit Report', to: '/student/report', icon: FilePlus, tone: 'bg-blue-50 text-blue-700 border-blue-100' },
    { title: 'Emergency Help', to: '/student/emergency', icon: AlertTriangle, tone: 'bg-red-50 text-red-700 border-red-100' },
    { title: 'Talk to Counselor', to: '/student/resources', icon: MessageCircle, tone: 'bg-violet-50 text-violet-700 border-violet-100' },
    { title: 'Track My Reports', to: '/student/my-reports', icon: Files, tone: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { title: 'Safety Resources', to: '/student/resources', icon: Shield, tone: 'bg-amber-50 text-amber-700 border-amber-100' },
  ];

  const nextSlide = () => setSlide((s) => (s + 1) % newsSlides.length);
  const prevSlide = () => setSlide((s) => (s - 1 + newsSlides.length) % newsSlides.length);

  return (
    <div className="space-y-6">
      {/* 1. Latest News Carousel */}
      <div className="relative overflow-hidden rounded-md">
        <div className="relative h-[320px] sm:h-[340px]">
          <img src="/images/carousel.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/30" />
          <div className="relative flex h-full flex-col justify-end px-5 pb-20 sm:justify-center sm:px-10 sm:pb-10">
            <div className="max-w-xl">
              <span className="inline-block rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{newsSlides[slide].category}</span>
              <h2 className="mt-3 text-xl font-bold leading-tight tracking-tight text-white sm:mt-4 sm:text-3xl">{newsSlides[slide].title}</h2>
              <p className="mt-2 hidden max-w-md text-sm leading-6 text-white/85 sm:mt-3 sm:block">{newsSlides[slide].description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 sm:mt-5 sm:gap-4">
                <span className="flex items-center gap-1.5 text-xs text-white/70"><Calendar className="h-3.5 w-3.5" />{newsSlides[slide].date}</span>
                <button className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 sm:px-4 sm:py-2 sm:text-sm"><span>Read More</span><ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 sm:bottom-4">
          {newsSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className={`h-2 rounded-full transition ${i === slide ? 'w-5 bg-white sm:w-6' : 'w-2 bg-white/50'}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
        <div className="absolute bottom-3 right-4 flex flex-row gap-2 sm:bottom-6 sm:right-6 sm:gap-3">
          <button onClick={prevSlide} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white transition hover:bg-white/25 sm:h-10 sm:w-10" aria-label="Previous slide"><ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></button>
          <button onClick={nextSlide} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white transition hover:bg-white/25 sm:h-10 sm:w-10" aria-label="Next slide"><ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></button>
        </div>
      </div>

      {/* 2. Quick Actions */}
      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {quickActions.map((action) => (
          <Link key={action.title} to={action.to} className={`flex flex-col items-center gap-2 rounded-md border p-5 text-center transition hover:border-slate-300 ${action.tone}`}>
            <action.icon className="h-6 w-6" aria-hidden="true" />
            <span className="text-sm font-semibold">{action.title}</span>
          </Link>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          {/* 3. Bulletin Board & Events */}
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel>
              <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-slate-950">Bulletin Board</h2><Link className="text-sm font-semibold text-blue-700" to="/student/resources">View all</Link></div>
              <ul className="mt-4 divide-y divide-slate-100">
                {bulletins.slice(0, 3).map((item) => (
                  <li key={item.id} className="flex items-center gap-4 py-3">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md ${item.tone}`}><item.icon className="h-5 w-5" /></span>
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-800">{item.text}</p><p className="mt-0.5 text-xs text-slate-500">{item.type} · {item.date}</p></div>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel>
              <div className="flex items-center justify-between"><h2 className="text-lg font-bold text-slate-950">Upcoming Events</h2><Link className="text-sm font-semibold text-blue-700" to="/student/resources">View all</Link></div>
              <ul className="mt-4 divide-y divide-slate-100">
                {events.map((event) => (
                  <li key={event.id} className="flex items-center gap-4 py-3">
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-md bg-blue-50">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600">{event.month}</span>
                      <span className="text-lg font-bold leading-none text-slate-950">{event.day}</span>
                    </div>
                    <div className="flex-1 min-w-0"><p className="text-sm font-bold text-slate-950">{event.title}</p><p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500"><MapPin className="h-3 w-3" />{event.location}</p></div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </Panel>
          </div>

          {/* 5. Support Resources */}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {supportCards.map((card) => (
              <Link key={card.title} to={card.to} className={`flex flex-col gap-3 rounded-md border p-4 transition hover:border-slate-300 ${card.tone}`}>
                <card.icon className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-bold">{card.title}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          {/* 7. Safety Tip of the Day */}
          <Panel>
            <h2 className="text-base font-bold text-slate-950">Safety Tip of the Day</h2>
            <div className="mt-5 flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Shield className="h-7 w-7" aria-hidden="true" />
              </div>
              <p className="mt-4 text-base font-bold text-slate-950">{tips[tipIndex].title}</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">{tips[tipIndex].text}</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => setTipIndex((i) => (i - 1 + tips.length) % tips.length)} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50" aria-label="Previous tip"><ArrowLeft className="h-4 w-4" /></button>
              <div className="flex gap-2">
                {tips.map((_, i) => (
                  <button key={i} onClick={() => setTipIndex(i)} className={`h-2 rounded-full transition ${i === tipIndex ? 'w-5 bg-blue-500' : 'w-2 bg-slate-300'}`} aria-label={`Go to tip ${i + 1}`} />
                ))}
              </div>
              <button onClick={() => setTipIndex((i) => (i + 1) % tips.length)} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50" aria-label="Next tip"><ArrowRight className="h-4 w-4" /></button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export function StudentDashboard() {
  const { currentUser, reports, notifications, resources } = useApp();
  const stats = getDashboardStats(reports);
  const unread = notifications.filter((item) => item.role === 'student' && !item.read).length;
  const publishedResources = resources.filter((item) => item.published);
  const recentReports = reports.slice(0, 5);
  const quickActions = [
    { title: 'Submit a New Report', detail: 'Report an incident', to: '/student/report', icon: FilePlus, tone: 'bg-blue-50 text-blue-700 border-blue-100' },
    { title: 'View My Reports', detail: 'Track your reports', to: '/student/my-reports', icon: Files, tone: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { title: 'Emergency Help', detail: 'Get immediate support', to: '/student/emergency', icon: AlertTriangle, tone: 'bg-red-50 text-red-700 border-red-100' },
    { title: 'Browse Resources', detail: 'Helpful information', to: '/student/resources', icon: BookOpen, tone: 'bg-violet-50 text-violet-700 border-violet-100' },
  ];
  const contacts = [
    { title: 'Campus Security', detail: '+233 30 123 4567', note: '24/7 Available', icon: Shield, tone: 'bg-red-50 text-red-700' },
    { title: 'Counseling Center', detail: '+233 30 987 6543', note: 'Mon - Fri, 8AM - 6PM', icon: HeartHandshake, tone: 'bg-blue-50 text-blue-700' },
    { title: 'National Helpline', detail: '0800 111 222', note: '24/7 Available', icon: PhoneCall, tone: 'bg-emerald-50 text-emerald-700' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-[1fr_250px]">
        <div className="rounded-md border border-slate-200 bg-white p-6">
          <div className="grid items-center gap-5 lg:grid-cols-[1fr_240px]">
            <div>
              <h1 className="flex flex-wrap items-center gap-3 text-3xl font-bold tracking-tight text-slate-950">Welcome back, {currentUser?.name?.split(' ')[0]} <Hand className="h-7 w-7 text-amber-500" aria-hidden="true" /></h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">We're here to support you. Your safety and well-being are our priority.</p>
              <div className="mt-6 flex flex-wrap gap-3"><Link to="/student/report"><Button><FilePlus className="h-4 w-4" /> Report Incident</Button></Link><Link to="/student/resources"><Button variant="secondary"><BookOpen className="h-4 w-4" /> Browse Resources</Button></Link></div>
            </div>
            <div className="hidden lg:block">
              <img src="/images/support.png" alt="Student support is active" className="mx-auto h-40 w-auto" />
              <p className="mt-2 text-center text-sm font-semibold text-slate-700">Student support is active</p>
            </div>
          </div>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-950">Your privacy matters</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">All reports are confidential and handled with the utmost care.</p>
            </div>
            <div className="rounded-md bg-emerald-50 p-3 text-emerald-700"><ShieldAlert className="h-5 w-5" /></div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <DashboardCard title="Total Reports" value={stats.totalReports} detail="All time" icon={<Files className="h-5 w-5" />} accent="bg-blue-500" />
        <DashboardCard title="Pending" value={stats.pendingReports} detail="Awaiting review" icon={<Clock3 className="h-5 w-5" />} accent="bg-amber-500" />
        <DashboardCard title="In Review" value={stats.inReviewReports} detail="Currently being reviewed" icon={<Activity className="h-5 w-5" />} accent="bg-violet-500" />
        <DashboardCard title="Resolved" value={stats.resolvedReports} detail="Successfully resolved" icon={<CheckCircle2 className="h-5 w-5" />} accent="bg-emerald-500" />
        <DashboardCard title="Emergency" value={stats.emergencyReports} detail="High priority cases" icon={<ShieldAlert className="h-5 w-5" />} accent="bg-red-500" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_320px_320px]">
        <Panel className="p-0">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-bold text-slate-950">Recent Reports</h2>
            <Link className="text-sm font-semibold text-blue-700" to="/student/my-reports">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                <tr><th className="px-5 py-3">Report ID</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Submitted</th><th className="px-5 py-3">Last Updated</th><th className="px-5 py-3"></th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 font-semibold text-slate-950">{report.id}</td>
                    <td className="px-5 py-4 text-slate-700">{report.type}</td>
                    <td className="px-5 py-4"><StatusBadge status={report.status} /></td>
                    <td className="px-5 py-4 text-slate-600">{formatDate(report.submittedAt)}</td>
                    <td className="px-5 py-4 text-slate-600">{formatDate(report.lastUpdated)}</td>
                    <td className="px-5 py-4 text-right"><Link className="inline-flex text-blue-700" to={`/student/reports/${report.id}`} aria-label={`View ${report.id}`}><ChevronRight className="h-4 w-4" /></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel>
          <h2 className="font-bold text-slate-950">Quick Actions</h2>
          <div className="mt-5 space-y-3">
            {quickActions.map(({ title, detail, to, icon: Icon, tone }) => (
              <Link key={title} to={to} className={`flex items-center justify-between rounded-md border p-4 ${tone}`}>
                <span className="flex items-center gap-3"><span className="rounded-md bg-white/80 p-2"><Icon className="h-5 w-5" /></span><span><span className="block text-sm font-bold">{title}</span><span className="block text-xs opacity-80">{detail}</span></span></span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel>
            <div className="flex items-center justify-between"><h2 className="font-bold text-slate-950">Emergency Contacts</h2><Link className="text-sm font-semibold text-blue-700" to="/student/emergency">View all</Link></div>
            <div className="mt-4 space-y-4">
              {contacts.map(({ title, detail, note, icon: Icon, tone }) => <div key={title} className="flex gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-md ${tone}`}><Icon className="h-4 w-4" /></span><span><span className="block text-sm font-bold text-slate-950">{title}</span><span className="block text-sm text-slate-700">{detail}</span><span className="block text-xs text-slate-500">{note}</span></span></div>)}
            </div>
          </Panel>
          <Panel>
            <div className="flex items-center justify-between"><h2 className="font-bold text-slate-950">Important Resources</h2><Link className="text-sm font-semibold text-blue-700" to="/student/resources">View all</Link></div>
            <div className="mt-4 space-y-3">
              {publishedResources.slice(0, 3).map((resource) => <Link key={resource.id} to="/student/resources" className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 p-3"><span className="flex items-center gap-3"><span className="rounded-md bg-blue-50 p-2 text-blue-700"><BookOpen className="h-4 w-4" /></span><span><span className="block text-sm font-bold text-slate-950">{resource.title}</span><span className="block text-xs text-slate-500">{resource.category}</span></span></span><ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" /></Link>)}
            </div>
          </Panel>
        </div>
      </div>

      <div className="rounded-md border border-blue-100 bg-blue-50 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4"><div className="rounded-md bg-blue-600 p-3 text-white"><ShieldAlert className="h-6 w-6" /></div><div><h2 className="font-bold text-slate-950">You are not alone</h2><p className="mt-1 text-sm text-slate-600">If you or someone you know needs help, please reach out. We are here for you.</p></div></div>
          <Link to="/student/resources"><Button variant="secondary">Learn More</Button></Link>
        </div>
      </div>
    </div>
  );
}

export function StudentReportPage() {
  return <ReportForm />;
}

export function StudentReportsPage() {
  const { reports } = useApp();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [type, setType] = useState('All types');
  const [urgency, setUrgency] = useState('All urgency');
  const [sort, setSort] = useState('Newest');
  const filtered = useMemo(() => reports.filter((report) => [report.id, report.type, report.status, report.location].join(' ').toLowerCase().includes(query.toLowerCase())).filter((report) => status === 'All statuses' || report.status === status).filter((report) => type === 'All types' || report.type === type).filter((report) => urgency === 'All urgency' || report.urgency === urgency).sort((a, b) => sort === 'Oldest' ? a.submittedAt.localeCompare(b.submittedAt) : b.submittedAt.localeCompare(a.submittedAt)), [reports, query, status, type, urgency, sort]);

  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-bold text-slate-950">My reports</h1><p className="mt-2 text-sm text-slate-600">Track submitted reports, counselor responses, and current review state.</p></div><Link to="/student/report"><Button><FilePlus className="h-4 w-4" /> New report</Button></Link></div>
        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_repeat(4,180px)]"><SearchInput value={query} onChange={setQuery} placeholder="Search reports" /><FilterDropdown label="Status" value={status} onChange={setStatus} options={['All statuses', 'Pending', 'In Review', 'Resolved', 'Closed']} /><FilterDropdown label="Type" value={type} onChange={setType} options={['All types', 'Sexual Abuse', 'Physical Abuse', 'Verbal Abuse', 'Emotional Abuse', 'Harassment', 'Bullying', 'Other']} /><FilterDropdown label="Urgency" value={urgency} onChange={setUrgency} options={['All urgency', 'Standard', 'Emergency']} /><FilterDropdown label="Sort" value={sort} onChange={setSort} options={['Newest', 'Oldest']} /></div>
      </Panel>
      {reports.length === 0 ? <EmptyState title="No reports submitted" message="When you submit a report it will appear here." /> : filtered.length === 0 ? <EmptyState title="No matching reports" message="Adjust your search or filters to see more results." /> : <ReportTable reports={filtered} />}
    </div>
  );
}

export function StudentReportDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reports } = useApp();
  const report = reports.find((item) => item.id === id);
  if (!report) return <EmptyState title="Report not found" message="The report reference does not exist in the current mock data." action={<Link to="/student/my-reports"><Button>Back to my reports</Button></Link>} />;
  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <ReportDetails report={report} />
    </div>
  );
}

const emergencyContacts = [
  { title: 'Campus Security', detail: '+233 30 123 4567', note: '24/7 Available', icon: Shield, tone: 'bg-red-50 text-red-700' },
  { title: 'Counseling Center', detail: '+233 30 987 6543', note: 'Mon – Fri, 8AM – 6PM', icon: HeartHandshake, tone: 'bg-blue-50 text-blue-700' },
  { title: 'National Helpline', detail: '0800 111 222', note: '24/7 Available', icon: PhoneCall, tone: 'bg-emerald-50 text-emerald-700' },
];

export function EmergencyPage() {
  return (
    <div className="space-y-6">
      <Panel className="border-red-100 bg-red-50">
        <h1 className="text-2xl font-bold text-red-950">Emergency help</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">If there is immediate danger, contact campus security or local emergency services first.</p>
      </Panel>

      <div className="grid gap-4 md:grid-cols-3">
        {emergencyContacts.map(({ title, detail, note, icon: Icon, tone }) => (
          <Panel key={title}>
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-md ${tone}`}><Icon className="h-5 w-5" /></span>
              <h2 className="font-bold text-slate-950">{title}</h2>
            </div>
            <p className="mt-3 text-2xl font-bold text-institution-900">{detail}</p>
            <p className="mt-2 text-sm text-slate-600">{note}</p>
          </Panel>
        ))}
      </div>

      <Panel>
        <h2 className="text-lg font-bold text-slate-950">Safety guidance</h2>
        <ul className="mt-3 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-3">
          <li className="rounded-md border border-slate-200 bg-slate-50 p-4">Move to a public or secure location if you can do so safely.</li>
          <li className="rounded-md border border-slate-200 bg-slate-50 p-4">Contact a trusted person, residence assistant, counselor, or security officer.</li>
          <li className="rounded-md border border-slate-200 bg-slate-50 p-4">Preserve messages, screenshots, or documents if it is safe to do so.</li>
        </ul>
        <Link className="mt-5 inline-block" to="/student/report"><Button>Submit an emergency report</Button></Link>
      </Panel>
    </div>
  );
}

export function StudentResourcesPage() {
  const { resources } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');
  const visible = resources.filter((item) => item.published).filter((item) => [item.title, item.summary, item.category].join(' ').toLowerCase().includes(query.toLowerCase())).filter((item) => category === 'All categories' || item.category === category);
  const categories = ['All categories', ...Array.from(new Set(resources.map((item) => item.category)))];
  return <div className="space-y-6"><Panel><h1 className="text-2xl font-bold text-slate-950">Student resources</h1><p className="mt-2 text-sm text-slate-600">Practical university support information and contact guidance.</p><div className="mt-5 grid gap-3 md:grid-cols-[1fr_220px]"><SearchInput value={query} onChange={setQuery} placeholder="Search resources" /><FilterDropdown label="Category" value={category} onChange={setCategory} options={categories} /></div></Panel><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visible.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}</div>{visible.length === 0 ? <EmptyState title="No resources found" message="Try a different search term or category." /> : null}</div>;
}

export function StudentNotificationsPage() {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const items = notifications.filter((item) => item.role === 'student');
  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <Panel><div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-bold text-slate-950">Notifications</h1><p className="mt-2 text-sm text-slate-600">Report updates and resource notices.</p></div><Button variant="secondary" onClick={() => markAllNotificationsRead('student')}>Mark all read</Button></div></Panel>
      <div className="space-y-3">{items.map((item) => <NotificationCard key={item.id} notification={item} onRead={() => markNotificationRead(item.id)} />)}</div>
    </div>
  );
}

const faqs = [
  { id: 1, question: 'How do I report an incident?', answer: 'Use the Report Incident page from the sidebar or quick actions. Fill out the form with details, and your report will be reviewed by campus support staff.' },
  { id: 2, question: 'Will my report be kept confidential?', answer: 'Yes. All reports are handled confidentially. Only authorized support staff can access your information, and your identity is protected throughout the process.' },
  { id: 3, question: 'What happens after I submit a report?', answer: 'Your report enters a review queue. You will receive status updates as it moves through Pending, In Review, and Resolved stages. Track progress on the My Reports page.' },
  { id: 4, question: 'Can I speak to a counselor anonymously?', answer: 'Yes. The Counseling Center offers confidential sessions. You can reach them through the Emergency Help page or by visiting the center directly.' },
  { id: 5, question: 'What types of incidents can I report?', answer: 'You can report sexual abuse, physical abuse, verbal abuse, emotional abuse, harassment, bullying, and other safety concerns.' },
  { id: 6, question: 'How do I update my contact information?', answer: 'Go to the Settings page from the sidebar to update your profile, email, department, and notification preferences.' },
];

export function StudentFAQsPage() {
  const [openId, setOpenId] = useState<number | null>(1);
  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">FAQs</h1>
            <p className="mt-2 text-sm text-slate-600">Common questions about reporting, privacy, and support services.</p>
          </div>
          <Link to="/student/resources"><Button variant="secondary">Browse Resources</Button></Link>
        </div>
      </Panel>
      <div className="space-y-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="rounded-md border border-slate-200 bg-white transition">
              <button onClick={() => setOpenId(isOpen ? null : faq.id)} className="flex w-full items-center justify-between px-5 py-4 text-left">
                <span className="text-sm font-bold text-slate-950">{faq.question}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-slate-500 transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && <div className="border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-600">{faq.answer}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StudentPrivacyPage() {
  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="text-2xl font-bold text-slate-950">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-600">Last updated: May 2026</p>
      </Panel>
      <Panel>
        <div className="space-y-5 text-sm leading-6 text-slate-700">
          <div>
            <h2 className="text-base font-bold text-slate-950">Information We Collect</h2>
            <p className="mt-2">We collect information you provide when submitting reports, including your name, student ID, department, and incident details. This information is used solely to process and respond to your reports.</p>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">How We Use Your Information</h2>
            <p className="mt-2">Your data is used to investigate reports, coordinate support services, and improve campus safety programs. We never share your information with unauthorized third parties.</p>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">Data Security</h2>
            <p className="mt-2">All reports and personal data are stored securely with encryption. Only authorized campus support staff can access your information, and access is logged for accountability.</p>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">Your Rights</h2>
            <p className="mt-2">You have the right to request access to, correction of, or deletion of your personal data. Contact the Data Protection Officer through the Settings page for such requests.</p>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">Contact Us</h2>
            <p className="mt-2">If you have questions about this privacy policy, please reach out through the Contact Us section or visit the Counseling Center.</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export function StudentAboutPage() {
  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="text-2xl font-bold text-slate-950">About Us</h1>
        <p className="mt-2 text-sm text-slate-600">Centre for Gender Research, Advocacy and Documentation (CEGRAD), University of Cape Coast</p>
      </Panel>
      <Panel>
        <div className="space-y-5 text-sm leading-6 text-slate-700">
          <div>
            <h2 className="text-base font-bold text-slate-950">Who We Are</h2>
            <p className="mt-2">CEGRAD is the Centre for Gender Research, Advocacy and Documentation at the University of Cape Coast (UCC), Ghana. We serve as a research, advocacy and documentation focal point on Gender and Women's Studies within the university and beyond.</p>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">Our Mission</h2>
            <p className="mt-2">To engage in theory and practice to position the University of Cape Coast as a leader in gender equality and women's rights within the academy and beyond.</p>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">Our Vision</h2>
            <p className="mt-2">To create a safe, creative and inclusive space where gender and women's rights are fully protected.</p>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">What We Do</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Conduct gender research and document findings for policy influence</li>
              <li>Ensure gender sensitivity in university-wide policies and programmes</li>
              <li>Support faculties and schools to engender their taught programmes</li>
              <li>Monitor adherence to gender sensitivity in policymaking</li>
              <li>Facilitate the protection of women's rights and promotion of gender equity</li>
              <li>Coordinate relations within and beyond UCC for the promotion of gender interests</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">Support Services</h2>
            <p className="mt-2">Through this platform, students can report incidents confidentially, access counseling and emergency contacts, and learn about their rights. CEGRAD is committed to ensuring a gender-equal and inclusive learning environment for all.</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

export function StudentContactPage() {
  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="text-2xl font-bold text-slate-950">Contact Us</h1>
        <p className="mt-2 text-sm text-slate-600">Reach out to CEGRAD or campus support services.</p>
      </Panel>
      <div className="grid gap-4 md:grid-cols-2">
        <Panel>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-700">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-950">CEGRAD Office</h2>
              <p className="text-sm text-slate-600">University of Cape Coast</p>
              <p className="text-sm text-slate-600">Cape Coast, Central Region, Ghana</p>
            </div>
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-950">Phone</h2>
              <p className="text-sm text-slate-600">+233 31 229 259</p>
              <p className="text-sm text-slate-600">Mon – Fri, 8AM – 5PM</p>
            </div>
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-violet-50 text-violet-700">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-950">Email</h2>
              <p className="text-sm text-slate-600">cegrad@ucc.edu.gh</p>
              <p className="text-sm text-slate-600">support@ucc.edu.gh</p>
            </div>
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-50 text-amber-700">
              <Clock3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-950">Office Hours</h2>
              <p className="text-sm text-slate-600">Monday – Friday: 8:00 AM – 5:00 PM</p>
              <p className="text-sm text-slate-600">Saturday – Sunday: Closed</p>
            </div>
          </div>
        </Panel>
      </div>
      <Panel>
        <h2 className="text-lg font-bold text-slate-950">Send a Message</h2>
        <form className="mt-4 grid gap-4 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Your Name</label>
            <input type="text" className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400" placeholder="Enter your name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Email</label>
            <input type="email" className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400" placeholder="Enter your email" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Subject</label>
            <input type="text" className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400" placeholder="How can we help?" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700">Message</label>
            <textarea rows={4} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400" placeholder="Describe your concern..." />
          </div>
          <div className="md:col-span-2">
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      </Panel>
    </div>
  );
}

export function StudentSettingsPage() {
  const { currentUser, addToast } = useApp();
  return <div className="space-y-6"><Panel><h1 className="text-2xl font-bold text-slate-950">Student settings</h1><p className="mt-2 text-sm text-slate-600">Manage local-only profile and notification preferences for the student demo.</p></Panel><Panel><div className="grid gap-4 md:grid-cols-2"><Field label="Full name"><input className={inputClass} defaultValue={currentUser?.name} /></Field><Field label="University email"><input className={inputClass} defaultValue={currentUser?.email} /></Field><Field label="Student ID"><input className={inputClass} defaultValue={currentUser?.studentId} /></Field><Field label="Department"><input className={inputClass} defaultValue={currentUser?.department} /></Field><label className="flex gap-2 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm"><input type="checkbox" defaultChecked /> Secure portal messages</label><label className="flex gap-2 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm"><input type="checkbox" defaultChecked /> Resource updates</label></div><Button className="mt-5" onClick={() => addToast({ title: 'Student preferences saved locally', tone: 'success' })}>Save preferences</Button></Panel></div>;
}
