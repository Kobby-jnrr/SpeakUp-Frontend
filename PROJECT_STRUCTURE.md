# SpeakUp Frontend - Project Structure

## Project Overview

**SpeakUp** is a university reporting and support platform built with React, TypeScript, and Vite. The frontend enables students to report issues, access resources, chat with support staff, and manage their accounts. Administrators can review reports, manage conversations, create announcements, and oversee user accounts.

**Key Platform Features:**

- 🔐 Role-based authentication (Student, JuniorAdmin, SuperAdmin)
- 📋 Incident reporting and tracking system
- 💬 Real-time chat between students and support staff
- 📚 Resource library management
- 🔔 Notifications system
- 👥 User and admin management dashboards

---

## Technology Stack

| Layer                | Technology                                              |
| -------------------- | ------------------------------------------------------- |
| **Runtime**          | Node.js + npm                                           |
| **UI Framework**     | React 18+                                               |
| **Language**         | TypeScript                                              |
| **Build Tool**       | Vite                                                    |
| **Styling**          | Tailwind CSS + PostCSS                                  |
| **Routing**          | React Router                                            |
| **HTTP Client**      | Axios                                                   |
| **State Management** | Context API                                             |
| **Storage**          | SessionStorage (per-tab sessions), LocalStorage (theme) |

---

## Directory Structure

```
SpeakUp-Frontend/
│
├── 📄 Configuration Files (root)
│   ├── package.json                 # Dependencies and scripts
│   ├── vite.config.ts              # Vite build configuration
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tailwind.config.js          # Tailwind CSS theme
│   ├── postcss.config.js           # PostCSS plugins
│   ├── index.html                  # HTML entry point
│   ├── vercel.json                 # Deployment config
│   └── [other configs]
│
├── 📁 public/
│   └── images/                      # Static assets (logos, icons, etc.)
│
└── 📁 src/
    │
    ├── 🔌 api/
    │   ├── api.ts                   # Axios instance with interceptors
    │   ├── authService.ts           # Login, register endpoints
    │   ├── userService.ts           # User profile, settings
    │   ├── reportService.ts         # Report CRUD operations
    │   ├── chatConversationService.ts  # Chat conversations
    │   ├── chatMessageService.ts    # Chat messages
    │   ├── resourceService.ts       # Resources listing/management
    │   ├── adminService.ts          # Admin-specific operations
    │   └── auditService.ts          # Audit logs
    │
    ├── 🧩 components/
    │   ├── chat/
    │   │   ├── ChatConversationList.tsx   # List of conversations
    │   │   └── ChatWindow.tsx             # Message display (WhatsApp-style)
    │   │
    │   ├── layout/
    │   │   ├── AppLayout.tsx              # Root app wrapper
    │   │   ├── StudentLayout.tsx          # Student navbar & sidebar
    │   │   ├── AdminLayout.tsx            # Admin navbar & sidebar
    │   │   └── ProtectedRoute.tsx         # Route protection (auth guard)
    │   │
    │   ├── reports/
    │   │   ├── ReportForm.tsx             # Full report submission form
    │   │   ├── QuickReportForm.tsx        # Quick report modal
    │   │   └── Timeline.tsx               # Report status timeline
    │   │
    │   ├── notifications/
    │   │   └── NotificationCard.tsx       # Notification display card
    │   │
    │   ├── resources/
    │   │   └── resourceConfig.ts          # Resource data/configuration
    │   │
    │   └── ui/ (Reusable Components)
    │       ├── Button.tsx                 # Button variants
    │       ├── Cards.tsx                  # Card layouts
    │       ├── Form.tsx                   # Form elements
    │       ├── Modal.tsx                  # Modal dialogs
    │       ├── Toast.tsx                  # Toast notifications
    │       └── Badges.tsx                 # Status badges
    │
    ├── 🎨 context/
    │   └── AppContext.tsx                 # Auth, user, theme, toast state
    │
    ├── 📖 pages/
    │   ├── LoginPage.tsx                  # Authentication
    │   ├── SignupPage.tsx                 # User registration
    │   ├── PublicPages.tsx                # Public routes wrapper
    │   │
    │   ├── admin/ (AdminLayout routes)
    │   │   ├── AdminDashboardPage.tsx     # Admin overview/stats
    │   │   ├── AdminReportsPage.tsx       # Reports list & filtering
    │   │   ├── AdminReportDetailsPage.tsx # Single report view
    │   │   ├── AdminChatPage.tsx          # Chat conversations
    │   │   ├── AdminResourcesPage.tsx     # Resource management
    │   │   ├── AdminHomePageContentPage.tsx  # Edit homepage content
    │   │   ├── AdminSettingsPage.tsx      # System settings
    │   │   ├── AdminAuditLogsPage.tsx     # Audit trail
    │   │   ├── CreateAdminPage.tsx        # Create admin accounts
    │   │   ├── Users.tsx                  # User management
    │   │   └── index.ts                   # Page exports
    │   │
    │   └── student/ (StudentLayout routes)
    │       ├── StudentDashboard.tsx       # Student overview
    │       ├── StudentHomePage.tsx        # Home feed
    │       ├── StudentReportPage.tsx      # Submit new report
    │       ├── StudentReportsPage.tsx     # My reports list
    │       ├── StudentReportDetailsPage.tsx  # Single report view
    │       ├── StudentChatPage.tsx        # Chat with support
    │       ├── StudentResourcePage.tsx    # Resource library
    │       ├── StudentNotificationsPage.tsx  # Notifications
    │       ├── StudentSettingsPage.tsx    # Account settings
    │       ├── StudentAboutPage.tsx       # About page
    │       ├── StudentContactPage.tsx     # Contact information
    │       ├── StudentPrivacyPage.tsx     # Privacy policy
    │       ├── StudentFAQsPage.tsx        # FAQs
    │       ├── EmergencyPage.tsx          # Emergency resources
    │       └── index.ts                   # Page exports
    │
    ├── 📝 types/
    │   └── index.ts                       # TypeScript interfaces & types
    │
    ├── 🔧 utils/
    │   ├── auth.ts                        # Auth helpers (setAuth, logout)
    │   ├── format.ts                      # Data formatting utilities
    │   ├── roleMapper.ts                  # Role mapping functions
    │   └── theme.ts                       # Theme utilities
    │
    ├── App.tsx                            # Main app routes
    ├── main.tsx                           # React entry point
    ├── index.css                          # Global styles
    └── vite-env.d.ts                      # Vite environment types
```

