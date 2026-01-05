export type Position = "PG" | "SG" | "SF" | "PF" | "C"

export class Player {
  readonly id: string;
  readonly name: string;

  position: Position

  offense: number;
  defense: number;

  constructor(params: {
    id: string;
    name: string;
    position: Position;
    offense: number;
    defense: number;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.position = params.position;
    this.offense = params.offense;
    this.defense = params.defense;
  }
}