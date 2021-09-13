import { GameActionTypes, Reducer } from '.';
import { RoleIDs } from '../roles';
import { PlayerID, WitchPotionTypes } from '../useGame';
import { killPlayers } from './killPlayers';
import { savePlayers } from './savePlayers';

export type WitchUsedPotionAction = {
  type: GameActionTypes.WitchUsedPotion;
  potion: WitchPotionTypes;
  usedOn: PlayerID[];
};

export const witchUsedPotion: Reducer<WitchUsedPotionAction> = (
  state,
  action,
) => {
  if (action.usedOn.length === 0) return state;

  const newWitchPotions = { ...state.witchPotions };

  switch (action.potion) {
    case WitchPotionTypes.Life:
      newWitchPotions[WitchPotionTypes.Life] = true;
      return savePlayers(
        { ...state, witchPotions: newWitchPotions },
        {
          type: GameActionTypes.SavePlayers,
          playerIDs: action.usedOn,
          savedBy: RoleIDs.Witch,
        },
      );

    case WitchPotionTypes.Death:
      newWitchPotions[WitchPotionTypes.Death] = true;
      return killPlayers(
        { ...state, witchPotions: newWitchPotions },
        {
          type: GameActionTypes.KillPlayers,
          playerIDs: action.usedOn,
          cause: RoleIDs.Witch,
        },
      );
  }
};
