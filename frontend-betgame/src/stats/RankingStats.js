import React, { useEffect, useState } from "react";
import { fetchGlobalRanking } from "../api/ranking";
import { useAuth } from "../auth/global/AuthContext";


export default function RankingStats() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchGlobalRanking()
            .then(setData)
            .catch((err) => {
                console.error(err);
                setError("Fehler beim Laden des Rankings");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="">Lade Ranking...</div>;
    if (error) return <div className="warn">{error}</div>;

    // TODO zeiltihcer verlauf der puntke im vergelich
}