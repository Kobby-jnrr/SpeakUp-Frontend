import type { TimelineItem } from '../../types';
import { formatDate } from '../../utils/format';

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="space-y-4" aria-label="Case timeline">
      {items.map((item, index) => (
        <li key={`${item.label}-${item.date}-${index}`} className="flex gap-3">
          <span className="mt-1 h-3 w-3 rounded-full border-2 border-institution-700 bg-white" aria-hidden="true" />
          <div>
            <p className="font-semibold text-slate-900">{item.label}</p>
            <p className="text-sm text-slate-600">{formatDate(item.date)} · {item.actor}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
