import { GameActionTypes, Reducer } from '.';
import { WEREWOLVES } from '../../pages/phases/Werewolves';
import { RoleIDs } from '../roles';
import { Player, PlayerID } from '../useGame';
import { savePlayer } from './savePlayers';

export type KillPlayersAction = {
  type: GameActionTypes.KillPlayers;
  playerIDs: PlayerID[];
  cause: RoleIDs;
};

const killPlayer = (player: Player, causeOfDeath: RoleIDs) => {
  return { ...player, causeOfDeath, diedTonight: true };
};

export const killPlayers: Reducer<KillPlayersAction> = (state, action) => {
  let brokenHeartDeath = false;

  let playersWithDeath = state.players.map((player) => {
    if (action.playerIDs.includes(player.id)) {
      // Save player from werewolves if defended
      if (
        player.defended &&
        player.role.id !== RoleIDs.LittleGirl &&
        WEREWOLVES.includes(action.cause)
      ) {
        return savePlayer(player, RoleIDs.Defender);
      }

      if (player.isInLove) brokenHeartDeath = true;
      return killPlayer(player, action.cause);
    }
    return player;
  });

  if (brokenHeartDeath) {
    playersWithDeath = playersWithDeath.map((player) => {
      if (player.isInLove && !player.causeOfDeath) {
        return killPlayer(player, RoleIDs.Cupid);
      }
      return player;
    });
  }

  return {
    ...state,
    players: playersWithDeath,
  };
};
