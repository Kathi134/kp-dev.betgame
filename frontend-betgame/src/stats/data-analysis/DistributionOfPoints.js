import { PieChart } from "@mui/x-charts"
import { useMemo } from "react"
import { palette } from "../colors"

export default function DistributionOfPoints({ bets }) {
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

    return (<>
        <h2>Korrektheits-Verteilung deiner Tipps</h2>
        <div className="card">
            <div className='small top-margin'>
                <PieChart
                    height={150}
                    width={150}
                    series={[{ data, arcLabel: 'value' }]}
                    margin={{ right: 5, top: 0 }}
                />
            </div>
        </div>
    </>
    )
}