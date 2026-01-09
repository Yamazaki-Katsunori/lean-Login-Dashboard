import { createBrowserRouter, redirect } from 'react-router';

import { LoginPage } from '@features/auth/pages/LoginPage';
import { DashboardPage } from '@features/dashboard/pages/DashboardPage';
import { requireAuth, redirectIfAuthed } from '@features/auth/router/routerGuards';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    loader: redirectIfAuthed,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    loader: requireAuth,
  },
  {
    path: '*',
    loader: async () => redirect('/dashboard'),
  },
]);
