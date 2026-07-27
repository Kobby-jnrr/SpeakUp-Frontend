import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "../api/authService";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");

    if (!email) {
      setMessage("Email missing. Please register again.");
      return;
    }

    if (code.length !== 6) {
      setMessage("Verification code must be exactly 6 digits.");
      return;
    }

    if (!/^\d+$/.test(code)) {
      setMessage("Verification code can only contain numbers.");
      return;
    }

    try {
      setLoading(true);

      await authService.verifyEmail({
        email,
        code,
      });

      setSuccess(true);
      setMessage("Email verified successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error: any) {
      const backendMessage =
        error.response?.data ||
        "Verification failed. Please check your code and try again.";

      setMessage(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-50
      px-4
      "
    >
      <div
        className="
        bg-white
        shadow-xl
        rounded-2xl
        p-8
        w-full
        max-w-md
        text-center
        "
      >
        {!success ? (
          <>
            <div className="text-blue-600 text-5xl mb-4">✉️</div>

            <h1
              className="
              text-2xl
              font-bold
              text-slate-900
              "
            >
              Verify Your Email
            </h1>

            <p
              className="
              mt-3
              text-slate-600
              "
            >
              Enter the 6-digit verification code sent to:
            </p>

            <p
              className="
              mt-2
              font-semibold
              text-blue-600
              "
            >
              {email}
            </p>

            <p
              className="
              mt-4
              text-sm
              text-slate-500
              "
            >
              If you cannot find the email, please check your
              <span className="font-semibold"> Spam or Junk folder.</span>
            </p>

            <p
              className="
              mt-2
              text-sm
              text-slate-500
              "
            >
              The verification code expires after 15 minutes.
            </p>

            {message && (
              <div
                className="
                mt-5
                rounded-lg
                border
                border-red-200
                bg-red-50
                p-3
                text-sm
                text-red-600
                "
              >
                {message}
              </div>
            )}

            <form onSubmit={verifyEmail} className="mt-6 space-y-4">
              <input
                value={code}
                onChange={(e) => {
                  const value = e.target.value;

                  // ONLY ALLOW NUMBERS
                  if (/^\d*$/.test(value)) {
                    setCode(value);
                  }
                }}
                maxLength={6}
                placeholder="123456"
                className="
                w-full
                text-center
                text-3xl
                tracking-[12px]
                border
                border-slate-300
                rounded-xl
                p-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
                "
                required
              />

              <button
                disabled={loading}
                className="
                w-full
                bg-blue-600
                text-white
                py-3
                rounded-xl
                font-semibold
                hover:bg-blue-700
                disabled:bg-blue-300
                "
              >
                {loading ? "Checking code..." : "Verify Email"}
              </button>
            </form>
          </>
        ) : (
          <>
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
              mt-4
              text-xl
              font-bold
              "
            >
              Verification Successful
            </h2>

            <p
              className="
              mt-3
              text-green-600
              "
            >
              {message}
            </p>

            <p
              className="
              mt-4
              text-sm
              text-slate-500
              "
            >
              Redirecting to login in 5 seconds...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
