import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Report from './pages/Report';
import RecommandWriter from './pages/RecommandWriter';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import DashboardApp from './pages/DashboardApp';
import RegisterWriter from './sections/register/RegisterWriter';
import RegisterWriterDetail from './sections/register/RegisterWriterDetail';
import Register from './pages/Register';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'recommand', element: <RecommandWriter /> },
        {
          path: '/dashboard/register',
          element: <Register />,
          children: [
            { path: '/dashboard/register/detail', element: <RegisterWriterDetail /> },
            { path: '/dashboard/register', element: <RegisterWriter /> },
          ],
        },
        { path: 'report', element: <Report /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/" /> },
  ]);
}
