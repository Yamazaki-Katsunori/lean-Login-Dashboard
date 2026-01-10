import { Form, useActionData, useNavigation, useNavigate } from 'react-router';
import { Card, Button, Input, Alert } from '@base/components';

type ActionData =
  | { ok: false; fieldErrors: Record<string, string>; values: { title: string } }
  | undefined;

export function TaskNewPage() {
  const navigate = useNavigate();
  const nav = useNavigation();
  const busy = nav.state === 'submitting';

  const ad = useActionData() as ActionData;

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-12 gap-6 px-4 py-10">
        <div className="col-span-12 flex items-start justify-center">
          <Card className="w-full max-w-2xl">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-zinc-900">New Task</h1>
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
                defaultValue={ad?.values.title ?? ''}
                error={ad?.fieldErrors.title}
                disabled={busy}
              />

              <Button type="submit" disabled={busy} className="w-full">
                {busy ? 'Creating…' : 'Create'}
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
