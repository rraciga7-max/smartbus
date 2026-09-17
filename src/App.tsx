import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

import { AppShell } from './components/layout/AppShell';
import { PublicLayout } from './components/layout/PublicLayout';
import { ProtectedRoute, PublicOnlyRoute } from './components/auth/ProtectedRoute';

// Public Marketing Website Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { SolutionsPage } from './pages/public/SolutionsPage';
import { AIPage } from './pages/public/AIPage';
import { SafetyPage } from './pages/public/SafetyPage';
import { ContactPage } from './pages/public/ContactPage';
import { FAQPage } from './pages/public/FAQPage';
import { LegalPages } from './pages/public/LegalPages';

// Authentication Architecture Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';

// User Profile Page
import { ProfilePage } from './pages/profile/ProfilePage';

// Enterprise Platform Dashboard & Operations Pages
import { DashboardPage } from './pages/DashboardPage';
import { BusManagementPage } from './pages/BusManagementPage';
import { LiveTrackingPage } from './pages/LiveTrackingPage';
import { DriverManagementPage } from './pages/DriverManagementPage';
import { RouteManagementPage } from './pages/RouteManagementPage';
import { TripManagementPage } from './pages/TripManagementPage';
import { PassengerPage } from './pages/PassengerPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { FuelManagementPage } from './pages/FuelManagementPage';
import { ReportsPage } from './pages/ReportsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';

