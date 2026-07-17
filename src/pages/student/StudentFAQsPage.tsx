import { useState } from "react";
import { Panel } from "../../components/ui/Cards";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is SpeakUp?",
    answer:
      "SpeakUp is a student safety, reporting, and support platform that allows students to report incidents, communicate with authorized support personnel, track report progress, and access important safety resources within the university community.",
  },

  {
    id: 2,
    question: "How do I create an account?",
    answer:
      "You can create an account by selecting Sign Up and providing the required information. Your account allows you to submit reports, track submitted cases, communicate with support personnel, and access available services.",
  },

  {
    id: 3,
    question: "How do I submit a report?",
    answer:
      "You can submit a report by selecting Report Incident from your dashboard or navigation menu. You can choose between a Quick Report for brief information or a Full Report when you want to provide detailed incident information.",
  },

  {
    id: 4,
    question: "Can I submit a report anonymously?",
    answer:
      "Yes. SpeakUp allows anonymous reporting for students who may not feel comfortable revealing their identity. However, anonymous reports are not connected to your student account. This means support personnel may not be able to contact you, request additional information, or provide personalized updates, which may affect how quickly and effectively the case can be handled.",
  },

  {
    id: 5,
    question:
      "What is the difference between a Quick Report and a Full Report?",
    answer:
      "A Quick Report allows you to quickly report an incident with minimal information. A Full Report allows you to provide detailed information such as incident details, respondent information, witnesses, location, and desired outcomes to help support personnel better understand and handle the case.",
  },

  {
    id: 6,
    question: "Will my identity and information remain confidential?",
    answer:
      "Yes. Information submitted through SpeakUp is treated as confidential. Access is limited to authorized university personnel responsible for reviewing and managing student support cases.",
  },

  {
    id: 7,
    question: "What happens after I submit a report?",
    answer:
      "After submission, your report is reviewed by authorized support personnel. The report status can be tracked from the My Reports section as it moves through stages such as Pending, In Progress, Resolved, or Closed.",
  },

  {
    id: 8,
    question:
      "Can I communicate with support personnel after submitting a report?",
    answer:
      "Yes. SpeakUp provides communication features that allow students and assigned support personnel to discuss cases, provide additional information, and share necessary updates.",
  },

  {
    id: 9,
    question: "Who can access my report?",
    answer:
      "Only authorized administrators responsible for managing student support cases can access submitted reports. Access restrictions are applied to protect student privacy and confidentiality.",
  },

  {
    id: 10,
    question: "Can I edit my report after submission?",
    answer:
      "Submitted reports cannot be directly edited by students. If you need to provide additional information or corrections, you can communicate with the assigned support personnel through the platform.",
  },

  {
    id: 11,
    question: "What types of incidents can I report?",
    answer:
      "Students can report safety-related concerns including harassment, abuse, bullying, discrimination, intimidation, violence, and other incidents that affect their wellbeing or university experience.",
  },

  {
    id: 12,
    question: "What happens when a report is resolved or closed?",
    answer:
      "When support personnel complete the necessary actions on a case, the report may be marked as Resolved or Closed. Students can view the final status and any available updates related to their report.",
  },

  {
    id: 13,
    question: "Where can I find additional support resources?",
    answer:
      "You can access available support materials, safety information, emergency contacts, and other helpful resources through the Resources section of SpeakUp.",
  },

  {
    id: 14,
    question: "Who manages SpeakUp?",
    answer:
      "SpeakUp is managed in collaboration with authorized university support personnel, including the Centre for Gender Research, Advocacy and Documentation (CEGRAD), to support a safer and more inclusive university environment.",
  },
];

export function StudentFAQsPage() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel>
        <div>
          <h1 className="text-2xl font-bold text-slate-950">
            Frequently Asked Questions
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Find answers to common questions about reporting incidents,
            confidentiality, account management, case tracking, and support
            services.
          </p>
        </div>
      </Panel>

      {/* FAQ LIST */}
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
                  className={`h-4 w-4 shrink-0 text-slate-500 transition ${
                    isOpen ? "rotate-180" : ""
                  }`}
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
