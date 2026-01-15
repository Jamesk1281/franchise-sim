import type { PlayerSeed} from "../data/PlayerSeed";

export type Position = "PG" | "SG" | "SF" | "PF" | "C"

export class Player {
  readonly id: string;

  readonly firstName: string;
  readonly lastName: string;

  position?: Position;

  offense: number;
  defense: number;

  constructor(params: {
    id: string;
    firstName: string;
    lastName: string;
    offense: number;
    defense: number;
  }) {
    this.id = params.id;
    this.firstName = params.firstName;
    this.lastName = params.lastName
    this.offense = params.offense;
    this.defense = params.defense;
  }

  static fromSeed(seed: PlayerSeed): Player {
    return new Player({
      id: seed.id,
      firstName: seed.firstName,
      lastName: seed.lastName,
      offense: seed.attributes.offense,
      defense: seed.attributes.defense,
    });
  }
}