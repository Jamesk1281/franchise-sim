import type { GameResult } from "./GameResult";

export type Game = {
  id: string;

  homeTeamID: string
  awayTeamID: string

  result?: GameResult
}