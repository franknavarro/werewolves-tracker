import { AllRoleIDs, RoleIDs } from '../hooks/roles';
import { InteractablePlayer } from '../hooks/useInteractablePlayers';
import { GameState, Player, PlayerID } from '../hooks/useGame';

export const alive = (players: Player[]) => {
  return players.filter((player) => {
    return player.causeOfDeath === null;
  });
};

export const aliveAndIsRoles = (
  state: GameState,
  roles: AllRoleIDs[],
): Player[] => {
  return state.players.filter((player) => {
    return (
      roles.includes(player.role.id) &&
      (player.causeOfDeath === null || player.nightDied === state.nightCount)
    );
  });
};

export const aliveAndNotRoles = (
  state: GameState,
  roles: AllRoleIDs[],
): Player[] => {
  return state.players.filter((player) => {
    return (
      !roles.includes(player.role.id) &&
      (player.causeOfDeath === null || player.nightDied === state.nightCount)
    );
  });
};

export const aliveAndCharmed = (state: GameState): Player[] => {
  return state.players.filter((player) => {
    return (
      player.charmed &&
      (player.causeOfDeath === null || player.nightDied === state.nightCount)
    );
  });
};

export const tonightsWerewolfVictim = (state: GameState): Player[] => {
  return state.players.filter((player) => {
    return (
      (player.causeOfDeath === RoleIDs.Werewolf &&
        player.nightDied === state.nightCount) ||
      (player.savedBy === RoleIDs.Defender && player.defended)
    );
  });
};

export const dead = (players: Player[]) => {
  return players.filter((player) => player.causeOfDeath !== null);
};

export const diedTonight = (state: GameState) => {
  return state.players.filter(
    (player) => player.nightDied === state.nightCount,
  );
};

export const savedTonight = (players: Player[]) => {
  return players.filter((player) => player.savedBy);
};

export const hunterDiedTonight = (state: GameState): boolean => {
  return state.players.some((player) => {
    return (
      player.role.id === RoleIDs.Hunter && player.nightDied === state.nightCount
    );
  });
};

export const diedTonightAtTheHandsOf = (
  state: GameState,
  roles: (AllRoleIDs | null)[],
) => {
  const diedAtTheHandsOf = (player: Player) => {
    return (
      player.nightDied === state.nightCount &&
      roles.includes(player.causeOfDeath)
    );
  };

  const loversDeath = state.players.some(
    (player) => diedAtTheHandsOf(player) && player.isInLove,
  );

  return state.players.filter((player) => {
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
  return players.filter((p) => p.defended).map((p) => p.id);
};

export const charmedPlayers = (state: GameState): PlayerID[] => {
  return aliveAndCharmed(state).map((p) => p.id);
};

export const playersExist = (
  state: GameState,
  roles: AllRoleIDs[],
): boolean => {
  return state.players.some((player) => {
    return (
      roles.includes(player.role.id) &&
      (player.causeOfDeath === null || player.nightDied === state.nightCount)
    );
  });
};

export const playersDied = (
  state: GameState,
  roles: AllRoleIDs[],
  diedTonight: boolean,
): boolean => {
  return state.players.some((player) => {
    return (
      roles.includes(player.role.id) &&
      player.causeOfDeath !== null &&
      (diedTonight || player.nightDied !== state.nightCount)
    );
  });
};
