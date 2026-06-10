import { API_BASE } from "./base";
import { authFetch } from "./base";

export const fetchMatchBets = () =>
    authFetch(`${API_BASE}/bets/matches`).then(r => r.json());

export const saveMatchBet = (payload) =>
    authFetch(`${API_BASE}/bets/matches`, {
        method: "POST",
        body: JSON.stringify(payload),
    }).then(r => r.json());

export const putMatchBet = (betId, payload) =>
    authFetch(`${API_BASE}/bets/matches/${betId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    }).then(r => r.json());

export const fetchSpecialBets = () =>
    authFetch(`${API_BASE}/bets/special`).then(r => r.json());

export const saveSpecialBet = (payload) =>
    authFetch(`${API_BASE}/bets/special`, {
        method: "POST",
        body: JSON.stringify(payload),
    }).then(r => r.json());

export const putSpecialBet = (betId, payload) =>
    authFetch(`${API_BASE}/bets/special/${betId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    }).then(r => r.json());