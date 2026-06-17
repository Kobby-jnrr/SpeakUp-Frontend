import { useState } from "react";
import { Zap, Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../../components/ui/Button";
import { Panel } from "../../components/ui/Cards";
import { Field, inputClass } from "../../components/ui/Form";

interface ContentItem {
  id: number;
  type: string;
  title: string;
  content: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export function AdminHomePageContentPage() {
  const { addToast } = useApp();
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type: "Hero",
    title: "",
    content: "",
    imageUrl: "",
    startAt: "",
    endAt: "",
  });

  // TODO: load homepage content from backend, e.g.:
  // useEffect(() => {
  //   const load = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await homepageService.getAllContent();
  //       setContents(res.data);
  //     } catch { addToast({ title: "Error", message: "Failed to load homepage content", tone: "error" }); }
  //     finally { setLoading(false); }
  //   };
  //   load();
  // }, []);

  const handleCreateContent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      addToast({
        title: "Validation error",
        message: "Please fill in all required fields",
        tone: "warning",
      });
      return;
    }

    // TODO: create content via backend, e.g.:
    // await homepageService.createContent(form);
    // then reload contents

    addToast({
      title: "Content created",
      message: `${form.type} content created successfully`,
      tone: "success",
    });
    setForm({ type: "Hero", title: "", content: "", imageUrl: "", startAt: "", endAt: "" });
    setShowForm(false);
  };

  const handleToggleActive = async (id: number) => {
    // TODO: toggle content status via backend, e.g.:
    // await homepageService.toggleContent(id);
    // then reload contents

    setContents((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item,
      ),
    );
    addToast({ title: "Updated", message: "Content status updated", tone: "success" });
  };

  return (
    <div className="space-y-6">
      <Panel className="border-institution-100 bg-institution-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="text-institution-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-slate-950">
                Homepage Content
              </h1>
              <p className="text-sm text-slate-700">
                Manage hero sections, bulletins, and safety tips
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-institution-600 hover:bg-institution-700 text-white"
          >
            <Plus size={18} className="mr-1" />
            Add Content
          </Button>
        </div>
      </Panel>

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
                  <option value="Hero">Hero Section</option>
                  <option value="Bulletin">Bulletin</option>
                  <option value="SafetyTip">Safety Tip</option>
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
                className={`${inputClass} min-h-32`}
                placeholder="Enter content text"
              />
            </Field>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Image URL (optional)">
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                  className={inputClass}
                  placeholder="https://example.com/image.jpg"
                />
              </Field>

              <Field label="Display Start Date (optional)">
                <input
                  type="datetime-local"
                  value={form.startAt}
                  onChange={(e) =>
                    setForm({ ...form, startAt: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Display End Date (optional)">
              <input
                type="datetime-local"
                value={form.endAt}
                onChange={(e) => setForm({ ...form, endAt: e.target.value })}
                className={inputClass}
              />
            </Field>

            <div className="flex gap-2">
              <Button type="submit" className="bg-institution-600 text-white">
                Create Content
              </Button>
              <Button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-slate-200 text-slate-700"
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
          {loading ? "Loading..." : `${contents.length} Content Items`}
        </h2>

        {loading ? (
          <p className="text-slate-600">Loading content...</p>
        ) : contents.length === 0 ? (
          <p className="text-slate-600 text-center py-8">
            No content created yet
          </p>
        ) : (
          <div className="space-y-3">
            {contents.map((item) => (
              <div
                key={item.id}
                className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <span className="px-2 py-1 text-xs font-semibold bg-slate-200 text-slate-700 rounded">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                      {item.content}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Created: {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleToggleActive(item.id)}
                      className={`text-sm ${
                        item.isActive
                          ? "bg-support-100 text-support-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </div>
  );
}
