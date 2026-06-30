import { formatDate, formatLastUpdated } from "../util/date-util";
import { useMemo } from "react";
import { useAuth } from "../auth/global/AuthContext";
import Result from "../shared/Result";


export default function MatchList({ data }) {
    const { user } = useAuth();

    const matchesByDate = useMemo(() => data.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate)), [data]);

    return <>
        {matchesByDate?.map((m) => (
            <div key={m.id} className="card">
                <div className="horizontal-container center">
                    {m.status === "LIVE" && <div className="live-dot-container vertical-center"> <span className="live-dot vertical-center" /> </div>}
                    <div className="date"> {formatDate(m.utcDate)} </div>
                </div>

                <Result match={m} />

                {(m.status === "LIVE" || user.roles.includes("DEBUG")) && <div className="horizontal-container center secondary small">
                    zul. aktualisiert: {formatLastUpdated(m.lastUpdate)}
                </div>}
            </div>
        ))}
    </>;
}