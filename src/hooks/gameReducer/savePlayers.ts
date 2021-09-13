import { GameActionTypes, Reducer } from '.';
import { RoleIDs } from '../roles';
import { Player, PlayerID } from '../useGame';

export type SavePlayersAction = {
  type: GameActionTypes.SavePlayers;
  playerIDs: PlayerID[];
  savedBy: RoleIDs;
};

export const savePlayer = (player: Player, savedBy: Player['savedBy']) => {
  return { ...player, savedBy, causeOfDeath: null, diedTonight: false };
};

export const savePlayers: Reducer<SavePlayersAction> = (state, action) => {
  let saveBrokenHeart = false;

  let playersNowSaved = state.players.map((player) => {
    if (action.playerIDs.includes(player.id)) {
      if (player.causeOfDeath !== RoleIDs.Cupid && player.isInLove) {
        saveBrokenHeart = true;
      }
      return savePlayer(player, action.savedBy);
    }
    return player;
  });

  if (saveBrokenHeart) {
    playersNowSaved = playersNowSaved.map((player) => {
      if (player.causeOfDeath === RoleIDs.Cupid) {
        return savePlayer(player, null);
      }
      return player;
    });
  }

  return {
    ...state,
    players: playersNowSaved,
  };
};
