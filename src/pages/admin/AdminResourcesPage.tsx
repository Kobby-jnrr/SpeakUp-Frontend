import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Panel } from "../../components/ui/Cards";
import { ResourceCard } from "../../components/resources/ResourceCard";

export function AdminResourcesPage() {
  const { resources } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Panel>
        <h1>Resources</h1>
      </Panel>

      <div className="grid gap-4">
        {resources.map((r) => (
          <ResourceCard key={r.id} resource={r} admin />
        ))}
      </div>
    </div>
  );
}
