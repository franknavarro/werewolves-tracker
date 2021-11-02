import { FC } from 'react';
import { PlayerListProps } from '../../components/PlayerList';
import { aliveAndNotRoles, selectedPlayers } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';
import { getRoleText } from '../../text';
import WakeSleep from './WakeSleep';

const Fox: FC = () => {
  const { players, foxActive, foxFoundWerewolves } = useGame();

  const onSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    if (foxActive) {
      foxFoundWerewolves(selectedPlayers(interactablePlayers));
    }
  };

  const foxText = getRoleText(RoleIDs.Fox)?.actions;
  const foxTextIndex = foxActive ? 0 : 1;

  return (
    <WakeSleep
      roles={[RoleIDs.Fox]}
      actions={[
        {
          ...foxText?.[foxTextIndex],
          players: foxActive ? aliveAndNotRoles(players, [RoleIDs.Fox]) : [],
          maxSelectable: 3,
          selectable: true,
          onSubmit,
        },
      ]}
    />
  );
};

export default Fox;
