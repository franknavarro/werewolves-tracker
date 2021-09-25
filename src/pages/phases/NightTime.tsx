import { Button, Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import { useGame } from '../../hooks/useGame';

const NightTime: FC = () => {
  const { nextPhase } = useGame();
  return (
    <PageColor color="primary">
      <Typography component="h1" variant="h3">
        Night Time!
      </Typography>
      <Typography component="h2" variant="h4">
        Everyone must fall asleep.
      </Typography>
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

export default NightTime;
