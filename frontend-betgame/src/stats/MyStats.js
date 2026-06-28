
import { BsQuestionCircle } from "react-icons/bs";
import { useState, useEffect, useMemo } from 'react';
import { fetchMatchBets, fetchSpecialBets } from '../api/bet';
import DistributionOfPoints from './data-analysis/DistributionOfPoints';
import TimeSeries from './data-analysis/TimeSeries';
import BetTimeCorrelation from './data-analysis/correlations/BetTimeCorrelation';
import DebutantCorrelation from './data-analysis/correlations/DebutantCorrelation';
import ContinentCorrelation from './data-analysis/correlations/ContinentCorrelation';
import CountryCorrelation from './data-analysis/correlations/CountryCorrelation';


export default function MyStats() {
    const [bets, setBets] = useState([])
    const [specialBets, setSpecialBets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [showCorrelationInfo, setShowCorrelationInfo] = useState(false)

    useEffect(() => {
        Promise.all([
            fetchMatchBets(),
            fetchSpecialBets()
        ])
            .then(([matchBets, specialBets]) => {
                setBets(matchBets)
                setSpecialBets(specialBets)
            })
            .catch((err) => {
                console.error(err);
                setError("Fehler beim Laden der Tipps");
            })
            .finally(() => setLoading(false));
    }, []);

    const globalAvg = useMemo(() => {
        const valid = bets.filter(b => b.awardedPoints != null)
        if (!valid.length)
            return 0
        return valid.reduce((sum, b) => sum + b.awardedPoints, 0) / valid.length
    }, [bets])

    const scoredBets = useMemo(() => {
        console.log(bets)
        return bets.filter(x => x.awardedPoints !== null)
    }, [bets])


    if (loading) return <div>Lade Daten...</div>;
    if (error) return <div className="warn">{error}</div>;

    return <div>
        <DistributionOfPoints bets={scoredBets} specialBets={specialBets} />
        <TimeSeries bets={scoredBets} />


        <h2>Faktoren für durchschnittlich erzielte Punkte</h2>

        <DebutantCorrelation bets={scoredBets} globalAvg={globalAvg} />
        <ContinentCorrelation bets={scoredBets} globalAvg={globalAvg} />


        <h2>Korrelations-Koeffizienten <span className="cursor float-right right-margin" onClick={() => setShowCorrelationInfo(v => !v)}><BsQuestionCircle /></span></h2>

        {showCorrelationInfo && <div className='card'>
            <div className="vertical-container gap-05 secondary justify">
                <span>
                    Der Korrelations-Koeffizient gibt die Abweichung der erreichten Punkte vom Durchschnitt über alle Tipps an, wenn ein bestimmter Aspekt gegeben ist.
                    Die Metrik kann Werte zwischen [-1;1] annehmen:
                    Positive Werte bedeuten, dass die Punkte unter diesem Aspekt höher sind, als der sonstige Durchschnitt.
                    Negative Werte bedeuten, dass die Punkte unter diesem Aspekt niedriger sind, als der sonstige Durchschnitt.
                    Werte um 0 bedeuten, dass kein besonderer Zusammenhang errechnet werden konnte.
                </span>
                <span>Im Allgemeinen können die errechneten Korrelations-Koeffizienten nicht verlässlich statistisch signifikant sein, da pro Aspekt zu wenig Datensätze (Spiele) vorhanden sind.</span>
            </div>
        </div>}

        <CountryCorrelation bets={scoredBets} />
        <BetTimeCorrelation bets={scoredBets} />

    </div>
}