import { useState } from "react";
import { adminService } from "../../api/adminService";

export default function CreateJuniorAdminPage() {
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
      await adminService.createJuniorAdmin(form);
      alert("Junior admin created successfully");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
    } catch (err: any) {
      alert(err?.response?.data || "Error creating admin");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl space-y-4">
      <h1 className="text-xl font-bold">Create Junior Admin</h1>

      <input
        placeholder="First Name"
        value={form.firstName}
        onChange={(e) => update("firstName", e.target.value)}
        className="border p-2 w-full"
      />

      <input
        placeholder="Last Name"
        value={form.lastName}
        onChange={(e) => update("lastName", e.target.value)}
        className="border p-2 w-full"
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        className="border p-2 w-full"
      />

      <input
        placeholder="Phone Number"
        value={form.phoneNumber}
        onChange={(e) => update("phoneNumber", e.target.value)}
        className="border p-2 w-full"
      />

      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => update("password", e.target.value)}
        className="border p-2 w-full"
      />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-black text-white px-4 py-2"
      >
        {loading ? "Creating..." : "Create Junior Admin"}
      </button>
    </div>
  );
}
