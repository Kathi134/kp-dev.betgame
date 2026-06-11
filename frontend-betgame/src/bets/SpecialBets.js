import { useEffect, useState, useCallback, useMemo } from "react";
import { fetchSpecialBets, putSpecialBet, saveSpecialBet } from "../api/bet";
import { API_BASE } from "../api/base";
import { specialBetTypeLabel, specialBetGroupLabel, stageToString } from "../util/enums";
import "./bets.css";
import { groupBySpecialBetGroup } from "../util/reformat-api-data";
import { calculateTimeLeft } from "../util/date-util";

export default function SpecialBets() {
    const [definitions, setDefinitions] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`${API_BASE}/bets/special/definitions`).then(r => r.json()),
            fetchSpecialBets(),
            fetch(`${API_BASE}/competition/teams`).then(r => r.json())
        ])
            .then(([defs, bets, teams]) => {
                const betMap = Object.fromEntries((bets.map(b => [b.definitionId, b])));
                const enriched = defs.map(m => ({ ...m, bet: betMap[m.id], deadline: m.deadline, isBlocked: new Date() - new Date(m.deadline) > 0 }));
                setDefinitions(enriched);
                setTeams(teams)
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const grouped = useMemo(() => groupBySpecialBetGroup(definitions), [definitions]);

    // TODO: make code more redable
    const updateBet = useCallback((definitionId, value, betType) => {
        let patch;
        if (betType === "GERMANY_FINAL_STAGE") {
            patch = { stage: value }
        } else {
            const teamId = Number(value);
            patch = { selectedTeam: { id: teamId, name: teams.find(x => x.id === teamId)?.name } }
        }
        const prev = definitions.find(x => x.id === definitionId).bet
        setDefinitions(prev =>
            prev.map(betDefiniton => betDefiniton.id === definitionId
                ? { ...betDefiniton, bet: { ...(betDefiniton.bet ?? {}), definitionId, ...patch } }
                : betDefiniton
            )
        )

        let patchDto = patch;
        if (betType !== "GERMANY_FINAL_STAGE")
            patchDto = { selectedTeam: Number(value) }

        if (prev?.id) {
            putSpecialBet(prev.id, patchDto)
        } else {
            saveSpecialBet({ ...patchDto, definitionId: definitionId })
        }
    }, [definitions, teams]);

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

    const determineVAlue = useCallback((def) => {
        const res = def.type === "GERMANY_FINAL_STAGE"
            ? def.bet?.stage ?? ""
            : def.bet?.selectedTeam?.id ?? ""
        return res;
    }, [])

    const hasBet = useCallback((def) => determineVAlue(def) !== "", [determineVAlue]);

    // const isBlocked = 

    if (loading) return <div>Lade Spezialwetten…</div>;

    return (
        <div >
            {Object.entries(grouped).map(([type, defs]) => (
                <div key={type}>
                    <h2> {specialBetGroupLabel[type] ?? type} </h2>

                    {defs.map(def =>
                        <div key={def.id} className="card gap-05">
                            <div className="horizontal-container space-between">
                                <div> {specialBetTypeLabel[def.type] ?? def.type}  </div>
                                <div className="date">noch {calculateTimeLeft(def.deadline)}</div>
                            </div>

                            <select className={`bet-select ${!hasBet(def) && "empty-bet"}`} disabled={def.isBlocked}
                                value={determineVAlue(def)} onChange={(e) => updateBet(def.id, e.target.value, def.type)}
                            >
                                <option className={`bet-select ${!hasBet(def) && "empty-bet"}`} value="">Bitte wählen</option>
                                {selectionOptions(type, def.type, teams).map(data =>
                                    <option className={`bet-select ${!hasBet(def) && "empty-bet"}`} key={data.value} value={data.value}> {data.displayValue} </option>
                                )}
                            </select>
                        </div>

                    )}
                </div>
            ))}
        </div>
    );
}