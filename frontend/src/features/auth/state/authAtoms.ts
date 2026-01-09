import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import type { Me } from '../api/authApi';

export const authBusyAtom = atomWithReset(false);
export const authServerErrorAtom = atomWithReset<string | null>(null);

// 「認証済みユーザー」を必要なら保持（Bでは任意）
export const authUserAtom = atom<Me | null>(null);
export const isAuthenticatedAtom = atom((get) => !!get(authUserAtom));
