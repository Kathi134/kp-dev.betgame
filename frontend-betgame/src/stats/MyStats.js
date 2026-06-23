import { useState, useEffect } from 'react';
import { fetchMatchBets } from '../api/bet';
import DistributionOfPoints from './data-analysis/DistributionOfPoints';
import TimeSeries from './data-analysis/TimeSeries';


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

        <div className='card'>
            Korrelation
            "Beteiligtes Land spielt seine 1.WM"
            zu
            "erzielte Punkte"
            <div className='secondary'>
                Coming soon...
            </div>
        </div>

    </div>
}