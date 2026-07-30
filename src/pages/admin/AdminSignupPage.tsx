import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import api from "../../api/api";

import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";

import { useApp } from "../../context/AppContext";

export default function AdminSignupPage() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { addToast } = useApp();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [invitation, setInvitation] = useState<{
    email: string;
    role: string;
  } | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
  });

  useEffect(() => {
    const validate = async () => {
      try {
        if (!token) {
          throw new Error("Invitation token missing");
        }

        const response = await api.get(
          `/Auth/validate-admin-invitation/${token}`,
        );

        setInvitation(response.data);
      } catch (err: any) {
        addToast({
          title: "Invalid Invitation",

          message: err?.response?.data || err.message,

          tone: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    validate();
  }, []);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,

      [key]: value,
    }));
  };

  const submit = async () => {
    setSubmitting(true);

    try {
      await api.post("/Auth/complete-admin-registration", {
        token,

        ...form,
      });

      addToast({
        title: "Account Created",

        message: "Your admin account has been created successfully.",

        tone: "success",
      });

      navigate("/login");
    } catch (err: any) {
      addToast({
        title: "Registration Failed",

        message: err?.response?.data || "Could not create account",

        tone: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Checking invitation...</div>;
  }

  if (!invitation) {
    return (
      <div className="p-10 text-center">Invalid or expired invitation.</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f9fd] flex items-center justify-center p-5">
      <div className="w-full max-w-xl">
        <Panel>
          <h1 className="text-2xl font-bold">Create SpeakUp Admin Account</h1>

          <p className="mt-2 text-sm text-slate-600">
            You have been invited to join SpeakUp as:
          </p>

          <div className="mt-4 rounded-md bg-blue-50 p-4">
            <p className="font-semibold">Email:</p>

            <p>{invitation.email}</p>

            <p className="mt-2 font-semibold">Role:</p>

            <p>{invitation.role}</p>
          </div>

          <div className="mt-6 space-y-4">
            <input
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className="
              w-full
              rounded-md
              border
              px-3
              py-2
              "
            />

            <input
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className="
              w-full
              rounded-md
              border
              px-3
              py-2
              "
            />

            <input
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={(e) => update("phoneNumber", e.target.value)}
              className="
              w-full
              rounded-md
              border
              px-3
              py-2
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="
              w-full
              rounded-md
              border
              px-3
              py-2
              "
            />

            <Button className="w-full" disabled={submitting} onClick={submit}>
              {submitting ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
