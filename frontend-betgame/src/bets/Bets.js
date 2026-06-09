
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { API_BASE } from "../api/base";
import { groupByStage, groupByGroup } from "../util/reformat-api-data";
import '../results/matches.css'
import './bets.css'
import { stageToString } from "../util/enums";
import { useHeader } from "../global/HeaderContext";
import { fetchMatchBets, putMatchBet, saveMatchBet } from "../api/bet";
import BetList from "./BetList";

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
                const enriched = matches.map(m => ({ ...m, bet: betMap[m.id] }));
                setMatches(enriched);

                const grouped = groupByStage(enriched);
                const firstStage = Object.keys(grouped)[0];
                setActiveStage(firstStage);

                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const grouped = useMemo(() => groupByStage(matches), [matches]);

    useEffect(() => {
        setHeader({
            title: "Meine Tipps",
            values: Object.keys(grouped),
            activeValue: activeStage,
            onValueChange: setActiveStage,
            displayValue: stageToString
        });
    }, [activeStage, grouped, setHeader, setActiveStage]);

    // update timed

    const updateBet = useCallback((matchId, patch) => {
        console.log(matchId, patch)
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
                        ? <></>
                        : (activeStage !== "GROUP_STAGE"
                            ? <BetList data={grouped[activeStage]} onBetChange={updateBet} />
                            : <>
                                {Object.entries(groupByGroup(grouped[activeStage])).map(([group, matches]) => (
                                    <div key={group} className="bottom-margin">
                                        <h2 className="group-title">Gruppe {group}</h2>
                                        <BetList data={matches} onBetChange={updateBet} />
                                    </div>
                                ))}
                            </>)
                    }
                </>
            }
        </div>
    );
}

