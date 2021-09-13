import { FC, useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import AddPlayers from './AddPlayers';
import PickRoles from './PickRoles';
import {
  diedTonight,
  savedTonight,
  diedTonightAtTheHandsOf,
} from '../helpers/filterPlayers';
import { RoleIDs } from '../hooks/roles';
import NightTime from '../roles/NightTime';
import Cupid from '../roles/Cupid';
import FortuneTeller from '../roles/FortuneTeller';
import Werewolves from '../roles/Werewolves';
import Witch from '../roles/Witch';
import NightSummary from '../roles/NightSummary';
import Hunter from '../roles/Hunter';
import TownVote from '../roles/TownVote';
import Win from '../roles/Win';
import { Phases } from '../hooks/gameReducer/nextPhase';
import Defender from '../roles/Defender';
import BigBadWolf from '../roles/BigBadWolf';

const Play: FC = () => {
  const state = useGame();
  const { players, roles, winner, currentPhase } = state;

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, [players, roles, winner, currentPhase]);

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
