import { useState } from "react";
import { SimContext } from "./sim/SimContext";
import TeamsPage from "./pages/TeamsPage";
import TeamPage from "./pages/TeamPage";

export default function App() {
  const [sim] = useState(() => new SimContext());
  const league = sim.league;

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const [, setTick] = useState(0);
  const rerender = () => setTick((t) => t + 1);

  const handleSimDay = () => {
    sim.simulateDay();
    rerender();
  };

  if (selectedTeamId) {
    const team = league.teams.find((t) => t.id === selectedTeamId);

    if (!team)
      return (
        <TeamsPage
          league={league}
          onSelectTeam={setSelectedTeamId}
          onSimulateDay={handleSimDay}
        />
      );

    return (
      <TeamPage
        team={team}
        league={league}
        onBack={() => setSelectedTeamId(null)}
      />
    );
  }

  return (
    <TeamsPage
      league={league}
      onSelectTeam={setSelectedTeamId}
      onSimulateDay={handleSimDay}
    />
  );
}

