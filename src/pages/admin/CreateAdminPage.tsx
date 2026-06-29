import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { adminService } from "../../api/adminService";

type AdminType = "Junior" | "Super";

export default function CreateAdminPage() {
  const { addToast } = useApp();

  const [adminType, setAdminType] = useState<AdminType>("Junior");

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
      if (adminType === "Super") {
        await adminService.createSuperAdmin(form);
      } else {
        await adminService.createJuniorAdmin(form);
      }

      addToast({
        title: "Success",
        message:
          adminType === "Super"
            ? "Super admin created successfully"
            : "Junior admin created successfully",
        tone: "success",
      });

      // reset form
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
        <h1 className="text-2xl font-bold">Create {adminType} Admin</h1>
        <p className="text-sm text-slate-600 mt-1">
          Add a new admin account to manage reports and system operations.
        </p>

        {/* TOGGLE */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setAdminType("Junior")}
            className={`px-4 py-2 rounded text-sm font-semibold border transition ${
              adminType === "Junior"
                ? "bg-institution-600 text-white border-institution-600"
                : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            Junior Admin
          </button>

          <button
            onClick={() => setAdminType("Super")}
            className={`px-4 py-2 rounded text-sm font-semibold border transition ${
              adminType === "Super"
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            Super Admin
          </button>
        </div>
      </Panel>

      {/* FORM */}
      <Panel>
        <div className="grid gap-4">
          {/* NAME */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-institution-600"
            />

            <input
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-institution-600"
            />
          </div>

          {/* EMAIL */}
          <input
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-institution-600"
          />

          {/* PHONE */}
          <input
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={(e) => update("phoneNumber", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-institution-600"
          />

          {/* PASSWORD */}
          <input
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-institution-600"
          />

          {/* BUTTON */}
          <div className="pt-2">
            <Button onClick={submit} disabled={loading} className="w-full">
              {loading ? "Creating..." : `Create ${adminType} Admin`}
            </Button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
