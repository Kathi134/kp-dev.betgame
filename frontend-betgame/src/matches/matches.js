
import { useEffect, useState, useMemo } from "react";
import { API_BASE } from "../api/base";
import { groupByStage, groupByGroup } from "../util/reformat-api-data";
import './matches.css'
import MatchList from "./matchList";


export default function Matches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeStage, setActiveStage] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE}/matches`)
            .then((res) => res.json())
            .then((data) => {
                setMatches(data);

                const grouped = groupByStage(data);
                const firstStage = Object.keys(grouped)[0];
                setActiveStage(firstStage);

                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const grouped = useMemo(() => groupByStage(matches), [matches]);



    return (
        <div>
            <div className="header">
                <h1>Matches</h1>
                <div className="tabs-container">
                    {Object.keys(grouped).map((stage) => (
                        <button key={stage} className={`tab ${activeStage === stage ? "active" : ""}`} onClick={() => setActiveStage(stage)} >
                            {stage}
                        </button>
                    ))}
                </div>
            </div>

            <div className="main">
                {loading
                    ? <div>Lade Spiele…</div>
                    : <>
                        {activeStage && grouped[activeStage] !== null &&
                            activeStage !== "GROUP_STAGE"
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
        </div>
    );
}

