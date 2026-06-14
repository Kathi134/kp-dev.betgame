import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Logging in...</div>;
    }

    return isAuthenticated
        ? <Outlet />
        : <Navigate to="/login" replace />;
}