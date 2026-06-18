import { useEffect, useState } from "react";
import { Zap, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/ui/Button";
import { Panel } from "../../components/ui/Cards";
import { Field, inputClass } from "../../components/ui/Form";
import { homepageService } from "../../api/homepageService";
import type { HomePageContentItem } from "../../types";

const CONTENT_TYPES = ["Hero", "Bulletin", "SafetyTip"];

const TYPE_LABELS: Record<string, string> = {
  Hero: "Hero Section",
  Bulletin: "Bulletin",
  SafetyTip: "Safety Tip",
};

const TYPE_COLORS: Record<string, string> = {
  Hero: "bg-violet-100 text-violet-700",
  Bulletin: "bg-blue-100 text-blue-700",
  SafetyTip: "bg-emerald-100 text-emerald-700",
};

const emptyForm = {
  type: "Hero",
  title: "",
  content: "",
  imageUrl: "",
  startAt: "",
  endAt: "",
};

export function AdminHomePageContentPage() {
  const { addToast } = useApp();
  const [contents, setContents] = useState<HomePageContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const loadContents = async () => {
    setLoading(true);
    try {
      const res = await homepageService.getAllContent();
      setContents(res.data);
    } catch {
      addToast({ title: "Error", message: "Failed to load homepage content", tone: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContents();
  }, []);

  const handleCreateContent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      addToast({
        title: "Validation error",
        message: "Title and content are required",
        tone: "warning",
      });
      return;
    }

    setSubmitting(true);
    try {
      await homepageService.createContent({
        type: form.type,
        title: form.title,
        content: form.content,
        imageUrl: form.imageUrl || null,
        startAt: form.startAt || null,
        endAt: form.endAt || null,
      });
      addToast({
        title: "Content created",
        message: `${TYPE_LABELS[form.type]} published successfully`,
        tone: "success",
      });
      setForm(emptyForm);
      setShowForm(false);
      loadContents();
    } catch (err: any) {
      addToast({
        title: "Error",
        message: err.response?.data?.message || "Could not create content",
        tone: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await homepageService.toggleContent(id);
      // Optimistic update
      setContents((items) =>
        items.map((item) =>
          item.id === id ? { ...item, isActive: !item.isActive } : item,
        ),
      );
    } catch {
      addToast({ title: "Error", message: "Could not update content status", tone: "error" });
      // Revert by reloading
      loadContents();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Panel className="border-institution-100 bg-institution-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="text-institution-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-slate-950">Homepage Content</h1>
              <p className="text-sm text-slate-700">
                Manage hero sections, bulletins, and safety tips shown to students
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-institution-600 hover:bg-institution-700 text-white"
          >
            <Plus size={18} className="mr-1" />
            {showForm ? "Cancel" : "Add Content"}
          </Button>
        </div>
      </Panel>

      {/* Create Form */}
      {showForm && (
        <Panel>
          <h2 className="text-lg font-semibold mb-4">Create New Content</h2>
          <form onSubmit={handleCreateContent} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Content Type" required>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className={inputClass}
                >
                  {CONTENT_TYPES.map((t) => (
                    <option key={t} value={t}>{TYPE_LABELS[t]}</option>
                  ))}
                </select>
              </Field>

              <Field label="Title" required>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputClass}
                  placeholder="Enter content title"
                />
              </Field>
            </div>

            <Field label="Content" required>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className={`${inputClass} min-h-[100px]`}
                placeholder="Enter content body text"
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Image URL (optional)">
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className={inputClass}
                  placeholder="https://…"
                />
              </Field>
              <Field label="Display Start (optional)">
                <input
                  type="datetime-local"
                  value={form.startAt}
                  onChange={(e) => setForm({ ...form, startAt: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Display End (optional)">
                <input
                  type="datetime-local"
                  value={form.endAt}
                  onChange={(e) => setForm({ ...form, endAt: e.target.value })}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-institution-600 hover:bg-institution-700 text-white"
              >
                {submitting ? "Creating…" : "Create Content"}
              </Button>
              <Button
                type="button"
                onClick={() => { setShowForm(false); setForm(emptyForm); }}
                className="bg-slate-200 text-slate-700 hover:bg-slate-300"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Panel>
      )}

      {/* Content List */}
      <Panel>
        <h2 className="text-lg font-semibold mb-4">
          {loading ? "Loading…" : `${contents.length} Content Items`}
        </h2>

        {loading ? (
          <p className="text-slate-500 text-sm">Loading content…</p>
        ) : contents.length === 0 ? (
          <p className="text-slate-500 text-center py-8 text-sm">
            No content created yet. Click "Add Content" to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {contents.map((item) => (
              <div
                key={item.id}
                className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded ${
                          TYPE_COLORS[item.type] ?? "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {TYPE_LABELS[item.type] ?? item.type}
                      </span>
                      {item.isActive !== undefined && (
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded ${
                            item.isActive
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{item.content}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      Created: {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle(item.id)}
                    className="text-slate-500 hover:text-institution-600 transition flex-shrink-0"
                    title={item.isActive ? "Deactivate" : "Activate"}
                  >
                    {item.isActive ? (
                      <ToggleRight size={28} className="text-emerald-600" />
                    ) : (
                      <ToggleLeft size={28} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
