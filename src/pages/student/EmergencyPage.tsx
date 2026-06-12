import { Shield, HeartHandshake, PhoneCall } from "lucide-react";
import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";

const contacts = [
  {
    title: "Campus Security",
    detail: "+233 30 123 4567",
    note: "24/7 Available",
    icon: Shield,
  },
  {
    title: "Counseling Center",
    detail: "+233 30 987 6543",
    note: "Mon - Fri",
    icon: HeartHandshake,
  },
  {
    title: "National Helpline",
    detail: "0800 111 222",
    note: "24/7 Available",
    icon: PhoneCall,
  },
];

export function EmergencyPage() {
  return (
    <div className="space-y-6">
      <Panel className="border-red-100 bg-red-50">
        <h1 className="text-2xl font-bold text-red-900">Emergency Help</h1>
        <p className="text-sm mt-2">
          If you are in immediate danger, contact security or emergency
          services.
        </p>
      </Panel>

      <div className="grid md:grid-cols-3 gap-4">
        {contacts.map((c) => (
          <Panel key={c.title}>
            <h2 className="font-bold">{c.title}</h2>
            <p className="text-xl font-bold mt-2">{c.detail}</p>
            <p className="text-sm text-slate-600">{c.note}</p>
          </Panel>
        ))}
      </div>

      <Panel>
        <h2 className="font-bold">Safety Guidance</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>Move to a safe location if possible</li>
          <li>Contact trusted persons immediately</li>
          <li>Preserve evidence if safe to do so</li>
        </ul>

        <Link to="/student/report">
          <Button className="mt-4">Submit Emergency Report</Button>
        </Link>
      </Panel>
    </div>
  );
}
