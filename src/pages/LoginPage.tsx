import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Shield, MessageSquare } from "lucide-react";
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
      setError(err.response?.data || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-100 to-institution-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl">
        <div className="grid lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col justify-between bg-institution-600 text-white p-12">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Shield />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">SpeakUp</h2>
                  <p className="text-white/70 text-sm">
                    Student Protection System
                  </p>
                </div>
              </div>

              <h1 className="text-5xl font-extrabold leading-tight">
                Speak Up.
                <br />
                Stay Safe.
              </h1>

              <p className="mt-6 text-white/80">
                Confidential reporting, secure messaging, and real-time case
                tracking.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Shield /> Anonymous Reporting
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare /> Secure Chat System
              </div>
              <div className="flex items-center gap-3">
                <Shield /> Case Monitoring
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white/80 backdrop-blur p-8 sm:p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
              <h1 className="text-3xl font-bold text-slate-900">
                Welcome Back
              </h1>

              <p className="text-slate-500 mt-1">Login to continue</p>

              {error && (
                <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="mt-6 space-y-5">
                {/* EMAIL */}
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border focus:ring-2 focus:ring-institution-500"
                  required
                />

                {/* PASSWORD */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, password: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border pr-12 focus:ring-2 focus:ring-institution-500"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3 text-slate-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="text-right">
                  <button className="text-sm text-institution-600 hover:underline">
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  className="w-full rounded-xl py-3"
                >
                  Login
                </Button>
              </form>

              <p className="text-center text-sm mt-6 text-slate-500">
                Don't have an account?{" "}
                <Link
                  className="text-institution-600 font-semibold"
                  to="/register"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
