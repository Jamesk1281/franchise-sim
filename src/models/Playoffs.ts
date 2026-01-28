import type { Game } from "./Game"

export type Playoffs = {
  rounds: Series[][]
  roundIndex: number

  championTeamID?: string
}

export type Series = {
  higherSeedTeamID: string;
  lowerSeedTeamID: string;

  bestOf: number;

  higherSeedWins: number;
  lowerSeedWins: number;

  games: Game[];
};
