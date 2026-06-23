import { useEffect, useState } from "react";
import { Plus, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/ui/Button";
import { Panel } from "../../components/ui/Cards";
import { Field, inputClass } from "../../components/ui/Form";
import { homepageService } from "../../api/homepageService";

type HomePageContentItem = {
  id: number;
  type: string;
  title: string;
  content: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  startAt?: string;
  endAt?: string;
  createdBy: string;
};

const CONTENT_TYPES = ["Hero", "Bulletin", "SafetyTip"];

const TYPE_LABELS: Record<string, string> = {
  Hero: "Hero Section",
  Bulletin: "Bulletin",
  SafetyTip: "Safety Tip",
};

const emptyForm = {
  type: "Hero",
  title: "",
  content: "",
  imageUrl: "",
  startAt: "",
  endAt: "",
};

const toUtcIso = (value: string | null | undefined) => {
  if (!value) return null;
  return new Date(value).toISOString();
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
      addToast({
        title: "Error",
        message: "Failed to load content",
        tone: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContents();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await homepageService.createContent({
        type: form.type,
        title: form.title,
        content: form.content,
        imageUrl: form.imageUrl || null,
        startAt: toUtcIso(form.startAt),
        endAt: toUtcIso(form.endAt),
      });

      addToast({
        title: "Success",
        message: "Content created",
        tone: "success",
      });

      setForm(emptyForm);
      setShowForm(false);

      await loadContents();
    } catch {
      addToast({
        title: "Error",
        message: "Failed to create content",
        tone: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await homepageService.toggleContent(id);

      setContents((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isActive: !item.isActive } : item,
        ),
      );

      addToast({
        title: "Success",
        message: "Content status updated",
        tone: "success",
      });
    } catch {
      addToast({
        title: "Error",
        message: "Toggle failed",
        tone: "error",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this content?")) return;

    try {
      await homepageService.deleteContent(id);

      setContents((prev) => prev.filter((item) => item.id !== id));

      addToast({
        title: "Deleted",
        message: "Content removed",
        tone: "success",
      });
    } catch {
      addToast({
        title: "Error",
        message: "Delete failed",
        tone: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Homepage Content</h1>
            <p className="text-sm text-slate-600">Manage what students see</p>
          </div>

          <Button onClick={() => setShowForm((prev) => !prev)}>
            <Plus size={16} />
            {showForm ? "Cancel" : "Add"}
          </Button>
        </div>
      </Panel>

      {showForm && (
        <Panel>
          <form onSubmit={handleCreate} className="space-y-4">
            <Field label="Type">
              <select
                className={inputClass}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                {CONTENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {TYPE_LABELS[type]}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Title">
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Field>

            <Field label="Content">
              <textarea
                className={`${inputClass} min-h-[100px]`}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </Field>

            <Field label="Image URL">
              <input
                className={inputClass}
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Start Date">
                <input
                  type="datetime-local"
                  className={inputClass}
                  value={form.startAt}
                  onChange={(e) =>
                    setForm({ ...form, startAt: e.target.value })
                  }
                />
              </Field>

              <Field label="End Date">
                <input
                  type="datetime-local"
                  className={inputClass}
                  value={form.endAt}
                  onChange={(e) => setForm({ ...form, endAt: e.target.value })}
                />
              </Field>
            </div>

            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating..." : "Create"}
            </Button>
          </form>
        </Panel>
      )}

      <Panel>
        <h2 className="mb-4 font-semibold">
          {loading ? "Loading..." : `${contents.length} items`}
        </h2>

        {!loading && contents.length === 0 && (
          <p className="text-sm text-slate-500">No homepage content found.</p>
        )}

        {contents.map((item) => (
          <div
            key={item.id}
            className="mb-3 flex justify-between rounded-lg border p-4"
          >
            <div className="flex-1">
              <p className="mb-1 text-xs font-semibold text-blue-600">
                {TYPE_LABELS[item.type] ?? item.type}
              </p>

              <h3 className="font-semibold">{item.title}</h3>

              <p className="text-sm text-slate-600">{item.content}</p>

              <p className="mt-2 text-xs text-slate-500">
                Created by: {item.createdBy}
              </p>

              <p className="text-xs text-slate-500">
                {new Date(item.createdAt).toLocaleString()}
              </p>

              <p className="text-xs text-slate-500">
                {item.startAt
                  ? new Date(item.startAt).toDateString()
                  : "No start"}{" "}
                → {item.endAt ? new Date(item.endAt).toDateString() : "No end"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button type="button" onClick={() => handleToggle(item.id)}>
                {item.isActive ? (
                  <ToggleRight className="text-green-600" />
                ) : (
                  <ToggleLeft />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </Panel>
    </div>
  );
}
