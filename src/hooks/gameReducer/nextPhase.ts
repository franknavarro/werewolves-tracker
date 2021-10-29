import { GameActionTypes, Reducer } from '.';
import {
  aliveAndIsRoles,
  hunterDiedTonight,
  playersDied,
  playersExist,
} from '../../helpers/filterPlayers';
import { WEREWOLVES } from '../../pages/phases/Werewolves';
import { RoleIDs } from '../roles';
import { GameState } from '../useGame';
import { checkWinConditions } from './checkWinConditions';

export enum Phases {
  Angel = 'Angel',
  NightTime = 'NightTime',
  Cupid = 'Cupid',
  FortuneTeller = 'FortuneTeller',
  Werewolves = 'Werewolves',
  BigBadWolf = 'BigBadWolf',
  Charmed = 'Charmed',
  Piper = 'Piper',
  Witch = 'Witch',
  Defender = 'Defender',
  TwoSisters = 'TwoSisters',
  ThreeBrothers = 'ThreeBrothers',
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
  nightTime: boolean;
};

export const PHASE_ORDER: PhaseInfo[] = [
  { id: Phases.Angel, firstNightOnly: true, nightTime: true },
  { id: Phases.NightTime, firstNightOnly: false, nightTime: true },
  { id: Phases.Cupid, firstNightOnly: true, nightTime: true },
  { id: Phases.FortuneTeller, firstNightOnly: false, nightTime: true },
  { id: Phases.TwoSisters, firstNightOnly: false, nightTime: true },
  { id: Phases.ThreeBrothers, firstNightOnly: false, nightTime: true },
  { id: Phases.Defender, firstNightOnly: false, nightTime: true },
  { id: Phases.Werewolves, firstNightOnly: false, nightTime: true },
  { id: Phases.BigBadWolf, firstNightOnly: false, nightTime: true },
  { id: Phases.Witch, firstNightOnly: false, nightTime: true },
  { id: Phases.Piper, firstNightOnly: false, nightTime: true },
  { id: Phases.Charmed, firstNightOnly: false, nightTime: true },
  { id: Phases.NightSummary, firstNightOnly: false, nightTime: true },
  { id: Phases.Hunter, firstNightOnly: false, nightTime: true },
  { id: Phases.HunterSummary, firstNightOnly: false, nightTime: true },
  { id: Phases.Win, firstNightOnly: false, nightTime: true },
  { id: Phases.TownVote, firstNightOnly: false, nightTime: false },
  { id: Phases.TownSummary, firstNightOnly: false, nightTime: false },
  { id: Phases.Hunter, firstNightOnly: false, nightTime: false },
  { id: Phases.HunterSummary, firstNightOnly: false, nightTime: false },
  { id: Phases.Win, firstNightOnly: false, nightTime: false },
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
    nightCount: state.nightCount + 1,
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

  if (phaseInfo.firstNightOnly && state.nightCount > 0) {
    return goToNextPhase();
  }

  switch (phaseInfo.id) {
    case Phases.Angel:
      if (
        state.dayCount === -1 &&
        playersExist(state.players, [RoleIDs.Angel])
      ) {
        const townVoteIndex = PHASE_ORDER.findIndex(
          (phase) => phase.id === Phases.TownVote,
        );
        return setPhase({ ...state, dayCount: 0 }, townVoteIndex);
      }
      return goToNextPhase();

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

    case Phases.Piper:
      if (!playersExist(state.players, [RoleIDs.Piper])) {
        return goToNextPhase();
      }
      return setPhase(state, phaseIndex);

    case Phases.TwoSisters:
      const aliveSisters = aliveAndIsRoles(state.players, [RoleIDs.TwoSisters]);
      if (aliveSisters.length > 1 && state.nightCount % 2 === 0) {
        return setPhase(state, phaseIndex);
      }
      return goToNextPhase();

    case Phases.ThreeBrothers:
      const aliveBrothers = aliveAndIsRoles(state.players, [
        RoleIDs.ThreeBrothers,
      ]);
      if (aliveBrothers.length > 1 && state.nightCount % 2 === 0) {
        return setPhase(state, phaseIndex);
      }
      return goToNextPhase();

    case Phases.Charmed:
      if (
        playersExist(state.players, [RoleIDs.Piper]) &&
        state.players.some((player) => player.charmed)
      ) {
        return setPhase(state, phaseIndex);
      }
      return goToNextPhase();

    case Phases.NightSummary:
      return setPhase(state, phaseIndex);

    case Phases.TownVote:
      return setPhase({ ...state, dayCount: state.dayCount + 1 }, phaseIndex);

    case Phases.TownSummary:
      const scapegoatVotes = state.players.some(
        (p) =>
          p.role.id === RoleIDs.Scapegoat &&
          p.diedTonight &&
          p.causeOfDeath === RoleIDs.Scapegoat,
      );
      return setPhase({ ...state, scapegoatVotes }, phaseIndex);

    case Phases.Hunter:
      if (!hunterDiedTonight(state.players)) return goToNextPhase(2);
      return setPhase(state, phaseIndex);

    case Phases.HunterSummary:
      return setPhase(resetHunter(state), phaseIndex);

    case Phases.Win:
      const winner = checkWinConditions(state, phaseInfo.nightTime);
      if (!winner) return goToNextPhase();
      return setPhase({ ...state, winner }, phaseIndex);
  }
};
