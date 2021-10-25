import { createContext, FC, useContext, useReducer } from 'react';
import reducer, { GameActionTypes } from './gameReducer';
import { PlayerSetUp } from './gameReducer/addPlayers';
import { WinningRoles } from './gameReducer/checkWinConditions';
import { retrieveFromLocalStorage } from './gameReducer/localStorage';
import { Role, RoleIDs } from './roles';

export type PlayerID = number;

export interface Player {
  id: PlayerID;
  name: string;
  causeOfDeath: RoleIDs | null;
  diedTonight: boolean;
  savedBy: RoleIDs | null;
  defended: boolean;
  role: Role;
  isInLove: boolean;
  charmed: boolean;
}

export enum WitchPotionTypes {
  Life = 'life',
  Death = 'death',
}
type WitchPotions = {
  [key in WitchPotionTypes]: boolean;
};

export interface GameState {
  players: Player[];
  roles: Role[];
  isFirstNight: boolean;
  phaseIndex: number;
  witchPotions: WitchPotions;
  winner: WinningRoles | null;
}

export const DEFAULT_GAME_STATE = (): GameState => ({
  players: [],
  roles: [],
  isFirstNight: true,
  phaseIndex: 0,
  witchPotions: {
    [WitchPotionTypes.Life]: false,
    [WitchPotionTypes.Death]: false,
  },
  winner: null,
});

interface GameContextType extends GameState {
  addRoles: (roles: Role[]) => void;
  addPlayers: (playerSetUp: PlayerSetUp[]) => void;
  nextPhase: () => void;
  marryPlayers: (playerIDs: PlayerID[]) => void;
  killPlayers: (playerIDs: PlayerID[], cause: RoleIDs) => void;
  savePlayers: (playerIDs: PlayerID[], savedBy: RoleIDs) => void;
  witchUsedPotion: (potion: WitchPotionTypes, usedOn: PlayerID[]) => void;
  resetGame: () => void;
  defendPlayer: (playerID: PlayerID) => void;
  charmPlayers: (playerIDs: PlayerID[]) => void;
}

const GameContext = createContext<GameContextType>({
  ...DEFAULT_GAME_STATE(),
  addRoles: () => {},
  addPlayers: () => {},
  nextPhase: () => {},
  marryPlayers: () => {},
  killPlayers: () => {},
  savePlayers: () => {},
  witchUsedPotion: () => {},
  resetGame: () => {},
  defendPlayer: () => {},
  charmPlayers: () => {},
});

export const useGame = () => {
  return useContext(GameContext);
};

export const PlayersProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null, retrieveFromLocalStorage);

  return (
    <GameContext.Provider
      value={{
        ...state,
        addRoles: (roles) =>
          dispatch({ type: GameActionTypes.AddRoles, roles }),
        addPlayers: (playerSetUp) =>
          dispatch({ type: GameActionTypes.AddPlayers, playerSetUp }),
        nextPhase: () => dispatch({ type: GameActionTypes.NextPhase }),
        marryPlayers: (playerIDs) =>
          dispatch({ type: GameActionTypes.MarryPlayers, playerIDs }),
        killPlayers: (playerIDs, cause) =>
          dispatch({
            type: GameActionTypes.KillPlayers,
            playerIDs,
            cause,
          }),
        savePlayers: (playerIDs, savedBy) =>
          dispatch({
            type: GameActionTypes.SavePlayers,
            playerIDs,
            savedBy,
          }),
        witchUsedPotion: (potion, usedOn) =>
          dispatch({ type: GameActionTypes.WitchUsedPotion, potion, usedOn }),
        resetGame: () => dispatch({ type: GameActionTypes.ResetGame }),
        defendPlayer: (playerID) =>
          dispatch({ type: GameActionTypes.DefendPlayer, playerID }),
        charmPlayers: (playerIDs) =>
          dispatch({ type: GameActionTypes.CharmPlayers, playerIDs }),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
