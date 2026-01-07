import type { PlayerSeed } from "./PlayerSeed";
import type { PlayerAttributes } from "./PlayerAttributes"

export function generatePlayerSeeds(count: number): PlayerSeed[] {
  const seeds: PlayerSeed[] = []
  for (let i = 0; i < count; i++) {
    const attributes: PlayerAttributes = {
      offense: Math.floor(Math.random() * 100) + 1,
      defense: Math.floor(Math.random() * 100) + 1,
    }
    const id = Math.random().toString(36).slice(2, 7);
    const name = Math.random().toString(36).slice(2, 7);
    const height = Math.floor(Math.random() * 30) + 60;

    const seed: PlayerSeed = {
      id, name, height, attributes
    }

    seeds.push(seed);
  }
  return seeds;
}