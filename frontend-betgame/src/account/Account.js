import { useCallback, useEffect, useState } from "react";
import { fetchSelf } from "../api/user";
import { useHeader } from "../global/HeaderContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/global/AuthContext";

export default function Account() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const { setHeader } = useHeader();

    useEffect(() => {
        fetchSelf()
            .then(setUser)
            .catch(console.error);
    }, [])

    useEffect(() => {
        setHeader({
            title: "Mein Profil",
            values: [],
        })
    }, [setHeader])

    const handleLogoutClick = useCallback(() => {
        logout();
    }, [logout]);

    return (<div className="vertical-container gap-1 ">
        <span>{JSON.stringify(user)}</span>
        <span><button className="warn" onClick={handleLogoutClick}>Session invalidieren</button></span>
        <span className=""><button onClick={() => navigate("/login")}>zum Login</button></span>
    </div>)
}