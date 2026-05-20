import type { Resource } from '../../types';
import { Button } from '../ui/Button';

export function ResourceCard({ resource, admin = false, onEdit, onDelete, onToggle }: { resource: Resource; admin?: boolean; onEdit?: () => void; onDelete?: () => void; onToggle?: () => void }) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-5 transition hover:border-institution-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-institution-700">{resource.category}</p>
          <h3 className="mt-2 text-lg font-bold text-slate-950">{resource.title}</h3>
        </div>
        {admin ? <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${resource.published ? 'border-green-200 bg-green-50 text-green-800' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>{resource.published ? 'Published' : 'Draft'}</span> : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{resource.summary}</p>
      {resource.contact ? <p className="mt-3 text-sm font-semibold text-slate-800">Contact: {resource.contact}</p> : null}
      {admin ? (
        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={onEdit}>Edit</Button>
          <Button variant="secondary" onClick={onToggle}>{resource.published ? 'Unpublish' : 'Publish'}</Button>
          <Button variant="danger" onClick={onDelete}>Delete</Button>
        </div>
      ) : null}
    </article>
  );
}
