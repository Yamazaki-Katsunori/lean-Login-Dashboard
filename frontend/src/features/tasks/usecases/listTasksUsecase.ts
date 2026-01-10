import { fetchTasks } from '@features/tasks/api/taskApi';

export async function listTasksUsecase() {
  return await fetchTasks();
}
