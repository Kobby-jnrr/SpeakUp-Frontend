import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import { StudentLayout } from "./components/layout/StudentLayout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { ToastViewport } from "./components/ui/Toast";

// ================= ADMIN PAGES =================
import {
  AdminDashboard,
  AdminReportDetailsPage,
  AdminReportsPage,
  AdminResourcesPage,
  AdminAuditLogsPage,
  AdminSettingsPage,
  AdminChatPage,
  AdminHomePageContentPage,
  CreateAdminPage,
  Users,
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
import { HomePage, NotFoundPage } from "./pages/PublicPages";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// ================= SHELLS =================
function StudentShell({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute role="Student">
      <StudentLayout>{children}</StudentLayout>
    </ProtectedRoute>
  );
}

function JuniorAdminShell({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute role="JuniorAdmin">
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<HomePage />} />

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

        <Route
          path="/student/chat/:conversationId"
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
          path="/admin/chat/:conversationId"
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

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="SuperAdmin">
              <AdminLayout>
                <Users />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-junior-admin"
          element={
            <ProtectedRoute role="SuperAdmin">
              <AdminLayout>
                <CreateAdminPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/audit-logs"
          element={
            <ProtectedRoute role="SuperAdmin">
              <AdminLayout>
                <AdminAuditLogsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastViewport />
    </>
  );
}
