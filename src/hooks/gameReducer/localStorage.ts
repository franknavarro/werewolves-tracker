import { DEFAULT_GAME_STATE, GameState } from '../useGame';

const STORAGE_KEY = 'game';

export const saveToLocalStorage = (game: GameState): void => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
};

export const retrieveFromLocalStorage = (): GameState => {
  const stringJson = window.localStorage.getItem(STORAGE_KEY);
  if (!stringJson) return DEFAULT_GAME_STATE();
  return JSON.parse(stringJson);
};

export const savedGameExists = (): boolean => {
  return window.localStorage.getItem(STORAGE_KEY) !== null;
};
