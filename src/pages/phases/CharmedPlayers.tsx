import { FC } from 'react';
import { aliveAndCharmed } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';
import WakeSleep from './WakeSleep';

const CharmedPlayers: FC = () => {
  const { players } = useGame();

  return (
    <WakeSleep
      roles={[RoleIDs.Piper]}
      wakePlayers={aliveAndCharmed(players)}
      wakeText="Wake up the charmed players below."
      actions={[
        {
          primaryText: '',
          secondaryText: '',
          submitText: 'Go to sleep',
        },
      ]}
    />
  );
};

export default CharmedPlayers;
