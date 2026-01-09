import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { useLogin } from '@features/auth/hooks/useLogin';
import { useLoginSubmit } from '@features/auth/hooks/useLoginSubmit';
import { Button, Input, Card } from '@base/components';
import { type LoginForm, validateLogin } from '@features/auth/validation/loginSchema';

export function LoginPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') ?? '/dashboard';

  const { busy, error: serverError, submit } = useLogin();

  const [form, setForm] = React.useState<LoginForm>({ email: '', password: '' });
  const [errors, setErrors] = React.useState<Partial<Record<keyof LoginForm, string>>>({});

  const { onSubmit } = useLoginSubmit({
    form,
    setErrors,
    validate: validateLogin,
    submit,
    onSuccess: () => navigate(next, { replace: true }),
  });

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-12 gap-6 px-4">
        <div className="col-span-12 flex items-center justify-center">
          <Card className="w-full max-w-md">
            {serverError && (
              <div style={{ margin: '12px 0', padding: 12, border: '1px solid #ccc' }}>
                {serverError}
              </div>
            )}
            {/* form */}
            <form onSubmit={onSubmit}>
              <Input
                label="Email"
                type="email"
                error={errors.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              />

              <Input
                label="Password"
                type="password"
                error={errors.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              />

              <Button type="submit" disabled={busy} style={{ width: '100%' }}>
                {busy ? 'Logging in…' : 'Login'}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
