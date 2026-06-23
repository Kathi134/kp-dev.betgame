import { BarChart } from "@mui/x-charts"
import { useMemo } from "react"

export default function ContinentCorrelation({ bets }) {
    const data = useMemo(() => {
        const continentMap = new Map()

        bets.forEach((bet) => {
            const home = bet.match.homeTeam?.continent
            const away = bet.match.awayTeam?.continent
            const points = bet.awardedPoints ?? 0

            if (home) {
                if (!continentMap.has(home)) {
                    continentMap.set(home, { sum: 0, count: 0 })
                }
                const entry = continentMap.get(home)
                entry.sum += points
                entry.count += 1
            }

            if (away) {
                if (!continentMap.has(away)) {
                    continentMap.set(away, { sum: 0, count: 0 })
                }
                const entry = continentMap.get(away)
                entry.sum += points
                entry.count += 1
            }
        })

        return Array.from(continentMap.entries())
            .map(([continent, { sum, count }]) => ({
                continent,
                avgPoints: count === 0 ? 0 : sum / count,
            }))
            .sort((a, b) => b.avgPoints - a.avgPoints)
    }, [bets])

    return (
        <div className="card">
            <BarChart
                dataset={data}
                height={300}
                yAxis={[{
                    label: "Ø-Punkte",
                    width: 50,
                }]}
                slotProps={{
                    axisLabel: {
                        style: {
                            fill: "grey",
                            fontSize: 12
                        },
                    },
                }}
                xAxis={[{
                    scaleType: 'band',
                    dataKey: 'continent',
                    colorMap: {
                        type: 'ordinal',
                        values: data.map(x => x.label),
                        colors: data.map(x => x.color),
                    },
                }]}
                series={[
                    {
                        dataKey: "avgPoints",
                    }
                ]}
                margin={{ left: 0, right: 5, bottom: 10, }}
            />

            <span className="secondary justify">
                Die Grafik zeigt die durchschnittlich erzielten Punkte in Abhängigkeit davon, zu welchem Kontinent die spielenden Teams gehören.
            </span>
        </div>
    )
}