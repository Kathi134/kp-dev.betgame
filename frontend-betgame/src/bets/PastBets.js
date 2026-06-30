
import { useMemo } from "react";
import MatchContender from "../results/MatchContender";
import { formatDate, formatLastUpdated } from "../util/date-util";
import { stageToString } from "../util/enums";
import Result from "../shared/Result";
import Duration from "../shared/Duration";

export default function PastBets({ data, onBetChange }) {
    const sortedByDate = useMemo(() => data.sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate)), [data]);

    return <>
        {sortedByDate?.map((m) => (
            <div key={m.id} className="card">

                <div className="horizontal-container gap-05 space-between secondary">
                    <div>
                        <span>{m.stage === "GROUP_STAGE"
                            ? <>Gruppe {m.group} </>
                            : <>{stageToString(m.stage)} </>}
                            -&nbsp;
                        </span>
                        <span>{formatDate(m.deadline)}</span>
                    </div>

                    {(m.status === "LIVE") && <div className="horizontal-container secondary small end">
                        zul. aktualisiert: {formatLastUpdated(m.lastUpdate)}
                    </div>}
                </div>

                <Result match={m} />

                <div className="horizontal-container space-between secondary small" >
                    <div className="vertical-container"> mein Tipp </div>
                    <div className="horizontal-container result">
                        {m.bet
                            ? <span>{m.bet?.predictedHomeGoals ?? "-"} : {m.bet?.predictedAwayGoals ?? "-"}</span>
                            : <span>nicht abgegeben.</span>
                        }
                    </div>

                    <Duration duration={m.bet.predictedDuration} />

                    <div className="vertical-container right">
                        ({m.bet?.awardedPoints ?? "-"} Pkt.)
                    </div>
                </div>
            </div>
        ))}
    </>
}