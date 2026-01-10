import { createBrowserRouter, redirect } from 'react-router';

import { LoginPage } from '@features/auth/pages/LoginPage';
import { DashboardPage } from '@features/dashboard/pages/DashboardPage';
import { requireAuth, redirectIfAuthed } from '@features/auth/router/routerGuards';
import { TaskListPage } from '@features/tasks/pages/TaskListPage';
import { TaskNewPage } from '@features/tasks/pages/TaskNewPage';
import { TaskEditPage } from '@features/tasks/pages/TaskEditPage';
import {
  createTaskAction,
  taskEditLoader,
  tasksListLoader,
  updateOrDeleteTaskAction,
} from '@features/tasks/router/tasksRoutes';
import { TasksLayout } from '@features/tasks/pages/TaslLayout';

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
  // ✅ /tasks を親にして auth を一括
  {
    path: '/tasks',
    element: <TasksLayout />,
    loader: requireAuth,
    children: [
      { index: true, element: <TaskListPage />, loader: tasksListLoader },
      { path: 'new', element: <TaskNewPage />, action: createTaskAction },
      {
        path: ':id/edit',
        element: <TaskEditPage />,
        loader: taskEditLoader,
        action: updateOrDeleteTaskAction,
      },
    ],
  },
  {
    path: '*',
    loader: async () => redirect('/dashboard'),
  },
]);
