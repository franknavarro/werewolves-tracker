import { FC, useEffect } from 'react';
import { Typography } from '@material-ui/core';
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
import Piper from './phases/Piper';
import CharmedPlayers from './phases/CharmedPlayers';

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
    case Phases.Piper:
      return <Piper />;
    case Phases.Charmed:
      return <CharmedPlayers />;
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
          dead={diedTonightAtTheHandsOf(players, [RoleIDs.Hunter])}
          title="Hunter Summary"
          theme={RoleIDs.Hunter}
        />
      );
    case Phases.TownVote:
      return <TownVote />;
    case Phases.TownSummary:
      const villageIdiotAlmostDied = players.find(
        (p) => p.savedBy === RoleIDs.VillageIdiot,
      );
      const deadCharacters = diedTonightAtTheHandsOf(players, [
        RoleIDs.Villager,
        RoleIDs.Scapegoat,
      ]);
      const scapegoatDied = deadCharacters.some(
        (p) =>
          p.role.id === RoleIDs.Scapegoat &&
          p.causeOfDeath === RoleIDs.Scapegoat,
      );
      return (
        <NightSummary
          dead={deadCharacters}
          saved={villageIdiotAlmostDied ? [villageIdiotAlmostDied] : []}
          title="Day Time Summary"
          theme={RoleIDs.Villager}
        >
          {scapegoatDied && (
            <Typography>
              The town vote has ended in a tie, so the scapegoat will die in
              place of the tie.
            </Typography>
          )}
          {villageIdiotAlmostDied && (
            <Typography>
              The town has voted to kill the village idiot. Reveal their
              identity to the town and spare the idiot.
            </Typography>
          )}
        </NightSummary>
      );
    case Phases.Win:
      if (winner) return <Win winner={winner} />;
  }
  return <NightTime />;
};

export default Play;
