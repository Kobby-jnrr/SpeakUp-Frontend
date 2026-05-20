import { CheckCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ToastViewport() {
  const { toasts, removeToast } = useApp();
  return (
    <div className="fixed right-4 top-4 z-[60] flex w-full max-w-sm flex-col gap-3" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex gap-3">
            {toast.tone === 'success' ? <CheckCircle className="mt-0.5 h-5 w-5 text-green-700" aria-hidden="true" /> : <Info className="mt-0.5 h-5 w-5 text-institution-700" aria-hidden="true" />}
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-950">{toast.title}</p>
              {toast.message ? <p className="mt-1 text-sm text-slate-600">{toast.message}</p> : null}
            </div>
            <button className="rounded-md p-1 text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-institution-600" onClick={() => removeToast(toast.id)} aria-label="Dismiss notification">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
