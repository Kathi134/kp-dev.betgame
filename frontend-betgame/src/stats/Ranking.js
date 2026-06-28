import React, { useEffect, useState } from "react";
import { fetchGlobalRanking } from "../api/ranking";
import { useAuth } from "../auth/global/AuthContext";
import { TbSum, TbMathAvg } from "react-icons/tb";
import { PiCourtBasketball, PiHashLight } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";

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

                            <div className="vertical-container right table-item">
                                <span className="secondary"><TbSum /></span>
                                <span className="small">{u.totalPoints}</span>
                            </div>
                            <div className="vertical-container right table-item">
                                <span className="secondary"><PiCourtBasketball /></span>
                                <span className="small">{u.matchPoints}</span>
                            </div>

                            <div className="vertical-container right table-item">
                                <span className="secondary"><TbMathAvg /></span>
                                <span className="small">{u.matchAveragePoints.toFixed(2)}</span>
                            </div>

                            <div className="vertical-container right table-item">
                                <span className="secondary"><FaRegStar /></span>
                                <span className="small">{u.specialPoints}</span>
                            </div>

                            <div className="vertical-container right table-item">
                                <span className="secondary"><PiHashLight /></span>
                                <span className="small">{u.totalBetCount}</span>
                            </div>


                        </div>
                    </div>
                </div>
            ))}
            <div className="horizontal-container end secondary small">
                <div className="vertical-container">
                    <div className="horizontal-container end gap-05 vertical-center"> Summe aller Gesamt-Punkte : <TbSum /></div>
                    <div className="horizontal-container end gap-05 vertical-center"> Summe aller Punkte aus Spiel-Ergebnis-Tipps : <PiCourtBasketball /></div>
                    <div className="horizontal-container end gap-05 vertical-center"> durchschnittliche Punkte pro Spiel : <TbMathAvg /></div>
                    <div className="horizontal-container end gap-05 vertical-center"> Summe aller Punkte aus Spezialwetten : <FaRegStar /></div>
                    <div className="horizontal-container end gap-05 vertical-center"> Anzahl abgegebener Gesamt-Tipps : <PiHashLight /></div>
                </div>
            </div>
        </div >
    );
}