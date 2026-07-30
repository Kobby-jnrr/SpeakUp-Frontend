import { useState } from "react";

import { useApp } from "../../context/AppContext";

import { Panel } from "../../components/ui/Cards";

import { Button } from "../../components/ui/Button";

import { adminService } from "../../api/adminService";

type AdminType = "JuniorAdmin" | "SuperAdmin";

export default function CreateAdminPage() {
  const { addToast } = useApp();

  const [role, setRole] = useState<AdminType>("JuniorAdmin");

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email) {
      addToast({
        title: "Error",
        message: "Email is required",
        tone: "error",
      });

      return;
    }

    setLoading(true);

    try {
      await adminService.createAdminInvitation({
        email,
        role,
      });

      addToast({
        title: "Invitation Sent",

        message: `Admin signup invitation sent to ${email}`,

        tone: "success",
      });

      setEmail("");
    } catch (err: any) {
      addToast({
        title: "Error",

        message:
          err?.response?.data?.message ||
          err?.response?.data ||
          "Failed to create invitation",

        tone: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Panel>
        <h1 className="text-2xl font-bold">Create Admin Account</h1>

        <p className="mt-1 text-sm text-slate-600">
          Generate a secure signup invitation. The invited person will complete
          their own account setup.
        </p>
      </Panel>

      <Panel>
        <div className="space-y-5">
          {/* ROLE SELECT */}

          <div>
            <label className="text-sm font-semibold">Account Type</label>

            <div className="mt-2 flex gap-3">
              <button
                onClick={() => setRole("JuniorAdmin")}
                className={`
                rounded-md border px-4 py-2 text-sm font-semibold

                ${
                  role === "JuniorAdmin"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700"
                }

                `}
              >
                Junior Admin
              </button>

              <button
                onClick={() => setRole("SuperAdmin")}
                className={`
                rounded-md border px-4 py-2 text-sm font-semibold

                ${
                  role === "SuperAdmin"
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-slate-700"
                }

                `}
              >
                Super Admin
              </button>
            </div>
          </div>

          {/* EMAIL */}

          <div>
            <label className="text-sm font-semibold">Email Address</label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="person@example.com"
              className="
              mt-2
              w-full
              rounded-md
              border
              border-slate-300
              px-3
              py-2
              text-sm
              outline-none
              focus:ring-2
              focus:ring-blue-600
              "
            />
          </div>

          <Button className="w-full" onClick={submit} disabled={loading}>
            {loading ? "Sending Invitation..." : "Generate Signup Link"}
          </Button>
        </div>
      </Panel>
    </div>
  );
}
