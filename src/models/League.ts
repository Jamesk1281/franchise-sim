import { Team } from "./Team";

export class League {
  teams: Team[];

  // Number of games in a season
  readonly seasonLength: number;

  constructor(params: {
    teams: Team[];
    seasonLength: number;
  }) {
    this.teams = params.teams;
    this.seasonLength = params.seasonLength;
  }
}