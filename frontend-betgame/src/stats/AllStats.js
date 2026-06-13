import { PieChart } from '@mui/x-charts/PieChart';
import { useMemo, useState, useEffect } from 'react';
import { fetchMatchBets } from '../api/bet';


export default function AllStats() {
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

    const data = useMemo(() => {
        const sc3 = bets.filter(x => x.awardedPoints === 3).length
        const sc2 = bets.filter(x => x.awardedPoints === 2).length
        const sc1 = bets.filter(x => x.awardedPoints === 1).length
        const sc0 = bets.filter(x => x.awardedPoints === 0).length
        return [
            { label: 'Exaktes Ergebnis', color: "#ffd700", value: sc3 },
            { label: 'Torverhältnis', color: "#c0c0c0", value: sc2 },
            { label: 'Gewinner-Team', color: "#CD7F32", value: sc1 },
            { label: 'keine Punkte', color: "#5a5a5a", value: sc0 },
        ];
    }, [bets])


    if (loading) return <div>Lade Daten...</div>;
    if (error) return <div className="warn">{error}</div>;

    return <div>
        <div className='card'>
            Korrektheits-Verteilung deiner Tipps
            <div className='small top-margin'>
                <PieChart
                    height={150}
                    width={150}
                    series={[{ data, arcLabel: 'value' }]}
                    margin={{ right: 5 }}
                />
            </div>
        </div>

        <div className='card'>
            Zeitliche Entwicklung deiner Punkte
            <div className='secondary'>
                Coming soon...
            </div>
        </div>

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

    </div>
}