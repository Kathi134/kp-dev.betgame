import { ScatterChart } from '@mui/x-charts/ScatterChart';
import Stack from '@mui/material/Stack';
import { useMemo } from 'react';
import { palette } from '../../colors';
import RegressionLine from './RegressionLine';



export default function BetRegressionChart({ bets }) {
    const { scatterData } = useMemo(() => {
        const rows = bets
            .filter(x => x.awardedPoints != null)
            .map(bet => {
                const matchStart = new Date(bet.match.utcDate).getTime();
                const tipTime = new Date(bet.lastUpdate).getTime();
                const hoursBefore = (matchStart - tipTime) / (1000 * 60 * 60);

                return {
                    x: hoursBefore,
                    y: bet.awardedPoints,
                };
            });

        return {
            scatterData: rows,
        };
    }, [bets]);

    const coeff = useMemo(() => {
        if (scatterData.length < 2) return 0;

        const xs = scatterData.map(p => p.x);
        const ys = scatterData.map(p => p.y);

        const meanX = xs.reduce((a, b) => a + b, 0) / xs.length;
        const meanY = ys.reduce((a, b) => a + b, 0) / ys.length;

        let num = 0;
        let denX = 0;
        let denY = 0;

        for (let i = 0; i < scatterData.length; i++) {
            const dx = xs[i] - meanX;
            const dy = ys[i] - meanY;

            num += dx * dy;
            denX += dx * dx;
            denY += dy * dy;
        }

        const denom = Math.sqrt(denX * denY);

        if (denom === 0) return 0;

        return num / denom;
    }, [scatterData]);

    return (
        <div className='card'>
            <span className="secondary justify">
                Korrelations-Koeffizient r(Δt, erhaltene Punkte) = <code>{coeff.toFixed(3)}</code>
            </span>

            <Stack sx={{ width: '100%' }}>
                <ScatterChart
                    dataset={scatterData}
                    height={250}
                    xAxis={[{ label: 'Zeit zwischen Tippabgabe und Spielbeginn in h' }]}
                    yAxis={[{ label: 'erhaltene Punkte', width: 40 }]}
                    series={[
                        {
                            id: 'bets',
                            data: scatterData,
                            markerSize: 5,
                            color: palette[1]
                        },
                    ]}
                    slotProps={{
                        axisLabel: {
                            style: {
                                fill: "grey",
                                fontSize: 12
                            },
                        },
                    }}
                    margin={{ left: 0, bottom: 10, right: 15 }}
                >
                    <RegressionLine seriesId="bets" color={palette[0]} />
                </ScatterChart>
            </Stack>

            <span className='secondary justify'>
                Jeder Punkt zeigt für ein Spiel, wie früh der Tipp abgegeben wurde und wie viele Punkte dafür erhalten wurden.
                Die Regressionsgerade und der Korrelations-Koeffizient r zeigen einen allgemeinen Trend:
                Eine steigende Gerade (r&gt;0) bedeutet, dass späte Tipps mehr Punkte gebracht haben, als frühe -
                eine fallende (r&lt;0), dass frühe Tipps besser waren als späte.
            </span>
        </div>
    );
}

