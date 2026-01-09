import type React from 'react';
import type { LoginForm, LoginFieldErrors } from '@features/auth/validation/loginSchema';

type ValidateFn = (form: LoginForm) => { ok: true } | { ok: false; errors: LoginFieldErrors };

type SubmitFn = (email: string, password: string) => Promise<{ ok: boolean }>;

type Args = {
  form: LoginForm;
  setErrors: React.Dispatch<React.SetStateAction<LoginFieldErrors>>;
  validate: ValidateFn;
  submit: SubmitFn;
  onSuccess: () => void;
};

export function useLoginSubmit(args: Args) {
  const { form, setErrors, validate, submit, onSuccess } = args;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const v = validate(form);
    if (!v.ok) {
      setErrors(v.errors);
      return;
    }
    setErrors({});

    const res = await submit(form.email, form.password);
    if (res.ok) onSuccess();
  };

  return { onSubmit };
}
