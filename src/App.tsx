import { useState } from "react";
import { SimContext } from "./sim/SimContext";
import TeamsPage from "./pages/TeamsPage";
import TeamPage from "./pages/TeamPage";

export default function App() {
  const [sim] = useState(() => new SimContext());
  const league = sim.league;

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  if (selectedTeamId) {
    const team = league.teams.find((t) => t.id === selectedTeamId);

    if (!team) return <TeamsPage league={league} onSelectTeam={setSelectedTeamId} />;

    return <TeamPage team={team} onBack={() => setSelectedTeamId(null)} />;
  }

  return <TeamsPage league={league} onSelectTeam={setSelectedTeamId} />;
}
