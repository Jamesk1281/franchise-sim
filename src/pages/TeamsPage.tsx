import { League } from "../models/League";

type TeamsPageProps = {
  league: League;
  onSelectTeam: (teamId: string) => void;

  isRegularSeasonOver: boolean;
  onSimulateDay: () => void;
  onBeginPlayoffs: () => void;
};



export default function TeamsPage({
  league,
  onSelectTeam,
  isRegularSeasonOver,
  onSimulateDay,
  onBeginPlayoffs,
}: TeamsPageProps) {
  const getTeamById = (id: string) => league.teams.find((t) => t.id === id);

const roundLabels = ["Round 1", "Round 2", "Conference Finals", "Finals"];

  const standings = league.getStandings();

  return (
    <div>
      <h1>Teams</h1>

      {isRegularSeasonOver ? (
        <button onClick={onBeginPlayoffs}>Begin Playoffs</button>
      ) : (
        <button onClick={onSimulateDay}>Sim Day</button>
      )}

    <h2>Playoffs</h2>

    {!league.playoffs ? (
      <p>Playoffs not started.</p>
    ) : (
      <div>
        <p>
          Round: {league.playoffs.roundIndex + 1}
          {league.playoffs.championTeamID ? ` — Champion: ${getTeamById(league.playoffs.championTeamID)?.name ?? "Unknown"}` : ""}
        </p>

        {league.playoffs.rounds.map((round, rIdx) => (
          <div key={rIdx} style={{ marginBottom: 16 }}>
            <h3>{roundLabels[rIdx] ?? `Round ${rIdx + 1}`}</h3>

            {round.length === 0 ? (
              <p style={{ opacity: 0.7 }}>TBD</p>
            ) : (
              <ul>
                {round.map((s, sIdx) => {
                  const higher = getTeamById(s.higherSeedTeamID);
                  const lower = getTeamById(s.lowerSeedTeamID);

                  return (
                    <li key={sIdx}>
                      <strong>
                        {higher ? `${higher.name} (${higher.abbreviation})` : "Unknown"}{" "}
                        vs{" "}
                        {lower ? `${lower.name} (${lower.abbreviation})` : "Unknown"}
                      </strong>{" "}
                      — {s.higherSeedWins}-{s.lowerSeedWins}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}


      <h2>Standings</h2>
      {standings.length === 0 ? (
        <p>No teams yet.</p>
      ) : (
        <ol>
          {standings.map((team) => (
            <li key={team.id}>
              <button onClick={() => onSelectTeam(team.id)}>
                {team.name} ({team.abbreviation}) — {team.record.wins}-
                {team.record.losses}
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
