import { useEffect, useState, useCallback, useMemo } from "react";
import { fetchSpecialBets, putSpecialBet, saveSpecialBet } from "../api/bet";
import { API_BASE } from "../api/base";
import { specialBetTypeLabel, specialBetGroupLabel, STAGE_ORDER, stageToString } from "../util/enums";
import "./bets.css";
import { groupBySpecialBetGroup } from "../util/reformat-api-data";

export default function SpecialBets() {
    const [definitions, setDefinitions] = useState([]);
    const [bets, setBets] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`${API_BASE}/bets/special/definitions`).then(r => r.json()),
            fetchSpecialBets(),
            fetch(`${API_BASE}/competition/teams`).then(r => r.json())
        ])
            .then(([defs, bets, teams]) => {
                setDefinitions(defs);
                setBets(bets);
                setTeams(teams)
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const betMap = useMemo(() => Object.fromEntries(bets.map(b => [b.definitionId, b])), [bets]);

    useEffect(() => console.log(betMap, bets), [betMap, bets])

    const grouped = useMemo(() => groupBySpecialBetGroup(definitions), [definitions]);

    const updateBet = useCallback((definitionId, value, betType) => {
        const patch = betType === "GERMANY_FINAL_STAGE" ? { stage: value } : { selectedTeam: Number(value) }
        const prev = bets.find(x => x.id === definitionId)?.bet
        setBets(prev => {

            const updated = prev.map(bet =>
                bet.definitionId === definitionId
                    ? { ...bet, ...patch }
                    : bet
            );

            return updated;
        });
        if (prev?.id) {
            putSpecialBet(prev.id, patch)
        } else {
            saveSpecialBet({ ...patch, definitionId: definitionId })
        }
    }, [bets]);

    const selectionOptions = (groupKey, type, teams) => {
        if (groupKey === "GROUP") {
            const tournamentGroup = type.replace("GROUP_", "").replace("_WINNER", "")
            return teams.filter(t => t.group === tournamentGroup).map(x => ({
                value: x.id, displayValue: (
                    x.name
                )
            }))
        } else if (groupKey === "PLACE" || type === "TOP_SCORER_TEAM") {
            return teams.map(x => ({
                value: x.id, displayValue: (
                    x.name
                )
            }))
        } else {
            return ["GROUP_STAGE", "LAST_32", "LAST_16", "QUARTER_FINALS", "SEMI_FINALS", "THIRD_PLACE", "FINAL"].map(x => ({
                value: x, displayValue: (stageToString(x))
            }))
        }
    }

    if (loading) return <div>Lade Spezialwetten…</div>;

    return (
        <div >
            {Object.entries(grouped).map(([type, defs]) => (
                <div key={type} className="special-section">
                    <h2> {specialBetGroupLabel[type] ?? type} </h2>

                    {defs.map(def =>
                        <div key={def.id} className="vertical-container match-container">
                            <div className="special-card-title"> {specialBetTypeLabel[def.type] ?? def.type}  </div>

                            <select className="special-select" value={betMap[def.id]?.selectedTeam?.id ?? ""} onChange={(e) => updateBet(def.id, e.target.value, def.type)}>
                                <option value="">Bitte wählen</option>
                                {selectionOptions(type, def.type, teams).map(data =>
                                    <option key={data.value} value={data.value}> {data.displayValue} </option>
                                )}
                            </select>
                        </div>

                    )}
                </div>
            ))}
        </div>
    );
}