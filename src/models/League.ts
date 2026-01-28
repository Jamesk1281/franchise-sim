import { simulateGame } from "../sim/simulate";
import type { Playoffs } from "./Playoffs";
import type { Schedule } from "./Schedule";
import { Team } from "./Team";

export class League {
  teams: Team[];

  regularSeasonSchedule: Schedule
  playoffs: Playoffs | null

  constructor(params: {
    teams: Team[];
    regularSeasonSchedule: Schedule;
    playoffs?: Playoffs | null
  }) {
    this.teams = params.teams;
    this.regularSeasonSchedule = params.regularSeasonSchedule;
    this.playoffs = params.playoffs ?? null
  }

  simulateDay(dayIndex: number): void {
    const games = this.regularSeasonSchedule.days[dayIndex] ?? [];
    for (let i = 0; i < games.length; i++) {
      const game = games[i];
  
      if (game.result) continue;
  
      const result = simulateGame(game, this);
      game.result = result;
  
      const homeTeam = this.teams.find(t => t.id === result.homeTeamID);
      const awayTeam = this.teams.find(t => t.id === result.awayTeamID);
  
      if (!homeTeam || !awayTeam) {
        throw new Error("simulateDay: team not found when applying result");
      }
  
      if (result.homeScore > result.awayScore) {
        homeTeam.recordWin();
        awayTeam.recordLoss();
      } else {
        awayTeam.recordWin();
        homeTeam.recordLoss();
      }
    }
  }

  getStandings(): Team[] {
    return this.teams
      .slice()
      .sort((a, b) => b.record.wins - a.record.wins);
  }
  
}