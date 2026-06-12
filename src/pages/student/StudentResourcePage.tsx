import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { ResourceCard } from "../../components/resources/ResourceCard";
import { Panel, EmptyState } from "../../components/ui/Cards";
import { SearchInput, FilterDropdown } from "../../components/ui/Form";

export function StudentResourcesPage() {
  const { resources } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");

  const visible = resources
    .filter((item) => item.published)
    .filter((item) =>
      [item.title, item.summary, item.category]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .filter(
      (item) => category === "All categories" || item.category === category,
    );

  const categories = [
    "All categories",
    ...Array.from(new Set(resources.map((item) => item.category))),
  ];

  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="text-2xl font-bold text-slate-950">Student resources</h1>
        <p className="mt-2 text-sm text-slate-600">
          Practical university support information and contact guidance.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_220px]">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search resources"
          />

          <FilterDropdown
            label="Category"
            value={category}
            onChange={setCategory}
            options={categories}
          />
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {visible.length === 0 && (
        <EmptyState
          title="No resources found"
          message="Try a different search term or category."
        />
      )}
    </div>
  );
}
