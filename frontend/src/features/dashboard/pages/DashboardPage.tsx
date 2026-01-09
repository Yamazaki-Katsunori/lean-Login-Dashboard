import { useLoaderData, useNavigate } from 'react-router';

import type { Me } from '@features/auth/api/authApi';
import { Card, Button } from '@base/components';
import { useOnLogout } from '@features/dashboard/hooks/useOnLogout';

type LoaderData = { me: Me };

export function DashboardPage() {
  const { me } = useLoaderData() as LoaderData;
  const navigate = useNavigate();

  const onLogout = useOnLogout({
    onAfterLogout: () => navigate('/login', { replace: true }),
  });

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-12 gap-6 px-4 py-10">
        <div className="col-span-12 flex items-start justify-center">
          <Card className="w-full max-w-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold text-zinc-900">Dashboard</h1>
                <p className="mt-2 text-sm text-zinc-700">
                  Logged in as: <span className="font-medium">{me.name}</span> ({me.email})
                </p>
              </div>

              <Button variant="secondary" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
