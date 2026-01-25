import type { GameResult } from "./GameResult"

export type Playoffs = {
  rounds: Series[][]

  championTeamID?: string
}

export type Series = {
  higherSeedTeamID: string
  lowerSeedTeamID: string

  bestOf: number

  higherSeedWins: number
  lowerSeedWins: number

  gameResults: GameResult[]
}
