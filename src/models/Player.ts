import type { PlayerAttributes } from "../data/PlayerAttributes";
import type { PlayerSeed} from "../data/PlayerSeed";

export type Position = "PG" | "SG" | "SF" | "PF" | "C"

export class Player {
  readonly id: string;

  readonly firstName: string;
  readonly lastName: string;

  position?: Position;

  attributes: PlayerAttributes;

  constructor(params: {
    id: string;
    firstName: string;
    lastName: string;
    attributes: PlayerAttributes
  }) {
    this.id = params.id;
    this.firstName = params.firstName;
    this.lastName = params.lastName
    this.attributes = params.attributes;
  }

  static fromSeed(seed: PlayerSeed): Player {
    return new Player({
      id: seed.id,
      firstName: seed.firstName,
      lastName: seed.lastName,
      attributes: seed.attributes
    });
  }
}