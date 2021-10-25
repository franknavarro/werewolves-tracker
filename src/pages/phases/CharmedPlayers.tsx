import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList, { PlayerListProps } from '../../components/PlayerList';
import { aliveAndCharmed, selectedPlayers } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';

const CharmedPlayers: FC = () => {
  const { charmPlayers, players, nextPhase } = useGame();

  const handleSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    charmPlayers(selectedPlayers(interactablePlayers));
    nextPhase();
  };

  return (
    <PageColor color={RoleIDs.Piper}>
      <Typography component="h1" variant="h3">
        Wake up the charmed players below.
      </Typography>
      <PlayerList players={aliveAndCharmed(players)} onSubmit={handleSubmit} />
    </PageColor>
  );
};

export default CharmedPlayers;
