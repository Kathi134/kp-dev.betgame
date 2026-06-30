import { useMemo } from "react";
import { BarChart } from "@mui/x-charts";
import { palette } from "../colors";

export default function MatchDurationComp({ betsPerUser }) {

    const durationMap = useMemo(() => {
        return Object.values(betsPerUser)
            .map(({ username, bets }) => ({
                username,
                correctDurations: bets.filter(({ bet, match }) => match.stage !== "GROUP_STAGE" && bet.predictedDuration === match.duration).length,
            }))
            .sort((a, b) => b.correctDurations - a.correctDurations);
    }, [betsPerUser]);

    const rankingColors = useMemo(() => {
        return Object.values(betsPerUser)
            .map(({ username, bets }) =>
            ({
                username: username,
                sum: bets.reduce((sum, bet) => sum + bet.bet.awardedPoints, 0),
            }))
            .sort((a, b) => b.sum - a.sum)
            .map((entry, index) => ({ username: entry.username, color: palette[index % palette.length] }));
    }, [betsPerUser]);


    return (<>
        <h2>Korrektes Tippen der Spielzeit</h2>

        <div className="card">
            <BarChart
                hideLegend={true}
                dataset={durationMap}
                layout="horizontal"
                height={250}
                yAxis={[{
                    dataKey: 'username',
                    scaleType: 'band',
                    width: 125,
                    colorMap: {
                        type: 'ordinal',
                        colors: durationMap.map(x => rankingColors.find(c => c.username === x.username)?.color),
                    }, tickLabelStyle: {
                        fontSize: 12,
                    },
                }]}
                xAxis={[{
                    min: 0,
                    tickMinStep: 1,
                }]}
                series={[
                    {
                        dataKey: 'correctDurations',
                        label: 'Korrekte Spielzeit',
                    },
                ]}
                margin={{ left: -20, right: 15, top: 5, bottom: 10 }}
            />
            <span className="small secondary justify">

            </span>
        </div>
    </>
    );
}