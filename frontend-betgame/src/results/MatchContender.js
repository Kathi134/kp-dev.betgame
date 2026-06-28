
export default function MatchContender({ team, goals }) {
    if (!team) return <span>noch offen</span>;

    return (
        <div className='horizontal-container gap-1 vertical-center' >
            {team.crestUrl && (
                <img src={team.crestUrl} alt={team.tla} className="flag-img" />
            )}
            <div className='country-name-container'>{team.name}</div>
        </div>
    );
}