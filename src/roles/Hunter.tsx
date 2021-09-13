import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../components/PageColor';
import PlayerList, { PlayerListProps } from '../components/PlayerList';
import { alive, selectedPlayers } from '../helpers/filterPlayers';
import { RoleIDs } from '../hooks/roles';
import { useGame } from '../hooks/useGame';

const Hunter: FC = () => {
  const { killPlayers, players, nextPhase } = useGame();

  const handleSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    killPlayers(selectedPlayers(interactablePlayers), RoleIDs.Hunter);
    nextPhase();
  };

  return (
    <PageColor color={RoleIDs.Hunter}>
      <Typography component="h1" variant="h3">
        Who would the Hunter like to kill?
      </Typography>
      <PlayerList
        players={alive(players)}
        maxSelectable={1}
        minSelectable={1}
        selectable
        onSubmit={handleSubmit}
      />
    </PageColor>
  );
};

export default Hunter;
