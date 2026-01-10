import { z } from 'zod';
import { http } from '@shared/http';
import {
  taskSchema,
  type Task,
  type TaskCreateInput,
  type TaskUpdateInput,
} from '@features/tasks/validation/taskSchema';

const taskListSchema = z.array(taskSchema);

// { data: ... } ラップも許容
const taskResourceSchema = z.object({ data: taskSchema });
const taskCollectionSchema = z.object({ data: z.array(taskSchema) });

function unwrapTaskList(data: unknown): Task[] {
  const wrapped = taskCollectionSchema.safeParse(data);
  if (wrapped.success) return wrapped.data.data;
  return taskListSchema.parse(data);
}

function unwrapTask(data: unknown): Task {
  const wrapped = taskResourceSchema.safeParse(data);
  if (wrapped.success) return wrapped.data.data;
  return taskSchema.parse(data);
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await http.get('/api/tasks');
  return unwrapTaskList(res.data);
}

export async function fetchTask(id: number): Promise<Task> {
  const res = await http.get(`/api/tasks/${id}`);
  return unwrapTask(res.data);
}

export async function createTask(input: TaskCreateInput): Promise<Task> {
  const res = await http.post('/api/tasks', input);
  return unwrapTask(res.data);
}

export async function updateTask(id: number, input: TaskUpdateInput): Promise<Task> {
  const res = await http.patch(`/api/tasks/${id}`, input);
  return unwrapTask(res.data);
}

export async function deleteTask(id: number): Promise<void> {
  await http.delete(`/api/tasks/${id}`);
}
