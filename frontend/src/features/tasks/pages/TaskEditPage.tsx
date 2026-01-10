import { Form, useLoaderData, useActionData, useNavigation, useNavigate } from 'react-router';
import { Card, Button, Input, Alert } from '@base/components';
import type { Task } from '@features/tasks/validation/taskSchema';

type LoaderData = { task: Task };
type ActionData =
  | { ok: false; fieldErrors: Record<string, string>; values: { title: string; is_done: boolean } }
  | undefined;

export function TaskEditPage() {
  const { task } = useLoaderData() as LoaderData;
  const ad = useActionData() as ActionData;
  const nav = useNavigation();
  const busy = nav.state === 'submitting';
  const navigate = useNavigate();

  const title = ad?.values.title ?? task.title;
  const isDone = ad?.values.is_done ?? task.is_done;

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-12 gap-6 px-4 py-10">
        <div className="col-span-12 flex items-start justify-center">
          <Card className="w-full max-w-2xl">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-zinc-900">Edit Task</h1>
              <Button variant="secondary" onClick={() => navigate('/tasks')}>
                Back
              </Button>
            </div>

            {ad && !ad.ok && (
              <div className="mt-4">
                <Alert tone="danger">入力内容を確認してください</Alert>
              </div>
            )}

            <Form method="post" className="mt-6 space-y-4">
              <Input
                label="Title"
                name="title"
                defaultValue={title}
                error={ad?.fieldErrors.title}
                disabled={busy}
              />

              <label className="flex items-center gap-2 text-sm text-zinc-800">
                <input type="checkbox" name="is_done" defaultChecked={isDone} disabled={busy} />
                Done
              </label>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  name="intent"
                  value="update"
                  disabled={busy}
                  className="flex-1"
                >
                  {busy ? 'Saving…' : 'Save'}
                </Button>
                <Button
                  type="submit"
                  name="intent"
                  value="delete"
                  variant="secondary"
                  disabled={busy}
                >
                  Delete
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
