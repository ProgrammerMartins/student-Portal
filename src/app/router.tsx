import { Suspense, lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignUpPage } from '@/pages/auth/SignUpPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { LandingPage } from '@/pages/LandingPage'
import { RegisterPage } from '@/features/authentication/pages/RegisterPage'
import { PageLoader } from '@/shared/components/loading/PageLoader'
import { RequireAuth } from './guards/RequireAuth'
import { RequireProfile } from './guards/RequireProfile'
import { RegistrationGate } from './guards/RegistrationGate'

const CoursesPage = lazy(() =>
  import('@/features/courses/pages/CoursesPage').then((m) => ({ default: m.CoursesPage })),
)
const ResultsPage = lazy(() =>
  import('@/features/results/pages/ResultsPage').then((m) => ({ default: m.ResultsPage })),
)
const RegistrationPage = lazy(() =>
  import('@/features/registration/pages/RegistrationPage').then((m) => ({ default: m.RegistrationPage })),
)
const PaymentsPage = lazy(() =>
  import('@/features/payments/pages/PaymentsPage').then((m) => ({ default: m.PaymentsPage })),
)
const TimetablePage = lazy(() =>
  import('@/features/timetable/pages/TimetablePage').then((m) => ({ default: m.TimetablePage })),
)
const NotificationsPage = lazy(() =>
  import('@/features/notifications/pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage })),
)
const SettingsPage = lazy(() =>
  import('@/features/settings/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })),
)
const StudentsPage = lazy(() =>
  import('@/features/students/pages/StudentsPage').then((m) => ({ default: m.StudentsPage })),
)
const ProfilePage = lazy(() =>
  import('@/features/students/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })),
)
const AdministrationPage = lazy(() =>
  import('@/features/administration/pages/AdministrationPage').then((m) => ({ default: m.AdministrationPage })),
)
const AnalyticsPage = lazy(() =>
  import('@/features/dashboard/pages/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage })),
)

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter(
  [
    // ─── Public landing page ───────────────────────────────────────────────
    {
      path: '/',
      element: <LandingPage />,
    },
    // ─── Auth pages ────────────────────────────────────────────────────────
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/signup',
      element: <SignUpPage />,
    },
    // ─── Protected portal routes ───────────────────────────────────────────
    {
      element: <RequireAuth />,
      children: [
        {
          element: <RegistrationGate />,
          children: [{ path: '/register', element: <RegisterPage /> }],
        },
        {
          element: <RequireProfile />,
          children: [
            {
              path: '/portal',
              element: <RootLayout />,
              children: [
                { index: true, element: <Navigate to="/portal/dashboard" replace /> },
                { path: 'dashboard', element: <DashboardPage /> },
                { path: 'courses', element: withSuspense(CoursesPage) },
                { path: 'results', element: withSuspense(ResultsPage) },
                { path: 'registration', element: withSuspense(RegistrationPage) },
                { path: 'payments', element: withSuspense(PaymentsPage) },
                { path: 'timetable', element: withSuspense(TimetablePage) },
                { path: 'notifications', element: withSuspense(NotificationsPage) },
                { path: 'settings', element: withSuspense(SettingsPage) },
                { path: 'profile', element: withSuspense(ProfilePage) },
                { path: 'students', element: withSuspense(StudentsPage) },
                { path: 'administration', element: withSuspense(AdministrationPage) },
                { path: 'analytics', element: withSuspense(AnalyticsPage) },
                { path: '*', element: <NotFoundPage /> },
              ],
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
)

