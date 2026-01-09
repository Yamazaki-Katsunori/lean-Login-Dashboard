import axios from 'axios';
import { redirect, type LoaderFunctionArgs } from 'react-router';
import { fetchMe } from '@features/auth/api/authApi';

export async function requireAuth(args: LoaderFunctionArgs) {
  void args;

  try {
    const me = await fetchMe();
    return { me };
  } catch (e) {
    // axiosエラーの判定（401ならログインへ）
    if (axios.isAxiosError(e) && e.response?.status === 401) {
      throw redirect(`/login`);
    }
    throw e; // それ以外はそのまま（ネットワーク/500等）
  }
}

export async function redirectIfAuthed() {
  try {
    await fetchMe();
    throw redirect('/dashboard');
  } catch {
    return null; // 未ログインならそのまま/login表示
  }
}
