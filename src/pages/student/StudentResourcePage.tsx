import { BookOpen } from "lucide-react";
import { Panel } from "../../components/ui/Cards";

export function StudentResourcesPage() {
  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-5 w-5 text-institution-600" />
          <h1 className="text-2xl font-bold text-slate-950">Student Resources</h1>
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Practical university support information and contact guidance will appear
          here once the resources service is connected.
        </p>
      </Panel>
    </div>
  );
}
