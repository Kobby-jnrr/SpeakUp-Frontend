import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { isAdminRole } from "../utils/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      const savedUser = localStorage.getItem("user");
      const role = savedUser
        ? JSON.parse(savedUser).role?.toLowerCase()
        : "student";

      navigate(isAdminRole(role) ? "/admin/dashboard" : "/student/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-institution-50 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-institution-100">
        <h1 className="text-2xl font-bold text-center text-institution-900">
          SpeakUp Login
        </h1>

        <p className="text-sm text-center text-gray-500 mb-6">
          Student Abuse Reporting System
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-institution-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-institution-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-institution-600 text-white py-2 rounded-lg hover:bg-institution-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-institution-600 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
