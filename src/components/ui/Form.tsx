import type { ReactNode } from 'react';

export function Field({
  label,
  error,
  required = false,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">
        {label}
        {required ? <span className="text-red-700"> *</span> : null}
      </span>
      <div className="mt-1">{children}</div>
      {error ? <span className="mt-1 block text-sm text-red-700">{error}</span> : null}
    </label>
  );
}

export const inputClass = 'w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-institution-600 focus:ring-2 focus:ring-institution-100';

export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <label className="block min-w-0 flex-1">
      <span className="sr-only">Search</span>
      <input className={inputClass} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} type="search" />
    </label>
  );
}

export function FilterDropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="block min-w-40">
      <span className="sr-only">{label}</span>
      <select className={inputClass} value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}
