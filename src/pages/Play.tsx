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
import Fox from './phases/Fox';
import Werewolves from './phases/Werewolves';
import WhiteWerewolf from './phases/WhiteWerewolf';
import Witch from './phases/Witch';
import Summary from './phases/Summary';
import Hunter from './phases/Hunter';
import TownVote from './phases/TownVote';
import Win from './phases/Win';
import { Phases, PHASE_ORDER } from '../hooks/gameReducer/nextPhase';
import Defender from './phases/Defender';
import BigBadWolf from './phases/BigBadWolf';
import Piper from './phases/Piper';
import CharmedPlayers from './phases/CharmedPlayers';
import KnightWithRustySword from './phases/KnightWithRustySword';
import WakeSleep from './phases/WakeSleep';

const Play: FC = () => {
  const gameState = useGame();
  const { players, roles, winner, phaseIndex } = gameState;

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
    case Phases.Fox:
      return <Fox />;
    case Phases.Defender:
      return <Defender />;
    case Phases.Werewolves:
      return <Werewolves />;
    case Phases.WhiteWerewolf:
      return <WhiteWerewolf />;
    case Phases.BigBadWolf:
      return <BigBadWolf />;
    case Phases.Witch:
      return <Witch />;
    case Phases.Piper:
      return <Piper />;
    case Phases.Charmed:
      return <CharmedPlayers />;
    case Phases.ThreeBrothers:
      return <WakeSleep roles={[RoleIDs.ThreeBrothers]} />;
    case Phases.TwoSisters:
      return <WakeSleep roles={[RoleIDs.TwoSisters]} />;
    case Phases.KnightWithRustySword:
      return <KnightWithRustySword />;
    case Phases.NightSummary:
      return (
        <Summary
          dead={diedTonight(gameState)}
          saved={savedTonight(players)}
          title="Night Summary"
          theme={RoleIDs.Werewolf}
        >
          <Typography component="h4" variant="h4">
            Wake up town and reveal dead characters.
          </Typography>
        </Summary>
      );
    case Phases.Hunter:
      return <Hunter />;
    case Phases.HunterSummary:
      return (
        <Summary
          dead={diedTonightAtTheHandsOf(gameState, [RoleIDs.Hunter])}
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
      const deadCharacters = diedTonightAtTheHandsOf(gameState, [
        RoleIDs.Villager,
        RoleIDs.Scapegoat,
      ]);
      const scapegoatDied = deadCharacters.some(
        (p) =>
          p.role.id === RoleIDs.Scapegoat &&
          p.causeOfDeath === RoleIDs.Scapegoat,
      );
      return (
        <Summary
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
        </Summary>
      );
    case Phases.Win:
      if (winner) return <Win winner={winner} />;
  }

  return <div>Error</div>;
};

export default Play;
