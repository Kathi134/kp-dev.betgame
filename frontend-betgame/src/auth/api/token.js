import { AUTH_API_BASE } from "./auth";

const TOKEN_KEY = {
    access: "access_token",
    refresh: "refresh_token",
};

export const tokenStore = {
    getAccess: () => localStorage.getItem(TOKEN_KEY.access),
    getRefresh: () => localStorage.getItem(TOKEN_KEY.refresh),

    setTokens: ({ accessToken, refreshToken }) => {
        localStorage.setItem(TOKEN_KEY.access, accessToken);
        localStorage.setItem(TOKEN_KEY.refresh, refreshToken);
    },

    clear: () => {
        localStorage.removeItem(TOKEN_KEY.access);
        localStorage.removeItem(TOKEN_KEY.refresh);
    },
};

export const refreshAccessToken = async () => {
    const refreshToken = tokenStore.getRefresh();

    if (!refreshToken) return null;

    const res = await fetch(`${AUTH_API_BASE}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
        tokenStore.clear();
        return null;
    }

    const data = await res.json();

    tokenStore.setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken ?? refreshToken,
    });

    return data.accessToken;
};