import { useMemo, useCallback } from "react";
import MatchContender from "../results/MatchContender";


export default function BetList({ data = [], onBetChange = () => { } }) {

    const matchesByDate = useMemo(() => [...data].sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate)), [data]);

    const hasResult = (m) => m.homeGoals != null && m.awayGoals != null;
    const hasBet = (m) => m.bet != null && m.bet.predictedHomeGoals != null && m.bet.predictedAwayGoals != null;

    const handleChange = useCallback((e, m, field) => {
        if (e.target.value === "") return
        const value = field === "predictedDuration" ? e.target.value : Number(e.target.value);
        onBetChange(m.id, { [field]: value });
    }, [onBetChange]);


    return <>
        {matchesByDate?.map((m) => (
            <div key={m.id} className={`vertical-container match-container ${!hasBet(m) && ""}`}>

                <div className="horizontal-container space-around vertical-center">
                    <MatchContender team={m.homeTeam} />
                    {!hasResult(m) &&
                        <div className="vertical-container center gap-05">
                            <span className="horizontal-container gap-1">
                                <input type="number" className={`bet-input  ${!hasBet(m) && "empty-bet"}`} value={m.bet?.predictedHomeGoals} onChange={(e) => handleChange(e, m, "predictedHomeGoals")} />
                                :
                                <input type="number" className={`bet-input  ${!hasBet(m) && "empty-bet"}`} value={m.bet?.predictedAwayGoals} onChange={(e) => handleChange(e, m, "predictedAwayGoals")} />
                            </span>
                            {m.stage !== "GROUP_STAGE" &&
                                <select className="bet-select" value={m.bet?.predictedDuration ?? "REGULAR"} onChange={(e) => handleChange(e, m, "predictedDuration")}>
                                    <option value="REGULAR">90 min</option>
                                    <option value="OVERTIME">Verlängerung</option>
                                    <option value="PENALTY">Elfmeter</option>
                                </select>
                            }
                        </div>
                    }
                    <MatchContender team={m.awayTeam} />
                </div>
            </div>
        ))}
    </>;
}