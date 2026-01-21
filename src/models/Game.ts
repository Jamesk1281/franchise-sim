import type { GameResult } from "./GameResult";

export type Game = {
  id: string;

  dayIndex: number

  homeTeamID: string
  awayTeamID: string

  result?: GameResult
}