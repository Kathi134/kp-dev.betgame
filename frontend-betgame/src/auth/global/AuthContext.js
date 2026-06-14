import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { tokenStore, refreshAccessToken } from "../api/token";
import { useNavigate } from "react-router-dom";
import { fetchSelf } from "../../api/user";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const logout = useCallback(() => {
        tokenStore.clear();
        setIsAuthenticated(false);
    }, []);

    const login = useCallback((tokens) => {
        tokenStore.setTokens(tokens);
        setIsAuthenticated(true);
        navigate("/", { replace: true });
    }, [navigate]);

    const handleAuthFailure = useCallback(() => {
        logout();
        navigate("/login", { replace: true });
    }, [logout, navigate]);

    const getAccessToken = () => tokenStore.getAccess();

    const verifySession = useCallback(() => {
        return fetchSelf()
            .then(() => true)
            .catch(() => false);
    }, []);

    const refreshSession = useCallback(() => {
        return refreshAccessToken().then((token) => {
            if (!token) {
                return false;
            }
            return true;
        });
    }, []);

    const finalize = useCallback((isAuth) => {
        setIsAuthenticated(isAuth);
        setLoading(false);
    }, []);

    const initialize = useCallback(() => {
        const access = tokenStore.getAccess();
        const refresh = tokenStore.getRefresh();

        if (!access && !refresh) {
            finalize(false);
            return;
        }

        // ---- CASE 1: access exists → verify it
        if (access) {
            verifySession()
                .then((ok) => {
                    if (ok) {
                        finalize(true);
                        return true;
                    }

                    // access invalid → try refresh if possible
                    if (!refresh) {
                        finalize(false);
                        return false;
                    }

                    return refreshSession()
                        .then((refreshed) => {
                            if (!refreshed) {
                                finalize(false);
                                return false;
                            }

                            return verifySession()
                                .then((ok2) => {
                                    finalize(ok2);
                                    return ok2;
                                });
                        });
                });

            return;
        }

        // ---- CASE 2: no access → try refresh directly
        if (refresh) {
            refreshSession()
                .then((refreshed) => {
                    if (!refreshed) {
                        finalize(false);
                        return false;
                    }

                    return verifySession()
                        .then((ok) => {
                            finalize(ok);
                            return ok;
                        });
                });

            return;
        }

        finalize(false);
    }, [finalize, verifySession, refreshSession]);

    useEffect(() => {
        initialize();
    }, [initialize]);

    const value = {
        isAuthenticated,
        loading,
        getAccessToken,
        login,
        logout,
        handleAuthFailure,
        setAuthenticated: setIsAuthenticated,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);