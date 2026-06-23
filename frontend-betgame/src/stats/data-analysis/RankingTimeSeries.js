import { formatDateWithoutTime, normalizeDate } from "../../util/date-util";
import { LineChart } from "@mui/x-charts";
import { palette } from "../colors";
import { useMemo } from "react";

export default function RankingTimeSeries({ globalBets }) {
    const userTimeSeries = useMemo(() => {
        if (!globalBets?.length) return [];

        const userDayMap = new Map();
        const allUsers = new Map(); // userId -> username

        globalBets.forEach(entry => {
            const day = normalizeDate(entry.match.utcDate);

            entry.bets.forEach(bet => {
                const userId = bet.userId;
                const username = bet.username;
                const points = bet.awardedPoints || 0;

                allUsers.set(userId, username);

                if (!userDayMap.has(day)) {
                    userDayMap.set(day, new Map());
                }

                const perUser = userDayMap.get(day);
                perUser.set(userId, (perUser.get(userId) || 0) + points);
            });
        });

        const days = Array.from(userDayMap.keys()).sort(
            (a, b) => new Date(a) - new Date(b)
        );

        const cumulative = {};
        allUsers.forEach((_, id) => (cumulative[id] = 0));

        const result = [];

        for (const day of days) {
            const perUser = userDayMap.get(day);

            const row = { day };

            for (const [userId] of allUsers) {
                const daily = perUser.get(userId) || 0;
                cumulative[userId] += daily;
                row[userId] = cumulative[userId];
            }

            result.push(row);
        }

        return { data: result, users: allUsers };
    }, [globalBets]);

    const sortedUsers = useMemo(() => {
        if (!userTimeSeries?.data?.length)
            return [];

        const lastRow = userTimeSeries.data[userTimeSeries.data.length - 1];

        const entries = Object.entries(lastRow)
            .filter(([key]) => key !== 'day')
            .map(([userId, value]) => ({ userId, value, }))
            .sort((a, b) => b.value - a.value);

        return entries.map(e => e.userId);
    }, [userTimeSeries]);

    const series = useMemo(() => {
        if (!userTimeSeries?.users) return [];

        const userMap = userTimeSeries.users;
        const sortedSeries = Array.from(userMap.entries())
            .map(([userId, username]) => ({
                dataKey: userId,
                label: username,
            }))
            .sort((a, b) => {
                const rankA = sortedUsers.indexOf(a.dataKey);
                const rankB = sortedUsers.indexOf(b.dataKey);
                return rankA - rankB;
            });

        const baseSeries = sortedSeries.map((s, index) => ({
            ...s,
            color: palette[index % palette.length],
            meta: {
                userId: s.dataKey,
                username: s.label,
                index,
            },
        }));

        return baseSeries
    }, [userTimeSeries.users, sortedUsers]);

    return (<>
        <h2>Zeitliche Entwicklung des Rankings</h2>
        <div className="card">

            <div className='small line-chart-container-2'>
                <LineChart
                    height={450}
                    dataset={userTimeSeries.data}
                    xAxis={[
                        {
                            scaleType: 'band',
                            dataKey: 'day',
                            valueFormatter: formatDateWithoutTime
                        },
                    ]}
                    series={series}
                    slotProps={{ legend: { toggleVisibilityOnClick: true }, }}
                    sx={{
                        '& .MuiChartsLegend-root': {
                            paddingLeft: "2rem",
                            justifyContent: "center",
                            rowGap: "0.25rem",
                        },
                    }}

                />
            </div>
        </div>
    </>
    )
}