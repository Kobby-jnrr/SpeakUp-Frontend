import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Panel } from "../../components/ui/Cards";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I report an incident?",
    answer:
      "Use the Report Incident page from the sidebar or quick actions. Fill out the form with details, and your report will be reviewed by campus support staff.",
  },
  {
    id: 2,
    question: "Will my report be kept confidential?",
    answer:
      "Yes. All reports are handled confidentially. Only authorized support staff can access your information, and your identity is protected throughout the process.",
  },
  {
    id: 3,
    question: "What happens after I submit a report?",
    answer:
      "Your report enters a review queue. You will receive status updates as it moves through Pending, In Review, and Resolved stages. Track progress on the My Reports page.",
  },
  {
    id: 4,
    question: "Can I speak to a counselor anonymously?",
    answer:
      "Yes. The Counseling Center offers confidential sessions. You can reach them through the Emergency Help page or by visiting the center directly.",
  },
  {
    id: 5,
    question: "What types of incidents can I report?",
    answer:
      "You can report sexual abuse, physical abuse, verbal abuse, emotional abuse, harassment, bullying, and other safety concerns.",
  },
  {
    id: 6,
    question: "How do I update my contact information?",
    answer:
      "Go to the Settings page from the sidebar to update your profile, email, department, and notification preferences.",
  },
];

export function StudentFAQsPage() {
  const [openId, setOpenId] = useState<number | null>(1);
  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">FAQs</h1>
            <p className="mt-2 text-sm text-slate-600">
              Common questions about reporting, privacy, and support services.
            </p>
          </div>
          <Link to="/student/resources">
            <Button variant="secondary">Browse Resources</Button>
          </Link>
        </div>
      </Panel>
      <div className="space-y-3">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="rounded-md border border-slate-200 bg-white transition"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-bold text-slate-950">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-500 transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
