import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";

export function AdminSettingsPage() {
  const { currentUser, addToast } = useApp();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel>
        <h1 className="text-2xl font-bold">Admin Settings</h1>

        <p className="text-sm text-slate-600">
          View your account information and current system capabilities.
        </p>
      </Panel>

      {/* ADMIN PROFILE */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">Admin Profile</h2>

        <div className="grid gap-4 md:grid-cols-2 text-sm">
          <div>
            <p className="text-slate-500">Name</p>

            <p className="font-semibold">
              {currentUser?.firstName} {currentUser?.lastName}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Role</p>

            <p className="font-semibold">{currentUser?.role}</p>
          </div>

          <div>
            <p className="text-slate-500">Email</p>

            <p className="font-semibold">{currentUser?.email}</p>
          </div>
        </div>
      </Panel>

      {/* SYSTEM FEATURES */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">System Features</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center rounded-md border p-3">
            <div>
              <p className="font-medium">Report Management</p>

              <p className="text-slate-500">
                Admins can review, claim, update and resolve reports.
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              Active
            </span>
          </div>

          <div className="flex justify-between items-center rounded-md border p-3">
            <div>
              <p className="font-medium">Chat Support</p>

              <p className="text-slate-500">
                Students and administrators can communicate through
                conversations.
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              Active
            </span>
          </div>

          <div className="flex justify-between items-center rounded-md border p-3">
            <div>
              <p className="font-medium">Resource Management</p>

              <p className="text-slate-500">
                Administrators can create, update and publish support resources.
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              Active
            </span>
          </div>

          <div className="flex justify-between items-center rounded-md border p-3">
            <div>
              <p className="font-medium">Audit Tracking</p>

              <p className="text-slate-500">
                Administrative actions are recorded for accountability.
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              Active
            </span>
          </div>
        </div>
      </Panel>

      {/* SECURITY */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">Security</h2>

        <div className="rounded-md border p-4 text-sm">
          <p className="font-medium">Authentication System</p>

          <p className="text-slate-500 mt-1">
            SpeakUp uses secure JWT authentication and role-based access
            control.
          </p>

          <span className="inline-block mt-3 rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
            Enabled
          </span>
        </div>
      </Panel>

      {/* FUTURE SETTINGS */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">Future Configuration</h2>

        <p className="text-sm text-slate-600 mb-4">
          Additional system configuration options such as registration control,
          email settings and platform preferences can be added here later.
        </p>

        <Button
          onClick={() =>
            addToast({
              title: "No pending configuration changes",
              tone: "success",
            })
          }
        >
          Check Settings
        </Button>
      </Panel>
    </div>
  );
}
