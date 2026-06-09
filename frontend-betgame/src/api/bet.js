import { API_BASE, token } from "./base";

const auhtorizedOptions = (options = {}) => ({
    ...options,
    headers: {
        ...options.headers,
        Authorization: "Bearer " + token
    }
})

export const fetchMatchBets = () =>
    fetch(`${API_BASE}/bets/matches`, auhtorizedOptions()).then(r => r.json());

export const saveMatchBet = (payload) =>
    fetch(`${API_BASE}/bets/matches`, auhtorizedOptions({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })).then(r => r.json());

export const putMatchBet = (betId, payload) =>
    fetch(`${API_BASE}/bets/matches/${betId}`, auhtorizedOptions({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })).then(r => r.json());


export const fetchSpecialBets = () =>
    fetch(`${API_BASE}/bets/special`, auhtorizedOptions()).then(r => r.json());

export const saveSpecialBet = (payload) =>
    fetch(`${API_BASE}/bets/special`, auhtorizedOptions({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })).then(r => r.json());

export const putSpecialBet = (betId, payload) =>
    fetch(`${API_BASE}/bets/special/${betId}`, auhtorizedOptions({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })).then(r => r.json());