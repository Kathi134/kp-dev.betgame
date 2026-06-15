import { useMemo } from "react";
import { formatDateWithoutTime, normalizeDate } from "../../util/date-util";
import { LineChart } from "@mui/x-charts";

export default function TimeSeries({ bets }) {
    const todayStr = new Date().toISOString().split('T')[0];

    const timeSeries = useMemo(() => {
        const dailyMap = new Map();

        bets.forEach(bet => {
            const day = normalizeDate(bet.match.utcDate);
            const points = bet.awardedPoints || 0;

            dailyMap.set(day, (dailyMap.get(day) || 0) + points);
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
                dailyPoints: dailyMap.get(key) || 0,
            });
        }

        let cumulative = 0;

        return filled.map(d => {
            cumulative += d.dailyPoints;
            return {
                ...d,
                cumulativePoints: cumulative,
            };
        });
    }, [bets, todayStr]);

    return (
        <div className='card'>
            Zeitliche Entwicklung deiner Punkte

            <div className='small top-margin line-chart-container'>
                {/* simple dual-line visualization using MUI X Charts */}
                <LineChart
                    margin={0}
                    height={250}
                    dataset={timeSeries}
                    xAxis={[{ scaleType: 'band', dataKey: 'day', valueFormatter: formatDateWithoutTime, /*label: "Datum"*/ }]}
                    // yAxis={[{ label: "Punkte" }]}
                    series={[
                        {
                            dataKey: 'cumulativePoints',
                            label: 'Gesamtpunkte',
                            color: "#CD7F32",
                        },
                        {
                            dataKey: 'dailyPoints',
                            label: 'Punkte pro Tag',
                            color: "#ffd700"
                        }
                    ]}
                />
            </div>
        </div>
    );
}