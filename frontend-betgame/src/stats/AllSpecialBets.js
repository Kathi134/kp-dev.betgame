import React, { useEffect, useMemo, useState } from "react";
import { fetchSpecialBets } from "../api/ranking";
import { specialBetGroupLabel, specialBetTypeLabel, stageToString } from "../util/enums";
import { groupBySpecialBetGroupWithMultipleBets } from "../util/reformat-api-data";

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

    const grouped = useMemo(() => groupBySpecialBetGroupWithMultipleBets(definitions), [definitions]);

    const placeTable = useMemo(() => {
        if (!grouped.PLACE)
            return null;

        const result = {};
        grouped.PLACE.forEach(def => {
            const key = def.definition.type;
            def.bets.forEach(bet => {
                const userId = bet.userId;

                if (!result[userId]) {
                    result[userId] = {
                        userId,
                        username: bet.username,
                        PLACE_1: 0,
                        PLACE_2: 0,
                        PLACE_3: 0,
                        PLACE_4: 0,
                        total: 0
                    };
                }
                result[userId][key] = bet.selectedTeam;
                result[userId].total += bet.awardedPoints ?? 0;
            });
        });
        console.log(result)
        return Object.values(result)
            .sort((a, b) => a.PLACE_4.name.localeCompare(b.PLACE_4.name))
            .sort((a, b) => a.PLACE_3.name.localeCompare(b.PLACE_3.name))
            .sort((a, b) => a.PLACE_2.name.localeCompare(b.PLACE_2.name))
            .sort((a, b) => a.PLACE_1.name.localeCompare(b.PLACE_1.name))
    }, [grouped]);


    if (loading) return <div>Lade Spezialwetten...</div>;
    if (error) return <div className="warn">{error}</div>;

    return (
        <div>
            {Object.entries(grouped).map(([type, defs]) =>
                <div key={type}>
                    <h2>{specialBetGroupLabel[type] ?? type}</h2>

                    {type === "PLACE" && (
                        <div className="card">
                            Top 4 Platzierungen

                            {placeTable.map((bet) => (
                                <div key={bet.id} className="horizontal-container space-between secondary small" >
                                    <div> {bet.username}</div>
                                    <div className="horizontal-container gap-1 result">
                                        <div className="horizontal-container vertical-center">1. <img src={bet.PLACE_1.crestUrl} alt={bet.PLACE_1.tla} className="flag-img" /></div>
                                        <div className="horizontal-container vertical-center">2. <img src={bet.PLACE_2.crestUrl} alt={bet.PLACE_2.tla} className="flag-img" /></div>
                                        <div className="horizontal-container vertical-center">3. <img src={bet.PLACE_3.crestUrl} alt={bet.PLACE_3.tla} className="flag-img" /></div>
                                        <div className="horizontal-container vertical-center">4. <img src={bet.PLACE_4.crestUrl} alt={bet.PLACE_4.tla} className="flag-img" /></div>
                                    </div>
                                    <div className="right">
                                        ({bet.awardedPoints ?? "-"} Pkt.)
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {defs.map(d =>
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
                                                {bet.selectedTeam
                                                    ? <img src={bet.selectedTeam.crestUrl} alt={bet.selectedTeam.tla} className="flag-img" />
                                                    : stageToString(bet.stage)}
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
            )}
        </div>

    )
}