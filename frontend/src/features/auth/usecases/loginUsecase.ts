import axios from 'axios';
import { login, fetchMe } from '@features/auth/api/authApi';

export type LoginFailureReason = 'invalid_credentials' | 'csrf' | 'network' | 'unknown';

export type LoginResult = { ok: true } | { ok: false; reason: LoginFailureReason; status?: number };

export async function loginUsecase(email: string, password: string): Promise<LoginResult> {
  try {
    await login(email, password);
    await fetchMe();
    return { ok: true };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const status = e.response?.status;
      if (status === 422) return { ok: false, reason: 'invalid_credentials', status };
      if (status === 419) return { ok: false, reason: 'csrf', status };
      if (typeof status === 'number') return { ok: false, reason: 'unknown', status };
      return { ok: false, reason: 'network' };
    }
    return { ok: false, reason: 'unknown' };
  }
}
