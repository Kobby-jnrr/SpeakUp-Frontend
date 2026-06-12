import { CalendarDays, Clock3, MapPin, Shield, UserRound } from "lucide-react";
import type { Report } from "../../types";
import { formatDate } from "../../utils/format";
import { StatusBadge, UrgencyBadge } from "../ui/Badges";
import { Panel } from "../ui/Cards";

function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-slate-900">
        {value || "Not provided"}
      </dd>
    </div>
  );
}

export function ReportDetails({
  report,
  admin = false,
}: {
  report: Report;
  admin?: boolean;
}) {
  return (
    <div className="space-y-6">
      <Panel className="border-institution-100 bg-institution-50">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase text-institution-700">
              Report #{report.id}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-950">
              {report.type}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
              {report.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={report.status} />
            <UrgencyBadge urgency={report.urgency} />
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Panel className="p-4">
          <CalendarDays className="h-5 w-5 text-institution-700" />
          <p className="mt-3 text-sm font-semibold text-slate-600">
            Incident date
          </p>
          <p className="mt-1 font-bold text-slate-950">
            {formatDate(report.incidentDate)}
          </p>
        </Panel>
        <Panel className="p-4">
          <Clock3 className="h-5 w-5 text-institution-700" />
          <p className="mt-3 text-sm font-semibold text-slate-600">
            Submitted
          </p>
          <p className="mt-1 font-bold text-slate-950">
            {formatDate(report.submittedAt)}
          </p>
        </Panel>
        <Panel className="p-4">
          <MapPin className="h-5 w-5 text-institution-700" />
          <p className="mt-3 text-sm font-semibold text-slate-600">Location</p>
          <p className="mt-1 font-bold text-slate-950">{report.location}</p>
        </Panel>
        <Panel className="p-4">
          <Shield className="h-5 w-5 text-institution-700" />
          <p className="mt-3 text-sm font-semibold text-slate-600">Privacy</p>
          <p className="mt-1 font-bold text-slate-950">
            {report.isAnonymous ? "Confidential" : "Identified"}
          </p>
        </Panel>
      </div>

      <Panel>
        <h2 className="text-lg font-bold text-slate-950">Case details</h2>
        <dl className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {admin ? (
            <DetailItem
              label="Student"
              value={report.isAnonymous ? "Anonymous" : report.studentName}
            />
          ) : null}
          <DetailItem label="Student ID" value={report.studentId} />
          <DetailItem label="Student email" value={report.studentEmail} />
          <DetailItem label="Respondent" value={report.respondentName} />
          <DetailItem label="Respondent position" value={report.respondentPosition} />
          <DetailItem
            label="Respondent department"
            value={report.respondentDepartment}
          />
          <DetailItem label="Relationship" value={report.relationship} />
          <DetailItem label="Witness 1" value={report.witness1Name} />
          <DetailItem label="Witness 1 contact" value={report.witness1Contact} />
          <DetailItem label="Witness 2" value={report.witness2Name} />
          <DetailItem label="Witness 2 contact" value={report.witness2Contact} />
          <DetailItem label="Prior report" value={report.priorReportWhere} />
        </dl>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Panel>
          <h2 className="text-lg font-bold text-slate-950">Desired outcome</h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            {report.desiredOutcome || "No desired outcome was provided."}
          </p>
        </Panel>
        <Panel>
          <div className="flex items-center gap-2">
            <UserRound className="h-5 w-5 text-institution-700" />
            <h2 className="text-lg font-bold text-slate-950">Assigned staff</h2>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-900">
            {report.assignedCounselor}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {report.adminResponse}
          </p>
        </Panel>
      </div>

      <Panel>
        <h2 className="text-lg font-bold text-slate-950">Timeline</h2>
        <div className="mt-5 space-y-4">
          {report.timeline.map((item) => (
            <div className="flex gap-3" key={`${item.label}-${item.date}`}>
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-institution-600" />
              <div>
                <p className="font-semibold text-slate-950">{item.label}</p>
                <p className="text-sm text-slate-600">
                  {formatDate(item.date)} by {item.actor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
