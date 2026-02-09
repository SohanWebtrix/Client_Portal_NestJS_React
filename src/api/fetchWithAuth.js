import { LOCAL_FORM_API } from "../config/config";

export async function fetchWithAuth(url, options = {}) {
  const res = await fetch(url, { ...options, credentials: 'include' });

  if (res.status !== 401) return res;

  // 🚨 Guard
  if (url.includes('/auth/refresh')) {
    throw new Error('Refresh failed');
  }

  const refreshRes = await fetch(`${LOCAL_FORM_API}/auth/refresh`, {

    method: 'POST',
    credentials: 'include',
  });

  if (!refreshRes.ok) {
    window.location.href = '/';
    throw new Error('Session expired');
  }

  return fetch(url, { ...options, credentials: 'include' });
}