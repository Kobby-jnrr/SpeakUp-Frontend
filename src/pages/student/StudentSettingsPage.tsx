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
      {/* HEADER */}
      <Panel>
        <h1 className="text-2xl font-bold">Student Settings</h1>

        <p className="text-sm text-slate-600">
          View your account information and available SpeakUp features.
        </p>
      </Panel>

      {/* PROFILE */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">Profile Information</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name">
            <input className={inputClass} value={fullName || "—"} readOnly />
          </Field>

          <Field label="Email">
            <input
              className={inputClass}
              value={currentUser?.email || "—"}
              readOnly
            />
          </Field>

          <Field label="Gender">
            <input
              className={inputClass}
              value={currentUser?.gender || "—"}
              readOnly
            />
          </Field>

          <Field label="Department">
            <input
              className={inputClass}
              value={currentUser?.department || "—"}
              readOnly
            />
          </Field>

          <Field label="Phone number">
            <input
              className={inputClass}
              value={currentUser?.phoneNumber || "—"}
              readOnly
            />
          </Field>

          <Field label="Account type">
            <input
              className={inputClass}
              value={currentUser?.role || "Student"}
              readOnly
            />
          </Field>
        </div>
      </Panel>

      {/* AVAILABLE FEATURES */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">SpeakUp Features</h2>

        <div className="space-y-3">
          <div className="rounded-md border p-3 text-sm">
            <p className="font-medium">Incident Reporting</p>

            <p className="text-slate-500">
              Submit complaints and track the progress of your reports.
            </p>

            <span className="inline-block mt-2 rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              Available
            </span>
          </div>

          <div className="rounded-md border p-3 text-sm">
            <p className="font-medium">Secure Conversations</p>

            <p className="text-slate-500">
              Communicate privately with assigned support administrators.
            </p>

            <span className="inline-block mt-2 rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              Available
            </span>
          </div>

          <div className="rounded-md border p-3 text-sm">
            <p className="font-medium">Support Resources</p>

            <p className="text-slate-500">
              Access educational and safety resources published by
              administrators.
            </p>

            <span className="inline-block mt-2 rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              Available
            </span>
          </div>
        </div>
      </Panel>

      {/* PRIVACY */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">
          Privacy & Confidentiality
        </h2>

        <div className="rounded-md border p-4 text-sm">
          <p className="font-medium">Report confidentiality</p>

          <p className="mt-1 text-slate-600">
            Your submitted reports are handled according to the confidentiality
            options selected during submission.
          </p>

          <span className="inline-block mt-3 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
            Protected
          </span>
        </div>
      </Panel>

      {/* ACCOUNT STATUS */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">Account Status</h2>

        <p className="text-sm text-slate-600 mb-4">
          Your account is authenticated and protected using SpeakUp's secure
          role-based access system.
        </p>

        <Button
          onClick={() =>
            addToast({
              title: "Your account is active",
              tone: "success",
            })
          }
        >
          Check Account Status
        </Button>
      </Panel>
    </div>
  );
}
