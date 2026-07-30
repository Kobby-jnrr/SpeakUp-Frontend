export type FrontendSearchItem = {
  title: string;
  description: string;
  path: string;
  category: string;
  keywords: string[];
};

const frontendContent: FrontendSearchItem[] = [
  {
    title: "How to Report an Incident",
    description: "Guidance for filing a report from the student portal.",
    path: "/student/resources",
    category: "Resources",
    keywords: ["report", "incident", "guidance", "resources"],
  },
  {
    title: "Reporting Guidelines",
    description: "A quick overview of what information to include in a report.",
    path: "/student/faqs",
    category: "FAQs",
    keywords: ["report", "guidelines", "faq", "help"],
  },
  {
    title: "Report an Incident",
    description: "Submit a new report through the student reporting form.",
    path: "/student/report",
    category: "Reports",
    keywords: ["report", "incident", "submit", "new"],
  },
  {
    title: "My Reports",
    description: "Review your submitted reports and follow-up updates.",
    path: "/student/my-reports",
    category: "Reports",
    keywords: ["reports", "history", "submitted", "status"],
  },
  {
    title: "Emergency Help",
    description: "Get immediate support and emergency contact information.",
    path: "/student/emergency",
    category: "Pages",
    keywords: ["emergency", "help", "urgent", "support"],
  },
  {
    title: "Student Dashboard",
    description: "View your dashboard overview and recent activity.",
    path: "/student/dashboard",
    category: "Pages",
    keywords: ["dashboard", "overview", "activity", "student"],
  },
  {
    title: "Privacy Policy",
    description: "Read the privacy policy and data handling details.",
    path: "/student/privacy",
    category: "Pages",
    keywords: ["privacy", "policy", "data", "information"],
  },
  {
    title: "About Us",
    description: "Learn more about SpeakUp and the support mission.",
    path: "/student/about",
    category: "Pages",
    keywords: ["about", "mission", "support", "who we are"],
  },
  {
    title: "Contact Us",
    description: "Find contact information for the support team.",
    path: "/student/contact",
    category: "Pages",
    keywords: ["contact", "support", "team", "help"],
  },
];

export function searchFrontendContent(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return frontendContent
    .filter((item) => {
      const haystack = [
        item.title,
        item.description,
        item.category,
        item.path,
        ...item.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}
