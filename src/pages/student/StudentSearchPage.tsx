import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { searchFrontendContent } from "../../utils/frontendSearch";

export function StudentSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const results = useMemo(() => searchFrontendContent(query), [query]);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Search results</h1>
          <p className="text-sm text-slate-500">
            Frontend content search across the student experience.
          </p>
        </div>
      </div>

      <label className="flex w-full max-w-2xl items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
        <Search className="h-4 w-4" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setSearchParams({ q: query.trim() });
            }
          }}
          className="w-full bg-transparent outline-none"
          placeholder="Search for reports, resources, FAQs..."
        />
      </label>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Results</h2>
            <p className="text-sm text-slate-500">
              Search: &quot;{query || "all content"}&quot;
            </p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            {results.length} result{results.length === 1 ? "" : "s"}
          </span>
        </div>

        {!query ? (
          <p className="text-sm text-slate-500">
            Enter a keyword to search the frontend experience.
          </p>
        ) : results.length === 0 ? (
          <p className="text-sm text-slate-500">
            No matching results found for this search.
          </p>
        ) : (
          <div className="space-y-4">
            {results.map((item) => (
              <a
                key={`${item.category}-${item.title}`}
                href={item.path}
                className="block rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50/50"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    {item.category}
                  </span>
                  <span className="text-sm font-medium text-blue-700">📄</span>
                </div>
                <h3 className="mt-2 text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
