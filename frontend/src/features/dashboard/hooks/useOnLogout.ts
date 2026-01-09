import { logoutUsecase } from '@features/auth/usecases/logoutUsecase';
import React from 'react';

type onAfterLogoutArgs = {
  onAfterLogout: () => void;
};

export function useOnLogout({ onAfterLogout }: onAfterLogoutArgs) {
  return React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.preventDefault();
      await logoutUsecase();
      onAfterLogout();
    },
    [onAfterLogout],
  );
}
