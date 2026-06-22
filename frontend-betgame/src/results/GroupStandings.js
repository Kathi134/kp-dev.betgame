import { useState, useEffect } from "react";
import { API_BASE } from "../api/base";
import { groupStandingsByGroupAndSort } from "../util/reformat-api-data";

export default function GroupStandings() {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/standings`)
            .then((res) => res.json())
            .then((data) => {
                setStandings(groupStandingsByGroupAndSort(data));
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Lade Tabelle…</div>;

    return (
        <div>
            {standings?.map(([group, teams]) => (
                <div key={group}>
                    <h2 className="group-title">Gruppe {group}</h2>

                    <div className="card ">
                        <div className="table-scroll">
                            <table className="standings-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th className="team-cell">Team</th>
                                        <th>Sp</th>
                                        <th>S</th>
                                        <th>U</th>
                                        <th>N</th>
                                        <th>TD</th>
                                        <th>Diff</th>
                                        <th>P</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {teams?.map((t) => (
                                        <tr key={t.team.id}>
                                            <td>{t.position}</td>

                                            <td className="team-cell">
                                                <img src={t.team.crestUrl} alt={t.team.name} className="flag-img" />
                                                {t.team.name}
                                            </td>

                                            <td>{t.playedGames}</td>
                                            <td>{t.won}</td>
                                            <td>{t.draw}</td>
                                            <td>{t.lost}</td>
                                            <td>{t.goalsFor}:{t.goalsAgainst}</td>
                                            <td>{t.goalDifference}</td>
                                            <td>{t.points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>))
            }
        </div >
    );
}