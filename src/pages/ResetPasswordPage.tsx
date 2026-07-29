import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  MessageCircle,
  FileCheck,
  ArrowLeft,
} from "lucide-react";
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!email || !token) {
      setError(
        "Invalid password reset link. Please request a new password reset.",
      );
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

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

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setError(
        err.response?.data || "Unable to reset password. Please try again.",
      );
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
      py-10
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
        transition={{
          duration: 0.6,
        }}
        className="
        w-full
        max-w-6xl
        overflow-hidden
        rounded-3xl
        bg-white
        border
        border-blue-100
        shadow-xl
        "
      >
        <div className="grid lg:grid-cols-2">
          {/* BRAND SIDE */}

          <div
            className="
            hidden
            lg:flex
            flex-col
            justify-between
            bg-[#082642]
            p-12
            text-white
            "
          >
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  p-2
                  "
                >
                  <img
                    src="/images/speaks3.png"
                    alt="SpeakUp Logo"
                    className="
                    h-12
                    w-12
                    object-contain
                    "
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">SpeakUp</h2>

                  <p className="text-sm text-blue-100">
                    Student Safety Platform
                  </p>
                </div>
              </div>

              <h1
                className="
                mt-12
                text-5xl
                font-extrabold
                leading-tight
                "
              >
                Secure.
                <br />
                Recover.
                <br />
                Continue.
              </h1>

              <p
                className="
                mt-6
                max-w-md
                text-blue-100
                leading-7
                "
              >
                Reset your password securely and regain access to your SpeakUp
                account.
              </p>
            </div>

            <div className="space-y-5">
              <InfoItem
                icon={<ShieldCheck />}
                text="Your account security matters"
              />

              <InfoItem
                icon={<MessageCircle />}
                text="Private communication support"
              />

              <InfoItem
                icon={<FileCheck />}
                text="Continue tracking your reports"
              />
            </div>
          </div>

          {/* FORM SIDE */}

          <div
            className="
            flex
            items-center
            justify-center
            p-8
            sm:p-12
            "
          >
            <div className="w-full max-w-md">
              {!success ? (
                <>
                  <h1
                    className="
                  text-3xl
                  font-bold
                  text-slate-950
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

                  {email && (
                    <p
                      className="
                    mt-4
                    text-sm
                    text-blue-600
                    font-medium
                    "
                    >
                      {email}
                    </p>
                  )}

                  {error && (
                    <div
                      className="
                    mt-5
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    p-3
                    text-sm
                    text-red-600
                    "
                    >
                      {error}
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="
                  mt-7
                  space-y-5
                  "
                  >
                    <PasswordInput
                      placeholder="New password"
                      value={password}
                      visible={showPassword}
                      setVisible={setShowPassword}
                      onChange={setPassword}
                    />

                    <PasswordInput
                      placeholder="Confirm password"
                      value={confirm}
                      visible={showConfirm}
                      setVisible={setShowConfirm}
                      onChange={setConfirm}
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
                      Reset Password
                    </Button>
                  </form>
                </>
              ) : (
                <div
                  className="
                  text-center
                  "
                >
                  <div
                    className="
                    text-green-600
                    text-6xl
                    "
                  >
                    ✓
                  </div>

                  <h2
                    className="
                    mt-5
                    text-2xl
                    font-bold
                    "
                  >
                    Password Reset Successful
                  </h2>

                  <p
                    className="
                    mt-3
                    text-slate-600
                    "
                  >
                    Your password has been changed successfully.
                  </p>

                  <p
                    className="
                    mt-3
                    text-sm
                    text-slate-500
                    "
                  >
                    Redirecting you to login...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PasswordInput({
  placeholder,
  value,
  visible,
  setVisible,
  onChange,
}: {
  placeholder: string;
  value: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
        w-full
        rounded-xl
        border
        border-slate-200
        bg-slate-50
        px-4
        py-3
        pr-12
        outline-none
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/20
        "
        required
      />

      <button
        type="button"
        onClick={() => setVisible(!visible)}
        className="
        absolute
        right-4
        top-3
        text-slate-500
        hover:text-blue-600
        "
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

function InfoItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="
        rounded-lg
        bg-white/10
        p-2
        "
      >
        {icon}
      </div>

      <p className="text-sm text-blue-50">{text}</p>
    </div>
  );
}
