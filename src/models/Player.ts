import type { PlayerSeed} from "../data/PlayerSeed";

export type Position = "PG" | "SG" | "SF" | "PF" | "C"

export class Player {
  readonly id: string;
  readonly name: string;

  position?: Position;

  offense: number;
  defense: number;

  constructor(params: {
    id: string;
    name: string;
    offense: number;
    defense: number;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.offense = params.offense;
    this.defense = params.defense;
  }

  static fromSeed(seed: PlayerSeed): Player {
    return new Player({
      id: seed.id,
      name: seed.name,
      offense: seed.attributes.offense,
      defense: seed.attributes.defense,
    });
  }
}