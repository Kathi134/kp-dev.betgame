import { formatDate, formatLastUpdated } from "../util/date-util";
import { useMemo } from "react";
import MatchContender from "./MatchContender";
import { useAuth } from "../auth/global/AuthContext";


export default function MatchList({ data }) {
    const { user } = useAuth();

    const matchesByDate = useMemo(() => data.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate)), [data]);

    const hasGoals = (m) => m.status !== "SCHEDULED";

    return <>
        {matchesByDate?.map((m) => (
            <div key={m.id} className="card">
                <div className="horizontal-container center">
                    {m.status === "LIVE" && <div className="live-dot-container vertical-center"> <span className="live-dot vertical-center" /> </div>}
                    <div className="date"> {formatDate(m.utcDate)} </div>
                </div>

                <div className="horizontal-container space-around vertical-center">
                    <MatchContender team={m.homeTeam} />
                    {hasGoals(m)
                        ? <span>{m.homeGoals ?? "0"} : {m.awayGoals ?? "0"}</span>
                        : <span>vs</span>
                    }
                    <MatchContender team={m.awayTeam} />
                </div>

                {(m.status === "LIVE" || user.username === "katyPerry") && <div className="horizontal-container center secondary small">
                    zul. aktualisiert: {formatLastUpdated(m.lastUpdate)}
                </div>}
            </div>
        ))}
    </>;
}