import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "success";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-institution-700 text-white hover:bg-institution-900 focus:ring-institution-600",
    secondary:
      "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 focus:ring-institution-600",
    danger: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-600",
    ghost: "text-slate-700 hover:bg-slate-100 focus:ring-institution-600",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
