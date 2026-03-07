import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ReportPage from '@/components/pages/ReportPage';
import SuccessPage from '@/components/pages/SuccessPage';
import ImpactPage from '@/components/pages/ImpactPage';
import RecyclingCentersPage from '@/components/pages/RecyclingCentersPage';
import AdminDashboard from '@/components/pages/AdminDashboard';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "report",
        element: <ReportPage />,
        routeMetadata: {
          pageIdentifier: 'report',
        },
      },
      {
        path: "success",
        element: <SuccessPage />,
        routeMetadata: {
          pageIdentifier: 'success',
        },
      },
      {
        path: "impact",
        element: <ImpactPage />,
        routeMetadata: {
          pageIdentifier: 'impact',
        },
      },
      {
        path: "centers",
        element: <RecyclingCentersPage />,
        routeMetadata: {
          pageIdentifier: 'centers',
        },
      },
      {
        path: "admin",
        element: <AdminDashboard />,
        routeMetadata: {
          pageIdentifier: 'admin',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
