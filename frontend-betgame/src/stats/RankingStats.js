import React, { useEffect, useMemo, useState } from "react";
import { fetchGlobalMatchBets } from "../api/ranking";
import RankingTimeSeries from "./data-analysis/RankingTimeSeries";
import AbsoluteGoalDifference from "./data-analysis/AbsoluteGoalDifference";
import GoalDifferenceMetrics from "./data-analysis/GoalDifferenceMetrics";
import MatchDurationComp from "./data-analysis/MatchDurationComp";



export default function RankingStats() {
    const [globalBets, setGlobalBets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchGlobalMatchBets()
            .then(setGlobalBets)
            .catch((err) => {
                console.error(err);
                setError("Fehler beim Laden des Rankings");
            })
            .finally(() => setLoading(false));
    }, []);


    const betsPerUser = useMemo(() => {
        const allUsers = {};
        globalBets.forEach(entry => {
            entry.bets.forEach(bet => {
                const userId = bet.userId;
                const username = bet.username;

                if (!allUsers[userId]) {
                    allUsers[userId] = { username, bets: [] };
                }

                allUsers[userId].bets.push({
                    bet,
                    match: entry.match
                });
            });
        });

        return allUsers;
    }, [globalBets]);



    if (loading) return <div className="">Lade Ranking...</div>;
    if (error) return <div className="warn">{error}</div>;

    return (<>
        <RankingTimeSeries globalBets={globalBets} />
        <AbsoluteGoalDifference betsPerUser={betsPerUser} />
        <MatchDurationComp betsPerUser={betsPerUser} />
        <GoalDifferenceMetrics betsPerUser={betsPerUser} />
    </>)
}