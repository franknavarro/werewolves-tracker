import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList, { PlayerListProps } from '../../components/PlayerList';
import { aliveAndCharmed } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';

const CharmedPlayers: FC = () => {
  const { players, nextPhase } = useGame();

  const handleSubmit: PlayerListProps['onSubmit'] = () => {
    nextPhase();
  };

  return (
    <PageColor color={RoleIDs.Piper}>
      <Typography component="h1" variant="h3">
        Wake up the charmed players below.
      </Typography>
      <PlayerList
        players={aliveAndCharmed(players)}
        onSubmit={handleSubmit}
        submitText="Go To Sleep"
      />
    </PageColor>
  );
};

export default CharmedPlayers;
