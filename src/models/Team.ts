import { Player } from "./Player";

export class Team {
  readonly id: string;
  name: string;

  roster: Player[];

  constructor(params: {
    id: string;
    name: string;
    roster: Player[];
  }) {
    this.id = params.id;
    this.name = params.name;
    this.roster = params.roster;
  }
}