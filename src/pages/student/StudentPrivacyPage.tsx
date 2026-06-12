import { Panel } from "../../components/ui/Cards";

export function StudentPrivacyPage() {
  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="text-2xl font-bold text-slate-950">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-600">Last updated: May 2026</p>
      </Panel>
      <Panel>
        <div className="space-y-5 text-sm leading-6 text-slate-700">
          <div>
            <h2 className="text-base font-bold text-slate-950">Information We Collect</h2>
            <p className="mt-2">
              We collect information you provide when submitting reports,
              including your name, student ID, department, and incident details.
              This information is used solely to process and respond to your
              reports.
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">How We Use Your Information</h2>
            <p className="mt-2">
              Your data is used to investigate reports, coordinate support
              services, and improve campus safety programs. We never share your
              information with unauthorized third parties.
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">Data Security</h2>
            <p className="mt-2">
              All reports and personal data are stored securely with encryption.
              Only authorized campus support staff can access your information,
              and access is logged for accountability.
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">Your Rights</h2>
            <p className="mt-2">
              You have the right to request access to, correction of, or
              deletion of your personal data. Contact the Data Protection
              Officer through the Settings page for such requests.
            </p>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-950">Contact Us</h2>
            <p className="mt-2">
              If you have questions about this privacy policy, please reach out
              through the Contact Us section or visit the Counseling Center.
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
