import { useMemo } from "react";
import { result } from "../../util/enums";
import { BarChart } from "@mui/x-charts";
import { palette } from "../colors";

export default function AbsoluteGoalDifference({ betsPerUser }) {

    const differencesMap = useMemo(() => {
        const map = {};
        Object.values(betsPerUser).forEach(({ username, bets }) => {
            const userDifferences = bets.map(({ bet, match }) => {
                const homeDifference = match.homeGoals - bet.predictedHomeGoals;
                const awayDifference = match.awayGoals - bet.predictedAwayGoals;
                const winner = match.homeGoals > match.awayGoals ? result.HOME : match.homeGoals < match.awayGoals ? result.AWAY : result.DRAW;
                const predictedWinner = bet.predictedHomeGoals > bet.predictedAwayGoals ? result.HOME : bet.predictedHomeGoals < bet.predictedAwayGoals ? result.AWAY : result.DRAW;
                return { homeDifference, awayDifference, winner, predictedWinner };
            });
            map[username] = userDifferences;
        });
        return map;
    }, [betsPerUser]);

    const absoluteDifferences = useMemo(() => {
        return Object.entries(differencesMap)
            .map(([username, bets]) =>
            ({
                username: username,
                absDifferences: bets.reduce((sum, bet) => sum + Math.abs(bet.homeDifference) + Math.abs(bet.awayDifference), 0),
                avgDifference: bets.reduce((sum, bet) => sum + Math.abs(bet.homeDifference) + Math.abs(bet.awayDifference), 0) / bets.length,
            }))
            .sort((a, b) => a.absDifferences - b.absDifferences)
    }, [differencesMap]);

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

    return (
        <div className="card">
            <h3>Absolute Differenz gefallener Tore</h3>
            <BarChart
                hideLegend={true}
                dataset={absoluteDifferences}
                layout="horizontal"
                height={400}
                yAxis={[{
                    dataKey: 'username',
                    scaleType: 'band',
                    width: 120,
                    colorMap: {
                        type: 'ordinal',
                        colors: absoluteDifferences.map(x => rankingColors.find(c => c.username === x.username)?.color)
                    }, tickLabelStyle: {
                        fontSize: 11,
                    },
                }]}
                series={[
                    {
                        dataKey: 'absDifferences',
                        label: 'Absolute Fehlersumme',
                    },
                ]}
                margin={{ left: -20, right: 15 }}
            />
            <span className="small secondary justify">
                Die absolute Fehlersumme beschreibt, um wie viele Tore in Summe über alle Spiele hinweg daneben getippt wurde. Eine niedrige Fehlersumme bedeutet Tipps, die in Toren näher am tatsächlichen Ergebnis liegen.
            </span>
        </div>
    );
}