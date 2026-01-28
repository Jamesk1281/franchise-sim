import { useState } from "react";
import { SimContext } from "./sim/SimContext";
import TeamsPage from "./pages/TeamsPage";
import TeamPage from "./pages/TeamPage";
import { createPlayoffsFromStandings } from "./factories/createPlayoffs"; 

export default function App() {
  const [sim] = useState(() => new SimContext());
  const league = sim.league;

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const [, setTick] = useState(0);
  const rerender = () => setTick((t) => t + 1);

  const isRegularSeasonOver =
    sim.date.dayIndex >= league.regularSeasonSchedule.days.length;

  const handleSimDay = () => {
    sim.simulateDay();
    rerender();
  };

  const handleBeginPlayoffs = () => {
    if (league.playoffs) return; 

    const standings = league.getStandings();
    league.playoffs = createPlayoffsFromStandings(standings);

    // optional if you added phase
    // sim.phase = "PLAYOFFS";

    rerender();
  };

  const teamsPageProps = {
    league,
    onSelectTeam: setSelectedTeamId,
    onSimulateDay: handleSimDay,
    isRegularSeasonOver,
    onBeginPlayoffs: handleBeginPlayoffs,
  };

  if (selectedTeamId) {
    const team = league.teams.find((t) => t.id === selectedTeamId);

    if (!team) return <TeamsPage {...teamsPageProps} />;

    return (
      <TeamPage
        team={team}
        league={league}
        onBack={() => setSelectedTeamId(null)}
      />
    );
  }

  return <TeamsPage {...teamsPageProps} />;
}
