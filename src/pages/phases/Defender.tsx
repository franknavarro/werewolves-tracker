import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList, { PlayerListProps } from '../../components/PlayerList';
import {
  alive,
  selectedPlayers,
  undefendablePlayers,
} from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';

const Defender: FC = () => {
  const { players, nextPhase, defendPlayer } = useGame();

  const onSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    const players = selectedPlayers(interactablePlayers);
    if (players.length >= 1) {
      defendPlayer(players[0]);
    }
    nextPhase();
  };

  return (
    <PageColor color={RoleIDs.Defender}>
      <Typography variant="h3">
        Who is the Defender protecting tonight?
      </Typography>
      <PlayerList
        players={alive(players)}
        disabledPlayers={undefendablePlayers(players)}
        selectable
        minSelectable={1}
        maxSelectable={1}
        onSubmit={onSubmit}
        submitText="Protect Player"
      />
    </PageColor>
  );
};

export default Defender;
