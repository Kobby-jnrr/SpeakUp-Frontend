import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { adminService } from "../../api/adminService";

export default function CreateJuniorAdminPage() {
  const { addToast } = useApp();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    setLoading(true);

    try {
      await adminService.createJuniorAdmin({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,
      });

      addToast({
        title: "Success",
        message: "Junior admin created successfully",
        tone: "success",
      });

      // optional: clear form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
    } catch (err: any) {
      addToast({
        title: "Error",
        message:
          err?.response?.data?.message ||
          err?.response?.data ||
          err?.message ||
          "Error creating admin",
        tone: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* HEADER */}
      <Panel>
        <h1 className="text-2xl font-bold">Create Junior Admin</h1>
        <p className="text-sm text-slate-600 mt-1">
          Add a new junior admin to manage reports and support operations.
        </p>
      </Panel>

      {/* FORM */}
      <Panel>
        <div className="grid gap-4">
          {/* NAME ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* EMAIL */}
          <input
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* PHONE */}
          <input
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={(e) => update("phoneNumber", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* PASSWORD */}
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* BUTTON */}
          <div className="pt-2">
            <Button onClick={submit} disabled={loading} className="w-full">
              {loading ? "Creating..." : "Create Junior Admin"}
            </Button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
