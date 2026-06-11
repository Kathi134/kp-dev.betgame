import { API_BASE, authFetch } from "./base";

export const fetchMatchBets = () =>
    authFetch(`${API_BASE}/ranking/global/bets/matches`)
        .then(r => r.json());

export const fetchSpecialBets = () =>
    authFetch(`${API_BASE}/ranking/global/bets/special`)
        .then(r => r.json());

export const fetchGlobalRanking = () =>
    authFetch(`${API_BASE}/ranking/global`)
        .then(r => r.json());