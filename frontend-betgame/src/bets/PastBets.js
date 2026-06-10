
import MatchContender from "../results/MatchContender";
import { formatDate } from "../util/date-util";

export default function PastBets({ data, onBetChange }) {
    return <>
        {data?.map((m) => (
            <div key={m.id} className={`vertical-container match-container  ""}`}>

                <div className="horizontal-container gap-05 secondary">
                    <div>Gruppe {m.group} -</div>
                    <div>{formatDate(m.deadline)}</div>
                </div>
                <div className="horizontal-container space-around vertical-center">
                    <MatchContender team={m.homeTeam} />
                    <span>{m.homeGoals ?? 0} : {m.awayGoals ?? 0}</span>
                    <MatchContender team={m.awayTeam} />
                </div>
                <div className="horizontal-container secondary gap-1 end ">
                    mein Tipp:
                    {m.bet
                        ? <>
                            <span>{m.bet?.predictedHomeGoals ?? "-"} : {m.bet?.predictedAwayGoals ?? "-"}</span>
                            <span>({m.bet?.awardedPoints ?? "-"} Pkt.)</span>
                        </>
                        : <div>nicht abgegeben.</div>
                    }
                </div>
            </div>
        ))}
    </>
}