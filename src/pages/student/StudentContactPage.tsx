import { Link } from "react-router-dom";
import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { MapPin, Phone, Mail, Clock3 } from "lucide-react";

export function StudentContactPage() {
  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="text-2xl font-bold text-slate-950">Contact Us</h1>
        <p className="mt-2 text-sm text-slate-600">
          Reach out to CEGRAD or campus support services.
        </p>
      </Panel>
      <div className="grid gap-4 md:grid-cols-2">
        <Panel>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-700">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-950">
                CEGRAD Office
              </h2>
              <p className="text-sm text-slate-600">University of Cape Coast</p>
              <p className="text-sm text-slate-600">
                Cape Coast, Central Region, Ghana
              </p>
            </div>
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-950">Phone</h2>
              <p className="text-sm text-slate-600">+233 31 229 259</p>
              <p className="text-sm text-slate-600">Mon – Fri, 8AM – 5PM</p>
            </div>
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-violet-50 text-violet-700">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-950">Email</h2>
              <p className="text-sm text-slate-600">cegrad@ucc.edu.gh</p>
              <p className="text-sm text-slate-600">support@ucc.edu.gh</p>
            </div>
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-50 text-amber-700">
              <Clock3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-950">Office Hours</h2>
              <p className="text-sm text-slate-600">
                Monday – Friday: 8:00 AM – 5:00 PM
              </p>
              <p className="text-sm text-slate-600">
                Saturday – Sunday: Closed
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
