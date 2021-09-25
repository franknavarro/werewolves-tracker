import { Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList, { PlayerListProps } from '../../components/PlayerList';
import {
  aliveAndNotRoles,
  selectedPlayers,
  tonightsWerewolfVictim,
} from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame, WitchPotionTypes } from '../../hooks/useGame';

const Witch: FC = () => {
  const { nextPhase, players, witchUsedPotion, witchPotions } = useGame();
  const [askedForLifePotion, setAskedForLifePotion] = useState<boolean>(false);

  const handleLifePotion: PlayerListProps['onSubmit'] = (
    interactablePlayers,
  ) => {
    witchUsedPotion(
      WitchPotionTypes.Life,
      selectedPlayers(interactablePlayers),
    );
    setAskedForLifePotion(true);
  };

  const handleDeathPotion: PlayerListProps['onSubmit'] = (
    interactablePlayers,
  ) => {
    witchUsedPotion(
      WitchPotionTypes.Death,
      selectedPlayers(interactablePlayers),
    );
    nextPhase();
  };

  const AskForLifePotion = () => {
    return (
      <>
        <Typography component="h1" variant="h3">
          Would the witch like to save any of the following players?
        </Typography>
        {witchPotions[WitchPotionTypes.Life] && (
          <Typography>
            Witch already used life potion. Click "Next" to continue.
          </Typography>
        )}
        <PlayerList
          players={tonightsWerewolfVictim(players)}
          maxSelectable={witchPotions[WitchPotionTypes.Life] ? 0 : 1}
          selectable
          onSubmit={handleLifePotion}
        />
      </>
    );
  };

  const AskForDeathPotion = () => {
    return (
      <>
        <Typography component="h1" variant="h3">
          Would the witch like to kill any one?
        </Typography>
        {witchPotions[WitchPotionTypes.Death] && (
          <Typography>
            Witch already used death potion. Click "Next" to continue.
          </Typography>
        )}
        <PlayerList
          players={aliveAndNotRoles(players, [RoleIDs.Witch])}
          maxSelectable={witchPotions[WitchPotionTypes.Death] ? 0 : 1}
          selectable
          onSubmit={handleDeathPotion}
        />
      </>
    );
  };

  return (
    <PageColor color={RoleIDs.Witch}>
      {askedForLifePotion ? <AskForDeathPotion /> : <AskForLifePotion />}
    </PageColor>
  );
};

export default Witch;
