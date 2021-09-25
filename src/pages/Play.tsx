import { FC, useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import AddPlayers from './phases/AddPlayers';
import PickRoles from './phases/PickRoles';
import {
  diedTonight,
  savedTonight,
  diedTonightAtTheHandsOf,
} from '../helpers/filterPlayers';
import { RoleIDs } from '../hooks/roles';
import NightTime from './phases/NightTime';
import Cupid from './phases/Cupid';
import FortuneTeller from './phases/FortuneTeller';
import Werewolves from './phases/Werewolves';
import Witch from './phases/Witch';
import NightSummary from './phases/NightSummary';
import Hunter from './phases/Hunter';
import TownVote from './phases/TownVote';
import Win from './phases/Win';
import { Phases, PHASE_ORDER } from '../hooks/gameReducer/nextPhase';
import Defender from './phases/Defender';
import BigBadWolf from './phases/BigBadWolf';

const Play: FC = () => {
  const state = useGame();
  const { players, roles, winner, phaseIndex } = state;

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, [players, roles, winner, phaseIndex]);

  const currentPhase = PHASE_ORDER[phaseIndex].id;

  if (!roles.length) {
    return <PickRoles />;
  }

  if (!players.length) {
    return <AddPlayers />;
  }

  switch (currentPhase) {
    case Phases.NightTime:
      return <NightTime />;
    case Phases.Cupid:
      return <Cupid />;
    case Phases.FortuneTeller:
      return <FortuneTeller />;
    case Phases.Defender:
      return <Defender />;
    case Phases.Werewolves:
      return <Werewolves />;
    case Phases.BigBadWolf:
      return <BigBadWolf />;
    case Phases.Witch:
      return <Witch />;
    case Phases.NightSummary:
      return (
        <NightSummary
          dead={diedTonight(players)}
          saved={savedTonight(players)}
          title="Night Summary"
          theme={RoleIDs.Werewolf}
        />
      );
    case Phases.Hunter:
      return <Hunter />;
    case Phases.HunterSummary:
      return (
        <NightSummary
          dead={diedTonightAtTheHandsOf(players, RoleIDs.Hunter)}
          title="Hunter Summary"
          theme={RoleIDs.Hunter}
        />
      );
    case Phases.TownVote:
      return <TownVote />;
    case Phases.TownSummary:
      return (
        <NightSummary
          dead={diedTonightAtTheHandsOf(players, RoleIDs.Villager)}
          title="Day Time Summary"
          theme={RoleIDs.Villager}
        />
      );
    case Phases.Win:
      if (winner) return <Win winner={winner} />;
  }
  return <NightTime />;
};

export default Play;
