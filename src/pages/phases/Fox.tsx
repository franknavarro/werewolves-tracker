import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList, { PlayerListProps } from '../../components/PlayerList';
import { aliveAndNotRoles, selectedPlayers } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';

const Fox: FC = () => {
  const { players, foxActive, foxFoundWerewolves, nextPhase } = useGame();

  const handleSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    if (!foxActive) {
      nextPhase();
    } else {
      foxFoundWerewolves(selectedPlayers(interactablePlayers));
      nextPhase();
    }
  };

  return (
    <PageColor color={RoleIDs.Fox}>
      {foxActive ? (
        <>
          <Typography component="h1" variant="h3">
            Which 3 players is the Fox pointing towards?
          </Typography>
          <Typography>
            Before continuing reveal to fox wether any of the selected players
            is a werewolf or the fox may choose to pass in which case
            "Continue".
          </Typography>
        </>
      ) : (
        <>
          <Typography component="h1" variant="h3">
            Fox lost ability.
          </Typography>
          <Typography>Click "Continue" to proceed.</Typography>
        </>
      )}
      <PlayerList
        players={foxActive ? aliveAndNotRoles(players, [RoleIDs.Fox]) : []}
        maxSelectable={3}
        selectable
        onSubmit={handleSubmit}
        submitText={['Continue', 'Reveal Werewolf']}
      />
    </PageColor>
  );
};

export default Fox;
