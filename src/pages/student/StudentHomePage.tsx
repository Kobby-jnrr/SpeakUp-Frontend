import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
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
import type { HomePageData } from "../../types";
import { useApp } from "../../context/AppContext";

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

export function StudentHomePage() {
  const { currentUser } = useApp();

  const [slide, setSlide] = useState(0);
  const [homeData, setHomeData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await homepageService.getHomeContent();
        setHomeData(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const heroSlides = homeData?.hero ?? [];
  const bulletins = homeData?.bulletin ?? [];
  const safetyTip = homeData?.safetyTip ?? null;

  const nextSlide = () =>
    setSlide((s) => (s + 1) % Math.max(heroSlides.length, 1));
  const prevSlide = () =>
    setSlide(
      (s) =>
        (s - 1 + Math.max(heroSlides.length, 1)) %
        Math.max(heroSlides.length, 1),
    );

  /* =========================
     🔥 SKELETON UI
  ========================= */
  const Skeleton = () => (
    <div className="animate-pulse space-y-6">
      {/* HERO SKELETON */}
      <div className="h-[300px] rounded-xl bg-slate-200" />

      {/* QUICK ACTIONS SKELETON */}
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-slate-200" />
          ))}
      </div>

      {/* PANELS SKELETON */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="h-[200px] rounded-xl bg-slate-200" />

        <div className="space-y-3">
          <div className="h-[120px] rounded-xl bg-slate-200" />
          <div className="h-[120px] rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* ✅ WELCOME */}
      <div className="px-1 animate-fade-in">
        <h1 className="text-xl font-bold text-slate-900">
          Welcome back, {currentUser?.firstName}
        </h1>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <Skeleton />
      ) : (
        <div className="animate-fade-in space-y-6">
          {/* HERO SLIDER */}
          <div className="relative overflow-hidden rounded-xl">
            <div className="relative h-[300px] bg-slate-900">
              {heroSlides.length === 0 ? (
                <div className="p-10 text-white h-full flex flex-col justify-center">
                  <h2 className="text-3xl font-bold">
                    SpeakUp — Your Voice Matters
                  </h2>
                  <p className="mt-2 text-sm text-white/80">
                    A safe, confidential platform to report incidents and get
                    support.
                  </p>
                  <div className="mt-6">
                    <Link to="/student/report">
                      <Button>Submit a Report</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative p-10 text-white h-full flex flex-col justify-center">
                    <h2 className="text-2xl font-bold">
                      {heroSlides[slide].title}
                    </h2>
                    <p className="mt-2 text-sm text-white/80 max-w-lg">
                      {heroSlides[slide].content}
                    </p>
                  </div>

                  {heroSlides.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2"
                      >
                        <ArrowLeft />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2"
                      >
                        <ArrowRight />
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
                className={`p-4 border rounded-xl ${a.tone}`}
              >
                <a.icon className="h-5 w-5" />
                <p className="text-sm font-bold">{a.title}</p>
              </Link>
            ))}
          </div>

          {/* BULLETIN + SAFETY TIP */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Bulletin */}
            <Panel>
              <h2 className="font-bold flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-blue-600" />
                Bulletin Board
              </h2>

              <div className="space-y-3 mt-3">
                {bulletins.map((b) => (
                  <div key={b.id} className="border-b pb-2">
                    <p className="font-semibold text-sm">{b.title}</p>
                    <p className="text-sm text-slate-600">{b.content}</p>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Safety Tip */}
            <Panel>
              <h2 className="font-bold flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Safety Tip
              </h2>

              {safetyTip ? (
                <div className="bg-amber-50 p-4 rounded-lg mt-3">
                  <p className="font-bold">{safetyTip.title}</p>
                  <p className="text-sm">{safetyTip.content}</p>
                </div>
              ) : (
                <p className="text-sm text-slate-600 mt-3">
                  Stay aware and trust your instincts.
                </p>
              )}
            </Panel>
          </div>
        </div>
      )}
    </div>
  );
}
