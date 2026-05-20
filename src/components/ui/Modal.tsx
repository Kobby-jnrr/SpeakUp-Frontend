import type { ReactNode } from 'react';
import { Button } from './Button';

export function Modal({ title, open, onClose, children }: { title: string; open: boolean; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md border border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold text-slate-950">{title}</h2>
          <Button variant="ghost" onClick={onClose} aria-label="Close dialog">Close</Button>
        </div>
        <div className="pt-5">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDialog({ open, title, message, onCancel, onConfirm }: { open: boolean; title: string; message: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <Modal title={title} open={open} onClose={onCancel}>
      <p className="text-sm text-slate-600">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Confirm</Button>
      </div>
    </Modal>
  );
}
