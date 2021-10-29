import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList, { PlayerListProps } from '../../components/PlayerList';
import { selectedPlayers } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';

const Cupid: FC = () => {
  const { players, marryPlayers, nextPhase } = useGame();

  const handleSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    marryPlayers(selectedPlayers(interactablePlayers));
    nextPhase();
  };

  return (
    <PageColor color={RoleIDs.Cupid}>
      <Typography component="h1" variant="h3">
        Who would Cupid like to marry?
      </Typography>
      <PlayerList
        players={players}
        maxSelectable={2}
        minSelectable={2}
        selectable
        showPlayerInfo
        onSubmit={handleSubmit}
        submitText="Marry Players"
      />
    </PageColor>
  );
};

export default Cupid;
