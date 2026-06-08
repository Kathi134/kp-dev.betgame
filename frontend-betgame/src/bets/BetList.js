import { useMemo } from "react";
import MatchContender from "../results/MatchContender";


export default function BetList({ data = [] }) {
    const matchesByDate = useMemo(() => data.sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate))
        .map(x => ({ ...x, bet: x.homeTeam?.id % 4 === 0 ? { awayGoals: x.awayTeam?.id % 4, homeGoals: x.awayTeam?.id % 2 } : undefined })), [data]);

    const hasResult = (m) => m.homeGoals && m.awayGoals;

    return <>
        {matchesByDate?.map((m) => (
            <div key={m.id} className="vertical-container match-container">

                <div className="horizontal-container space-around vertical-center">
                    <MatchContender team={m.homeTeam} />
                    {hasResult(m)
                        ? <></>
                        : <></>}
                    {m.bet
                        ? <span>{m.bet.homeGoals} : {m.bet.awayGoals}</span>
                        : <span><input type="number" className="bet-input" /> : <input type="number" className="bet-input" /></span>
                    }
                    <MatchContender team={m.awayTeam} />
                </div>
            </div>
        ))}
    </>;
}