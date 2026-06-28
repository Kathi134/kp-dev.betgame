import { PieChart } from "@mui/x-charts"
import { useMemo } from "react"
import { palette } from "../colors"

export default function DistributionOfPoints({ bets, specialBets }) {
    const data = useMemo(() => {
        const sc3 = bets.filter(x => x.awardedPoints === 3).length
        const sc2 = bets.filter(x => x.awardedPoints === 2).length
        const sc1 = bets.filter(x => x.awardedPoints === 1).length
        const sc0 = bets.filter(x => x.awardedPoints === 0).length
        return [
            { label: 'Exaktes Ergebnis', color: palette[0], value: sc3 },
            { label: 'Torverhältnis', color: palette[1], value: sc2 },
            { label: 'Gewinner-Team', color: palette[2], value: sc1 },
            { label: 'keine Punkte', color: palette[7], value: sc0 },
        ];
    }, [bets])

    const specialData = useMemo(() => {
        const sc3 = specialBets.filter(x => x.awardedPoints === 5).length
        const sc0 = specialBets.filter(x => x.awardedPoints === 0).length
        return [
            { label: 'Korrekter Spezialtipp', color: palette[0], value: sc3 },
            { label: 'keine Punkte', color: palette[7], value: sc0 },
        ];
    }, [specialBets])

    return (<>
        <h2>Korrektheits-Verteilung deiner Tipps</h2>
        <div className="card">
            <div className="secondary justify">Reguläre Tipps</div>
            <div className='small top-margin'>
                <PieChart
                    height={150}
                    width={150}
                    series={[{ data, arcLabel: 'value' }]}
                    margin={{ right: 5, top: 0 }}
                />
            </div>
        </div>
        <div className="card">
            <div className="secondary justify">Spezial-Tipps</div>
            <div className='small top-margin'>
                <PieChart
                    height={150}
                    width={150}
                    series={[{ data: specialData, arcLabel: 'value' }]}
                    margin={{ right: 5, top: 0 }}
                />
            </div>
        </div>
    </>
    )
}