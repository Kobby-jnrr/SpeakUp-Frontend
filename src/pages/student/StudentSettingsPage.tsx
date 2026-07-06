import { Field, inputClass } from "../../components/ui/Form";
import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

export function StudentSettingsPage() {
  const { currentUser, addToast, theme, setTheme } = useApp();

  const [notifications, setNotifications] = useState({
    messages: true,
    resources: true,
    announcements: true,
  });

  const fullName = [currentUser?.firstName, currentUser?.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel>
        <h1 className="text-2xl font-bold">Student Settings</h1>
        <p className="text-sm text-slate-600">
          Manage your profile, privacy, and notifications
        </p>
      </Panel>

      {/* PROFILE */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">Profile Information</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name">
            <input className={inputClass} value={fullName} readOnly />
          </Field>

          <Field label="Email">
            <input className={inputClass} value={currentUser?.email} readOnly />
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

          <Field label="Role">
            <input className={inputClass} value={currentUser?.role} readOnly />
          </Field>
        </div>
      </Panel>

      {/* APPEARANCE */}
      <Panel>
        <h2 className="mb-4 font-semibold">Appearance</h2>

        <div className="flex items-center justify-between rounded-md border p-4">
          <div>
            <p className="font-medium">Theme</p>
            <p className="text-xs text-slate-500">
              Switch between light and dark mode
            </p>
          </div>

          <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </Button>
        </div>
      </Panel>

      {/* SECURITY */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">Security</h2>

        <p className="text-sm text-slate-600 mb-3">
          Password management is handled by administrators. If you need a reset,
          contact support.
        </p>

        <Button variant="secondary">Request Password Reset</Button>
      </Panel>

      {/* NOTIFICATIONS */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">
          Notification Preferences
        </h2>

        <div className="space-y-3">
          <label className="flex items-center gap-3 rounded-md border p-3 text-sm">
            <input
              type="checkbox"
              checked={notifications.messages}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  messages: e.target.checked,
                })
              }
            />
            Secure messages from admins
          </label>

          <label className="flex items-center gap-3 rounded-md border p-3 text-sm">
            <input
              type="checkbox"
              checked={notifications.resources}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  resources: e.target.checked,
                })
              }
            />
            New resource uploads
          </label>

          <label className="flex items-center gap-3 rounded-md border p-3 text-sm">
            <input
              type="checkbox"
              checked={notifications.announcements}
              onChange={(e) =>
                setNotifications({
                  ...notifications,
                  announcements: e.target.checked,
                })
              }
            />
            General announcements
          </label>
        </div>

        <Button
          className="mt-4"
          onClick={() => addToast({ title: "Settings saved", tone: "success" })}
        >
          Save preferences
        </Button>
      </Panel>

      {/* PRIVACY */}
      <Panel>
        <h2 className="mb-4 text-base font-semibold">Privacy</h2>

        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" defaultChecked />
          Allow admins to contact me regarding reports
        </label>
      </Panel>
    </div>
  );
}
