import { useMemo } from "react";
import { BarChart, ChartsReferenceLine } from "@mui/x-charts";
import { palette } from "../colors";

export default function GoalDifferenceMetrics({ betsPerUser }) {


    const userMetrics = useMemo(() => {
        return Object.values(betsPerUser).map(({ username, bets }) => {
            let winnerBiasSum = 0;
            let loserBiasSum = 0;
            let winnerCount = 0;
            let loserCount = 0;

            bets.forEach(({ bet, match }) => {
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

            return { username, winnerBias, loserBias, };
        });
    }, [betsPerUser]);

    const chartData = useMemo(() => {
        return userMetrics
            .sort((a, b) => (Math.abs(a.winnerBias) + Math.abs(a.loserBias)) - (Math.abs(b.winnerBias) + Math.abs(b.loserBias)))
            .map(u => ({
                username: u.username,
                winnerBias: u.winnerBias,
                loserBias: u.loserBias
            }));
    }, [userMetrics]);

    return (<>
        <h2>Durchschnittliche Abweichung gefallener Tore</h2>
        <div className="card">

            <div className="top-margin">
                <BarChart
                    dataset={chartData}
                    layout="horizontal"
                    height={250}
                    yAxis={[
                        {
                            dataKey: "username",
                            scaleType: "band",
                            width: 125,
                            tickLabelStyle: { fontSize: 12 }
                        }
                    ]}
                    xAxis={[
                        {
                            min: -1.5, max: 1.5, tickNumber: 7,
                        }
                    ]}
                    series={[
                        {
                            dataKey: "loserBias",
                            label: "Verlierertore",
                            color: palette[1],
                        },
                        {
                            dataKey: "winnerBias",
                            label: "Gewinnertore",
                            color: palette[0],
                        },
                    ]}
                    margin={{ left: -20, right: 15, top: 5 }}
                >
                    <ChartsReferenceLine x={0} lineStyle={{ stroke: "grey", strokeDasharray: "6 4", }} />
                </BarChart>
            </div>
            <span className="small secondary justify ">
                Die durchschnittliche Abweichung gefallener Tore beschreibt, um wie viele Tore durchschnittlich daneben getippt wird. Eine negative Quote bedeutet, dass die Mannschaften tendenziell unterschätzt werden, eine positive, dass überschätzt wird.
            </span>
        </div>
    </>
    );
}