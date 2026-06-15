import React, { useEffect, useState } from "react";
import { fetchGlobalRanking } from "../api/ranking";
import { useAuth } from "../auth/global/AuthContext";

export default function Ranking() {
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

    return (
        <div>
            {data.map((u, index) => (
                <div key={u.userId} className={`card ${index === 0 ? "gold" : (index === 1 ? "silver" : (index === 2 ? "bronze" : ""))}`}>

                    <div className="horizontal-container space-between center ">
                        <div className={`${u.userId === user?.userId ? "bold " : ""} horizontal-container gap-1 left`}>
                            <div className="ranking-position">#{index + 1}</div>
                            <div> {u.username}</div>
                        </div>

                        <div className="horizontal-container gap-1 right">
                            <div className="vertical-container right">
                                <span className="secondary">Punkte</span>
                                <span className="small">{u.totalPoints}</span>
                            </div>

                            <div className="vertical-container right">
                                <span className="secondary">Tipps</span>
                                <span className="small">{u.betCount}</span>
                            </div>

                            <div className="vertical-container right">
                                <span className="secondary">Ø</span>
                                <span className="small">{u.averagePoints.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    );
}