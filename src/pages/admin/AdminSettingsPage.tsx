import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

export function AdminSettingsPage() {
  const { currentUser, addToast } = useApp();

  const [systemSettings, setSystemSettings] = useState({
    allowRegistrations: true,
    allowAnonymousReports: true,
    resourceAutoPublish: false,
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel>
        <h1 className="text-2xl font-bold">Admin Settings</h1>
        <p className="text-sm text-slate-600">
          Manage system behavior and administrative controls
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

      {/* SYSTEM CONTROLS */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">System Controls</h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3 rounded-md border p-3 text-sm">
            <input
              type="checkbox"
              checked={systemSettings.allowRegistrations}
              onChange={(e) =>
                setSystemSettings({
                  ...systemSettings,
                  allowRegistrations: e.target.checked,
                })
              }
            />
            Allow new user registrations
          </label>

          <label className="flex items-center gap-3 rounded-md border p-3 text-sm">
            <input
              type="checkbox"
              checked={systemSettings.allowAnonymousReports}
              onChange={(e) =>
                setSystemSettings({
                  ...systemSettings,
                  allowAnonymousReports: e.target.checked,
                })
              }
            />
            Allow anonymous reports
          </label>

          <label className="flex items-center gap-3 rounded-md border p-3 text-sm">
            <input
              type="checkbox"
              checked={systemSettings.resourceAutoPublish}
              onChange={(e) =>
                setSystemSettings({
                  ...systemSettings,
                  resourceAutoPublish: e.target.checked,
                })
              }
            />
            Auto-publish resources (skip approval)
          </label>
        </div>

        <Button
          className="mt-4"
          onClick={() =>
            addToast({
              title: "System settings updated",
              tone: "success",
            })
          }
        >
          Save settings
        </Button>
      </Panel>

      {/* SECURITY */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">Security</h2>

        <p className="text-sm text-slate-600">
          Admin actions are logged automatically for audit purposes.
        </p>

        <Button variant="secondary" className="mt-3">
          View Audit Logs
        </Button>
      </Panel>

      {/* DANGER ZONE */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold text-red-600">
          Danger Zone
        </h2>

        <p className="text-sm text-slate-600 mb-3">
          These actions are irreversible. Proceed with caution.
        </p>

        <Button variant="danger">Reset System Data</Button>
      </Panel>
    </div>
  );
}
