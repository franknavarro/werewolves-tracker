import { GameActionTypes, Reducer } from '.';
import { PlayerID } from '../useGame';

export type DefendPlayerAction = {
  type: GameActionTypes.DefendPlayer;
  playerID: PlayerID;
};

export const defendPlayer: Reducer<DefendPlayerAction> = (state, action) => {
  const players = state.players.map((player) => {
    if (player.id === action.playerID) return { ...player, defended: true };
    if (player.defended) return { ...player, defended: false };
    return player;
  });
  return {
    ...state,
    players,
  };
};
