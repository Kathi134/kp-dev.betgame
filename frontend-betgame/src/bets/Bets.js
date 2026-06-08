
import { useEffect, useState, useMemo } from "react";
import { API_BASE } from "../api/base";
import { groupByStage, groupByGroup } from "../util/reformat-api-data";
import '../results/matches.css'
import './bets.css'
import { stageToString } from "../util/enums";
import { useHeader } from "../global/HeaderContext";
import { fetchMatchBets } from "../api/bet";
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
                const betMap = new Map(bets.map(b => [b.matchId, b]));
                const enriched = matches.map(m => ({ ...m, bet: betMap.get(m.id) }));
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
        console.log(grouped)
    }, [grouped])

    useEffect(() => {
        setHeader({
            title: "Meine Tipps",
            values: Object.keys(grouped),
            activeValue: activeStage,
            onValueChange: setActiveStage,
            displayValue: stageToString
        });
    }, [activeStage, grouped, setHeader, setActiveStage]);


    return (
        <div>
            {loading
                ? <div>Lade Spiele…</div>
                : <>
                    {activeStage && grouped[activeStage] !== null &&
                        activeStage === "SPECIAL"
                        ? <></>
                        : (activeStage !== "GROUP_STAGE"
                            ? <BetList data={grouped[activeStage]} />
                            : <>
                                {Object.entries(groupByGroup(grouped[activeStage])).map(([group, matches]) => (
                                    <div key={group} className="bottom-margin">
                                        <h2 className="group-title">Gruppe {group}</h2>
                                        <BetList data={matches} />
                                    </div>
                                ))}
                            </>)
                    }
                </>
            }
        </div>
    );
}

