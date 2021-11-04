import { FC } from 'react';
import { PlayerListProps } from '../../components/PlayerList';
import { aliveAndIsRoles, selectedPlayers } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';
import WakeSleep from './WakeSleep';
import { WEREWOLVES } from './Werewolves';

const KnightWithRustySword: FC = () => {
  const { killPlayers, ...gameState } = useGame();

  const onSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    killPlayers(selectedPlayers(interactablePlayers), RoleIDs.KnightRustySword);
  };

  const killablePlayers = aliveAndIsRoles(gameState, WEREWOLVES);

  return (
    <WakeSleep
      roles={[RoleIDs.KnightRustySword]}
      noWake
      actions={[
        {
          players: killablePlayers,
          maxSelectable: 1,
          minSelectable: killablePlayers.length ? 1 : 0,
          selectable: true,
          onSubmit,
          hideSecondaryText: killablePlayers.length >= 1,
        },
      ]}
    />
  );
};

export default KnightWithRustySword;
