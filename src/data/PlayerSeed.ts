import type { PlayerAttributes } from "./PlayerAttributes"; 

export type PlayerSeed = { 
  readonly id: string; 
  readonly name: string; 
  
  // Height in inches
  readonly height: number; 
  
  readonly attributes: PlayerAttributes; 
}