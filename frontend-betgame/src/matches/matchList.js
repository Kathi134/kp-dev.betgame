import { formatDate } from "../util/date-util";
import { useMemo } from "react";
import MatchContender from "./matchContender";


export default function MatchList({ data }) {
    const matchesByDate = useMemo(() => data.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate)).map(x => ({ ...x, awayGoals: 1, homeGoals: 2 })), [data]);

    const hasGoals = (m) => m.homeGoals && m.awayGoals;

    return <>
        {matchesByDate?.map((m) => (
            <div key={m.id} className="vertical-container match-container">

                <div className={"date-container"}>
                    {formatDate(m.utcDate)}
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