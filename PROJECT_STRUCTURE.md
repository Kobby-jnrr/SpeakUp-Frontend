# SpeakUp Frontend - Complete Project Structure

## Project Overview

**SpeakUp** is a university digital abuse reporting and case management portal built with React, TypeScript, Vite, and Tailwind CSS. It provides a confidential platform for students to report incidents and for administrators to manage cases, with integrated messaging and content management.

---

## 🏗 Architecture Overview

### Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite 5.x
- **Styling**: Tailwind CSS 3.4.17
- **HTTP Client**: Axios with JWT interceptor
- **State Management**: React Context API
- **Routing**: React Router v6

### Backend Integration

- **API Base URL**: `http://localhost:5019/api`
- **Authentication**: JWT token-based (stored in localStorage)
- **Controllers Integrated**:
  - `AuthController` - Login, Register
  - `ReportController` - Create, retrieve, update reports
  - `ChatConversationController` - Manage conversations
  - `ChatMessageController` - Send/retrieve messages
  - `HomePageContentController` - Manage homepage content

---

## 📁 Folder Structure

```
SpeakUp-Frontend/
├── public/
│   └── images/
├── src/
│   ├── api/
│   │   ├── api.ts                          # Axios instance with JWT interceptor
│   │   ├── authService.ts                  # Auth endpoints (login/register)
│   │   ├── chatConversationService.ts      # Chat conversation endpoints
│   │   ├── chatMessageService.ts           # Chat message endpoints
│   │   ├── homepageService.ts              # Homepage content endpoints
│   │   └── reportService.ts                # Report CRUD endpoints
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatConversationList.tsx    # Conversation list sidebar
│   │   │   └── ChatWindow.tsx              # Message display & input
│   │   ├── layout/
│   │   ├── notifications/
│   │   ├── reports/
│   │   ├── resources/
│   │   └── ui/
│   ├── context/
│   │   └── AppContext.tsx                  # Global state
│   ├── mock/
│   ├── pages/
│   │   ├── AdminPages.tsx
│   │   ├── LoginPage.tsx
│   │   ├── PublicPages.tsx
│   │   ├── SignupPage.tsx
│   │   ├── admin/
│   │   │   ├── AdminChatPage.tsx           # Chat queue management
│   │   │   └── AdminHomePageContentPage.tsx # Content editor
│   │   └── student/
│   │       ├── StudentChatPage.tsx         # Student messaging
│   │       └── [other student pages]
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🔌 Backend Integration

### Authentication

- JWT token-based (localStorage)
- Axios interceptor auto-injects Authorization header
- ProtectedRouteMock validates token before rendering

### API Endpoints

#### **Auth** (/api/Auth)

- `POST /login` - Student/admin login
- `POST /register` - New student registration

#### **Report** (/api/Report)

- `POST /create` - Submit report (backend integrated)
- `GET /my` - Get user's reports
- `GET /all` - Get all reports (admin)
- `PUT /status/{id}` - Update status
- `POST /claim/{id}` - Assign to admin
- `PUT /reassign/{id}` - Reassign admin

#### **Chat Conversation** (/api/ChatConversation)

- `POST /create` - Create conversation
- `GET /my` - Get user's conversations
- `GET /admin/all` - All conversations (admin)
- `GET /admin/unassigned` - Queue system
- `GET /admin/assigned-to-me` - My assigned chats
- `PUT /assign` - Assign admin
- `PUT /close/{id}` - Close conversation

#### **Chat Message** (/api/ChatMessage)

- `POST /send` - Send message
- `GET /{conversationId}` - Get messages
- `PUT /read/{messageId}` - Mark read

#### **Homepage Content** (/api/HomePageContent)

- `POST /create` - Create content (admin)
- `GET /all` - Get all content (admin)
- `GET /home` - Get active content (public)
- `PUT /toggle/{id}` - Toggle active status

---

## 🛣 Routes

### Student Routes (/student)

- `/home` - Dashboard
- `/dashboard` - Main dashboard
- `/report` - Submit report
- `/my-reports` - Report list
- `/report/:id` - Report details
- `/chat` - Messaging ✨ NEW
- `/notifications` - Notifications
- `/resources` - Guides
- `/settings` - Preferences

### Admin Routes (/admin)

- `/dashboard` - Operational view
- `/reports` - Report management
- `/resources` - Resource mgmt
- `/notifications` - Alerts
- `/settings` - Admin settings
- `/chat` - Chat queue ✨ NEW
- `/homepage-content` - Content editor ✨ NEW

---

## ✨ New Features Implemented

### Chat System

- **ChatConversationList** - Display user conversations
- **ChatWindow** - Real-time messaging (3s polling)
- **StudentChatPage** - Student interface
- **AdminChatPage** - Admin queue management
- Auto-refresh every 3 seconds
- Close/assign functionality for admins

### Homepage Content Management

- **AdminHomePageContentPage** - CRUD interface
- Hero sections, Bulletins, Safety Tips
- Schedule with start/end dates
- Toggle active/inactive
- Public homepage integration

### Backend Report Integration

- ReportForm now submits to backend
- All DTO fields mapped correctly
- Real error handling with toasts
- Redirect to reports list after success

---

## 🧠 State Management

### AppContext

- `currentUser` - Auth user + token
- `reports` - Report list
- `notifications` - System alerts
- `login()` - Backend auth
- `register()` - Backend registration
- `logout()` - Clear auth
- `addToast()` - Show notifications

---

## 🚀 Development

```bash
# Start frontend (port 5173)
npm run dev

# Ensure backend running on port 5019
# http://localhost:5019/api

# Build for production
npm run build
```

---

## 📊 Data Flow

1. **Login** → JWT stored → AppContext updated → Redirect to dashboard
2. **Submit Report** → ReportForm → Backend DB → Success toast → Redirect
3. **Chat** → Send message → Backend → Auto-refresh → Display new message
4. **Admin Content** → Create → Backend → List updates → Success toast

---

## 🔐 Security

- JWT token validation on all requests
- Role-based route protection
- Anonymous reporting support
- Chat only between participants
- Server-side validation on all endpoints
