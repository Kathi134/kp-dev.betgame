import { BarChart } from "@mui/x-charts"
import { useMemo, useState } from "react"
import { palette } from "../../colors"

export default function DebutantCorrelation({ bets }) {
    const [showDebutants, setShowDebutants] = useState(false)

    const { data, debutants } = useMemo(() => {
        const debutPresent = bets.filter(bet =>
            bet.match.homeTeam?.isFirstWorldCup ||
            bet.match.awayTeam?.isFirstWorldCup
        )

        const debutAbsent = bets.filter(bet =>
            !bet.match.homeTeam?.isFirstWorldCup &&
            !bet.match.awayTeam?.isFirstWorldCup
        )

        const avg = (arr) =>
            arr.length
                ? arr.reduce((sum, x) => sum + (x.awardedPoints ?? 0), 0) / arr.length
                : 0

        const debutantMap = new Map()

        bets.forEach(bet => {
            const home = bet.match.homeTeam
            const away = bet.match.awayTeam

            if (home?.isFirstWorldCup && !debutantMap.has(home.id)) {
                debutantMap.set(home.id, home)
            }

            if (away?.isFirstWorldCup && !debutantMap.has(away.id)) {
                debutantMap.set(away.id, away)
            }
        })

        return {
            data: [
                {
                    label: "mind. 1 Debüt-Team",
                    value: avg(debutPresent),
                    color: palette[0]
                },
                {
                    label: "kein Debüt-Team",
                    value: avg(debutAbsent),
                    color: palette[1]
                }
            ],
            debutants: [...debutantMap.values()].sort()
        }
    }, [bets])

    return (
        <div className="card">
            <BarChart
                height={200}
                dataset={data}
                yAxis={[{ label: "Ø-Punkte", width: 50 }]}
                slotProps={{
                    axisLabel: {
                        style: { fill: "grey", fontSize: 12 }
                    }
                }}
                xAxis={[{
                    scaleType: 'band',
                    dataKey: 'label',
                    colorMap: {
                        type: 'ordinal',
                        values: data.map(x => x.label),
                        colors: data.map(x => x.color),
                    },
                }]}
                series={[{ dataKey: 'value' }]}
                margin={{ left: 0, right: 5, bottom: 10 }}
            />

            <div className="vertical-container secondary justify gap-1">
                <span className="secondary justify">
                    Die Grafik zeigt die durchschnittlich erzielten Punkte in Abhängigkeit davon, ob mindestens ein Team gespielt hat, das zum ersten Mal bei einer WM dabei ist.
                </span>

                <button type="button" className="secondary-color" onClick={() => setShowDebutants(v => !v)}
                    style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        textAlign: "left",
                        font: "inherit"
                    }}
                >
                    Debüt-Teams {showDebutants ? "▲" : "▼"}
                </button>

                {showDebutants && (
                    <span>
                        {debutants.map(x => (
                            <span key={x.id} className="debutant-description-container">
                                <img className="flag-img" alt={x.tla} src={x.crestUrl} />
                                {x.name}
                            </span>
                        ))}
                    </span>
                )}
            </div>
        </div>
    )
}