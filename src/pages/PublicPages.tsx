import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { RoleSwitcher } from "../components/layout/RoleSwitcher";
import { Button } from "../components/ui/Button";
import { EmptyState, Panel } from "../components/ui/Cards";
import { useApp } from "../context/AppContext";

export function HomePage() {
  const { role } = useApp();
  return (
    <AppLayout>
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <p className="text-sm font-semibold uppercase tracking-wide text-institution-700">
            University student welfare
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Digital abuse reporting and case management portal
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Submit confidential reports, track case progress, and access
            authorized support resources through a mock-only production
            interface.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/choose-role">
              <Button>
                Open demo portal <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">Demo signup</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary">Demo login</Button>
            </Link>
          </div>
        </section>
        <Panel className="bg-white">
          <ShieldCheck
            className="h-10 w-10 text-institution-700"
            aria-hidden="true"
          />
          <h2 className="mt-4 text-xl font-bold text-slate-950">
            Confidential by design
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <li>Anonymous reporting option for students.</li>
            <li>Role-based access simulation for students and counselors.</li>
            <li>Mock data only, structured for future backend integration.</li>
          </ul>
        </Panel>
      </div>
    </AppLayout>
  );
}

export function ChooseRole() {
  const { role } = useApp();
  const navigate = useNavigate();
  return (
    <AppLayout>
      <div className="mx-auto max-w-xl">
        <Panel>
          <h1 className="text-2xl font-bold text-slate-950">Role Selection</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Choose a demo role to test the student and admin interfaces.
          </p>
          <div className="mt-6">
            <RoleSwitcher />
          </div>
          <Button
            className="mt-6 w-full"
            onClick={() =>
              navigate(
                role === "admin" ? "/admin/dashboard" : "/student/dashboard",
              )
            }
          >
            Continue to portal
          </Button>
        </Panel>
      </div>
    </AppLayout>
  );
}

export function NotFoundPage() {
  return (
    <AppLayout>
      <EmptyState
        title="Page not found"
        message="The page you requested does not exist or may have moved. Return to the appropriate portal dashboard."
        action={
          <Link to="/">
            <Button>Return home</Button>
          </Link>
        }
      />
    </AppLayout>
  );
}
