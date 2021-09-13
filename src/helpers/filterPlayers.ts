import { RoleIDs } from '../hooks/roles';
import { InteractablePlayer } from '../hooks/useInteractablePlayers';
import { Player, PlayerID } from '../hooks/useGame';

export const alive = (players: Player[]) => {
  return players.filter((player) => {
    return player.causeOfDeath === null;
  });
};

export const aliveAndIsRoles = (
  players: Player[],
  roles: RoleIDs[],
): Player[] => {
  return players.filter((player) => {
    return (
      roles.includes(player.role.id) &&
      (player.causeOfDeath === null || player.diedTonight)
    );
  });
};

export const aliveAndNotRoles = (
  players: Player[],
  roles: RoleIDs[],
): Player[] => {
  return players.filter((player) => {
    return (
      !roles.includes(player.role.id) &&
      (player.causeOfDeath === null || player.diedTonight)
    );
  });
};

export const tonightsWerewolfVictim = (players: Player[]): Player[] => {
  return players.filter((player) => {
    return (
      (player.causeOfDeath === RoleIDs.Werewolf && player.diedTonight) ||
      (player.savedBy === RoleIDs.Defender && player.defended)
    );
  });
};

export const dead = (players: Player[]) => {
  return players.filter((player) => player.causeOfDeath !== null);
};

export const diedTonight = (players: Player[]) => {
  return players.filter((player) => player.diedTonight);
};

export const savedTonight = (players: Player[]) => {
  return players.filter((player) => player.savedBy);
};

export const hunterThatDiedTonight = (players: Player[]): boolean => {
  return players.some((player) => {
    return player.role.id === RoleIDs.Hunter && player.diedTonight;
  });
};

export const diedTonightAtTheHandsOf = (players: Player[], role: RoleIDs) => {
  const diedAtTheHandsOf = (player: Player) => {
    return player.causeOfDeath === role && player.diedTonight;
  };

  const loversDeath = players.some(
    (player) => diedAtTheHandsOf(player) && player.isInLove,
  );

  return players.filter((player) => {
    return (
      diedAtTheHandsOf(player) ||
      (loversDeath && player.causeOfDeath === RoleIDs.Cupid)
    );
  });
};

export const selectedPlayers = (
  allPlayers: InteractablePlayer[],
): PlayerID[] => {
  return allPlayers.filter((p) => p.selected).map((p) => p.id);
};

export const undefendablePlayers = (players: Player[]): PlayerID[] => {
  return players
    .filter((p) => p.defended || p.role.id === RoleIDs.LittleGirl)
    .map((p) => p.id);
};
