import { authFetch, API_BASE } from "./base";

export const fetchSelf = () =>
    authFetch(`${API_BASE}/auth/me`).then(r => r.json());