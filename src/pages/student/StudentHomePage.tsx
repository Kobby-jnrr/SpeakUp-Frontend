import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  ClipboardList,
  FilePlus,
  Files,
  Lightbulb,
  Megaphone,
  MessageCircle,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { homepageService } from "../../api/homepageService";
import type { HomePageData, HomePageContentItem } from "../../types";

const quickActions = [
  {
    title: "Submit Report",
    to: "/student/report",
    icon: FilePlus,
    tone: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    title: "Emergency Help",
    to: "/student/emergency",
    icon: AlertTriangle,
    tone: "bg-red-50 text-red-700 border-red-100",
  },
  {
    title: "Talk to Counselor",
    to: "/student/chat",
    icon: MessageCircle,
    tone: "bg-violet-50 text-violet-700 border-violet-100",
  },
  {
    title: "Track My Reports",
    to: "/student/my-reports",
    icon: Files,
    tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    title: "Safety Resources",
    to: "/student/resources",
    icon: Shield,
    tone: "bg-amber-50 text-amber-700 border-amber-100",
  },
];

const supportCards = [
  { title: "How Reporting Works", icon: ClipboardList, to: "/student/resources", tone: "bg-blue-50 text-blue-700 border-blue-100" },
  { title: "Know Your Rights", icon: Shield, to: "/student/resources", tone: "bg-amber-50 text-amber-700 border-amber-100" },
  { title: "Counseling Services", icon: MessageCircle, to: "/student/resources", tone: "bg-violet-50 text-violet-700 border-violet-100" },
  { title: "Safety Guide", icon: Lightbulb, to: "/student/resources", tone: "bg-emerald-50 text-emerald-700 border-emerald-100" },
];

export function StudentHomePage() {
  const [slide, setSlide] = useState(0);
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await homepageService.getHomeContent();
        setHomeData(res.data);
      } catch {
        // fail silently — page still renders with fallback UI
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const heroSlides = homeData?.hero ?? [];
  const bulletins = homeData?.bulletin ?? [];
  const safetyTip = homeData?.safetyTip ?? null;

  const nextSlide = () => setSlide((s) => (s + 1) % Math.max(heroSlides.length, 1));
  const prevSlide = () => setSlide((s) => (s - 1 + Math.max(heroSlides.length, 1)) % Math.max(heroSlides.length, 1));

  return (
    <div className="space-y-6">
      {/* HERO SLIDER */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="relative h-[300px] bg-slate-900">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white/60 text-sm">Loading announcements…</p>
            </div>
          ) : heroSlides.length === 0 ? (
            <div className="relative p-10 text-white h-full flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-white/60">Welcome</span>
              <h2 className="text-3xl font-bold mt-2">SpeakUp — Your Voice Matters</h2>
              <p className="mt-2 text-sm text-white/80">
                A safe, confidential platform to report incidents and get support.
              </p>
              <div className="mt-6">
                <Link to="/student/report">
                  <Button>Submit a Report</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {heroSlides[slide]?.imageUrl && (
                <img
                  src={heroSlides[slide].imageUrl!}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              )}
              <div className="relative p-10 text-white h-full flex flex-col justify-center">
                <span className="text-xs uppercase tracking-widest text-white/70">
                  Announcement
                </span>
                <h2 className="text-2xl font-bold mt-2">{heroSlides[slide].title}</h2>
                <p className="mt-2 text-sm text-white/80 max-w-lg">
                  {heroSlides[slide].content}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs flex items-center gap-1 text-white/60">
                    <Calendar className="h-4 w-4" />
                    {new Date(heroSlides[slide].createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Slide controls */}
              {heroSlides.length > 1 && (
                <>
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlide(i)}
                        className={`h-2 w-2 rounded-full transition ${
                          i === slide ? "bg-white" : "bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {quickActions.map((a) => (
          <Link
            key={a.title}
            to={a.to}
            className={`p-4 border rounded-xl flex flex-col items-start gap-2 hover:opacity-90 transition ${a.tone}`}
          >
            <a.icon className="h-5 w-5" />
            <p className="text-sm font-bold">{a.title}</p>
          </Link>
        ))}
      </div>

      {/* BULLETIN + SAFETY TIP */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Bulletin Board */}
        <Panel>
          <h2 className="font-bold text-slate-950 mb-3 flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-blue-600" /> Bulletin Board
          </h2>
          {loading ? (
            <p className="text-sm text-slate-400">Loading bulletins…</p>
          ) : bulletins.length === 0 ? (
            <p className="text-sm text-slate-400">No bulletins at this time.</p>
          ) : (
            <div className="space-y-3">
              {bulletins.map((b) => (
                <div key={b.id} className="flex gap-3 py-2 border-b last:border-0">
                  <div className="flex-shrink-0 w-1 rounded-full bg-blue-400" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{b.title}</p>
                    <p className="text-sm text-slate-600">{b.content}</p>
                    <span className="text-xs text-slate-400">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>

        {/* Safety Tip */}
        <Panel>
          <h2 className="font-bold text-slate-950 mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" /> Safety Tip
          </h2>
          {loading ? (
            <p className="text-sm text-slate-400">Loading tip…</p>
          ) : safetyTip ? (
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <p className="font-bold text-amber-900">{safetyTip.title}</p>
              <p className="text-sm text-amber-800 mt-1">{safetyTip.content}</p>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <p className="font-bold text-amber-900">Trust your instincts.</p>
              <p className="text-sm text-amber-800 mt-1">
                If something feels wrong, remove yourself from the situation and seek help immediately.
              </p>
            </div>
          )}

          {/* Support cards */}
          <h2 className="font-bold text-slate-950 mt-6 mb-3">Support Resources</h2>
          <div className="grid grid-cols-2 gap-2">
            {supportCards.map((c) => (
              <Link
                key={c.title}
                to={c.to}
                className={`p-3 border rounded-lg flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition ${c.tone}`}
              >
                <c.icon className="h-4 w-4 flex-shrink-0" />
                <span>{c.title}</span>
              </Link>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
