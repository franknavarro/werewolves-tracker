import { Button, Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList from '../../components/PlayerList';
import { RoleIDs } from '../../hooks/roles';
import { Player, useGame } from '../../hooks/useGame';

interface SumaryProps {
  dead: Player[];
  saved?: Player[];
  theme: RoleIDs;
  title: string;
}

const NightSummary: FC<SumaryProps> = ({ dead, saved = [], theme, title }) => {
  const { nextPhase } = useGame();

  const DeadPlayers = () => {
    if (dead.length === 0) {
      return (
        <Typography component="h2" variant="h4">
          No one died.
        </Typography>
      );
    }
    return (
      <>
        <Typography component="h2" variant="h4">
          Dead Characters:
        </Typography>
        <PlayerList players={dead} showDeathIcon showPlayerInfo />
      </>
    );
  };

  const SavedPlayers = () => {
    if (saved.length > 0) {
      return (
        <>
          <Typography component="h2" variant="h4">
            Saved Characters:
          </Typography>
          <PlayerList players={saved} showSavedIcon showPlayerInfo />
        </>
      );
    }
    return <></>;
  };

  return (
    <PageColor color={theme}>
      <Typography component="h2" variant="h3">
        {title}
      </Typography>
      <DeadPlayers />
      <SavedPlayers />
      <Button
        color="secondary"
        fullWidth
        variant="contained"
        onClick={() => nextPhase()}
      >
        Continue
      </Button>
    </PageColor>
  );
};

export default NightSummary;
