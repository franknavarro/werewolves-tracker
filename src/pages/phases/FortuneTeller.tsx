import { FC } from 'react';
import { aliveAndNotRoles } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';
import WakeSleep from './WakeSleep';

const FortuneTeller: FC = () => {
  const { players } = useGame();

  return (
    <WakeSleep
      roles={[RoleIDs.FortuneTeller]}
      actions={[
        {
          players: aliveAndNotRoles(players, [RoleIDs.FortuneTeller]),
          showPlayerInfo: true,
        },
      ]}
    />
  );
};

export default FortuneTeller;
