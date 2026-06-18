export function StatusBadge({ status }: { status: string }) {
  const classes: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-800 border-amber-200",
    InProgress: "bg-blue-50 text-blue-800 border-blue-200",
    Resolved: "bg-green-50 text-green-800 border-green-200",
    Closed: "bg-slate-100 text-slate-700 border-slate-200",
    // Legacy aliases
    "In Review": "bg-blue-50 text-blue-800 border-blue-200",
  };
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${
        classes[status] ?? "bg-slate-100 text-slate-700 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}
