import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList, { PlayerListProps } from '../../components/PlayerList';
import {
  aliveAndNotRoles,
  charmedPlayers,
  selectedPlayers,
} from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';

const Piper: FC = () => {
  const { charmPlayers, players, nextPhase } = useGame();

  const handleSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    charmPlayers(selectedPlayers(interactablePlayers));
    nextPhase();
  };

  return (
    <PageColor color={RoleIDs.Piper}>
      <Typography component="h1" variant="h3">
        Which 2 players would the piper like to charm?
      </Typography>
      <PlayerList
        players={aliveAndNotRoles(players, [RoleIDs.Piper])}
        disabledPlayers={charmedPlayers(players)}
        maxSelectable={2}
        minSelectable={1}
        selectable
        onSubmit={handleSubmit}
        submitText="Charm Players"
      />
    </PageColor>
  );
};

export default Piper;
