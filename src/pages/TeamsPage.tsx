import { League } from "../models/League";

type TeamsPageProps = {
  league: League;
  onSelectTeam: (teamId: string) => void;
};

export default function TeamsPage({ league, onSelectTeam }: TeamsPageProps) {
  return (
    <div>
      <h1>Teams</h1>
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
