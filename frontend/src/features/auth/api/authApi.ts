import { http } from '@shared/http';

export type Me = {
  id: number;
  name: string;
  email: string;
};

export async function csrf() {
  await http.get('/sanctum/csrf-cookie');
}

export async function login(email: string, password: string) {
  await csrf();
  await http.post('/api/login', { email, password });
}

export async function fetchMe(): Promise<Me> {
  const res = await http.get('/api/me');
  return res.data as Me;
}

export async function logout() {
  await http.post('/api/logout');
}
