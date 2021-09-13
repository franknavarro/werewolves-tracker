import { addPlayers, AddPlayersAction } from './addPlayers';
import { addRoles, AddRolesAction } from './addRoles';
import { marryPlayers, MarryPlayersAction } from './marryPlayers';
import { nextPhase, NextPhaseAction } from './nextPhase';
import { killPlayers, KillPlayersAction } from './killPlayers';
import { savePlayers, SavePlayersAction } from './savePlayers';
import { DEFAULT_GAME_STATE, GameState } from '../useGame';
import { witchUsedPotion, WitchUsedPotionAction } from './witchUsedPotion';
import { defendPlayer, DefendPlayerAction } from './defendPlayer';
import { saveToLocalStorage } from './localStorage';

export enum GameActionTypes {
  AddRoles = 'ADD_ROLES',
  AddPlayers = 'ADD_PLAYERS',
  NextPhase = 'NEXT_PLAYER',
  MarryPlayers = 'MARRY_PLAYERS',
  KillPlayers = 'KILL_PLAYERS',
  SavePlayers = 'SAVE_PLAYERS',
  WitchUsedPotion = 'WITCH_USED_POTION',
  ResetGame = 'RESET_GAME',
  DefendPlayer = 'DEFEND_PLAYER',
}

type ResetGameAction = { type: GameActionTypes.ResetGame };

type GameActions =
  | AddRolesAction
  | AddPlayersAction
  | NextPhaseAction
  | MarryPlayersAction
  | KillPlayersAction
  | SavePlayersAction
  | WitchUsedPotionAction
  | ResetGameAction
  | DefendPlayerAction;

export type Reducer<Action = GameActions> = (
  state: GameState,
  action: Action,
) => GameState;

const reducer: Reducer = (state, action) => {
  let newState = state;
  switch (action.type) {
    case GameActionTypes.AddRoles:
      newState = addRoles(state, action);
      break;

    case GameActionTypes.AddPlayers:
      newState = addPlayers(state, action);
      break;

    case GameActionTypes.NextPhase:
      newState = nextPhase(state, action);
      break;

    case GameActionTypes.MarryPlayers:
      newState = marryPlayers(state, action);
      break;

    case GameActionTypes.KillPlayers:
      newState = killPlayers(state, action);
      break;

    case GameActionTypes.SavePlayers:
      newState = savePlayers(state, action);
      break;

    case GameActionTypes.WitchUsedPotion:
      newState = witchUsedPotion(state, action);
      break;

    case GameActionTypes.DefendPlayer:
      newState = defendPlayer(state, action);
      break;

    case GameActionTypes.ResetGame:
      newState = DEFAULT_GAME_STATE();
      break;
  }

  saveToLocalStorage(newState);
  return newState;
};

export default reducer;
