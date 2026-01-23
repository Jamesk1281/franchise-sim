import type { Schedule } from "../models/Schedule";
import type { Game } from "../models/Game";
import { createGame } from "./createGame";

type Pair = readonly [string, string];

export function createSchedule(teamIds: string[], gamesPerTeam: number): Schedule {
  if (teamIds.length < 2) return { days: [] };

  // If odd teams, add a BYE so the algorithm works cleanly
  const BYE = "__BYE__";
  const ids = [...teamIds];
  if (ids.length % 2 === 1) ids.push(BYE);

  const n = ids.length;           // includes BYE if odd
  const roundsPerCycle = n - 1;   // number of days in one round-robin cycle
  const gamesPerCyclePerTeam = n - 1;

  if (gamesPerTeam % gamesPerCyclePerTeam !== 0) {
    throw new Error(
      `gamesPerTeam must be a multiple of (teamCount-1). ` +
        `Got gamesPerTeam=${gamesPerTeam}, teamCount=${teamIds.length}, (teamCount-1)=${teamIds.length - 1}`
    );
  }

  const cycles = gamesPerTeam / gamesPerCyclePerTeam; // 1 = single RR, 2 = double RR, etc.

  // We'll build days[dayIndex] = Game[]
  const days: Game[][] = [];
  let globalDayIndex = 0;

  // Circle method setup:
  // Keep the first slot fixed; rotate the rest
  const fixed = ids[0];
  let rot = ids.slice(1); // length n-1

  // Build one cycle of pairings (no home/away yet)
  const buildCyclePairings = (): Pair[][] => {
    const cycle: Pair[][] = [];

    for (let round = 0; round < roundsPerCycle; round++) {
      const order = [fixed, ...rot]; // length n
      const pairs: Pair[] = [];

      for (let i = 0; i < n / 2; i++) {
        const a = order[i];
        const b = order[n - 1 - i];
        pairs.push([a, b]);
      }

      cycle.push(pairs);

      // rotate: move last element of rot to the front
      rot = [rot[rot.length - 1], ...rot.slice(0, rot.length - 1)];
    }

    return cycle;
  };

  const baseCycle = buildCyclePairings();

  // Helper: decide home/away in a way that balances over time
  const assignHomeAway = (
    pair: Pair,
    cycleIndex: number,
    roundIndex: number,
    pairIndex: number
  ): { home: string; away: string } => {
    let [a, b] = pair;

    const flip =
      (cycleIndex % 2 === 1) !==
      (roundIndex % 2 === 1) !==
      (pairIndex % 2 === 1);

    if (flip) [a, b] = [b, a];

    return { home: a, away: b };
  };

  // Build all cycles
  for (let c = 0; c < cycles; c++) {
    for (let r = 0; r < roundsPerCycle; r++) {
      const pairs = baseCycle[r];
      const dayGames: Game[] = [];

      for (let p = 0; p < pairs.length; p++) {
        const { home, away } = assignHomeAway(pairs[p], c, r, p);

        // Drop BYE games
        if (home === BYE || away === BYE) continue;

        dayGames.push(createGame(globalDayIndex, home, away));
      }

      days[globalDayIndex] = dayGames;
      globalDayIndex++;
    }
  }

  return { days };
}
