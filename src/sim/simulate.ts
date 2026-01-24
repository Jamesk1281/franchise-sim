import type { Game } from "../models/Game";
import type { GameResult } from "../models/GameResult";
import type { League } from "../models/League";
import type { Team } from "../models/Team";

export function simulateGame(game: Game, league: League): GameResult {
  const homeTeam = league.teams.find(t => t.id === game.homeTeamID);
  const awayTeam = league.teams.find(t => t.id === game.awayTeamID);

  if (!homeTeam || !awayTeam) {
    throw new Error("simulateGame: team not found for game");
  }

  const avg = (team: Team) =>
    team.roster.reduce(
      (s, p) => s + (p.attributes.offense + p.attributes.defense) / 2,
      0
    ) / (team.roster.length || 1);

  const homeAvg = avg(homeTeam);
  const awayAvg = avg(awayTeam);

  let pHome = 0.5 + (homeAvg - awayAvg) * 0.02;
  pHome = Math.max(0.05, Math.min(0.95, pHome));

  const homeWins = Math.random() < pHome;

  const base = 80 + Math.floor(Math.random() * 41);
  const margin = 1 + Math.floor(Math.random() * 26);
  const bump = Math.floor(Math.random() * 6);

  return {
    homeTeamID: homeTeam.id,
    awayTeamID: awayTeam.id,
    homeScore: homeWins ? base + bump : base - margin,
    awayScore: homeWins ? base - margin : base + bump
  };
}