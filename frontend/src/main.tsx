import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css';
import './styles/globals.css';
import { RouterProvider } from 'react-router';
import { Provider as JotaiProvider } from 'jotai';
import { router } from '@app/router.tsx';
import { appStore } from '@store/appStore';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JotaiProvider store={appStore}>
      <RouterProvider router={router} />
    </JotaiProvider>
  </StrictMode>,
);
