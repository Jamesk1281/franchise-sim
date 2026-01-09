import { Team } from "../models/Team";

type TeamPageProps = {
  team: Team;
  onBack: () => void;
};

export default function TeamPage({ team, onBack }: TeamPageProps) {
  return (
    <div>
      <button onClick={onBack}>← Back</button>

      <h1>
        {team.name} ({team.abbreviation})
      </h1>

      <h2>Roster</h2>
      {team.roster.length === 0 ? (
        <p>No players yet.</p>
      ) : (
        <ul>
          {team.roster.map((p) => (
            <li key={p.id}>
              {p.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