// Enterprise Operations Modules
import { CommandCenterPage } from './pages/CommandCenterPage';
import { DispatchCenterPage } from './pages/DispatchCenterPage';
import { SmartSchedulingPage } from './pages/SmartSchedulingPage';
import { EmergencyResponsePage } from './pages/EmergencyResponsePage';
import { VehicleInspectionPage } from './pages/VehicleInspectionPage';
import { IncidentManagementPage } from './pages/IncidentManagementPage';
import { DepotManagementPage } from './pages/DepotManagementPage';
import { PassengerIntelligencePage } from './pages/PassengerIntelligencePage';
import { DemandForecastingPage } from './pages/DemandForecastingPage';
import { AIRouteOptimizerPage } from './pages/AIRouteOptimizerPage';
import { DriverRiskAnalyticsPage } from './pages/DriverRiskAnalyticsPage';
import { AIOperationsAssistantPage } from './pages/AIOperationsAssistantPage';
import { ComplianceCenterPage } from './pages/ComplianceCenterPage';
import { RevenueManagementPage } from './pages/RevenueManagementPage';
import { ExpenseManagementPage } from './pages/ExpenseManagementPage';
import { VendorManagementPage } from './pages/VendorManagementPage';
import { SystemHealthPage } from './pages/SystemHealthPage';
import { AuditLogPage } from './pages/AuditLogPage';
import { UserRoleManagementPage } from './pages/UserRoleManagementPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              {/* AREA A — PUBLIC MARKETING WEBSITE */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/ai" element={<AIPage />} />
                <Route path="/safety" element={<SafetyPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/privacy" element={<LegalPages />} />
                <Route path="/terms" element={<LegalPages />} />
                <Route path="/security" element={<LegalPages />} />
                <Route path="/cookies" element={<LegalPages />} />
              </Route>

              {/* AUTHENTICATION ROUTES */}
              <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
              <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
              <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPasswordPage /></PublicOnlyRoute>} />
              <Route path="/reset-password" element={<PublicOnlyRoute><ResetPasswordPage /></PublicOnlyRoute>} />

              {/* AREA B — OPERATIONS PLATFORM (Protected Routes under /app) */}
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppShell />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="command-center" element={<CommandCenterPage />} />
                <Route path="buses" element={<BusManagementPage />} />
                <Route path="drivers" element={<DriverManagementPage />} />
                <Route path="routes" element={<RouteManagementPage />} />
                <Route path="trips" element={<TripManagementPage />} />
                <Route path="dispatch" element={<DispatchCenterPage />} />
                <Route path="maintenance" element={<MaintenancePage />} />
                <Route path="inspections" element={<VehicleInspectionPage />} />
                <Route path="inspection" element={<VehicleInspectionPage />} />
                <Route path="incidents" element={<IncidentManagementPage />} />
                <Route path="fuel" element={<FuelManagementPage />} />
                <Route path="revenue" element={<RevenueManagementPage />} />
                <Route path="expenses" element={<ExpenseManagementPage />} />
                <Route path="analytics" element={<ReportsPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="ai-insights" element={<AIOperationsAssistantPage />} />
                <Route path="ai-assistant" element={<AIOperationsAssistantPage />} />
                <Route path="demand-forecast" element={<DemandForecastingPage />} />
                <Route path="demand-forecasting" element={<DemandForecastingPage />} />
                <Route path="route-optimizer" element={<AIRouteOptimizerPage />} />
                <Route path="compliance" element={<ComplianceCenterPage />} />
                <Route path="users" element={<UserRoleManagementPage />} />
                <Route path="users-roles" element={<UserRoleManagementPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="audit-logs" element={<AuditLogPage />} />
                <Route path="profile" element={<ProfilePage />} />

                {/* Additional Platform Utility Views */}
                <Route path="tracking" element={<LiveTrackingPage />} />
                <Route path="scheduling" element={<SmartSchedulingPage />} />
                <Route path="emergency" element={<EmergencyResponsePage />} />
                <Route path="depots" element={<DepotManagementPage />} />
                <Route path="passenger-intelligence" element={<PassengerIntelligencePage />} />
                <Route path="driver-risk" element={<DriverRiskAnalyticsPage />} />
                <Route path="vendors" element={<VendorManagementPage />} />
                <Route path="system-health" element={<SystemHealthPage />} />
                <Route path="passengers" element={<PassengerPage />} />
              </Route>

              {/* BACKWARD-COMPATIBILITY REDIRECTS FOR LEGACY UNPREFIXED PLATFORM PATHS */}
              <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
              <Route path="/command-center" element={<Navigate to="/app/command-center" replace />} />
              <Route path="/buses" element={<Navigate to="/app/buses" replace />} />
              <Route path="/drivers" element={<Navigate to="/app/drivers" replace />} />
              <Route path="/routes" element={<Navigate to="/app/routes" replace />} />
              <Route path="/trips" element={<Navigate to="/app/trips" replace />} />
              <Route path="/dispatch" element={<Navigate to="/app/dispatch" replace />} />
              <Route path="/maintenance" element={<Navigate to="/app/maintenance" replace />} />
              <Route path="/inspections" element={<Navigate to="/app/inspections" replace />} />
              <Route path="/inspection" element={<Navigate to="/app/inspections" replace />} />
              <Route path="/incidents" element={<Navigate to="/app/incidents" replace />} />
              <Route path="/fuel" element={<Navigate to="/app/fuel" replace />} />
              <Route path="/revenue" element={<Navigate to="/app/revenue" replace />} />
              <Route path="/expenses" element={<Navigate to="/app/expenses" replace />} />
              <Route path="/analytics" element={<Navigate to="/app/analytics" replace />} />
              <Route path="/reports" element={<Navigate to="/app/reports" replace />} />
              <Route path="/compliance" element={<Navigate to="/app/compliance" replace />} />
              <Route path="/users" element={<Navigate to="/app/users" replace />} />
              <Route path="/users-roles" element={<Navigate to="/app/users" replace />} />
              <Route path="/notifications" element={<Navigate to="/app/notifications" replace />} />
              <Route path="/settings" element={<Navigate to="/app/settings" replace />} />
              <Route path="/audit-logs" element={<Navigate to="/app/audit-logs" replace />} />
              <Route path="/profile" element={<Navigate to="/app/profile" replace />} />
              <Route path="/tracking" element={<Navigate to="/app/tracking" replace />} />
              <Route path="/scheduling" element={<Navigate to="/app/scheduling" replace />} />
              <Route path="/emergency" element={<Navigate to="/app/emergency" replace />} />
              <Route path="/depots" element={<Navigate to="/app/depots" replace />} />
              <Route path="/ai-assistant" element={<Navigate to="/app/ai-insights" replace />} />
              <Route path="/route-optimizer" element={<Navigate to="/app/route-optimizer" replace />} />
              <Route path="/passenger-intelligence" element={<Navigate to="/app/passenger-intelligence" replace />} />
              <Route path="/demand-forecasting" element={<Navigate to="/app/demand-forecast" replace />} />
              <Route path="/driver-risk" element={<Navigate to="/app/driver-risk" replace />} />
              <Route path="/vendors" element={<Navigate to="/app/vendors" replace />} />
              <Route path="/system-health" element={<Navigate to="/app/system-health" replace />} />
              <Route path="/passengers" element={<Navigate to="/app/passengers" replace />} />

              {/* 404 PAGE NOT FOUND */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
