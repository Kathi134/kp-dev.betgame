import { useMemo } from "react";
import { result } from "../../util/enums";
import { BarChart } from "@mui/x-charts";
import { palette } from "../colors";

export default function GoalDifferenceMetrics({ betsPerUser }) {


    const userMetrics = useMemo(() => {
        return Object.values(betsPerUser).map(({ username, bets }) => {
            let winnerBiasSum = 0;
            let loserBiasSum = 0;
            let winnerCount = 0;
            let loserCount = 0;

            bets.forEach(({ bet, match }) => {
                const homeError = match.homeGoals - bet.predictedHomeGoals;
                const awayError = match.awayGoals - bet.predictedAwayGoals;

                const actualHome = match.homeGoals;
                const actualAway = match.awayGoals;

                const predictedHome = bet.predictedHomeGoals;
                const predictedAway = bet.predictedAwayGoals;

                if (match.homeGoals > match.awayGoals) {
                    // HOME WINNER
                    winnerBiasSum += (actualHome - predictedHome);
                    loserBiasSum += (actualAway - predictedAway);

                    winnerCount++;
                    loserCount++;
                }
                else if (match.awayGoals > match.homeGoals) {
                    // AWAY WINNER
                    winnerBiasSum += (actualAway - predictedAway);
                    loserBiasSum += (actualHome - predictedHome);

                    winnerCount++;
                    loserCount++;
                }
                else {
                    // DRAW: symmetric contribution
                    winnerBiasSum += (actualHome - predictedHome);
                    loserBiasSum += (actualAway - predictedAway);

                    winnerBiasSum += (actualAway - predictedAway);
                    loserBiasSum += (actualHome - predictedHome);

                    winnerCount += 2;
                    loserCount += 2;
                }
            });

            const winnerBias = winnerBiasSum / (winnerCount || 1);
            const loserBias = loserBiasSum / (loserCount || 1);

            return {
                username,

                winnerBias,
                loserBias,
            };
        });
    }, [betsPerUser]);

    const chartData = useMemo(() => {
        return userMetrics
            .sort((a, b) => a.winnerBias - b.winnerBias)
            .map(u => ({
                username: u.username,
                winnerBias: u.winnerBias,
                loserBias: u.loserBias
            }));
    }, [userMetrics]);

    return (
        <div className="card">
            <h3>Durchschnittliche Abweichung gefallener Tore</h3>

            <BarChart
                dataset={chartData}
                layout="horizontal"
                height={450}
                hideLegend={false}
                yAxis={[
                    {
                        dataKey: "username",
                        scaleType: "band",
                        width: 120,
                        tickLabelStyle: {
                            fontSize: 11
                        },
                        colors: palette
                    }
                ]}
                xAxis={[
                    {
                        min: -1.5, max: 1.5, tickNumber: 7,
                        label: 'Durchschnittliche Abweichung in Toren', labelStyle: { fontSize: 12 },
                    }
                ]}
                series={[

                    {
                        dataKey: "loserBias",
                        label: "Abweichung Verlierer",
                        color: palette[1],
                    },
                    {
                        dataKey: "winnerBias",
                        label: "Abweichung Gewinner",
                        color: palette[0],
                    },
                ]}
                margin={{ left: -20, right: 15 }}
            />
        </div>
    );
}