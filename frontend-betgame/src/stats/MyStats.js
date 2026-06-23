import { useState, useEffect } from 'react';
import { fetchMatchBets } from '../api/bet';
import DistributionOfPoints from './data-analysis/DistributionOfPoints';
import TimeSeries from './data-analysis/TimeSeries';
import BetTimeCorrelation from './data-analysis/correlations/BetTimeCorrelation';
import DebutantCorrelation from './data-analysis/correlations/DebutantCorrelation';
import ContinentCorrelation from './data-analysis/correlations/ContinentCorrelation';
import CountryCorrelation from './data-analysis/correlations/CountryCorrelation';


export default function MyStats() {
    const [bets, setBets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMatchBets()
            .then(setBets)
            .catch((err) => {
                console.error(err);
                setError("Fehler beim Laden der Tipps");
            })
            .finally(() => setLoading(false));
    }, []);




    if (loading) return <div>Lade Daten...</div>;
    if (error) return <div className="warn">{error}</div>;

    return <div>
        <DistributionOfPoints bets={bets} />
        <TimeSeries bets={bets} />

        <h2>Korrelationskoeffizienten</h2>

        <DebutantCorrelation bets={bets} />
        <ContinentCorrelation bets={bets} />
        {/* <CountryCorrelation bets={bets} /> */}
        {/* <BetTimeCorrelation bets={bets} /> */}

        <div className='card'>
            Korrelation "Land x spielt" zu "erzielte Punkte"
            <div className='secondary'>
                Coming soon...
            </div>
        </div>

        <div className='card'>
            Korrelation
            "Zeit zwischen Spielstart und Tippzeitpunkt"
            zu
            "erzielte Punkte"
            <div className='secondary'>
                Coming soon...
            </div>
        </div>

        <div className='card'>
            Korrelation
            "Beteiligtes Land gehört zu Kontinent x"
            zu
            "erzielte Punkte"
            <div className='secondary'>
                Coming soon...
            </div>
        </div>


    </div>
}