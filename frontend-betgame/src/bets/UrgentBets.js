
import { useCallback } from "react";
import MatchContender from "../results/MatchContender";
import { calculateTimeLeft, formatDateForTimeOnly } from "../util/date-util";
import { formatDateWithoutTime } from "../util/date-util";

export default function UrgentBets({ data, onBetChange }) {

    const matchesByDate = (data) => [...data].sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

    const hasResult = (m) => m.homeGoals != null && m.awayGoals != null;
    const hasBet = (m) => m.bet != null && m.bet.predictedHomeGoals != null && m.bet.predictedAwayGoals != null;

    const handleChange = useCallback((e, m, field) => {
        if (e.target.value === "" && field === "predictedDuration")
            return
        let input = e.target.value === "" ? "0" : e.target.value
        const value = field === "predictedDuration" ? input : Number(input);

        onBetChange(m.id, { [field]: value.toString() });
    }, [onBetChange]);


    return <>
        {Object.entries(data).map(([group, matches]) => (
            <div key={group} className="bottom-margin">
                <h2 className="group-title">{formatDateWithoutTime(group)}</h2>

                {matchesByDate(matches)?.map((m) => (
                    <div key={m.id} className={`card ${!hasBet(m) && ""}`}>

                        <div className="horizontal-container space-between">
                            <div className="horizontal-container gap-05">
                                <div className="date">Gruppe {m.group} -</div>
                                <div className="date">{formatDateForTimeOnly(m.deadline)}</div>
                            </div>
                            <div className="date right">noch {calculateTimeLeft(m.deadline)}</div>
                        </div>
                        <div className="horizontal-container space-around vertical-center">
                            <MatchContender team={m.homeTeam} />
                            {!hasResult(m) &&
                                <div className="vertical-container">
                                    <div className="vertical-container center gap-05">
                                        <span className="horizontal-container gap-1">
                                            <input type="number" className={`bet-input  ${!hasBet(m) && "empty-bet"}`} disabled={m.isBlocked || m.isPast}
                                                value={m.bet?.predictedHomeGoals} onChange={(e) => handleChange(e, m, "predictedHomeGoals")} />
                                            :
                                            <input type="number" className={`bet-input  ${!hasBet(m) && "empty-bet"}`} disabled={m.isBlocked || m.isPast}
                                                value={m.bet?.predictedAwayGoals} onChange={(e) => handleChange(e, m, "predictedAwayGoals")} />
                                        </span>
                                        {m.stage !== "GROUP_STAGE" &&
                                            <select className="bet-select" value={m.bet?.predictedDuration ?? "REGULAR"} onChange={(e) => handleChange(e, m, "predictedDuration")} disabled={m.isBlocked || m.isPast}>
                                                <option value="REGULAR">90 min</option>
                                                <option value="OVERTIME">Verlängerung</option>
                                                <option value="PENALTY">Elfmeter</option>
                                            </select>
                                        }
                                    </div>
                                </div>
                            }
                            <MatchContender team={m.awayTeam} />
                        </div>
                    </div>
                ))}
            </div>
        ))}
    </>
}