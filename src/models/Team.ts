import { Player } from "./Player";
import type { TeamSeed } from "../data/TeamSeed"

export type TeamRecord = { wins: number; losses: number };

export class Team {
  readonly id: string;
  name: string;
  abbreviation: string;

  roster: Player[];

  record: TeamRecord;

  constructor(params: {
    id: string;
    name: string;
    abbreviation: string;
    roster: Player[];
    record?: TeamRecord;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.abbreviation = params.abbreviation;
    this.roster = params.roster;
    this.record = params.record ?? { wins: 0, losses: 0 };
  }

  get gamesPlayed(): number {
    return this.record.wins + this.record.losses;
  }

  recordWin() {
    this.record.wins += 1;
  }

  recordLoss() {
    this.record.losses += 1;
  }

  static fromSeed(seed: TeamSeed): Team {
    return new Team({
      id: seed.id,
      name: seed.name,
      abbreviation: seed.abbreviation,
      roster: [],
      record: { wins: 0, losses: 0 },
    });
  }
}
