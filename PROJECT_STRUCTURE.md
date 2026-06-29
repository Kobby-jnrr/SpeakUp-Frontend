# SpeakUp Frontend - Project Structure

## Overview

SpeakUp Frontend is a React + TypeScript + Vite application for a university reporting and support platform. Students can submit reports, browse resources, and chat with support staff, while admins can manage reports, conversations, and homepage content.

## Tech Stack

- React 18+
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- Context API for auth and app state

## Main Project Structure

```text
SpeakUp-Frontend/
├── public/
│   └── images/
├── src/
│   ├── api/
│   │   ├── adminService.tsx
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── chatConversationService.ts
│   │   ├── chatMessageService.ts
│   │   ├── homepageService.ts
│   │   ├── reportService.ts
│   │   └── userService.ts
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatConversationList.tsx
│   │   │   └── ChatWindow.tsx
│   │   ├── layout/
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AppLayout.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── StudentLayout.tsx
│   │   ├── notifications/
│   │   │   └── NotificationCard.tsx
│   │   ├── reports/
│   │   │   ├── QuickReportForm.tsx
│   │   │   ├── ReportForm.tsx
│   │   │   └── Timeline.tsx
│   │   ├── resources/
│   │   │   └── ResourceCard.tsx
│   │   └── ui/
│   │       ├── Badges.tsx
│   │       ├── Button.tsx
│   │       ├── Cards.tsx
│   │       ├── Form.tsx
│   │       ├── Modal.tsx
│   │       └── Toast.tsx
│   ├── context/
│   │   └── AppContext.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── PublicPages.tsx
│   │   ├── SignupPage.tsx
│   │   ├── admin/
│   │   │   ├── AdminChatPage.tsx
│   │   │   ├── AdminDashboardPage.tsx
│   │   │   ├── AdminHomePageContentPage.tsx
│   │   │   ├── AdminReportDetailsPage.tsx
│   │   │   ├── AdminReportsPage.tsx
│   │   │   ├── AdminResourcesPage.tsx
│   │   │   ├── AdminSettingsPage.tsx
│   │   │   ├── CreateAdminPage.tsx
│   │   │   ├── Users.tsx
│   │   │   └── index.ts
│   │   └── student/
│   │       ├── EmergencyPage.tsx
│   │       ├── StudentAboutPage.tsx
│   │       ├── StudentChatPage.tsx
│   │       ├── StudentContactPage.tsx
│   │       ├── StudentDashboard.tsx
│   │       ├── StudentFAQsPage.tsx
│   │       ├── StudentHomePage.tsx
│   │       ├── StudentNotificationsPage.tsx
│   │       ├── StudentPrivacyPage.tsx
│   │       ├── StudentReportDetailsPage.tsx
│   │       ├── StudentReportPage.tsx
│   │       ├── StudentReportsPage.tsx
│   │       ├── StudentResourcePage.tsx
│   │       ├── StudentSettingsPage.tsx
│   │       └── index.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── auth.ts
│   │   ├── format.ts
│   │   └── roleMapper.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Feature Areas

- Authentication and role-based routing
- Report submission and tracking
- Student and admin chat experience
- Resource and notifications pages
- Homepage content management for admins

## Chat UI Notes

The chat window now uses a WhatsApp-inspired layout with incoming messages aligned to the left and outgoing messages aligned to the right, plus a modern message-bubble style and input area.

## Development Commands

```bash
npm run dev
npm run build
```
