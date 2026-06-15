import React, { useEffect, useState } from "react";
import { fetchMatchBets } from "../api/ranking";
import MatchContender from "../results/MatchContender";
import { useAuth } from "../auth/global/AuthContext";

export default function AllBets() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        fetchMatchBets()
            .then(setMatches)
            .catch((err) => {
                console.error(err);
                setError("Fehler beim Laden der Match-Tipps");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Lade Match-Tipps...</div>;
    if (error) return <div className="warn">{error}</div>;

    return (
        <div>
            {matches.sort((a, b) => (new Date(b.match.utcDate) - new Date(a.match.utcDate))).map((match) => (
                <div key={match.matchId} className="card">
                    <div className="horizontal-container space-around vertical-center">
                        <MatchContender team={match.match?.homeTeam} />
                        <span>{match.match?.homeGoals} : {match.match?.awayGoals}</span>
                        <MatchContender team={match.match?.awayTeam} />
                    </div>

                    <div className="vertical-container top-margin">
                        {match.bets
                            .sort((a, b) => b.predictedHomeGoals - a.predictedHomeGoals)
                            .sort((a, b) => b.awardedPoints - a.awardedPoints)
                            .map((bet) => (
                                <div key={bet.id} className={`horizontal-container space-between small ${bet.username === user?.username ? "" : "secondary"}`}>
                                    <div className="vertical-container"> {bet.username} </div>
                                    <div className="horizontal-container result">
                                        {bet.predictedHomeGoals} : {bet.predictedAwayGoals}
                                    </div>
                                    <div className="vertical-container right">
                                        ({bet.awardedPoints ?? "-"} Pkt.)
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}