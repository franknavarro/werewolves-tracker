import { FC } from 'react';
import { PlayerListProps } from '../../components/PlayerList';
import { selectedPlayers } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';
import WakeSleep from './WakeSleep';

const Cupid: FC = () => {
  const { players, marryPlayers } = useGame();

  const onSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    marryPlayers(selectedPlayers(interactablePlayers));
  };

  return (
    <WakeSleep
      roles={[RoleIDs.Cupid]}
      actions={[
        {
          players: players,
          maxSelectable: 2,
          minSelectable: 2,
          selectable: true,
          showPlayerInfo: true,
          onSubmit,
        },
      ]}
    />
  );
};

export default Cupid;
