
import { useEffect, useState, useMemo } from "react";
import { API_BASE } from "../api/base";
import { groupByStage, groupByGroup } from "../util/reformat-api-data";
import './matches.css'
import MatchList from "./MatchList";
import { stageToString } from "../util/enums";
import { useHeader } from "../global/HeaderContext";
import GroupStandings from "./GroupStandings";


export default function Matches() {
    const { setHeader } = useHeader();
    const [activeStage, setActiveStage] = useState(null);

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`${API_BASE}/matches`).then(r => r.json()),
            fetch(`${API_BASE}/competition`).then(r => r.json()),
        ])
            .then(([matches, competition]) => {
                setMatches(matches);
                setActiveStage(competition.stage);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const grouped = useMemo(() => groupByStage(matches), [matches]);

    useEffect(() => {
        setHeader({
            title: "Spiele & Ergebnisse",
            values: ["Tabelle", ...Object.keys(grouped)],
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
                    {activeStage === "Tabelle"
                        ? <GroupStandings />
                        : activeStage && grouped[activeStage] !== undefined && activeStage !== "GROUP_STAGE"
                            ? <MatchList data={grouped[activeStage]} />
                            : <>
                                {Object.entries(groupByGroup(grouped[activeStage])).map(([group, matches]) => (
                                    <div key={group} className="bottom-margin">
                                        <h2 className="group-title">Gruppe {group}</h2>
                                        <MatchList data={matches} />
                                    </div>
                                ))}
                            </>
                    }
                </>
            }
        </div>
    );
}

