import { BarChart, ChartsReferenceLine } from "@mui/x-charts"
import { useMemo, useState } from "react"
import { continentToShortString, continentToString } from "../../../util/enums"
import { palette } from "../../colors"

export default function ContinentCorrelation({ bets, globalAvg }) {
    const [showContintentDetails, setShowContinentDetails] = useState(false)

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
            .map(([continent, { sum, count }], index) => ({
                continent,
                avgPoints: count === 0 ? 0 : sum / count,
                color: palette[2],
                label: continentToString[continent] ?? continent
            }))
    }, [bets])

    const countriesByContinent = useMemo(() => {
        const map = new Map()

        bets.forEach((bet) => {
            const teams = [bet.match.homeTeam, bet.match.awayTeam]

            teams.forEach((team) => {
                const continent = team?.continent
                const id = team?.id // or team?.name if no id exists

                if (!continent || !id) return

                if (!map.has(continent)) {
                    map.set(continent, new Map()) // id -> team
                }

                const continentMap = map.get(continent)
                continentMap.set(id, team)
            })
        })

        const res = Object.fromEntries(
            Array.from(map.entries()).map(([continent, teamMap]) => [
                continent,
                Array.from(teamMap.values()).sort((a, b) =>
                    a.name.localeCompare(b.name, "de")
                ),
            ])
        )

        return res
    }, [bets])

    const maxRows = useMemo(() => Math.max(0, ...Object.values(countriesByContinent).map(c => c.length)), [countriesByContinent]);

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
                    height: 80,
                    scaleType: 'band',
                    dataKey: 'label',
                    tickLabelStyle: {
                        angle: -45,
                        textAnchor: "end",
                        fontSize: 12,
                    },
                    colorMap: {
                        type: 'ordinal',
                        values: data.map(x => x.label),
                        colors: data.map(x => x.color),
                    },
                }]}
                series={[{ dataKey: "avgPoints" }]}
                margin={{ left: 0, right: 5, bottom: 0 }}
            >
                <ChartsReferenceLine
                    y={globalAvg}
                    label={`globale Ø-Punkte: ${globalAvg.toFixed(2)}`}
                    lineStyle={{
                        stroke: "grey",
                        strokeDasharray: "6 4",
                    }}
                    labelStyle={{
                        fill: "grey",
                        fontSize: 11,
                    }}
                />
            </BarChart>

            <div className="vertical-container secondary justify gap-1">

                <span className="secondary justify">
                    Die Grafik zeigt die durchschnittlich erzielten Punkte in Abhängigkeit davon, zu welchem Kontinent die spielenden Teams gehören.
                </span>

                <button type="button" className="secondary-color toggle-details-btn" onClick={() => setShowContinentDetails(v => !v)} >
                    Kontinent-Zuteilung {showContintentDetails ? "▲" : "▼"}
                </button>

                {showContintentDetails && (
                    <div className="horizontal-container space-around">
                        {Object.keys(countriesByContinent).map(continent => (
                            <div key={continent} className="vertical-container">
                                <div className="center no-padding">
                                    {continentToShortString[continent]}
                                </div>

                                {Array.from({ length: maxRows }).map((_, rowIndex) => {
                                    const country = countriesByContinent[continent]?.[rowIndex];

                                    return (
                                        <div key={rowIndex} className="center no-padding">
                                            {country && (
                                                <img
                                                    className="flag-img cursor"
                                                    alt={country.tla}
                                                    src={country.crestUrl}
                                                    title={country.name}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    )
}