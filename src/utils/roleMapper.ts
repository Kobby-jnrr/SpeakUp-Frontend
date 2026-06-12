export function mapRole(role: any) {
  const r = String(role ?? "").toLowerCase();

  if (r === "1") return "student";
  if (r === "2") return "junioradmin";
  if (r === "3") return "superadmin";

  if (r.includes("student")) return "student";
  if (r.includes("junior")) return "junioradmin";
  if (r.includes("super")) return "superadmin";

  return "student";
}
