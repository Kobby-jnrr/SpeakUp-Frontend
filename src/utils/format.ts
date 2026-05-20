export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(value));
}

export function generateReportId(total: number): string {
  return `REP-2026-${String(total + 1).padStart(3, '0')}`;
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
