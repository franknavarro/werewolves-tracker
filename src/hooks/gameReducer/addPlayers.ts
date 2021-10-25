import { GameActionTypes, Reducer } from '.';
import { Player } from '../useGame';
import { Phases } from './nextPhase';

export type PlayerSetUp = Pick<Player, 'name' | 'role'>;

export type AddPlayersAction = {
  type: GameActionTypes.AddPlayers;
  playerSetUp: PlayerSetUp[];
};

export const addPlayers: Reducer<AddPlayersAction> = (state, action) => {
  return {
    ...state,
    currentPhase: Phases.NightTime,
    players: action.playerSetUp.map((player, index) => ({
      ...player,
      id: index,
      causeOfDeath: null,
      diedTonight: false,
      defended: false,
      savedBy: null,
      isInLove: false,
      charmed: false,
    })),
  };
};
