import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../components/PageColor';
import PlayerList, { PlayerListProps } from '../components/PlayerList';
import { alive } from '../helpers/filterPlayers';
import { RoleIDs } from '../hooks/roles';
import { useGame } from '../hooks/useGame';

const TownVote: FC = () => {
  const { killPlayers, players, nextPhase } = useGame();

  const handleSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    const selectedPlayers = interactablePlayers.filter((p) => p.selected);
    if (selectedPlayers.length === 1) {
      killPlayers([selectedPlayers[0].id], RoleIDs.Villager);
    } else {
      selectedPlayers.sort((a, b) => b.value - a.value);
      if (selectedPlayers[0].value !== selectedPlayers[1].value) {
        killPlayers([selectedPlayers[0].id], RoleIDs.Villager);
      }
    }
    nextPhase();
  };

  return (
    <PageColor color={RoleIDs.Villager}>
      <Typography component="h1" variant="h3">
        Town Discussion
      </Typography>
      <PlayerList
        players={alive(players)}
        minSelectable={1}
        maxSelectable={players.length}
        selectable
        showCounter
        onSubmit={handleSubmit}
      />
    </PageColor>
  );
};

export default TownVote;
