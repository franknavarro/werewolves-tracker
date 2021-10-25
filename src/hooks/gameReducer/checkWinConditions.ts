import { alive } from '../../helpers/filterPlayers';
import { Classifications, RoleIDs } from '../roles';
import { Player } from '../useGame';

export enum WinningRoles {
  Villagers = 'Villager',
  Werewolves = 'Werewolves',
  Lovers = 'Lovers',
  Piper = 'Piper',
  Tie = 'Tie',
}

type WinningRoleCounts = {
  [key in WinningRoles]: number;
};

export const checkWinConditions = (players: Player[]): WinningRoles | null => {
  const alivePlayers = alive(players);
  if (alivePlayers.length === 0) return WinningRoles.Tie;

  let piperAlive = false;

  const winningCounts = alivePlayers.reduce<WinningRoleCounts>(
    (prevCounts, player) => {
      if (player.role.id === RoleIDs.Piper) piperAlive = true;
      if (player.charmed) prevCounts[WinningRoles.Piper]++;
      if (player.isInLove) prevCounts[WinningRoles.Lovers]++;
      if (player.role.classification === Classifications.Werewolf) {
        prevCounts[WinningRoles.Werewolves]++;
      }
      if (player.role.classification === Classifications.Villager) {
        prevCounts[WinningRoles.Villagers]++;
      }
      return prevCounts;
    },
    {
      [WinningRoles.Villagers]: 0,
      [WinningRoles.Werewolves]: 0,
      [WinningRoles.Lovers]: 0,
      [WinningRoles.Piper]: 0,
      [WinningRoles.Tie]: 0,
    },
  );

  if (
    piperAlive &&
    winningCounts[WinningRoles.Piper] === alivePlayers.length - 1
  ) {
    return WinningRoles.Piper;
  } else if (winningCounts[WinningRoles.Werewolves] === alivePlayers.length) {
    return WinningRoles.Werewolves;
  } else if (winningCounts[WinningRoles.Villagers] === alivePlayers.length) {
    return WinningRoles.Villagers;
  } else if (winningCounts[WinningRoles.Lovers] === alivePlayers.length) {
    return WinningRoles.Lovers;
  }
  return null;
};
