import { ScatterChart } from "@mui/x-charts"
import { useMemo } from "react"

function correlation(x, y) {
    const n = x.length

    const meanX = x.reduce((a, b) => a + b, 0) / n
    const meanY = y.reduce((a, b) => a + b, 0) / n

    let numerator = 0
    let denomX = 0
    let denomY = 0

    for (let i = 0; i < n; i++) {
        const dx = x[i] - meanX
        const dy = y[i] - meanY

        numerator += dx * dy
        denomX += dx * dx
        denomY += dy * dy
    }

    return numerator / Math.sqrt(denomX * denomY)
}

export default function BetTimeCorrelation({ bets }) {
    const { scatterData, coeff } = useMemo(() => {
        const rows = bets
            .filter(x => x.awardedPoints != null)
            .map(bet => {
                const matchStart = new Date(
                    bet.match.utcDate
                ).getTime()

                const tipTime = new Date(
                    bet.lastUpdated
                ).getTime()

                const hoursBefore =
                    (matchStart - tipTime) /
                    (1000 * 60 * 60)

                return {
                    x: hoursBefore,
                    y: bet.awardedPoints
                }
            })

        const coeff = correlation(
            rows.map(r => r.x),
            rows.map(r => r.y)
        )

        return {
            scatterData: rows,
            coeff
        }
    }, [bets])

    return (
        <div className="card">
            <h3>
                Tippzeitpunkt ↔ Punkte
                ({coeff.toFixed(3)})
            </h3>

            <ScatterChart
                height={300}
                series={[
                    {
                        data: scatterData
                    }
                ]}
            />
        </div>
    )
}