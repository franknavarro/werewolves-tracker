import { Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList, { PlayerListProps } from '../../components/PlayerList';
import { alive, selectedPlayers } from '../../helpers/filterPlayers';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';
import { getRoleText } from '../../text';

const Hunter: FC = () => {
  const { killPlayers, players, nextPhase } = useGame();

  const handleSubmit: PlayerListProps['onSubmit'] = (interactablePlayers) => {
    killPlayers(selectedPlayers(interactablePlayers), RoleIDs.Hunter);
    nextPhase();
  };

  const hunterText = getRoleText(RoleIDs.Hunter)?.actions?.[0];

  return (
    <PageColor color={RoleIDs.Hunter}>
      <Typography component="h1" variant="h3">
        {hunterText?.primaryText}
      </Typography>
      <PlayerList
        players={alive(players)}
        maxSelectable={1}
        minSelectable={1}
        selectable
        onSubmit={handleSubmit}
        submitText={hunterText?.submitText}
      />
    </PageColor>
  );
};

export default Hunter;
