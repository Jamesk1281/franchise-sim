import { Player } from "../models/Player";
import type { PlayerSeed } from "./PlayerSeed";
import type { PlayerAttributes } from "./PlayerAttributes"

export function generatePlayers(count: number): Player[] {
  const players: Player[] = []
  for (let i = 0; i < count; i++) {
    const attributes: PlayerAttributes = {
      offense: Math.floor(Math.random() * 100) + 1,
      defense: Math.floor(Math.random() * 100) + 1,
    }
    const id = Math.random().toString(36).slice(2, 7);
    const name = Math.random().toString(36).slice(2, 7);
    const height = Math.floor(Math.random() * 30) + 60;

    const seed: PlayerSeed = {
      id: id,
      name: name,
      height: height, 
      attributes: attributes
    }

    players.push(Player.fromSeed(seed));
  }
  return players;
}