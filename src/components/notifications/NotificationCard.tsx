import type { NotificationItem } from '../../types';
import { formatDate } from '../../utils/format';
import { Button } from '../ui/Button';

export function NotificationCard({ notification, onRead }: { notification: NotificationItem; onRead: () => void }) {
  const tone = notification.tone === 'urgent' ? 'border-red-200 bg-red-50' : notification.read ? 'border-slate-200 bg-white' : 'border-institution-200 bg-institution-50';
  return (
    <article className={`rounded-md border p-4 ${tone}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            {!notification.read ? <span className="h-2.5 w-2.5 rounded-full bg-institution-700" aria-label="Unread" /> : null}
            <h3 className="font-bold text-slate-950">{notification.title}</h3>
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-700">{notification.message}</p>
          <p className="mt-2 text-xs font-semibold text-slate-500">{formatDate(notification.date)}</p>
        </div>
        {!notification.read ? <Button variant="secondary" onClick={onRead}>Mark read</Button> : null}
      </div>
    </article>
  );
}
