import { FC } from 'react';
import { PlayerListProps } from '../../components/PlayerList';
import {
  aliveAndNotRoles,
  charmedPlayers,
  selectedPlayers,
} from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';
import WakeSleep from './WakeSleep';

const Piper: FC = () => {
  const { charmPlayers, players } = useGame();

  const onSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    charmPlayers(selectedPlayers(interactablePlayers));
  };

  return (
    <WakeSleep
      roles={[RoleIDs.Piper]}
      actions={[
        {
          players: aliveAndNotRoles(players, [RoleIDs.Piper]),
          disabledPlayers: charmedPlayers(players),
          maxSelectable: 2,
          minSelectable: 1,
          selectable: true,
          onSubmit,
        },
      ]}
    />
  );
};

export default Piper;
