import { formatDate } from "../util/date-util";
import { useMemo } from "react";
import MatchContender from "./MatchContender";


export default function MatchList({ data }) {
    const matchesByDate = useMemo(() => data.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate)), [data]);

    const hasGoals = (m) => m.homeGoals && m.awayGoals;

    return <>
        {matchesByDate?.map((m) => (
            <div key={m.id} className="vertical-container match-container">
                <div className="horizontal-container center">
                    {m.status === "LIVE" && <div className="live-dot-container vertical-center"> <span className="live-dot vertical-center" /> </div>}
                    <div className="date"> {formatDate(m.utcDate)} </div>
                </div>


                <div className="horizontal-container space-around vertical-center">
                    <MatchContender team={m.homeTeam} />
                    {hasGoals(m)
                        ? <span>{m.homeGoals} : {m.awayGoals}</span>
                        : <span>vs</span>
                    }
                    <MatchContender team={m.awayTeam} />
                </div>
            </div>
        ))}
    </>;
}