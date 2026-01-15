import type { PlayerAttributes } from "./PlayerAttributes"; 

export type PlayerSeed = { 
  readonly id: string; 

  readonly firstName: string; 
  readonly lastName: string;
  
  // Height in inches
  readonly height: number; 
  
  readonly attributes: PlayerAttributes; 
}