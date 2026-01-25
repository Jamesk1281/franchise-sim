import type { Game } from "../models/Game";

export function createGame(
  dayIndex: number,
  homeTeamID: string,
  awayTeamID: string
): Game {
  return {
    id: `${dayIndex}:${homeTeamID}:${awayTeamID}`,
    homeTeamID,
    awayTeamID,
  };
}

