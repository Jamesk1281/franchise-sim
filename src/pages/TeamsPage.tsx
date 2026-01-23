import { League } from "../models/League";

type TeamsPageProps = {
  league: League;
  onSelectTeam: (teamId: string) => void;
};

export default function TeamsPage({ league, onSelectTeam }: TeamsPageProps) {
  const standings = league.teams
    .slice()
    .sort((a, b) => {
      if (b.record.wins !== a.record.wins) return b.record.wins - a.record.wins;
      return a.record.losses - b.record.losses;
    });

  return (
    <div>
      <h1>Teams</h1>

      <h2>Standings</h2>
      {standings.length === 0 ? (
        <p>No teams yet.</p>
      ) : (
        <ol>
          {standings.map((team) => (
            <li key={team.id}>
              <button onClick={() => onSelectTeam(team.id)}>
                {team.name} ({team.abbreviation}) — {team.record.wins}-{team.record.losses}
              </button>
            </li>
          ))}
        </ol>
      )}

      <h2>All Teams</h2>
      <ul>
        {league.teams.map((team) => (
          <li key={team.id}>
            <button onClick={() => onSelectTeam(team.id)}>
              {team.name} ({team.abbreviation})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

