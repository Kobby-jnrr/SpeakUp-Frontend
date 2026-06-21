import { useState } from "react";
import {
  BookOpen,
  Shield,
  PhoneCall,
  MessageCircle,
  AlertTriangle,
  FileText,
  Info,
  HeartHandshake,
  ChevronRight,
  X,
} from "lucide-react";
import { Panel } from "../../components/ui/Cards";

/* -------------------------
   EMERGENCY CONTACTS
-------------------------- */
const emergencyContacts = [
  {
    title: "Campus Security",
    detail: "+233 30 123 4567",
    note: "24/7 Emergency Response",
    icon: Shield,
    tone: "bg-red-50 text-red-700",
  },
  {
    title: "Counseling Center",
    detail: "+233 30 987 6543",
    note: "Mon - Fri, 8AM - 6PM",
    icon: HeartHandshake,
    tone: "bg-blue-50 text-blue-700",
  },
  {
    title: "National Helpline",
    detail: "0800 111 222",
    note: "Free 24/7 Support",
    icon: PhoneCall,
    tone: "bg-emerald-50 text-emerald-700",
  },
];

/* -------------------------
   STEP-BY-STEP RESOURCES
-------------------------- */
const resources = [
  {
    title: "How SpeakUp Works",
    icon: Info,
    color: "bg-slate-50 text-slate-700 border-slate-200",
    steps: [
      "Login to your account",
      "Go to your Dashboard",
      "Click 'Submit Report'",
      "Fill in incident details",
      "Submit securely",
      "Track progress in 'My Reports'",
    ],
  },
  {
    title: "How to Submit a Report",
    icon: FileText,
    color: "bg-blue-50 text-blue-700 border-blue-100",
    steps: [
      "Open Student Dashboard",
      "Click 'Submit Report'",
      "Enter title and description",
      "Click Submit",
      "Report is sent to admins securely",
    ],
  },
  {
    title: "How to Track Reports",
    icon: AlertTriangle,
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    steps: [
      "Go to 'My Reports'",
      "View all submitted cases",
      "Check status updates",
      "Click a report for full details",
    ],
  },
  {
    title: "How Chat Works",
    icon: MessageCircle,
    color: "bg-violet-50 text-violet-700 border-violet-100",
    steps: [
      "Open Chat page",
      "Start or select conversation",
      "Type your message",
      "Wait for admin response",
      "Messages auto-refresh every few seconds",
    ],
  },
  {
    title: "Privacy & Confidentiality",
    icon: Shield,
    color: "bg-slate-50 text-slate-700 border-slate-200",
    steps: [
      "Reports are stored securely in database",
      "Only authorized staff can view cases",
      "Your identity is protected where possible",
      "Chats are private between you and staff",
    ],
  },
];

/* -------------------------
   MAIN COMPONENT
-------------------------- */
export function StudentResourcesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel>
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-institution-600" />
          <div>
            <h1 className="text-2xl font-bold">Student Resources</h1>
            <p className="text-sm text-slate-600">
              Click each topic to learn step-by-step how SpeakUp works
            </p>
          </div>
        </div>
      </Panel>

      {/* RESOURCES (ACCORDION) */}
      <div className="space-y-3">
        {resources.map((r, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={r.title} className={`border rounded-xl ${r.color}`}>
              {/* HEADER BUTTON */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <r.icon className="h-5 w-5" />
                  <span className="font-bold text-sm">{r.title}</span>
                </div>

                {isOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {/* EXPANDED CONTENT */}
              {isOpen && (
                <div className="px-4 pb-4">
                  <ol className="space-y-2 text-sm text-slate-700 list-decimal pl-5">
                    {r.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* EMERGENCY CONTACTS */}
      <Panel>
        <h2 className="text-lg font-bold mb-4">Emergency Contacts</h2>

        <div className="space-y-4">
          {emergencyContacts.map((c) => (
            <div key={c.title} className="flex items-start gap-3">
              <div className={`p-2 rounded-md ${c.tone}`}>
                <c.icon className="h-4 w-4" />
              </div>

              <div>
                <p className="font-bold text-sm">{c.title}</p>
                <p className="text-sm text-slate-700">{c.detail}</p>
                <p className="text-xs text-slate-500">{c.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* FOOTER */}
      <Panel className="bg-slate-50">
        <p className="text-sm text-slate-600">
          If you are in immediate danger, contact campus security or emergency
          services immediately.
        </p>
      </Panel>
    </div>
  );
}
