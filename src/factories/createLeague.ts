import { League } from "../models/League"
import { Player } from "../models/Player"
import { Team } from "../models/Team"
import type { PlayerSeed } from "../data/PlayerSeed"
import type { TeamSeed } from "../data/TeamSeed"
import { TEAM_SEEDS } from "../data/teams"
import { generatePlayerSeeds } from "../data/players"
import { createSchedule } from "./createSchedule"

export function createLeague(): League { 
  const seeds = generatePlayerSeeds(300)
  const players = initializePlayers(seeds); 
  const teams = initializeTeams(TEAM_SEEDS, players);

  const teamIds = teams.map((t) => t.id)
  const schedule = createSchedule(teamIds, (teamIds.length - 1) * 2) 
  return new League({
    teams: teams, 
    regularSeasonSchedule: schedule}) 
} 

function initializePlayers(seeds: readonly PlayerSeed[]): Player[] {
  const players: Player[] = []
  for (let i = 0; i < seeds.length; i++) {
    const player = Player.fromSeed(seeds[i])
    players.push(player)
  }
  return players
}

function initializeTeams(seeds: readonly TeamSeed[], players: Player[]): Team[] {
  const teams: Team[] = []
  for (let i = 0; i < seeds.length; i++) {
    const team = Team.fromSeed(seeds[i])
    teams.push(team)
  }

  // Round robin player distribution
  for (let i = 0; i < players.length; i++) {
    teams[i % teams.length].roster.push(players[i]);
  }
  return teams
}