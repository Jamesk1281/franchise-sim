import type { PlayerSeed } from "./PlayerSeed";
import type { PlayerAttributes } from "./PlayerAttributes"

let firstNames: string[] = [];
let lastNames: string[] = [];

export function generatePlayerSeeds(count: number): PlayerSeed[] {
  const seeds: PlayerSeed[] = []

  for (let i = 0; i < count; i++) {
    const attributes: PlayerAttributes = {
      offense: Math.floor(Math.random() * 100) + 1,
      defense: Math.floor(Math.random() * 100) + 1,
    }
    const id = Math.random().toString(36).slice(2, 7);

    const firstName = getRandomFirstName()
    const lastName = getRandomLastName()
    console.log(firstName)

    const height = Math.floor(Math.random() * 30) + 60;

    const seed: PlayerSeed = {
      id, firstName, lastName, height, attributes
    }

    seeds.push(seed);
  }
  return seeds;
}

export async function loadNames() {
  const firstText = await fetch("/first-names.txt").then(r => r.text());
  const lastText = await fetch("/last-names.txt").then(r => r.text());

  firstNames = firstText.split("\n").map(n => n.trim()).filter(Boolean);
  lastNames = lastText.split("\n").map(n => n.trim()).filter(Boolean);
}

export function getRandomFirstName() {
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

export function getRandomLastName() {
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}