import { Panel } from "../../components/ui/Cards";

export function StudentPrivacyPage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel>
        <h1 className="text-2xl font-bold text-slate-950">Privacy Policy</h1>

        <p className="mt-2 text-sm text-slate-600">Last updated: July 2026</p>
      </Panel>

      {/* CONTENT */}
      <Panel>
        <div className="space-y-5 text-sm leading-6 text-slate-700">
          {/* INTRODUCTION */}
          <div>
            <h2 className="text-base font-bold text-slate-950">Introduction</h2>

            <p className="mt-2">
              SpeakUp is a student safety, reporting, and support platform
              developed to provide students with a secure and confidential way
              to report incidents, seek assistance, and access important safety
              information within the university community.
            </p>

            <p className="mt-2">
              This privacy policy explains how information provided through
              SpeakUp is collected, managed, protected, and used by authorized
              personnel responsible for handling student support cases.
            </p>
          </div>

          {/* INFORMATION COLLECTION */}
          <div>
            <h2 className="text-base font-bold text-slate-950">
              Information We Collect
            </h2>

            <p className="mt-2">
              Depending on the type of report submitted, SpeakUp may collect
              information including your name, student details, contact
              information, department, incident details, respondent information,
              and any additional information you choose to provide.
            </p>

            <p className="mt-2">
              Reports submitted through a student account may be linked to your
              profile to allow authorized personnel to follow up, communicate
              with you, and provide updates regarding your case.
            </p>

            <p className="mt-2">
              Anonymous reports are not connected to your student account. While
              anonymous reporting helps students report sensitive issues without
              revealing their identity, it may limit the ability of support
              personnel to contact you, request additional information, or
              provide detailed updates about the progress of the report.
            </p>
          </div>

          {/* INFORMATION USE */}
          <div>
            <h2 className="text-base font-bold text-slate-950">
              How We Use Your Information
            </h2>

            <p className="mt-2">
              Information submitted through SpeakUp is used for reviewing
              reports, managing cases, providing appropriate support,
              communicating with students where possible, and improving student
              safety services within the university.
            </p>
          </div>

          {/* CONFIDENTIALITY */}
          <div>
            <h2 className="text-base font-bold text-slate-950">
              Confidentiality of Reports
            </h2>

            <p className="mt-2">
              Reports submitted through SpeakUp are treated as confidential.
              Access is restricted to authorized university personnel who are
              responsible for reviewing and responding to student reports.
            </p>

            <p className="mt-2">
              Students are encouraged to provide accurate and complete
              information where possible, as identifiable reports allow support
              personnel to provide more effective assistance.
            </p>
          </div>

          {/* DATA SECURITY */}
          <div>
            <h2 className="text-base font-bold text-slate-950">
              Data Security
            </h2>

            <p className="mt-2">
              SpeakUp uses appropriate technical measures to protect submitted
              information from unauthorized access, misuse, or disclosure.
              Access controls and authentication mechanisms are implemented to
              ensure that only permitted users can access protected information.
            </p>
          </div>

          {/* DATA STORAGE */}
          <div>
            <h2 className="text-base font-bold text-slate-950">
              Data Storage and Retention
            </h2>

            <p className="mt-2">
              Information submitted through SpeakUp is stored securely within
              the system database and is retained for purposes related to case
              management, follow-up, reporting, and improving student support
              services.
            </p>
          </div>

          {/* ANONYMOUS REPORTING */}
          <div>
            <h2 className="text-base font-bold text-slate-950">
              Anonymous Reporting
            </h2>

            <p className="mt-2">
              SpeakUp provides anonymous reporting to support students who may
              feel uncomfortable identifying themselves when reporting sensitive
              matters.
            </p>

            <p className="mt-2">
              However, anonymous reporting may affect response effectiveness
              because support personnel cannot directly identify the reporter,
              request clarification, or provide personalized communication.
              Students should consider providing their identity when they feel
              comfortable doing so to allow better support.
            </p>
          </div>

          {/* USER RESPONSIBILITY */}
          <div>
            <h2 className="text-base font-bold text-slate-950">
              User Responsibility
            </h2>

            <p className="mt-2">
              Students are responsible for providing truthful and accurate
              information when submitting reports. False or misleading reports
              may affect the ability of support personnel to respond effectively
              to genuine cases.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-base font-bold text-slate-950">Contact Us</h2>

            <p className="mt-2">
              For questions or concerns regarding privacy, reporting, or the use
              of information on SpeakUp, students may contact the appropriate
              university support office or the Centre for Gender Research,
              Advocacy and Documentation (CEGRAD).
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
