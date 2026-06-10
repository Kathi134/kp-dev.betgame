import { createContext, useContext, useEffect, useState } from "react";
import { tokenStore } from "../api/token";
import { refreshAccessToken } from "../api/token";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const getAccessToken = () => tokenStore.getAccess();

    const logout = () => {
        tokenStore.clear();
        setIsAuthenticated(false);
    };

    const handleAuthFailure = () => {
        logout();
        window.location.href = "/login";
    };

    const tryRefresh = async () => {
        const newToken = await refreshAccessToken();

        if (!newToken) {
            handleAuthFailure();
            return false;
        }

        setIsAuthenticated(true);
        return true;
    };

    const value = {
        isAuthenticated,
        loading,
        getAccessToken,
        logout,
        tryRefresh,
        handleAuthFailure,
        setAuthenticated: setIsAuthenticated,
    };

    useEffect(() => {
        const token = tokenStore.getAccess();
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);