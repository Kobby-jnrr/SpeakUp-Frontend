import { Upload } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import type { AbuseType } from '../../types';
import { Button } from '../ui/Button';
import { Field, inputClass } from '../ui/Form';
import { Panel } from '../ui/Cards';

const abuseTypes: AbuseType[] = ['Sexual Abuse', 'Physical Abuse', 'Verbal Abuse', 'Emotional Abuse', 'Harassment', 'Bullying', 'Other'];
const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

export function ReportForm() {
  const { currentUser, submitReport, addToast } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    type: '' as AbuseType | '',
    incidentDate: '',
    location: '',
    description: '',
    accusedPerson: '',
    isAnonymous: false,
    emergency: false,
    contactPreference: 'Secure portal message',
  });

  const update = (key: keyof typeof form, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.type) nextErrors.type = 'Select the type of abuse being reported.';
    if (!form.incidentDate) nextErrors.incidentDate = 'Enter the incident date.';
    if (form.incidentDate && new Date(form.incidentDate) > new Date()) nextErrors.incidentDate = 'Incident date cannot be in the future.';
    if (!form.location.trim()) nextErrors.location = 'Enter where the incident occurred.';
    if (form.description.trim().length < 40) nextErrors.description = 'Provide at least 40 characters so staff can understand the concern.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;
    const accepted: File[] = [];
    Array.from(selected).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        addToast({ title: 'File type not accepted', message: `${file.name} must be a PNG, JPG, or PDF file.`, tone: 'warning' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        addToast({ title: 'File size warning', message: `${file.name} is larger than 5MB. This is allowed in the mock UI but may require compression later.`, tone: 'warning' });
      }
      accepted.push(file);
    });
    setFiles((current) => [...current, ...accepted]);
  };

  const next = () => {
    if (step === 1 && (!form.type || !form.incidentDate || !form.location.trim())) {
      validate();
      return;
    }
    setStep((current) => Math.min(3, current + 1));
  };

  const submit = () => {
    if (!validate()) return;
    setLoading(true);
    window.setTimeout(() => {
      const report = submitReport({
        studentName: form.isAnonymous ? 'Anonymous' : currentUser?.name ?? 'Demo Student',
        studentId: form.isAnonymous ? null : currentUser?.studentId ?? 'STU-DEMO',
        studentEmail: form.isAnonymous ? undefined : currentUser?.email,
        isAnonymous: form.isAnonymous,
        type: form.type as AbuseType,
        urgency: form.emergency ? 'Emergency' : 'Standard',
        location: form.location,
        incidentDate: form.incidentDate,
        description: form.description,
        accusedPerson: form.accusedPerson || 'Not provided',
        contactPreference: form.contactPreference,
        evidence: files.map((file) => file.name),
      });
      addToast({ title: 'Report submitted', message: `${report.id} has been created for mock review.`, tone: 'success' });
      setLoading(false);
      navigate(`/student/reports/${report.id}`);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <Panel className="border-institution-100 bg-institution-50">
        <h1 className="text-2xl font-bold text-slate-950">Submit a confidential report</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">Your report will be handled confidentially. Anonymous reports hide your identity from admin views. Only authorized staff should access reports.</p>
      </Panel>
      <div className="grid gap-2 sm:grid-cols-3" aria-label="Report progress">
        {['Incident details', 'Description and privacy', 'Evidence and review'].map((label, index) => <div key={label} className={`rounded-md border px-3 py-2 text-sm font-semibold ${step === index + 1 ? 'border-institution-700 bg-white text-institution-900' : 'border-slate-200 bg-slate-100 text-slate-600'}`}>{index + 1}. {label}</div>)}
      </div>
      <Panel>
        {step === 1 ? <div className="grid gap-5 md:grid-cols-2">
          <Field label="Abuse type" error={errors.type}><select className={inputClass} value={form.type} onChange={(event) => update('type', event.target.value)}><option value="">Select type</option>{abuseTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></Field>
          <Field label="Incident date" error={errors.incidentDate}><input className={inputClass} type="date" value={form.incidentDate} onChange={(event) => update('incidentDate', event.target.value)} /></Field>
          <div className="md:col-span-2"><Field label="Incident location" error={errors.location}><input className={inputClass} value={form.location} onChange={(event) => update('location', event.target.value)} placeholder="Example: Campus Hostel Block B, online group chat, lecture hall" /></Field></div>
        </div> : null}
        {step === 2 ? <div className="space-y-5">
          <Field label="Detailed description" error={errors.description}><textarea className={`${inputClass} min-h-44`} value={form.description} onChange={(event) => update('description', event.target.value)} placeholder="Describe what happened, when it occurred, who was involved if known, and any immediate safety concerns." /></Field>
          <Field label="Optional accused person information"><input className={inputClass} value={form.accusedPerson} onChange={(event) => update('accusedPerson', event.target.value)} placeholder="Name, role, relationship, or leave blank" /></Field>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-start gap-3 rounded-md border border-slate-200 p-4"><input className="mt-1" type="checkbox" checked={form.isAnonymous} onChange={(event) => update('isAnonymous', event.target.checked)} /><span><span className="block font-semibold text-slate-900">Submit anonymously</span><span className="text-sm text-slate-600">Your identity is hidden in admin views.</span></span></label>
            <label className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4"><input className="mt-1" type="checkbox" checked={form.emergency} onChange={(event) => update('emergency', event.target.checked)} /><span><span className="block font-semibold text-red-900">Emergency concern</span><span className="text-sm text-red-700">Emergency reports are reviewed first.</span></span></label>
          </div>
          <Field label="Contact preference"><select className={inputClass} value={form.contactPreference} onChange={(event) => update('contactPreference', event.target.value)}><option>Secure portal message</option><option>Email and secure portal message</option><option>Phone call</option><option>No direct contact requested</option></select></Field>
        </div> : null}
        {step === 3 ? <div className="space-y-5">
          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-slate-500" aria-hidden="true" />
            <label className="mt-3 inline-block cursor-pointer rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-institution-800"><input className="sr-only" type="file" multiple accept=".png,.jpg,.jpeg,.pdf" onChange={(event) => handleFiles(event.target.files)} />Choose mock evidence files</label>
            <p className="mt-2 text-sm text-slate-600">Accepted mock formats: PNG, JPG, PDF.</p>
          </div>
          {files.length ? <ul className="grid gap-2">{files.map((file) => <li className="rounded-md bg-slate-100 px-3 py-2 text-sm" key={`${file.name}-${file.size}`}>{file.name}</li>)}</ul> : null}
          <div className="rounded-md bg-support-50 p-4 text-sm leading-6 text-slate-700">Review your entries before submitting. No backend request will be made; this demo stores the report in local app state only.</div>
        </div> : null}
        <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-5">
          <Button variant="secondary" disabled={step === 1 || loading} onClick={() => setStep((current) => Math.max(1, current - 1))}>Back</Button>
          {step < 3 ? <Button onClick={next}>Continue</Button> : <Button onClick={submit} disabled={loading}>{loading ? 'Submitting...' : 'Submit report'}</Button>}
        </div>
      </Panel>
    </div>
  );
}
