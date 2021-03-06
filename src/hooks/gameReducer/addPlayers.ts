import { GameActionTypes, Reducer } from '.';
import { Player } from '../useGame';

export type PlayerSetUp = Pick<Player, 'name' | 'role'>;

export type AddPlayersAction = {
  type: GameActionTypes.AddPlayers;
  playerSetUp: PlayerSetUp[];
};

export const addPlayers: Reducer<AddPlayersAction> = (state, action) => {
  return {
    ...state,
    players: action.playerSetUp.map((player, index) => ({
      ...player,
      id: index,
      causeOfDeath: null,
      nightDied: null,
      defended: false,
      savedBy: null,
      isInLove: false,
      charmed: false,
    })),
  };
};
