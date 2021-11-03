import { FC } from 'react';
import { PlayerListProps } from '../../components/PlayerList';
import { aliveAndNotRoles, selectedPlayers } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';
import WakeSleep from './WakeSleep';

// TODO: Add any werewolves that wake up with normal werewolves here.
export const WEREWOLVES = [
  RoleIDs.Werewolf,
  RoleIDs.BigBadWolf,
  RoleIDs.WhiteWerewolf,
];

const Werewolves: FC = () => {
  const { killPlayers, ...gameState } = useGame();

  const onSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    killPlayers(selectedPlayers(interactablePlayers), RoleIDs.Werewolf);
  };

  const killablePlayers = aliveAndNotRoles(gameState, WEREWOLVES);

  return (
    <WakeSleep
      roles={WEREWOLVES}
      actions={[
        {
          players: killablePlayers,
          maxSelectable: 1,
          minSelectable: killablePlayers.length ? 1 : 0,
          selectable: true,
          onSubmit,
          submitText: killablePlayers.length === 0 ? 'Continue' : '',
          hideSecondaryText: killablePlayers.length >= 1,
        },
      ]}
    />
  );
};

export default Werewolves;
