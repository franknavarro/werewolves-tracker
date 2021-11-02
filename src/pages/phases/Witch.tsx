import { FC } from 'react';
import { PlayerListProps } from '../../components/PlayerList';
import {
  aliveAndNotRoles,
  selectedPlayers,
  tonightsWerewolfVictim,
} from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame, WitchPotionTypes } from '../../hooks/useGame';
import WakeSleep from './WakeSleep';

const Witch: FC = () => {
  const { players, witchUsedPotion, witchPotions } = useGame();

  const handleLifePotion: PlayerListProps['onSubmit'] = (
    interactablePlayers,
  ) => {
    witchUsedPotion(
      WitchPotionTypes.Life,
      selectedPlayers(interactablePlayers),
    );
  };

  const handleDeathPotion: PlayerListProps['onSubmit'] = (
    interactablePlayers,
  ) => {
    witchUsedPotion(
      WitchPotionTypes.Death,
      selectedPlayers(interactablePlayers),
    );
  };
  console.log({ witchPotions, players });

  return (
    <WakeSleep
      roles={[RoleIDs.Witch]}
      actions={[
        {
          players: witchPotions[WitchPotionTypes.Life]
            ? []
            : tonightsWerewolfVictim(players),
          maxSelectable: 1,
          selectable: true,
          onSubmit: handleLifePotion,
          hideSecondaryText: !witchPotions[WitchPotionTypes.Life],
        },
        {
          players: witchPotions[WitchPotionTypes.Death]
            ? []
            : aliveAndNotRoles(players, [RoleIDs.Witch]),
          maxSelectable: 1,
          selectable: true,
          onSubmit: handleDeathPotion,
          hideSecondaryText: !witchPotions[WitchPotionTypes.Death],
        },
      ]}
    />
  );
};

export default Witch;
