import { Player } from "./Player";
import type { TeamSeed } from "../data/TeamSeed"

export class Team {
  readonly id: string;
  name: string;
  abbreviation: string;

  roster: Player[];

  constructor(params: {
    id: string;
    name: string;
    abbreviation: string;
    roster: Player[];
  }) {
    this.id = params.id;
    this.name = params.name;
    this.abbreviation = params.abbreviation;
    this.roster = params.roster;
  }

  static fromSeed(seed: TeamSeed): Team {
    return new Team({
      id: seed.id,
      name: seed.name,
      roster: []
    })
  }
}