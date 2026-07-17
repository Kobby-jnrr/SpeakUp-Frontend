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

import { authService } from "../api/authService";
import { Button } from "../components/ui/Button";

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.gender) {
      setError("Please select your gender");
      return;
    }

    try {
      setLoading(true);

      await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        department: formData.department,
        password: formData.password,
      });

      setSuccess("Account created successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err: any) {
      setError(err.response?.data || "Registration failed. Please try again.");
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
      {/* BACK */}

      <Link
        to="/"
        className="
          fixed
          left-6
          top-6
          flex
          items-center
          gap-2
          text-sm
          text-slate-600
          transition
          hover:text-blue-700
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
          w-full
          max-w-6xl
          overflow-hidden
          rounded-3xl
          border
          border-blue-100
          bg-white
          shadow-2xl
        "
      >
        <div className="grid lg:grid-cols-2">
          {/* LEFT BRAND PANEL */}

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
                    src="/images/speaks2.png"
                    alt="SpeakUp Logo"
                    className="h-12 w-12 object-contain"
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">SpeakUp</h2>

                  <p className="text-sm text-blue-100/80">
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
                Join SpeakUp.
                <br />
                Make Your Voice Heard.
              </h1>

              <p
                className="
                  mt-6
                  max-w-md
                  leading-7
                  text-blue-100/80
                "
              >
                Create your account to report incidents, communicate securely
                with support personnel, and follow your case progress.
              </p>
            </div>

            <div className="space-y-5">
              <InfoItem
                icon={<ShieldCheck />}
                text="Confidential reporting system"
              />

              <InfoItem
                icon={<MessageCircle />}
                text="Secure communication with support staff"
              />

              <InfoItem
                icon={<FileCheck />}
                text="Track your submitted reports"
              />
            </div>
          </div>

          {/* FORM */}

          <div className="p-8 sm:p-12">
            <div className="max-w-md mx-auto">
              <h2
                className="
                text-3xl
                font-bold
                text-slate-950
              "
              >
                Create Account
              </h2>

              <p
                className="
                mt-2
                text-sm
                text-slate-600
              "
              >
                Register to access SpeakUp services.
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

              {success && (
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
                    border-green-200
                    bg-green-50
                    p-3
                    text-sm
                    text-green-700
                  "
                >
                  {success}
                </motion.div>
              )}

              <form
                onSubmit={handleSubmit}
                className="
                  mt-7
                  space-y-4
                "
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />

                  <input
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">Select Gender</option>

                    <option>Male</option>

                    <option>Female</option>
                  </select>

                  <input
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />

                <input
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />

                <PasswordInput
                  name="password"
                  placeholder="Password"
                  visible={showPassword}
                  setVisible={setShowPassword}
                  onChange={handleChange}
                />

                <PasswordInput
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  visible={showConfirm}
                  setVisible={setShowConfirm}
                  onChange={handleChange}
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
                  Create Account
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
                Already have an account?
                <Link
                  to="/login"
                  className="
                    ml-1
                    font-semibold
                    text-blue-600
                    hover:underline
                  "
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const inputStyle = `
w-full
rounded-xl
border
border-slate-200
bg-slate-50
px-4
py-3
outline-none
transition

focus:border-blue-500
focus:ring-2
focus:ring-blue-500/20
`;

function PasswordInput({
  name,
  placeholder,
  visible,
  setVisible,
  onChange,
}: {
  name: string;
  placeholder: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
  onChange: any;
}) {
  return (
    <div className="relative">
      <input
        name={name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        onChange={onChange}
        className={`${inputStyle} pr-12`}
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
