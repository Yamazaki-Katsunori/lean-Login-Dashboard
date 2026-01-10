import { useLoaderData, useNavigate } from 'react-router';
import type { Task } from '@features/tasks/validation/taskSchema';
import { Card, Button } from '@base/components';

type LoaderData = { tasks: Task[] };

export function TaskListPage() {
  const { tasks } = useLoaderData() as LoaderData;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-12 gap-6 px-4 py-10">
        <div className="col-span-12 flex items-start justify-center">
          <Card className="w-full max-w-2xl">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-zinc-900">Tasks</h1>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => navigate('/dashboard')}>
                  Back
                </Button>
                <Button onClick={() => navigate('/tasks/new')}>New</Button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {tasks.length === 0 && <p className="text-sm text-zinc-600">No tasks</p>}
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-md border border-zinc-200 bg-white px-3 py-2"
                >
                  <span className={t.is_done ? 'text-zinc-500 line-through' : 'text-zinc-900'}>
                    {t.title}
                  </span>
                  <Button variant="secondary" onClick={() => navigate(`/tasks/${t.id}/edit`)}>
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
