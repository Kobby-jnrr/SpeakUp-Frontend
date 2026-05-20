import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRouteMock } from './components/layout/ProtectedRouteMock';
import { StudentLayout } from './components/layout/StudentLayout';
import { ToastViewport } from './components/ui/Toast';
import { AdminDashboard, AdminNotificationsPage, AdminReportDetailsPage, AdminReportsPage, AdminResourcesPage, AdminSettingsPage } from './pages/AdminPages';
import { HomePage, LoginPage, NotFoundPage, RegisterPage } from './pages/PublicPages';
import { EmergencyPage, StudentAboutPage, StudentContactPage, StudentDashboard, StudentFAQsPage, StudentHomePage, StudentNotificationsPage, StudentPrivacyPage, StudentReportDetailsPage, StudentReportPage, StudentReportsPage, StudentResourcesPage, StudentSettingsPage } from './pages/StudentPages';

function StudentShell({ children }: { children: ReactNode }) {
  return <ProtectedRouteMock role="student"><StudentLayout>{children}</StudentLayout></ProtectedRouteMock>;
}

function AdminShell({ children }: { children: ReactNode }) {
  return <ProtectedRouteMock role="admin"><AdminLayout>{children}</AdminLayout></ProtectedRouteMock>;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student" element={<Navigate to="/student/home" replace />} />
        <Route path="/student/home" element={<StudentShell><StudentHomePage /></StudentShell>} />
        <Route path="/student/dashboard" element={<StudentShell><StudentDashboard /></StudentShell>} />
        <Route path="/student/report" element={<StudentShell><StudentReportPage /></StudentShell>} />
        <Route path="/student/my-reports" element={<StudentShell><StudentReportsPage /></StudentShell>} />
        <Route path="/student/reports/:id" element={<StudentShell><StudentReportDetailsPage /></StudentShell>} />
        <Route path="/student/emergency" element={<StudentShell><EmergencyPage /></StudentShell>} />
        <Route path="/student/resources" element={<StudentShell><StudentResourcesPage /></StudentShell>} />
        <Route path="/student/faqs" element={<StudentShell><StudentFAQsPage /></StudentShell>} />
        <Route path="/student/privacy" element={<StudentShell><StudentPrivacyPage /></StudentShell>} />
        <Route path="/student/about" element={<StudentShell><StudentAboutPage /></StudentShell>} />
        <Route path="/student/contact" element={<StudentShell><StudentContactPage /></StudentShell>} />
        <Route path="/student/notifications" element={<StudentShell><StudentNotificationsPage /></StudentShell>} />
        <Route path="/student/settings" element={<StudentShell><StudentSettingsPage /></StudentShell>} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminShell><AdminDashboard /></AdminShell>} />
        <Route path="/admin/reports" element={<AdminShell><AdminReportsPage /></AdminShell>} />
        <Route path="/admin/reports/:id" element={<AdminShell><AdminReportDetailsPage /></AdminShell>} />
        <Route path="/admin/resources" element={<AdminShell><AdminResourcesPage /></AdminShell>} />
        <Route path="/admin/notifications" element={<AdminShell><AdminNotificationsPage /></AdminShell>} />
        <Route path="/admin/settings" element={<AdminShell><AdminSettingsPage /></AdminShell>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastViewport />
    </>
  );
}
