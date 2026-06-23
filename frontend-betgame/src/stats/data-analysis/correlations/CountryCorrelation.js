import { BarChart, ChartsReferenceLine } from "@mui/x-charts"
import { useMemo, useState } from "react"
import { palette } from "../../colors"

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

    return denomX === 0 || denomY === 0
        ? 0
        : numerator / Math.sqrt(denomX * denomY)
}

export default function CountryCorrelation({ bets }) {
    const [showAll, setShowAll] = useState(false)

    const allData = useMemo(() => {
        const countries = new Set()

        bets.forEach(bet => {
            countries.add(bet.match.homeTeam?.name)
            countries.add(bet.match.awayTeam?.name)
        })

        return [...countries]
            .map(country => {
                const binary = bets.map(bet =>
                    bet.match.homeTeam?.name === country ||
                        bet.match.awayTeam?.name === country
                        ? 1
                        : 0
                )

                const points = bets.map(bet => bet.awardedPoints ?? 0)

                return {
                    country,
                    coefficient: correlation(binary, points)
                }
            })
            .filter(x => x.country !== undefined)
            .sort((a, b) => (b.coefficient) - (a.coefficient))
    }, [bets])

    const visibleData = useMemo(() => {
        if (showAll) return allData
        if (allData.length <= 2) return allData

        const round2 = (x) => Math.round(x * 100) / 100
        const groups = new Map()

        for (const item of allData) {
            const key = round2(item.coefficient)
            if (!groups.has(key))
                groups.set(key, [])
            groups.get(key).push(item)
        }

        const sortedGroups = [...groups.entries()].sort((a, b) => b[0] - a[0])
        const strongest = sortedGroups[0]?.[1] ?? []
        const weakest = sortedGroups[sortedGroups.length - 1]?.[1] ?? []

        if (sortedGroups.length <= 1)
            return strongest

        const result = [...strongest]

        for (const item of weakest) {
            if (!result.some(x => x.country === item.country)) {
                result.push(item)
            }
        }

        return result
    }, [allData, showAll])

    return (
        <div className="card">
            <div className="secondary no-top-margin">
                <button type="button" className="secondary toggle-details-btn" onClick={() => setShowAll(v => !v)}>
                    Koeffizienten aller Länder {" "}
                    {showAll ? "▲" : "▼"}
                </button>
            </div>
            <BarChart
                layout="horizontal"
                height={showAll ? 700 : 200}
                yAxis={[
                    {
                        width: 100,
                        scaleType: "band",
                        data: visibleData.map(x => x.country)
                    }
                ]}
                xAxis={[{
                    min: -1,
                    max: 1,
                    colorMap: {
                        type: 'piecewise',
                        thresholds: [-0.5, 0, 0.5],
                        colors: [palette[2], palette[7], palette[1], palette[0]],
                    },
                }]}
                series={[
                    {
                        data: visibleData.map(x => x.coefficient)
                    }
                ]}
                margin={{ left: 0, bottom: 0, right: 15 }}
            >
                <ChartsReferenceLine x={0} lineStyle={{ stroke: "grey", strokeDasharray: "6 4", }} />
            </BarChart>

            <span className="secondary justify">
                Tipps für Spiele, bei denen Länder mit einem Korrelations-Koeffizienten nahe 1 beteiligt sind, haben mehr Punkte als der Durchschnitt aller deiner Tipps erzielt.
                Länder mit einem Korrelations-Koeffizienten nahe -1 haben für weniger Punkte in den entsprechenden Tipps gesorgt.
            </span>
        </div>
    )
}