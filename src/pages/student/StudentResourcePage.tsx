import { useEffect, useMemo, useState } from "react";
import { Panel } from "../../components/ui/Cards";
import { resourceService } from "../../api/resourceService";
import type { Resource } from "../../types";

import {
  RESOURCE_CATEGORY_ICONS,
  RESOURCE_CATEGORIES,
  buildCategoryCounts,
  type ResourceCategory,
} from "../../components/resources/resourceConfig";

import { ArrowLeft } from "lucide-react";

type Grouped = Record<ResourceCategory, Resource[]>;

export function StudentResourcesPage() {
  const [grouped, setGrouped] = useState<Grouped>({} as Grouped);
  const [openCategory, setOpenCategory] = useState<ResourceCategory | null>(
    null,
  );
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await resourceService.getPublished();

      const map: Grouped = {} as Grouped;

      res.data.forEach((r) => {
        if (!map[r.category]) map[r.category] = [];
        map[r.category].push(r);
      });

      setGrouped(map);
      setLoading(false);
    };

    load();
  }, []);

  const categoryCounts = useMemo(() => {
    const all = Object.values(grouped).flat();
    return buildCategoryCounts(all);
  }, [grouped]);

  /* ================= FULL RESOURCE PAGE ================= */
  if (selectedResource) {
    const r = selectedResource;
    const Icon = RESOURCE_CATEGORY_ICONS[r.category];

    return (
      <div className="space-y-4">
        <Panel>
          <button
            onClick={() => setSelectedResource(null)}
            className="flex items-center gap-2 text-sm text-slate-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </button>
        </Panel>

        <Panel className="space-y-4">
          {/* HEADER */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              <h1 className="text-xl font-bold">{r.title}</h1>
            </div>

            {r.summary && <p className="text-sm text-slate-500">{r.summary}</p>}
          </div>

          {/* IMAGE */}
          {r.imageUrl && (
            <div className="w-full aspect-[16/9] overflow-hidden rounded-md bg-slate-100">
              <img
                src={r.imageUrl}
                alt={r.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}

          {/* DESCRIPTION */}
          <p className="text-sm leading-relaxed text-slate-700">
            {r.description}
          </p>

          {/* LINK */}
          {r.link && (
            <a
              href={r.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-blue-600 underline text-sm"
            >
              Open full external resource
            </a>
          )}
        </Panel>
      </div>
    );
  }

  /* ================= CATEGORY VIEW ================= */
  return (
    <div className="space-y-6">
      <Panel>
        <h1 className="text-2xl font-bold">Student Resources</h1>
        <p className="text-sm text-slate-600">
          Browse learning materials by category
        </p>
      </Panel>

      {loading ? (
        <Panel>Loading...</Panel>
      ) : (
        RESOURCE_CATEGORIES.map((cat) => {
          const items = grouped[cat] || [];
          const Icon = RESOURCE_CATEGORY_ICONS[cat];

          return (
            <Panel key={cat}>
              {/* CATEGORY HEADER */}
              <button
                onClick={() =>
                  setOpenCategory(openCategory === cat ? null : cat)
                }
                className="w-full flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-bold">{cat}</span>
                </div>

                <span className="text-sm text-slate-600">
                  {categoryCounts[cat] || 0}
                </span>
              </button>

              {/* ITEMS */}
              {openCategory === cat && (
                <div className="mt-4 space-y-3">
                  {items.slice(0, 6).map((r) => (
                    <div key={r.id} className="border p-3 rounded space-y-2">
                      {/* TITLE + summary */}
                      <div className="space-y-1">
                        <p className="font-semibold text-sm">{r.title}</p>

                        {r.summary && (
                          <p className="text-xs text-slate-500">{r.summary}</p>
                        )}
                      </div>

                      {/* IMAGE */}
                      {r.imageUrl && (
                        <div className="w-full aspect-[16/9] overflow-hidden rounded-md bg-slate-100">
                          <img
                            src={r.imageUrl}
                            alt={r.title}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      )}

                      {/* OPEN BUTTON */}
                      <button
                        onClick={() => setSelectedResource(r)}
                        className="text-blue-600 text-xs underline"
                      >
                        Open Resource
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          );
        })
      )}
    </div>
  );
}
