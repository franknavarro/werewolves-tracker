import { GameActionTypes, Reducer } from '.';
import { hunterThatDiedTonight } from '../../helpers/filterPlayers';
import { WEREWOLVES } from '../../roles/Werewolves';
import { RoleIDs } from '../roles';
import { GameState } from '../useGame';
import { checkWinConditions } from './checkWinConditions';

export enum Phases {
  NightTime = 'NightTime',
  Cupid = 'Cupid',
  FortuneTeller = 'FortuneTeller',
  Werewolves = 'Werewolves',
  BigBadWolf = 'BigBadWolf',
  Witch = 'Witch',
  Defender = 'Defender',
  NightSummary = 'NightSummary',
  Hunter = 'Hunter',
  HunterSummary = 'HunterSummary',
  TownVote = 'TownVote',
  TownSummary = 'TownSummary',
  Win = 'Win',
}

export type NextPhaseAction = {
  type: GameActionTypes.NextPhase;
  phase?: Phases;
};

const setPhase = (state: GameState, phase: Phases): GameState => {
  return { ...state, previousPhase: state.currentPhase, currentPhase: phase };
};

const playersExist = (state: GameState, roles: RoleIDs[]): boolean => {
  return state.players.some((player) => {
    return (
      roles.includes(player.role.id) &&
      (player.causeOfDeath === null || player.diedTonight)
    );
  });
};

const playersDied = (
  state: GameState,
  roles: RoleIDs[],
  diedTonight: boolean,
): boolean => {
  return state.players.some((player) => {
    return (
      roles.includes(player.role.id) &&
      player.causeOfDeath !== null &&
      (diedTonight || !player.diedTonight)
    );
  });
};

const playersForPhase = (
  state: GameState,
  roles: RoleIDs[],
  phase: Phases,
): GameState => {
  if (playersExist(state, roles)) return setPhase(state, phase);

  return nextPhase(state, { type: GameActionTypes.NextPhase, phase });
};

const isHunterPhaseNext = (state: GameState): boolean => {
  if (
    state.currentPhase === Phases.Hunter ||
    state.currentPhase === Phases.HunterSummary
  ) {
    return false;
  }
  return hunterThatDiedTonight(state.players);
};

const RESET_NIGHT = (state: GameState): GameState => {
  const defenderDead = playersDied(state, [RoleIDs.Defender], true);
  return {
    ...state,
    isFirstNight: false,
    players: state.players.map((player) => ({
      ...player,
      defended: defenderDead ? false : player.defended,
      diedTonight: false,
      savedBy: null,
    })),
  };
};

export const nextPhase: Reducer<NextPhaseAction> = (state, action) => {
  const phase = action.phase || state.currentPhase;

  let winner = null;
  switch (phase) {
    // Night Phases
    case Phases.NightTime:
      if (state.isFirstNight) {
        return playersForPhase(
          RESET_NIGHT(state),
          [RoleIDs.Cupid],
          Phases.Cupid,
        );
      }
      return playersForPhase(
        RESET_NIGHT(state),
        [RoleIDs.FortuneTeller],
        Phases.FortuneTeller,
      );

    case Phases.Cupid:
      return playersForPhase(
        state,
        [RoleIDs.FortuneTeller],
        Phases.FortuneTeller,
      );

    case Phases.FortuneTeller:
      return playersForPhase(state, [RoleIDs.Defender], Phases.Defender);

    case Phases.Defender:
      return playersForPhase(state, WEREWOLVES, Phases.Werewolves);

    case Phases.Werewolves:
      // TODO: Add Wild Child and Wolf Hound once added
      if (
        !playersExist(state, [RoleIDs.BigBadWolf]) ||
        playersDied(state, [RoleIDs.Werewolf], false)
      ) {
        return nextPhase(state, {
          type: GameActionTypes.NextPhase,
          phase: Phases.BigBadWolf,
        });
      }
      return setPhase(state, Phases.BigBadWolf);

    case Phases.BigBadWolf:
      return playersForPhase(state, [RoleIDs.Witch], Phases.Witch);

    case Phases.Witch:
      return setPhase(state, Phases.NightSummary);

    // Day Phases
    case Phases.NightSummary:
      if (isHunterPhaseNext(state)) return setPhase(state, Phases.Hunter);
      winner = checkWinConditions(state.players);
      if (winner) return setPhase({ ...state, winner }, Phases.Win);
      return setPhase(state, Phases.TownVote);

    case Phases.TownVote:
      return setPhase(state, Phases.TownSummary);

    case Phases.TownSummary:
      if (isHunterPhaseNext(state)) return setPhase(state, Phases.Hunter);
      winner = checkWinConditions(state.players);
      if (winner) return setPhase({ ...state, winner }, Phases.Win);
      return setPhase(state, Phases.NightTime);

    // Out of Turn Phases
    case Phases.Hunter:
      return {
        ...state,
        currentPhase: Phases.HunterSummary,
        players: state.players.map((player) => {
          if (player.role.id === RoleIDs.Hunter) {
            return { ...player, diedTonight: false, savedBy: null };
          }
          return player;
        }),
      };
    case Phases.HunterSummary:
      return nextPhase(state, {
        type: GameActionTypes.NextPhase,
        phase: state.previousPhase || undefined,
      });
  }

  return state;
};
