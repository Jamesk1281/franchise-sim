import type { League } from "../models/League";
import { Team } from "../models/Team";
import type { Game } from "../models/Game"; // adjust import path if needed

type TeamPageProps = {
  team: Team;
  league: League;
  onBack: () => void;
};

export default function TeamPage({ team, league, onBack }: TeamPageProps) {
  const getTeamById = (id: string) => league.teams.find((t) => t.id === id);

  const teamGames: Game[] =
    league.schedule.days
      .flat()
      .filter((g) => g.homeTeamID === team.id || g.awayTeamID === team.id)
      .slice()
      .sort((a, b) => a.dayIndex - b.dayIndex);

  return (
    <div>
      <button onClick={onBack}>← Back</button>

      <h1>
        {team.name} ({team.abbreviation})
      </h1>
      <p>
        Record: {team.record.wins}-{team.record.losses}
      </p>
      <h2>Roster</h2>
      {team.roster.length === 0 ? (
        <p>No players yet.</p>
      ) : (
        <ul>
          {team.roster.map((p) => (
            <li key={p.id}>
              {p.firstName} {p.lastName}
            </li>
          ))}
        </ul>
      )}

      <h2>Schedule</h2>
      {teamGames.length === 0 ? (
        <p>No games scheduled yet.</p>
      ) : (
        <ul>
          {teamGames.map((g) => {
            const isHome = g.homeTeamID === team.id;
            const opponentId = isHome ? g.awayTeamID : g.homeTeamID;
            const opponent = getTeamById(opponentId);

            return (
              <li key={g.id}>
                <strong>Day {g.dayIndex + 1}:</strong>{" "}
                {isHome ? "vs" : "@"}{" "}
                {opponent ? `${opponent.name} (${opponent.abbreviation})` : "Unknown Team"}
                {g.result ? " — Final" : " — Scheduled"}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
