import type { ReactNode } from "react";

type DashboardCardVariant =
  | "default"
  | "pending"
  | "review"
  | "success"
  | "danger"
  | "info"
  | "neutral";

const accentMap: Record<DashboardCardVariant, string> = {
  default: "bg-institution-600",
  pending: "bg-amber-500",
  review: "bg-blue-500",
  success: "bg-green-500",
  danger: "bg-red-500",
  info: "bg-indigo-500",
  neutral: "bg-slate-700",
};

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-md border border-slate-200 bg-white p-6 ${className}`}
    >
      {children}
    </section>
  );
}

export function DashboardCard({
  title,
  value,
  detail,
  icon,
  variant = "default",
}: {
  title: string;
  value: string | number;
  detail?: string;
  icon?: ReactNode;
  variant?: DashboardCardVariant;
}) {
  const accent = accentMap[variant];

  return (
    <Panel className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-600">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        {icon ? (
          <div className={`rounded-md ${accent} p-3 text-white`}>{icon}</div>
        ) : null}
      </div>

      {detail ? (
        <p className="mt-3 text-sm font-medium text-slate-500">{detail}</p>
      ) : null}
    </Panel>
  );
}

export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">{message}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
