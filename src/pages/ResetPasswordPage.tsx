import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import { authService } from "../api/authService";
import { Button } from "../components/ui/Button";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await authService.resetPassword({
        email,
        token,
        newPassword: password,
      });

      setSuccess("Password reset successful. Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-[#f6f9fd]
      flex
      items-center
      justify-center
      px-4
    "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          w-full
          max-w-md
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-blue-100
          p-8
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-slate-900
        "
        >
          Reset Password
        </h1>

        <p
          className="
          mt-3
          text-sm
          text-slate-600
        "
        >
          Create a new password for your SpeakUp account.
        </p>

        {error && (
          <div
            className="
            mt-5
            bg-red-50
            border
            border-red-200
            text-red-600
            rounded-xl
            p-3
            text-sm
          "
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="
            mt-5
            bg-green-50
            border
            border-green-200
            text-green-700
            rounded-xl
            p-3
            text-sm
          "
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="inputStyle"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="inputStyle"
          />

          <Button
            type="submit"
            loading={loading}
            className="
              w-full
              rounded-xl
              bg-blue-600
              py-3
            "
          >
            Reset Password
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
