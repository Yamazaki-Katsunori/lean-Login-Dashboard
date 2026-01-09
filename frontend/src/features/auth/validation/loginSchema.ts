import z from 'zod';

export const loginSchema = z.object({
  email: z.email('メールアドレスの形式が正しくありません'),
  password: z.string().min(1, 'パスワードを入力してください'),
});

export type LoginForm = z.infer<typeof loginSchema>;

export type LoginFieldErrors = Partial<Record<keyof LoginForm, string>>;

export function validateLogin(
  form: LoginForm,
): { ok: true; errors: LoginFieldErrors } | { ok: false; errors: LoginFieldErrors } {
  const parsed = loginSchema.safeParse(form);

  if (parsed.success) {
    return { ok: true, errors: {} };
  }

  const errors: LoginFieldErrors = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path[0] as keyof LoginForm | undefined;
    if (key) errors[key] = issue.message;
  }

  return { ok: false, errors };
}
