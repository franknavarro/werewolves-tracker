import { GameActionTypes, Reducer } from '.';
import { PlayerID } from '../useGame';

export type CharmPlayersAction = {
  type: GameActionTypes.CharmPlayers;
  playerIDs: PlayerID[];
};

export const charmPlayers: Reducer<CharmPlayersAction> = (state, action) => {
  const players = state.players.map((player) => {
    if (action.playerIDs.includes(player.id)) {
      return { ...player, charmed: true };
    }
    return player;
  });
  return {
    ...state,
    players,
  };
};
