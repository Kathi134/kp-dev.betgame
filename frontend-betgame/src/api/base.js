import { refreshAccessToken, tokenStore } from "../auth/api/token";

export const API_BASE = "https://tipp.kp-dev.de/api/api"; // ggf. anpassen

let authFailureHandler = null;

export const setAuthFailureHandler = (fn) => {
    authFailureHandler = fn;
};

const handleAuthFailure = () => {
    if (authFailureHandler) authFailureHandler();
};

export const authFetch = async (url, options = {}, retry = true) => {
    let accessToken = tokenStore.getAccess();

    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
    });

    if ((res.status === 401 || res.status === 403) && retry) {
        const newToken = await refreshAccessToken();

        if (!newToken) {
            tokenStore.clear();
            handleAuthFailure();
            throw new Error("Session expired");
        }

        return authFetch(url, options, false);
    }

    return res;
};
