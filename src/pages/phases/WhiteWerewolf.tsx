import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList, { PlayerListProps } from '../../components/PlayerList';
import { aliveAndNotRoles, selectedPlayers } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';

const Werewolves: FC = () => {
  const { killPlayers, players, nextPhase } = useGame();

  const handleSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    killPlayers(selectedPlayers(interactablePlayers), RoleIDs.WhiteWerewolf);
    nextPhase();
  };

  return (
    <PageColor color={RoleIDs.BigBadWolf}>
      <Typography component="h1" variant="h3">
        Who would the White Werewolf like to kill?
      </Typography>
      <PlayerList
        players={aliveAndNotRoles(players, [RoleIDs.WhiteWerewolf])}
        maxSelectable={1}
        minSelectable={1}
        selectable
        onSubmit={handleSubmit}
        submitText="Kill Player"
      />
    </PageColor>
  );
};

export default Werewolves;
