import { Field, inputClass } from "../../components/ui/Form";
import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";

export function StudentSettingsPage() {
  const { currentUser, addToast } = useApp();
  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="text-2xl font-bold text-slate-950">Student settings</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage local-only profile and notification preferences for the student
          demo.
        </p>
      </Panel>
      <Panel>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name">
            <input className={inputClass} defaultValue={currentUser?.name} />
          </Field>
          <Field label="University email">
            <input className={inputClass} defaultValue={currentUser?.email} />
          </Field>
          <Field label="Student ID">
            <input
              className={inputClass}
              defaultValue={currentUser?.studentId}
            />
          </Field>
          <Field label="Department">
            <input
              className={inputClass}
              defaultValue={currentUser?.department}
            />
          </Field>
          <label className="flex gap-2 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
            <input type="checkbox" defaultChecked /> Secure portal messages
          </label>
          <label className="flex gap-2 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
            <input type="checkbox" defaultChecked /> Resource updates
          </label>
        </div>
        <Button
          className="mt-5"
          onClick={() =>
            addToast({
              title: "Student preferences saved locally",
              tone: "success",
            })
          }
        >
          Save preferences
        </Button>
      </Panel>
    </div>
  );
}
