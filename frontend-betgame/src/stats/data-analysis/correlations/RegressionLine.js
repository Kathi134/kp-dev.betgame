import { useSeries, useXScale, useYScale } from '@mui/x-charts/hooks';
import { ChartsClipPath } from '@mui/x-charts/ChartsClipPath';
import useId from '@mui/utils/useId';


function linearRegression(points) {
    const n = points.length;

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;

    for (let i = 0; i < n; i++) {
        const x = points[i].x;
        const y = points[i].y;

        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x * x;
    }

    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - m * sumX) / n;

    return { m, b };
}


export default function RegressionLine({ seriesId, color }) {

    const allSeries = useSeries();
    const series = allSeries.scatter?.series[seriesId];

    const xScale = useXScale(series?.xAxisId ?? undefined);
    const yScale = useYScale(series?.yAxisId ?? undefined);

    const clipPathId = `regression-clip-${useId()}`;

    if (!series || !series.data?.length) return null;

    const { m, b } = linearRegression(series.data);

    const xDomain = xScale.domain();

    const x1 = xScale(xDomain[0]);
    const x2 = xScale(xDomain[1]);

    const y1 = yScale(m * xDomain[0] + b);
    const y2 = yScale(m * xDomain[1] + b);

    return (
        <>
            <ChartsClipPath id={clipPathId} />
            <g clipPath={`url(#${clipPathId})`}>
                <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={color}
                    strokeWidth={2}
                />
            </g>
        </>
    );
}
