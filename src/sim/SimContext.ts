import { createLeague } from "../factories/createLeague";
import type { League } from "../models/League";
import { advanceSimDate, makeSimDate, type SimDate } from "./Date";

export type SimPhase = "REGULAR_SEASON" | "PLAYOFFS" | "OFFSEASON";

export class SimContext {
  league: League;
  date: SimDate;
  phase: SimPhase

  constructor() {
    this.league = createLeague();
    this.date = makeSimDate(2026, 0);
    this.phase = "REGULAR_SEASON"
  }
  
  simulateDay() {
    switch (this.phase) {
      case "REGULAR_SEASON":
        this.league.simulateDay(this.date.dayIndex);
        this.date = advanceSimDate(this.date);
        break;

      case "PLAYOFFS":
        break;

      case "OFFSEASON":
        break;
    }
  }
}

