import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

import { authService } from "../api/authService";
import { Button } from "../components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      await authService.forgotPassword(email);

      setSuccess(
        "If your account exists, a password reset link has been sent.",
      );
    } catch (err: any) {
      setError(err.response?.data || "Unable to send reset link.");
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
      <Link
        to="/login"
        className="
          fixed
          left-6
          top-6
          flex
          items-center
          gap-2
          text-sm
          text-slate-600
          hover:text-blue-700
        "
      >
        <ArrowLeft size={16} />
        Back to Login
      </Link>

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
          rounded-3xl
          bg-white
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
          Forgot Password?
        </h1>

        <p
          className="
          mt-3
          text-sm
          text-slate-600
        "
        >
          Enter your email address and we will send you a password reset link.
        </p>

        {error && (
          <div
            className="
            mt-5
            rounded-xl
            bg-red-50
            border
            border-red-200
            p-3
            text-sm
            text-red-600
          "
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="
            mt-5
            rounded-xl
            bg-green-50
            border
            border-green-200
            p-3
            text-sm
            text-green-700
          "
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3
              outline-none
              focus:border-blue-600
            "
          />

          <Button
            type="submit"
            loading={loading}
            className="
              w-full
              rounded-xl
              bg-blue-600
              py-3
              hover:bg-blue-700
            "
          >
            Send Reset Link
          </Button>
        </form>

        <p
          className="
          mt-6
          text-center
          text-sm
          text-slate-600
        "
        >
          Remember your password?
          <Link
            to="/login"
            className="
              ml-1
              text-blue-600
              font-semibold
            "
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
