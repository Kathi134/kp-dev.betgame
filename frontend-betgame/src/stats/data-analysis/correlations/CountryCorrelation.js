import { BarChart } from "@mui/x-charts"
import { useMemo } from "react"

function correlation(binaryValues, targetValues) {
    const n = binaryValues.length

    const meanX = binaryValues.reduce((a, b) => a + b, 0) / n
    const meanY = targetValues.reduce((a, b) => a + b, 0) / n

    let numerator = 0
    let denomX = 0
    let denomY = 0

    for (let i = 0; i < n; i++) {
        const dx = binaryValues[i] - meanX
        const dy = targetValues[i] - meanY

        numerator += dx * dy
        denomX += dx * dx
        denomY += dy * dy
    }

    const denominator = Math.sqrt(denomX * denomY)

    return denominator === 0 ? 0 : numerator / denominator
}

export default function CountryCorrelation({ bets }) {
    const data = useMemo(() => {
        const countries = new Set()

        bets.forEach(bet => {
            countries.add(bet.match.homeTeam.name)
            countries.add(bet.match.awayTeam.name)
        })

        return [...countries]
            .map(country => {
                const binary = bets.map(bet =>
                    bet.match.homeTeam.name === country ||
                        bet.match.awayTeam.name === country
                        ? 1
                        : 0
                )

                const points = bets.map(bet => bet.awardedPoints ?? 0)

                return {
                    country,
                    coefficient: correlation(binary, points)
                }
            })
            .sort((a, b) => Math.abs(b.coefficient) - Math.abs(a.coefficient))
    }, [bets])

    return (
        <div className="card">
            <h3>Land beteiligt ↔ erzielte Punkte</h3>

            <BarChart
                layout="horizontal"
                height={Math.max(400, data.length * 25)}
                yAxis={[
                    {
                        scaleType: "band",
                        data: data.map(x => x.country)
                    }
                ]}
                series={[
                    {
                        data: data.map(x => x.coefficient)
                    }
                ]}
            />
        </div>
    )
}