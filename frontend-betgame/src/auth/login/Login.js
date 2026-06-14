import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

import { loginUser, registerUser } from "../api/auth";
import { FaRegCopy } from "react-icons/fa";
import { useAuth } from "../global/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { isAuthenticated, loading, login } = useAuth();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, loading, navigate]);

    const [isLogin, setIsLogin] = useState(true);
    const [internalLoading, setInternalLoading] = useState(false);
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
        setInternalLoading(true);

        apiCall()
            .then((data) => {
                // console.log(JSON.stringify(data))
                if (!data || data.error)
                    throw new Error(data?.message || JSON.stringify(data));
                login({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                });
            })
            .catch((err) => {
                console.error(err);
                setResponse({ error: errorMessage, data: errorMessage?.includes("Login") ? loginData : registerData, raw: err.message, stack: err.stack });
            })
            .finally(() => {
                setInternalLoading(false);
            });
    };

    const handleLogin = (e) =>
        handleAuth(e, () => loginUser(loginData), "Login fehlgeschlagen");

    const handleRegister = (e) =>
        handleAuth(e, () => registerUser(registerData), "Registrierung fehlgeschlagen");

    if (loading) {
        return <div>Logging in...</div>;
    }

    return (
        <div className="container full-height">
            <div className="login-card">
                <h2>{isLogin ? "Einloggen" : "Registrieren"}</h2>

                {isLogin ? (
                    <form className="form" onSubmit={handleLogin}>
                        <input type="text" placeholder="Benutzername oder E-Mail" value={loginData.userOrEmail}
                            onChange={(e) => setLoginData({ ...loginData, userOrEmail: e.target.value, })} />

                        <input type="password" placeholder="Passwort" value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value, })} />

                        <button type="submit" disabled={internalLoading}>
                            {internalLoading ? "Lädt..." : "Login"}
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

                        <button type="submit" disabled={internalLoading}>
                            {internalLoading ? "Lädt..." : "Registrieren"}
                        </button>
                    </form>
                )}

                <button className="switchButton" onClick={() => setIsLogin(!isLogin)} >
                    {isLogin
                        ? "Du hast noch keinen Account?"
                        : "Du hast bereits einen Account?"}
                </button>

                {response &&
                    <div className="vertical-container">
                        <pre className="response">{JSON.stringify(response, null, 2)}</pre>
                        <button className="copy-btn" onClick={() => navigator.clipboard.writeText(JSON.stringify(response, null, 2))}><FaRegCopy /></button>
                    </div>
                }
            </div>
        </div>
    );
}