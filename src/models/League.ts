import type { Schedule } from "./Schedule";
import { Team } from "./Team";

export class League {
  teams: Team[];

  schedule: Schedule

  constructor(params: {
    teams: Team[];
    schedule: Schedule;
  }) {
    this.teams = params.teams;
    this.schedule = params.schedule;
  }
}