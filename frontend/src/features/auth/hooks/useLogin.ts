import React from 'react';
import { loginUsecase } from '@features/auth/usecases/loginUsecase';

export function useLogin() {
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (email: string, password: string) => {
    setError(null);
    setBusy(true);
    const res = await loginUsecase(email, password);
    setBusy(false);

    if (res.ok) return { ok: true as const };

    if (res.reason === 'invalid_credentials') setError('メールアドレスまたはパスワードが違います');
    else if (res.reason === 'csrf') setError('CSRFエラーです。再読み込みしてお試しください');
    else setError('ログインに失敗しました');

    return { ok: false as const };
  };

  return { busy, error, submit };
}
