import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  MessageCircle,
  FileCheck,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";

import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/Button";

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { role } = await login(form.email, form.password);

      if (role === "SuperAdmin" || role === "JuniorAdmin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/home");
      }
    } catch (err: any) {
      setError(
        err.response?.data || "Invalid email or password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f9fd] flex items-center justify-center px-4 py-10">
      {/* BACK HOME */}

      <Link
        to="/"
        className="
        fixed left-6 top-6
        flex items-center gap-2
        text-sm text-slate-600
        transition hover:text-blue-700
        "
      >
        <ArrowLeft className="h-4 w-4" />
        Back to SpeakUp
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
        w-full max-w-6xl
        overflow-hidden
        rounded-3xl
        border border-blue-100
        bg-white
        shadow-xl
        "
      >
        <div className="grid lg:grid-cols-2">
          {/* BRAND SIDE */}

          <div
            className="
            hidden lg:flex
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
                flex h-12 w-12
                items-center justify-center
                rounded-xl
                bg-white
                "
                >
                  <img
                    src="/images/speaks.png"
                    alt="SpeakUp Logo"
                    className="h-10 w-10 object-contain"
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
                Speak Up.
                <br />
                Stay Safe.
              </h1>

              <p
                className="
              mt-6
              max-w-md
              leading-7
              text-blue-100
              "
              >
                A secure university platform that allows students to report
                incidents, seek support, and communicate with authorized
                personnel confidentially.
              </p>
            </div>

            <div className="space-y-5">
              <InfoItem
                icon={<ShieldCheck />}
                text="Confidential incident reporting"
              />

              <InfoItem
                icon={<MessageCircle />}
                text="Secure communication with support staff"
              />

              <InfoItem
                icon={<FileCheck />}
                text="Track your case progress easily"
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
              <h2
                className="
              text-3xl
              font-bold
              text-slate-950
              "
              >
                Welcome Back
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Login to access your SpeakUp account.
              </p>

              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
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
                </motion.div>
              )}

              <form onSubmit={handleLogin} className="mt-7 space-y-5">
                <div>
                  <label
                    className="
                  text-sm
                  font-medium
                  text-slate-700
                  "
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    placeholder="student@example.com"
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="
                    mt-2
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-blue-600
                    focus:ring-2
                    focus:ring-blue-600/20
                    "
                    required
                  />
                </div>

                <div>
                  <label
                    className="
                  text-sm
                  font-medium
                  text-slate-700
                  "
                  >
                    Password
                  </label>

                  <div className="relative mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      placeholder="Enter password"
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
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
                      transition
                      focus:border-blue-600
                      focus:ring-2
                      focus:ring-blue-600/20
                      "
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="
                      absolute
                      right-4
                      top-3
                      text-slate-500
                      hover:text-blue-600
                      "
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="
                    text-sm
                    text-blue-600
                    hover:underline
                    "
                  >
                    Forgot password?
                  </button>
                </div>

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
                  Login
                </Button>
              </form>

              <p
                className="
              mt-7
              text-center
              text-sm
              text-slate-600
              "
              >
                Don't have an account?
                <Link
                  to="/register"
                  className="
                  ml-1
                  font-semibold
                  text-blue-600
                  hover:underline
                  "
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
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
