import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AdminLayout } from "./components/layout/AdminLayout";
import { SuperAdminLayout } from "./components/layout/SuperAdminLayout";
import { StudentLayout } from "./components/layout/StudentLayout";
import { ProtectedRouteMock } from "./components/layout/ProtectedRouteMock";

import { ToastViewport } from "./components/ui/Toast";

// ================= ADMIN PAGES =================
import {
  AdminDashboard,
  AdminNotificationsPage,
  AdminReportDetailsPage,
  AdminReportsPage,
  AdminResourcesPage,
  AdminSettingsPage,
  AdminChatPage,
  AdminHomePageContentPage,
  CreateJuniorAdminPage,
} from "./pages/admin";

// ================= STUDENT PAGES =================
import {
  StudentHomePage,
  StudentDashboard,
  StudentResourcesPage,
  StudentReportPage,
  StudentReportsPage,
  StudentReportDetailsPage,
  StudentNotificationsPage,
  StudentFAQsPage,
  StudentPrivacyPage,
  StudentAboutPage,
  StudentContactPage,
  StudentSettingsPage,
  StudentChatPage,
  EmergencyPage,
} from "./pages/student";

// ================= PUBLIC =================
import { HomePage, ChooseRole, NotFoundPage } from "./pages/PublicPages";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// ================= SHELLS =================
function StudentShell({ children }: { children: ReactNode }) {
  return (
    <ProtectedRouteMock role="student">
      <StudentLayout>{children}</StudentLayout>
    </ProtectedRouteMock>
  );
}

// Junior admin uses NORMAL admin layout
function JuniorAdminShell({ children }: { children: ReactNode }) {
  return (
    <ProtectedRouteMock role="junioradmin">
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRouteMock>
  );
}

// SUPER ADMIN uses SUPER layout (dark + premium UI)
function SuperAdminShell({ children }: { children: ReactNode }) {
  return (
    <ProtectedRouteMock role="superadmin">
      <SuperAdminLayout>{children}</SuperAdminLayout>
    </ProtectedRouteMock>
  );
}

// ========================================================
// ROUTES
// ========================================================
export default function App() {
  return (
    <>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<HomePage />} />
        <Route path="/choose-role" element={<ChooseRole />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />

        {/* ================= STUDENT ================= */}
        <Route
          path="/student"
          element={<Navigate to="/student/home" replace />}
        />

        <Route
          path="/student/home"
          element={
            <StudentShell>
              <StudentHomePage />
            </StudentShell>
          }
        />

        <Route
          path="/student/dashboard"
          element={
            <StudentShell>
              <StudentDashboard />
            </StudentShell>
          }
        />

        <Route
          path="/student/report"
          element={
            <StudentShell>
              <StudentReportPage />
            </StudentShell>
          }
        />

        <Route
          path="/student/my-reports"
          element={
            <StudentShell>
              <StudentReportsPage />
            </StudentShell>
          }
        />

        <Route
          path="/student/reports/:id"
          element={
            <StudentShell>
              <StudentReportDetailsPage />
            </StudentShell>
          }
        />

        <Route
          path="/student/emergency"
          element={
            <StudentShell>
              <EmergencyPage />
            </StudentShell>
          }
        />

        <Route
          path="/student/resources"
          element={
            <StudentShell>
              <StudentResourcesPage />
            </StudentShell>
          }
        />

        <Route
          path="/student/faqs"
          element={
            <StudentShell>
              <StudentFAQsPage />
            </StudentShell>
          }
        />

        <Route
          path="/student/privacy"
          element={
            <StudentShell>
              <StudentPrivacyPage />
            </StudentShell>
          }
        />

        <Route
          path="/student/about"
          element={
            <StudentShell>
              <StudentAboutPage />
            </StudentShell>
          }
        />

        <Route
          path="/student/contact"
          element={
            <StudentShell>
              <StudentContactPage />
            </StudentShell>
          }
        />

        <Route
          path="/student/notifications"
          element={
            <StudentShell>
              <StudentNotificationsPage />
            </StudentShell>
          }
        />

        <Route
          path="/student/settings"
          element={
            <StudentShell>
              <StudentSettingsPage />
            </StudentShell>
          }
        />

        <Route
          path="/student/chat"
          element={
            <StudentShell>
              <StudentChatPage />
            </StudentShell>
          }
        />

        {/* ================= JUNIOR ADMIN ================= */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <JuniorAdminShell>
              <AdminDashboard />
            </JuniorAdminShell>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <JuniorAdminShell>
              <AdminReportsPage />
            </JuniorAdminShell>
          }
        />

        <Route
          path="/admin/reports/:id"
          element={
            <JuniorAdminShell>
              <AdminReportDetailsPage />
            </JuniorAdminShell>
          }
        />

        <Route
          path="/admin/resources"
          element={
            <JuniorAdminShell>
              <AdminResourcesPage />
            </JuniorAdminShell>
          }
        />

        <Route
          path="/admin/notifications"
          element={
            <JuniorAdminShell>
              <AdminNotificationsPage />
            </JuniorAdminShell>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <JuniorAdminShell>
              <AdminSettingsPage />
            </JuniorAdminShell>
          }
        />

        <Route
          path="/admin/chat"
          element={
            <JuniorAdminShell>
              <AdminChatPage />
            </JuniorAdminShell>
          }
        />

        <Route
          path="/admin/homepage-content"
          element={
            <JuniorAdminShell>
              <AdminHomePageContentPage />
            </JuniorAdminShell>
          }
        />

        {/* ================= SUPER ADMIN ================= */}
        <Route
          path="/admin/create-junior-admin"
          element={
            <SuperAdminShell>
              <CreateJuniorAdminPage />
            </SuperAdminShell>
          }
        />

        {/* ================= 404 ================= */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastViewport />
    </>
  );
}
