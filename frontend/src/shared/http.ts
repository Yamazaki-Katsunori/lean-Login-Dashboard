import axios from 'axios';

export const http = axios.create({
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true, // Cookie運用（Sanctum SPA）
  // axios v1系: XSRF-TOKEN cookie → X-XSRF-TOKEN ヘッダを自動設定しやすい
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});
