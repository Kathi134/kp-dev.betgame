
import MatchContender from "../results/MatchContender";
import Duration from "./Duration";

export default function Result({ match }) {
    if (match === undefined)
        return <></>

    const hasGoals = (m) => m.status !== "SCHEDULED";

    return (
        <div className="horizontal-container space-around vertical-center gap-2">
            <MatchContender team={match.homeTeam} />
            <div >
                {hasGoals(match)
                    ? <span>{match.homeGoals ?? "0"} : {match.awayGoals ?? "0"}</span>
                    : <span>vs</span>
                }
            </div>

            <Duration match={match} />

            <MatchContender team={match.awayTeam} />
        </div>
    )
}

