
import { useEffect, useState, useMemo, useCallback } from "react";
import { API_BASE } from "../api/base";
import { groupByStage, groupByDate } from "../util/reformat-api-data";
import '../results/matches.css'
import './bets.css'
import { betGroupKeyToString } from "../util/enums";
import { useHeader } from "../global/HeaderContext";
import { fetchMatchBets, putMatchBet, saveMatchBet } from "../api/bet";
import SpecialBets from "./SpecialBets";
import UrgentBets from "./UrgentBets";
import PastBets from "./PastBets";

export default function Bets() {
    const { setHeader } = useHeader();
    const [activeStage, setActiveStage] = useState(null);

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`${API_BASE}/matches`).then(r => r.json()),
            fetchMatchBets()
        ])
            .then(([matches, bets]) => {
                const betMap = Object.fromEntries((bets.map(b => [b.matchId, b])));
                const enriched = matches.map(m => ({
                    ...m,
                    deadline: m.utcDate,
                    // isPast: new Date() - new Date(m.utcDate) > 0,
                    isPast: new Date("2026-06-13T23:00:00Z") - new Date(m.utcDate) > 0,
                    isBlocked: !(m.homeTeam && m.awayTeam),
                    bet: (betMap[m.id]),
                }));
                setMatches(enriched);
                setActiveStage("URGENT");
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const grouped = useMemo(() => groupByStage(matches), [matches]);

    useEffect(() => {
        console.log(matches)
    }, [matches])

    useEffect(() => {
        setHeader({
            title: "Meine Tipps",
            values: ["URGENT", "SPECIAL", "PAST"],
            activeValue: activeStage,
            onValueChange: setActiveStage,
            displayValue: betGroupKeyToString
        });
    }, [activeStage, grouped, setHeader, setActiveStage]);


    // update 

    const updateBet = useCallback((matchId, patch) => {
        const prev = matches.find(x => x.id === matchId).bet
        setMatches(prev =>
            prev.map(match => match.id === matchId
                ? { ...match, bet: { ...(match.bet ?? {}), matchId, ...patch } }
                : match
            )
        )
        if (prev?.id) {
            putMatchBet(prev.id, patch)
        } else {
            saveMatchBet({ ...patch, matchId: matchId })
        }
    }, [matches]);


    return (
        <div>
            {loading
                ? <div>Lade Spiele…</div>
                : <>
                    {activeStage && grouped[activeStage] !== null &&
                        activeStage === "SPECIAL"
                        ? <SpecialBets />
                        : (activeStage === "URGENT"
                            ? <UrgentBets data={groupByDate(matches.filter(m => !m.isPast && !m.isBlocked))} onBetChange={updateBet} />
                            : <PastBets data={matches.filter(m => m.isPast)} />
                        )
                    }
                </>
            }
        </div>
    );
}

