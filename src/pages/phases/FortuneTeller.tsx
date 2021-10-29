import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList from '../../components/PlayerList';
import { aliveAndNotRoles } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';

const FortuneTeller: FC = () => {
  const { players, nextPhase } = useGame();

  return (
    <PageColor color={RoleIDs.FortuneTeller}>
      <Typography variant="h3">
        Whose role would the fortune teller like to see?
      </Typography>
      <PlayerList
        players={aliveAndNotRoles(players, [RoleIDs.FortuneTeller])}
        showPlayerInfo
        onSubmit={() => nextPhase()}
        submitText="Go to Sleep"
      />
    </PageColor>
  );
};

export default FortuneTeller;
