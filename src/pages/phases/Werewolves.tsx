import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList, { PlayerListProps } from '../../components/PlayerList';
import {
  aliveAndNotRoles,
  aliveAndIsRoles,
  selectedPlayers,
} from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';

// TODO: Add any werewolves that wake up with normal werewolves here.
export const WEREWOLVES = [
  RoleIDs.Werewolf,
  RoleIDs.BigBadWolf,
  RoleIDs.WhiteWerewolf,
];

const Werewolves: FC = () => {
  const { killPlayers, players, nextPhase } = useGame();

  const handleSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    killPlayers(selectedPlayers(interactablePlayers), RoleIDs.Werewolf);
    nextPhase();
  };

  const killablePlayers = aliveAndNotRoles(players, WEREWOLVES);

  return (
    <PageColor color={RoleIDs.BigBadWolf}>
      <Typography component="h1" variant="h3">
        Alive Werewolves:
      </Typography>
      <PlayerList players={aliveAndIsRoles(players, WEREWOLVES)} />
      <Typography component="h1" variant="h3">
        Who would the werewolves like to kill?
      </Typography>
      {killablePlayers.length < 1 && (
        <Typography>
          No characters remaining for the werewolves to kill. Click "Continue"
          to proceed.
        </Typography>
      )}
      <PlayerList
        players={killablePlayers}
        maxSelectable={1}
        minSelectable={killablePlayers.length ? 1 : 0}
        selectable
        onSubmit={handleSubmit}
        submitText={killablePlayers.length ? 'Kill Players' : 'Continue'}
      />
    </PageColor>
  );
};

export default Werewolves;
