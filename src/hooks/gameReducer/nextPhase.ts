import { GameActionTypes, Reducer } from '.';
import {
  hunterDiedTonight,
  playersDied,
  playersExist,
} from '../../helpers/filterPlayers';
import { WEREWOLVES } from '../../pages/phases/Werewolves';
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
  phaseIndex?: number;
};

type PhaseInfo = {
  id: Phases;
  firstNightOnly: boolean;
};

export const PHASE_ORDER: PhaseInfo[] = [
  { id: Phases.NightTime, firstNightOnly: false },
  { id: Phases.Cupid, firstNightOnly: true },
  { id: Phases.FortuneTeller, firstNightOnly: false },
  { id: Phases.Defender, firstNightOnly: false },
  { id: Phases.Werewolves, firstNightOnly: false },
  { id: Phases.BigBadWolf, firstNightOnly: false },
  { id: Phases.Witch, firstNightOnly: false },
  { id: Phases.NightSummary, firstNightOnly: false },
  { id: Phases.Hunter, firstNightOnly: false },
  { id: Phases.HunterSummary, firstNightOnly: false },
  { id: Phases.Win, firstNightOnly: false },
  { id: Phases.TownVote, firstNightOnly: false },
  { id: Phases.TownSummary, firstNightOnly: false },
  { id: Phases.Hunter, firstNightOnly: false },
  { id: Phases.HunterSummary, firstNightOnly: false },
  { id: Phases.Win, firstNightOnly: false },
];

const setPhase = (
  state: GameState,
  phaseIndex: GameState['phaseIndex'],
): GameState => {
  return { ...state, phaseIndex };
};

const resetHunter = (state: GameState): GameState => {
  return {
    ...state,
    players: state.players.map((player) => {
      if (player.role.id === RoleIDs.Hunter) {
        return { ...player, diedTonight: false, savedBy: null };
      }
      return player;
    }),
  };
};

const resetNight = (state: GameState): GameState => {
  const defenderDead = playersDied(state.players, [RoleIDs.Defender], true);
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
  const phaseIndex = action.phaseIndex ?? state.phaseIndex + 1;

  // If at the end of the phase list cycle back to the begining.
  if (phaseIndex >= PHASE_ORDER.length) {
    return nextPhase(state, { type: GameActionTypes.NextPhase, phaseIndex: 0 });
  }

  const goToNextPhase = (jump: number = 1): GameState => {
    return nextPhase(state, {
      type: GameActionTypes.NextPhase,
      phaseIndex: phaseIndex + jump,
    });
  };

  const phaseInfo = PHASE_ORDER[phaseIndex];

  if (phaseInfo.firstNightOnly && !state.isFirstNight) {
    return goToNextPhase();
  }

  switch (phaseInfo.id) {
    case Phases.NightTime:
      return setPhase(resetNight(state), phaseIndex);

    case Phases.Cupid:
      if (!playersExist(state.players, [RoleIDs.Cupid])) {
        return goToNextPhase();
      }
      return setPhase(state, phaseIndex);

    case Phases.FortuneTeller:
      if (!playersExist(state.players, [RoleIDs.FortuneTeller])) {
        return goToNextPhase();
      }
      return setPhase(state, phaseIndex);

    case Phases.Defender:
      if (!playersExist(state.players, [RoleIDs.Defender])) {
        return goToNextPhase();
      }
      return setPhase(state, phaseIndex);

    case Phases.Werewolves:
      if (!playersExist(state.players, WEREWOLVES)) {
        return goToNextPhase();
      }
      return setPhase(state, phaseIndex);

    case Phases.BigBadWolf:
      if (
        !playersExist(state.players, [RoleIDs.BigBadWolf]) ||
        playersDied(state.players, [RoleIDs.Werewolf], false)
      ) {
        return goToNextPhase();
      }
      return setPhase(state, phaseIndex);

    case Phases.Witch:
      if (!playersExist(state.players, [RoleIDs.Witch])) {
        return goToNextPhase();
      }
      return setPhase(state, phaseIndex);

    case Phases.NightSummary:
      return setPhase(state, phaseIndex);

    case Phases.TownVote:
      return setPhase(state, phaseIndex);

    case Phases.TownSummary:
      return setPhase(state, phaseIndex);

    case Phases.Hunter:
      if (!hunterDiedTonight(state.players)) return goToNextPhase(2);
      return setPhase(state, phaseIndex);

    case Phases.HunterSummary:
      return setPhase(resetHunter(state), phaseIndex);

    case Phases.Win:
      const winner = checkWinConditions(state.players);
      if (!winner) return goToNextPhase();
      return setPhase({ ...state, winner }, phaseIndex);
  }
};
