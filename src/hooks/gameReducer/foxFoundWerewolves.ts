import { GameActionTypes, Reducer } from '.';
import { WEREWOLVES } from '../../pages/phases/Werewolves';
import { RoleIDs } from '../roles';
import { PlayerID } from '../useGame';

export type FoxFoundWerewolvesAction = {
  type: GameActionTypes.FoxFoundWerewolves;
  playerIDs: PlayerID[];
};

export const foxFoundWerewolves: Reducer<FoxFoundWerewolvesAction> = (
  state,
  action,
) => {
  let foundWerewolves = true;
  if (action.playerIDs.length !== 0) {
    foundWerewolves = state.players.some((player) => {
      return (
        action.playerIDs.includes(player.id) &&
        WEREWOLVES.includes(player.role.id as RoleIDs)
      );
    });
  }
  return { ...state, foxActive: foundWerewolves };
};
