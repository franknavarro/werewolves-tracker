import { FC } from 'react';
import { PlayerListProps } from '../../components/PlayerList';
import { aliveAndNotRoles, selectedPlayers } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';
import WakeSleep from './WakeSleep';

const Werewolves: FC = () => {
  const { killPlayers, ...gameState } = useGame();

  const onSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    killPlayers(selectedPlayers(interactablePlayers), RoleIDs.WhiteWerewolf);
  };

  return (
    <WakeSleep
      roles={[RoleIDs.WhiteWerewolf]}
      actions={[
        {
          players: aliveAndNotRoles(gameState, [RoleIDs.WhiteWerewolf]),
          maxSelectable: 1,
          minSelectable: 1,
          selectable: true,
          onSubmit,
        },
      ]}
    />
  );
};

export default Werewolves;
