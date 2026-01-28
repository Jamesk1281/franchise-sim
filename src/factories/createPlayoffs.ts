import type { Team } from "../models/Team";
import type { Playoffs, Series } from "../models/Playoffs";
import { createGame } from "./createGame";
import type { Game } from "../models/Game";

export function makeSeries(higherSeedTeamID: string, lowerSeedTeamID: string, bestOf = 7): Series {
  const n = Math.ceil(bestOf / 2);

  const games: Game[] = [];
  for (let i = 0; i < n; i++) {
    games.push(createGame(i, higherSeedTeamID, lowerSeedTeamID));
  }

  return {
    higherSeedTeamID,
    lowerSeedTeamID,
    bestOf,
    higherSeedWins: 0,
    lowerSeedWins: 0,
    games,
  };
}

export function createPlayoffsFromStandings(standings: Team[]): Playoffs {
  const seeds = standings.slice(0, 8);

  if (seeds.length < 8) {
    throw new Error(`createPlayoffs: need at least 8 teams (got ${seeds.length})`);
  }

  const round1: Series[] = [
    makeSeries(seeds[0].id, seeds[7].id),
    makeSeries(seeds[1].id, seeds[6].id),
    makeSeries(seeds[2].id, seeds[5].id),
    makeSeries(seeds[3].id, seeds[4].id),
  ];

  const rounds: Series[][] = [round1, [], []]; 

  return {
    rounds,
    roundIndex: 0,
    championTeamID: undefined,
  };
}
