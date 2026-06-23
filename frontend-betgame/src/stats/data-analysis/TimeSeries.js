import { useMemo } from "react";
import { formatDateWithoutTime, normalizeDate } from "../../util/date-util";
import { LineChart } from "@mui/x-charts";
import { palette } from "../colors";

export default function TimeSeries({ bets }) {
    const todayStr = new Date().toISOString().split('T')[0];

    const timeSeries = useMemo(() => {
        const dailyMap = new Map();

        bets.forEach(bet => {
            const day = normalizeDate(bet.match.utcDate);
            const points = bet.awardedPoints || 0;

            if (!dailyMap.has(day)) {
                dailyMap.set(day, {
                    points: 0,
                    matches: 0,
                });
            }

            const entry = dailyMap.get(day);

            entry.points += points;
            entry.matches += 1;
        });

        const sortedDays = Array.from(dailyMap.keys()).sort(
            (a, b) => new Date(a) - new Date(b)
        );

        if (sortedDays.length === 0) return [];

        const start = new Date(sortedDays[0]);
        const end = new Date(todayStr);

        const filled = [];

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const key = d.toISOString().split('T')[0];
            filled.push({
                day: key,
                dailyPoints: dailyMap.get(key)?.points || 0,
                matches: dailyMap.get(key)?.matches || 0,
            });
        }

        let cumulative = 0;

        return filled.map(d => {
            cumulative += d.dailyPoints;

            return {
                ...d,
                cumulativePoints: cumulative,

                pointsPerMatch:
                    d.matches > 0
                        ? d.dailyPoints / d.matches
                        : null,
            };
        });
    }, [bets, todayStr]);

    return (<>
        <h2>Zeitliche Entwicklung deiner Punkte</h2>

        <div className='card'>

            <div className='small line-chart-container'>
                <LineChart
                    margin={0}
                    height={250}
                    dataset={timeSeries}
                    xAxis={[
                        {
                            scaleType: 'band',
                            dataKey: 'day',
                            valueFormatter: formatDateWithoutTime,
                        }
                    ]}
                    yAxis={[
                        {
                            id: 'absolute',
                            position: 'left',
                            tickNumber: 5
                        },
                        {
                            id: 'relative-per-day',
                            min: 0,
                            max: 3,
                            position: 'right',
                            valueFormatter: (v) => v.toFixed(1),
                            tickMinStep: 0.5,
                            tickNumber: 5
                        }
                    ]}
                    series={[
                        {
                            dataKey: 'cumulativePoints',
                            label: 'Gesamtpunkte',
                            color: palette[2],
                            yAxisId: 'absolute',
                        },
                        {
                            dataKey: 'dailyPoints',
                            label: 'Punkte / Tag',
                            color: palette[7],
                            yAxisId: 'absolute',
                        },
                        {
                            dataKey: 'pointsPerMatch',
                            color: palette[0],
                            label: 'Ø-Punkte / Tag',
                            yAxisId: 'relative-per-day',
                        },
                    ]}
                />
            </div>
        </div>
    </>

    );
}