import { createLeague } from "../factories/createLeague";
import type { League } from "../models/League";
import { advanceSimDate, makeSimDate, type SimDate } from "./Date";

export class SimContext {
  league: League;
  date: SimDate;

  constructor() {
    this.league = createLeague();
    this.date = makeSimDate(2026, 0);
  }

  simulateDay(): void {
    const dayIndex = this.date.dayIndex;
  
    this.league.simulateDay(dayIndex);
  
    this.date = advanceSimDate(this.date);
  }
}
