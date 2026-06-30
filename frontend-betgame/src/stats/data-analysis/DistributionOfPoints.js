import { legendClasses } from '@mui/x-charts/ChartsLegend';
import { PieChart } from "@mui/x-charts"
import { useMemo } from "react"
import { palette } from "../colors"

export default function DistributionOfPoints({ bets, specialBets }) {
    const groupStageData = useMemo(() => {
        const groupStageBets = bets.filter(x => x.match.stage === "GROUP_STAGE");
        const sc3 = groupStageBets.filter(x => x.awardedPoints === 3).length
        const sc2 = groupStageBets.filter(x => x.awardedPoints === 2).length
        const sc1 = groupStageBets.filter(x => x.awardedPoints === 1).length
        const sc0 = groupStageBets.filter(x => x.awardedPoints === 0).length
        return [
            { label: 'Exaktes Ergebnis', color: palette[0], value: sc3 },
            { label: 'Torverhältnis', color: palette[1], value: sc2 },
            { label: 'Gewinner-Team', color: palette[2], value: sc1 },
            { label: 'keine Punkte', color: palette[7], value: sc0 },
        ];
    }, [bets])

    const koData = useMemo(() => {
        const koBets = bets.filter(x => x.match.stage !== "GROUP_STAGE");
        const sc3p1 = koBets.filter(x => x.matchPoints === 3 && x.extraDurationPoints === 1).length
        const sc3p0 = koBets.filter(x => x.matchPoints === 3 && x.extraDurationPoints === 0).length
        const sc2p1 = koBets.filter(x => x.matchPoints === 2 && x.extraDurationPoints === 1).length
        const sc2p0 = koBets.filter(x => x.matchPoints === 2 && x.extraDurationPoints === 0).length
        const sc1p1 = koBets.filter(x => x.matchPoints === 1 && x.extraDurationPoints === 1).length
        const sc1p0 = koBets.filter(x => x.matchPoints === 1 && x.extraDurationPoints === 0).length
        const sc0 = koBets.filter(x => x.awardedPoints === 0).length
        console.log(koBets)
        return [
            { label: 'Exaktes Ergebnis + Spielzeit', color: palette[0], value: sc3p1 },
            { label: 'Exaktes Ergebnis', color: palette[8], value: sc3p0 },
            { label: 'Torverhältnis + Spielzeit', color: palette[1], value: sc2p1 },
            { label: 'Torverhältnis', color: palette[9], value: sc2p0 },
            { label: 'Gewinner-Team + Spielzeit', color: palette[2], value: sc1p1 },
            { label: 'Gewinner-Team', color: palette[10], value: sc1p0 },
            { label: 'keine Punkte', color: palette[7], value: sc0 },
        ];
    }, [bets])

    const specialData = useMemo(() => {
        const sc3 = specialBets.filter(x => x.awardedPoints === 5).length
        const sc0 = specialBets.filter(x => x.awardedPoints === 0).length
        return [
            { label: 'Korrekter Spezialtipp', color: palette[0], value: sc3 },
            { label: 'keine Punkte', color: palette[7], value: sc0 },
        ];
    }, [specialBets])

    return (<>
        <h2>Korrektheits-Verteilung deiner Tipps</h2>
        <div className="card">
            <div className="secondary justify">Spiel-Ergebnis-Tipps der Gruppenphase</div>
            <div className='small top-margin'>
                <PieChart
                    height={150}
                    width={150}
                    series={[{ data: groupStageData, arcLabel: 'value' }]}
                    margin={{ right: 5, top: 0 }}
                />
            </div>
        </div>

        <div className="card">
            <div className="secondary justify">Spiel-Ergebnis-Tipps der KO-Phase</div>
            <div className='small top-margin'>
                <PieChart
                    height={150}
                    width={150}
                    series={[{ data: koData, arcLabel: 'value' }]}
                    margin={{ right: 5, top: 0 }}
                    slotProps={{
                        legend: {
                            direction: 'vertical',
                            sx: {
                                gap: 2,
                                position: {
                                    horizontal: 'right',
                                    vertical: 'center',
                                },

                                [`& .${legendClasses.mark}`]: {
                                    width: 15,
                                    height: 15,
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>

        <div className="card">
            <div className="secondary justify">Spezial-Tipps</div>
            <div className='small top-margin'>
                <PieChart
                    height={150}
                    width={150}
                    series={[{ data: specialData, arcLabel: 'value' }]}
                    margin={{ right: 5, top: 0 }}
                />
            </div>
        </div>
    </>
    )
}