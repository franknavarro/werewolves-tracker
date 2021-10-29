import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList from '../../components/PlayerList';
import { RoleIDs } from '../../hooks/roles';
import { aliveAndIsRoles } from '../../helpers/filterPlayers';
import { useGame } from '../../hooks/useGame';
import { getRoleText } from '../../text';

interface WakeSleepProps {
  roles: RoleIDs[];
}

const WakeSleep: FC<WakeSleepProps> = ({ roles, children }) => {
  const { players, nextPhase } = useGame();

  return (
    <PageColor color={roles[0]}>
      <Typography component="h1" variant="h3">
        {getRoleText(roles[0]).wakeUp}
      </Typography>
      {children}
      <PlayerList
        players={aliveAndIsRoles(players, roles)}
        onSubmit={() => nextPhase()}
        submitText="Go To Sleep"
      />
    </PageColor>
  );
};

export default WakeSleep;
