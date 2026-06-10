
export const AUTH_API_BASE = "http://185.249.198.58:8081"

export const loginUser = (loginData) =>
    fetch(`${AUTH_API_BASE}/auth`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(loginData),
    }).then((r) => r.json());

export const registerUser = (registerData) =>
    fetch(`${AUTH_API_BASE}/user`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(registerData),
    }).then((r) => r.json());


