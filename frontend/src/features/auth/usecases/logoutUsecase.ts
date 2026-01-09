import { logout } from '@features/auth/api/authApi';

export async function logoutUsecase(): Promise<void> {
  try {
    await logout();
  } catch {
    // 学習用は割り切り（失敗してもログインへ戻す）
  }
}
