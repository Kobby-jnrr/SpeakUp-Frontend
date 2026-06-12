import { Link } from "react-router-dom";
import type { Report } from "../../types";
import { formatDate } from "../../utils/format";
import { StatusBadge, UrgencyBadge } from "../ui/Badges";
import { Button } from "../ui/Button";

export function ReportTable({
  reports,
  admin = false,
}: {
  reports: Report[];
  admin?: boolean;
}) {
  return (
    <div>
      <div className="hidden overflow-hidden rounded-md border border-slate-200 bg-white md:block">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Report ID</th>
              {admin ? <th className="px-4 py-3">Student</th> : null}
              <th className="px-4 py-3">Complaint Nature</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Urgency</th>
              <th className="px-4 py-3">Submitted</th>
              {admin ? <th className="px-4 py-3">Counselor</th> : null}
              <th className="px-4 py-3">Last updated</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-4 font-semibold text-slate-950">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-institution-600" />
                  {report.id}
                </td>
                {admin ? (
                  <td className="px-4 py-3 text-slate-700">
                    {report.isAnonymous ? "Anonymous" : report.studentName}
                  </td>
                ) : null}
                <td className="px-4 py-3 text-slate-700">{report.type}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={report.status} />
                </td>
                <td className="px-4 py-3">
                  <UrgencyBadge urgency={report.urgency} />
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {formatDate(report.submittedAt)}
                </td>
                {admin ? (
                  <td className="px-4 py-3 text-slate-700">
                    {report.assignedCounselor}
                  </td>
                ) : null}
                <td className="px-4 py-3 text-slate-700">
                  {formatDate(report.lastUpdated)}
                </td>
                <td className="px-4 py-3">
                  <Link
                    className="font-semibold text-institution-700 hover:text-institution-900"
                    to={
                      admin
                        ? `/admin/reports/${report.id}`
                        : `/student/reports/${report.id}`
                    }
                  >
                    View details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 md:hidden">
        {reports.map((report) => (
          <article
            key={report.id}
            className="rounded-md border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-950">{report.id}</h3>
                <p className="text-sm text-slate-600">{report.type}</p>
              </div>
              <UrgencyBadge urgency={report.urgency} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge status={report.status} />
            </div>
            <dl className="mt-4 grid gap-2 text-sm text-slate-600">
              {admin ? (
                <div>
                  <dt className="font-semibold text-slate-900">Student</dt>
                  <dd>
                    {report.isAnonymous ? "Anonymous" : report.studentName}
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="font-semibold text-slate-900">Submitted</dt>
                <dd>{formatDate(report.submittedAt)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">Last updated</dt>
                <dd>{formatDate(report.lastUpdated)}</dd>
              </div>
            </dl>
            <Link
              to={
                admin
                  ? `/admin/reports/${report.id}`
                  : `/student/reports/${report.id}`
              }
            >
              <Button className="mt-4 w-full" variant="secondary">
                View details
              </Button>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
