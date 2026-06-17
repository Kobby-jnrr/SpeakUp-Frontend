import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import type { Role } from "../types";

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
      const { role } = await login(email, password);

      if (role === "SuperAdmin" || role === "JuniorAdmin") {
        console.log("NAVIGATING TO ADMIN");
        navigate("/admin/dashboard");
      } else {
        console.log("NAVIGATING TO STUDENT");
        navigate("/student/home");
      }
    } catch (err: any) {
      setError(err.response?.data || err.message || "Login failed");
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
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-institution-600 text-white py-2 rounded-lg disabled:opacity-50"
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
