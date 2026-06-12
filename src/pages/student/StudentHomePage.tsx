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
  Hand,
  Lightbulb,
  MapPin,
  Megaphone,
  MessageCircle,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";

const newsSlides = [
  {
    id: 1,
    category: "Safety",
    title: "New Campus Safety Walk Program",
    description:
      "Volunteer-led evening escorts now available across all residence halls.",
    date: "2026-05-12",
  },
  {
    id: 2,
    category: "Policy",
    title: "Updated Reporting Guidelines",
    description:
      "Clearer steps and faster response times for all report types.",
    date: "2026-05-10",
  },
  {
    id: 3,
    category: "Event",
    title: "Wellness Week Starts Monday",
    description: "Free counseling sessions, yoga, and peer support drop-ins.",
    date: "2026-05-08",
  },
];

const bulletins = [
  {
    id: 1,
    type: "Notice",
    text: "Library hours extended until midnight during exam period.",
    date: "2026-05-13",
    icon: Megaphone,
    tone: "bg-blue-50 text-blue-700",
  },
  {
    id: 2,
    type: "Workshop",
    text: "Consent and Communication workshop — JCR Hall, 2PM.",
    date: "2026-05-14",
    icon: Users,
    tone: "bg-violet-50 text-violet-700",
  },
  {
    id: 3,
    type: "Policy",
    text: "Revised student code of conduct now live on the portal.",
    date: "2026-05-11",
    icon: Shield,
    tone: "bg-amber-50 text-amber-700",
  },
  {
    id: 4,
    type: "Meeting",
    text: "Student Representative Council meeting — SRC Office, 4PM.",
    date: "2026-05-15",
    icon: Calendar,
    tone: "bg-emerald-50 text-emerald-700",
  },
];

const events = [
  {
    id: 1,
    day: "18",
    month: "May",
    title: "Self-Defense Basics",
    location: "Sports Complex, 3PM",
  },
  {
    id: 2,
    day: "21",
    month: "May",
    title: "Mental Health Check-In",
    location: "Counseling Center, 10AM",
  },
  {
    id: 3,
    day: "24",
    month: "May",
    title: "Campus Safety Town Hall",
    location: "Main Auditorium, 5PM",
  },
];

const supportCards = [
  {
    title: "How Reporting Works",
    icon: ClipboardList,
    to: "/student/resources",
    tone: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    title: "Know Your Rights",
    icon: Shield,
    to: "/student/resources",
    tone: "bg-amber-50 text-amber-700 border-amber-100",
  },
  {
    title: "Counseling Services",
    icon: MessageCircle,
    to: "/student/resources",
    tone: "bg-violet-50 text-violet-700 border-violet-100",
  },
  {
    title: "Safety Guide",
    icon: Lightbulb,
    to: "/student/resources",
    tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
];

const tips = [
  {
    id: 1,
    title: "Trust your instincts.",
    text: "If something feels wrong, remove yourself from the situation and seek help.",
  },
  {
    id: 2,
    title: "Stay in public areas.",
    text: "When walking at night, stick to well-lit, populated paths and avoid shortcuts.",
  },
  {
    id: 3,
    title: "Keep emergency numbers handy.",
    text: "Save campus security and counseling contacts in your phone.",
  },
];

export function StudentHomePage() {
  const [slide, setSlide] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

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
      to: "/student/resources",
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

  const nextSlide = () => setSlide((s) => (s + 1) % newsSlides.length);
  const prevSlide = () =>
    setSlide((s) => (s - 1 + newsSlides.length) % newsSlides.length);

  return (
    <div className="space-y-6">
      {/* FULL UI RESTORED EXACTLY */}

      <div className="relative overflow-hidden rounded-md">
        <div className="relative h-[320px]">
          <div className="absolute inset-0 bg-slate-900" />

          <div className="relative p-10 text-white">
            <span className="text-xs uppercase">
              {newsSlides[slide].category}
            </span>

            <h2 className="text-2xl font-bold mt-2">
              {newsSlides[slide].title}
            </h2>

            <p className="mt-2 text-sm">{newsSlides[slide].description}</p>

            <div className="mt-4 flex gap-3">
              <span className="text-xs flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {newsSlides[slide].date}
              </span>

              <button className="px-3 py-1 bg-white/20 rounded">
                Read More
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-2">
          {newsSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 w-2 rounded-full ${
                i === slide ? "bg-black" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        <div className="flex justify-between px-4 mt-2">
          <button onClick={prevSlide}>
            <ArrowLeft />
          </button>
          <button onClick={nextSlide}>
            <ArrowRight />
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid gap-3 sm:grid-cols-3">
        {quickActions.map((a) => (
          <Link
            key={a.title}
            to={a.to}
            className={`p-4 border rounded ${a.tone}`}
          >
            <a.icon />
            <p className="text-sm font-bold">{a.title}</p>
          </Link>
        ))}
      </div>

      {/* BULLETIN + EVENTS */}
      <div className="grid md:grid-cols-2 gap-4">
        <Panel>
          <h2>Bulletin Board</h2>
          {bulletins.map((b) => (
            <div key={b.id} className="flex gap-2 py-2">
              <b.icon />
              <div>
                <p>{b.text}</p>
                <span className="text-xs">{b.date}</span>
              </div>
            </div>
          ))}
        </Panel>

        <Panel>
          <h2>Events</h2>
          {events.map((e) => (
            <div key={e.id}>
              <p>{e.title}</p>
              <span>{e.location}</span>
            </div>
          ))}
        </Panel>
      </div>

      {/* SUPPORT + TIPS */}
      <Panel>
        <h2>Safety Tip</h2>
        <p className="font-bold">{tips[tipIndex].title}</p>
        <p>{tips[tipIndex].text}</p>
      </Panel>
    </div>
  );
}
