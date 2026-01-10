import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router';
import { z } from 'zod';

import {
  fetchTasks,
  fetchTask,
  createTask,
  updateTask,
  deleteTask,
} from '@features/tasks/api/taskApi';
import { taskCreateSchema, taskUpdateSchema } from '@features/tasks/validation/taskSchema';

export async function tasksListLoader() {
  const tasks = await fetchTasks();
  return { tasks };
}

export async function taskEditLoader({ params }: LoaderFunctionArgs) {
  const id = Number(params.id);
  const task = await fetchTask(id);
  return { task };
}

export async function createTaskAction({ request }: ActionFunctionArgs) {
  const fd = await request.formData();
  const input = {
    title: String(fd.get('title') ?? ''),
  };

  const parsed = taskCreateSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false as const,
      fieldErrors: zodFieldErrors(parsed.error),
      values: input,
    };
  }

  await createTask(parsed.data);
  return redirect('/tasks');
}

export async function updateOrDeleteTaskAction({ request, params }: ActionFunctionArgs) {
  const id = Number(params.id);
  const fd = await request.formData();
  const intent = String(fd.get('intent') ?? 'update');

  if (intent === 'delete') {
    await deleteTask(id);
    return redirect('/tasks');
  }

  const input = {
    title: String(fd.get('title') ?? ''),
    is_done: fd.get('is_done') === 'on' || fd.get('is_done') === 'true',
  };

  const parsed = taskUpdateSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false as const,
      fieldErrors: zodFieldErrors(parsed.error),
      values: input,
    };
  }

  await updateTask(id, parsed.data);
  return redirect('/tasks');
}

function zodFieldErrors(err: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path[0];
    if (typeof key === 'string') out[key] = issue.message;
  }
  return out;
}