---

## Architecture & Key Patterns

### Authentication Flow

1. **Login/Signup** → API call via `authService`
2. **Token Storage** → SessionStorage (per-tab isolation)
3. **Role Mapping** → Backend role → Frontend role (`SuperAdmin`, `JuniorAdmin`, `Student`)
4. **Route Protection** → `ProtectedRoute` component checks token
5. **Context** → `AppContext` provides user, role, login/logout globally

### Session Management

- **SessionStorage** used for per-tab session isolation
- Auto logout when tab closes
- Session persists across page refreshes while tab is open
- No built-in inactivity timeout (server may enforce)

### State Management

- **Global**: User, authentication, theme, toasts via `AppContext`
- **Local**: Component-level state via `useState`
- No Redux/Zustand needed (kept simple)

### UI Components

- **Reusable** components in `/components/ui`
- **Feature-specific** components in subdirectories (chat, reports, etc.)
- **Layout components** handle routing and navigation
- **Tailwind CSS** for all styling (no inline styles)

### API Layer

- Centralized `api.ts` with Axios instance
- Service files organized by domain (auth, chat, reports, etc.)
- Token auto-injected via interceptors
- Error handling at service level

---

## Development Workflow

### Setup

```bash
# Install dependencies
npm install

# Configure environment (if needed)
# Create .env file with API_BASE_URL
```

### Development

```bash
# Start dev server on http://localhost:5173
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview
```

### Key Development Notes

- Hot Module Replacement (HMR) enabled by default in Vite
- TypeScript strict mode enforced
- Tailwind CSS in JIT mode for smaller builds
- Component hot reload with React Fast Refresh

---

## Role-Based Features

### 🎓 Student Capabilities

- Submit incident reports with attachments
- Track report status in real-time
- Chat with support staff
- Browse resources and FAQs
- View notifications
- Access emergency resources

### 👨‍💼 Junior Admin Capabilities

- View all reports
- Respond to student chats
- Create/edit resources
- View audit logs
- (Limited admin features)

### 🔐 Super Admin Capabilities

- Full dashboard with statistics
- Manage all reports
- Manage users and admin accounts
- Edit homepage content
- System settings
- Complete audit trail

---

## Communication

- **Frontend ↔ Backend**: Axios HTTP (RESTful)
- **Authentication**: JWT token in sessionStorage
- **Error Handling**: Service layer + Context toast notifications
- **Real-time**: Not currently implemented (polling-based if needed)

---

## Performance & Optimization

- Vite for fast builds and HMR
- React Router lazy loading (route-based code splitting)
- Tailwind CSS purging in production
- SessionStorage limits DOM re-renders
- Component memoization where needed

---

## Future Enhancements

- WebSocket integration for real-time chat/notifications
- File upload system for reports
- Email notifications
- Advanced search and filtering
- Mobile app (React Native)
