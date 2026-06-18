import { Panel } from "../../components/ui/Cards";

export function AdminResourcesPage() {
  return (
    <div className="space-y-4">
      <Panel>
        <h1 className="text-2xl font-bold text-slate-950">Resources</h1>
        <p className="mt-2 text-sm text-slate-500">
          Resource management will be available here once the resources service is connected.
        </p>
      </Panel>
    </div>
  );
}
