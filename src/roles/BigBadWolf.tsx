import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../components/PageColor';
import PlayerList, { PlayerListProps } from '../components/PlayerList';
import { aliveAndNotRoles, selectedPlayers } from '../helpers/filterPlayers';
import { RoleIDs } from '../hooks/roles';
import { useGame } from '../hooks/useGame';

const BigBadWolf: FC = () => {
  const { killPlayers, players, nextPhase } = useGame();

  const handleSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    killPlayers(selectedPlayers(interactablePlayers), RoleIDs.BigBadWolf);
    nextPhase();
  };

  return (
    <PageColor color={RoleIDs.Werewolf}>
      <Typography component="h1" variant="h3">
        Who would the Big Bad Wolf like to kill?
      </Typography>
      <PlayerList
        players={aliveAndNotRoles(players, [
          RoleIDs.Werewolf,
          RoleIDs.BigBadWolf,
        ])}
        maxSelectable={1}
        minSelectable={1}
        selectable
        onSubmit={handleSubmit}
      />
    </PageColor>
  );
};

export default BigBadWolf;
