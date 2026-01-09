import { League } from "../models/League";

type TeamsPageProps = {
  league: League;
};

export default function TeamsPage({ league }: TeamsPageProps) {
  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {league.teams.map(team => (
          <li key={team.id}>
            {team.name} ({team.abbreviation})
          </li>
        ))}
      </ul>
    </div>
  );
}