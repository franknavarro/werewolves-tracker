import { FC } from 'react';
import { PlayerListProps } from '../../components/PlayerList';
import { aliveAndNotRoles, selectedPlayers } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';
import WakeSleep from './WakeSleep';
import { WEREWOLVES } from './Werewolves';

const BigBadWolf: FC = () => {
  const { killPlayers, players } = useGame();

  const onSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    killPlayers(selectedPlayers(interactablePlayers), RoleIDs.BigBadWolf);
  };

  const killablePlayers = aliveAndNotRoles(players, WEREWOLVES);

  return (
    <WakeSleep
      roles={[RoleIDs.BigBadWolf]}
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

export default BigBadWolf;
