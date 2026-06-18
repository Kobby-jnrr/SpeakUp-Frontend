import { Field, inputClass } from "../../components/ui/Form";
import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";

export function StudentSettingsPage() {
  const { currentUser, addToast } = useApp();
  const fullName = [currentUser?.firstName, currentUser?.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="text-2xl font-bold text-slate-950">Student settings</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage your profile and notification preferences.
        </p>
      </Panel>
      <Panel>
        <h2 className="mb-4 text-base font-semibold text-slate-800">Profile Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name">
            <input className={inputClass} defaultValue={fullName} readOnly />
          </Field>
          <Field label="University email">
            <input
              className={inputClass}
              defaultValue={currentUser?.email}
              readOnly
            />
          </Field>
          <Field label="Gender">
            <input
              className={inputClass}
              defaultValue={currentUser?.gender || "—"}
              readOnly
            />
          </Field>
          <Field label="Department">
            <input
              className={inputClass}
              defaultValue={currentUser?.department || "—"}
              readOnly
            />
          </Field>
          <Field label="Phone number">
            <input
              className={inputClass}
              defaultValue={currentUser?.phoneNumber || "—"}
              readOnly
            />
          </Field>
          <Field label="Role">
            <input
              className={inputClass}
              defaultValue={currentUser?.role}
              readOnly
            />
          </Field>
        </div>
      </Panel>
      <Panel>
        <h2 className="mb-4 text-base font-semibold text-slate-800">Notification Preferences</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex gap-2 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
            <input type="checkbox" defaultChecked /> Receive secure portal messages
          </label>
          <label className="flex gap-2 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
            <input type="checkbox" defaultChecked /> Receive resource updates
          </label>
        </div>
        <Button
          className="mt-5"
          onClick={() =>
            addToast({
              title: "Preferences saved",
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
