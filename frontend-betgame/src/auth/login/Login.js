import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

import { loginUser, registerUser } from "../api/auth";
import { tokenStore } from "../api/token";

export default function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const [loginData, setLoginData] = useState({
        userOrEmail: "",
        password: "",
    });

    const [registerData, setRegisterData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleAuth = (e, apiCall, errorMessage) => {
        e.preventDefault();
        setLoading(true);

        apiCall()
            .then((data) => {
                if (!data || data.error)
                    throw new Error(errorMessage);
                tokenStore.setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken, });
                setResponse(data);
                navigate("/stats");
            })
            .catch((err) => {
                console.error(err);
                setResponse({ error: errorMessage });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleLogin = (e) =>
        handleAuth(e, () => loginUser(loginData), "Login fehlgeschlagen");

    const handleRegister = (e) =>
        handleAuth(e, () => registerUser(registerData), "Registrierung fehlgeschlagen");

    return (
        <div className="container full-height">
            <div className="card">
                <h2>{isLogin ? "Einloggen" : "Registrieren"}</h2>

                {isLogin ? (
                    <form className="form" onSubmit={handleLogin}>
                        <input type="text" placeholder="Benutzername oder E-Mail" value={loginData.userOrEmail}
                            onChange={(e) => setLoginData({ ...loginData, userOrEmail: e.target.value, })} />

                        <input type="password" placeholder="Passwort" value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value, })} />

                        <button type="submit" disabled={loading}>
                            {loading ? "Lädt..." : "Login"}
                        </button>
                    </form>
                ) : (
                    <form className="form" onSubmit={handleRegister}>
                        <input type="email" placeholder="E-Mail" value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value, })} />

                        <input type="text" placeholder="Benutzername" value={registerData.username}
                            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value, })} />

                        <input type="password" placeholder="Passwort" value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value, })} />

                        <button type="submit" disabled={loading}>
                            {loading ? "Lädt..." : "Registrieren"}
                        </button>
                    </form>
                )}

                <button className="switchButton" onClick={() => setIsLogin(!isLogin)} >
                    {isLogin
                        ? "Du hast noch keinen Account?"
                        : "Du hast bereits einen Account?"}
                </button>

                {response &&
                    <pre className="response">{JSON.stringify(response, null, 2)}</pre>
                }
            </div>
        </div>
    );
}