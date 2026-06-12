import React, { useEffect, useState } from "react";
import { fetchSpecialBets } from "../api/ranking";
import { specialBetTypeLabel, stageToString } from "../util/enums";

export default function AllSpecialBets() {
    const [definitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSpecialBets()
            .then(setDefinitions)
            .catch((err) => {
                console.error(err);
                setError("Fehler beim Laden der Spezialwetten");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Lade Spezialwetten...</div>;
    if (error) return <div className="warn">{error}</div>;

    return (
        <div>
            {definitions.map(d =>
                <div key={d.definition.id} className="card">
                    {specialBetTypeLabel[d.definition.type]}

                    <div className="vertical-container top-margin">
                        {d.bets
                            .sort((a, b) => (a.selectedTeam?.name ?? "").localeCompare(b.selectedTeam?.name ?? ""))
                            .sort((a, b) => (a.stage ?? "").localeCompare(b.stage ?? ""))
                            .map((bet) => (
                                <div key={bet.id} className="horizontal-container space-between secondary small" >
                                    <div className="vertical-container"> {bet.username} </div>
                                    <div className="horizontal-container result">
                                        {bet.selectedTeam?.name ?? stageToString(bet.stage)}
                                    </div>
                                    <div className="vertical-container right">
                                        ({bet.awardedPoints ?? "-"} Pkt.)
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    )
}