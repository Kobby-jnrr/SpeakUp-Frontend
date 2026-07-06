import { useEffect, useMemo, useState } from "react";
import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { Field, inputClass } from "../../components/ui/Form";
import { useApp } from "../../context/AppContext";
import { resourceService } from "../../api/resourceService";
import type { Resource } from "../../types";

import {
  RESOURCE_CATEGORIES,
  RESOURCE_CATEGORY_ICONS,
  buildCategoryCounts,
  type ResourceCategory,
} from "../../components/resources/resourceConfig";

import { Pin, Search } from "lucide-react";

export function AdminResourcesPage() {
  const { addToast } = useApp();

  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState<Resource | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    summary: "", // ✅ ADD THIS
    description: "",
    category: "General" as ResourceCategory,
    link: "",
    imageUrl: "",
    isPublished: true,
    isPinned: false,
  });

  const load = async () => {
    setLoading(true);
    try {
      const res = await resourceService.getAllAdmin();
      setResources(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setForm({
      title: "",
      summary: "", // ✅ ADD
      description: "",
      category: "General",
      link: "",
      imageUrl: "",
      isPublished: true,
      isPinned: false,
    });
    setEditing(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { ...form };

    if (editing) {
      await resourceService.update(editing.id, payload);
      addToast({
        title: "Updated",
        message: "Resource updated",
        tone: "success",
      });
    } else {
      await resourceService.create(payload);
      addToast({
        title: "Created",
        message: "Resource created",
        tone: "success",
      });
    }

    setShowForm(false);
    reset();
    load();
  };

  const edit = (r: Resource) => {
    setEditing(r);
    setForm({
      title: r.title,
      summary: r.summary ?? "", // ✅ ADD THIS
      description: r.description,
      category: r.category,
      link: r.link ?? "",
      imageUrl: r.imageUrl ?? "",
      isPublished: r.isPublished,
      isPinned: r.isPinned ?? false,
    });
    setShowForm(true);
  };

  const remove = async (id: number) => {
    if (!confirm("Delete resource?")) return;
    await resourceService.remove(id);
    load();
  };

  /* ---------------- FILTER ---------------- */
  const filtered = useMemo(() => {
    return resources
      .filter(
        (r) =>
          r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.category.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
  }, [resources, search]);

  /* ---------------- SHARED COUNTS ---------------- */
  const analytics = useMemo(() => buildCategoryCounts(resources), [resources]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Resources</h1>
          <p className="text-sm text-slate-500">Manage learning materials</p>
        </div>

        <Button
          onClick={() => {
            reset();
            setShowForm(true);
          }}
        >
          Add Resource
        </Button>
      </Panel>
      {/* SEARCH + ANALYTICS */}
      <Panel className="space-y-3">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <input
            className={inputClass}
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          {RESOURCE_CATEGORIES.map((c) => {
            const Icon = RESOURCE_CATEGORY_ICONS[c];

            return (
              <div
                key={c}
                className="flex items-center gap-2 bg-slate-50 p-2 rounded"
              >
                <Icon className="h-4 w-4" />
                <span>{c}</span>
                <span className="ml-auto font-bold">{analytics[c]}</span>
              </div>
            );
          })}
        </div>
      </Panel>
      {/* FORM */}
      {showForm && (
        <Panel>
          <form onSubmit={submit} className="space-y-4">
            <Field label="Title">
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Field>

            <Field label="Summary">
              <input
                className={inputClass}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
              />
            </Field>

            <Field label="Description">
              <textarea
                className={inputClass}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Field>

            <Field label="Category">
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as ResourceCategory,
                  })
                }
              >
                {RESOURCE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Link">
              <input
                className={inputClass}
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />
            </Field>

            <Field label="Image URL">
              <input
                className={inputClass}
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
            </Field>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm({ ...form, isPublished: e.target.checked })
                }
              />
              Published
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isPinned}
                onChange={(e) =>
                  setForm({ ...form, isPinned: e.target.checked })
                }
              />
              Pin Resource
            </label>

            <div className="flex gap-2">
              <Button type="submit">{editing ? "Update" : "Create"}</Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Panel>
      )}
      {/* LIST */}
      {/* LIST (GROUPED + COLLAPSIBLE) */}
      <div className="space-y-6">
        {loading ? (
          <Panel>Loading...</Panel>
        ) : (
          RESOURCE_CATEGORIES.map((cat) => {
            const items = filtered.filter((r) => r.category === cat);

            if (items.length === 0) return null;

            const Icon = RESOURCE_CATEGORY_ICONS[cat];

            return (
              <Panel key={cat}>
                {/* CATEGORY HEADER */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <h2 className="font-bold">{cat}</h2>
                  </div>

                  <span className="text-xs text-slate-500">{items.length}</span>
                </div>

                {/* ITEMS */}
                <div className="space-y-3">
                  {items.map((r) => {
                    const isOpen = editing?.id === r.id;

                    return (
                      <div key={r.id} className="border rounded p-3">
                        {/* HEADER (CLICK TO TOGGLE) */}
                        <button
                          onClick={() => setEditing(isOpen ? null : r)}
                          className="w-full text-left space-y-1"
                        >
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{r.title}</h3>

                            {r.isPinned && (
                              <Pin className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>

                          {r.summary && (
                            <p className="text-xs text-slate-600">
                              {r.summary}
                            </p>
                          )}
                        </button>

                        {/* EXPANDED */}
                        {isOpen && (
                          <div className="mt-3 space-y-3">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {r.description}
                            </p>

                            {/* ACTIONS */}
                            <div className="flex gap-2 pt-3 border-t">
                              <Button onClick={() => edit(r)}>Edit</Button>

                              <Button
                                variant="danger"
                                onClick={() => remove(r.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Panel>
            );
          })
        )}
      </div>{" "}
    </div>
  );
}
