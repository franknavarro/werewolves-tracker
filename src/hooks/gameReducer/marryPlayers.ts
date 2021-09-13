import { GameActionTypes, Reducer } from '.';
import { PlayerID } from '../useGame';

export type MarryPlayersAction = {
  type: GameActionTypes.MarryPlayers;
  playerIDs: PlayerID[];
};

export const marryPlayers: Reducer<MarryPlayersAction> = (state, action) => {
  const playersWithMarried = state.players.map((player) => {
    const updatedPlayer = { ...player };
    if (action.playerIDs.includes(player.id)) {
      updatedPlayer.isInLove = true;
    }
    return updatedPlayer;
  });

  return { ...state, players: playersWithMarried };
};
