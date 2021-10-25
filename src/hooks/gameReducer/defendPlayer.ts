import { GameActionTypes, Reducer } from '.';
import { RoleIDs } from '../roles';
import { PlayerID } from '../useGame';

export type DefendPlayerAction = {
  type: GameActionTypes.DefendPlayer;
  playerID: PlayerID;
};

export const defendPlayer: Reducer<DefendPlayerAction> = (state, action) => {
  const players = state.players.map((player) => {
    if (
      player.id === action.playerID &&
      player.role.id !== RoleIDs.LittleGirl
    ) {
      return { ...player, defended: true };
    }
    // Remove player defended from last round.
    if (player.defended) return { ...player, defended: false };
    return player;
  });
  return {
    ...state,
    players,
  };
};
