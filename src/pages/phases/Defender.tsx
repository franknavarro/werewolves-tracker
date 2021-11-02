import { FC } from 'react';
import { PlayerListProps } from '../../components/PlayerList';
import {
  alive,
  selectedPlayers,
  undefendablePlayers,
} from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';
import WakeSleep from './WakeSleep';

const Defender: FC = () => {
  const { players, defendPlayer } = useGame();

  const onSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    const players = selectedPlayers(interactablePlayers);
    if (players.length >= 1) {
      defendPlayer(players[0]);
    }
  };

  return (
    <WakeSleep
      roles={[RoleIDs.Defender]}
      actions={[
        {
          players: alive(players),
          disabledPlayers: undefendablePlayers(players),
          selectable: true,
          minSelectable: 1,
          maxSelectable: 1,
          onSubmit,
        },
      ]}
    />
  );
};

export default Defender;
