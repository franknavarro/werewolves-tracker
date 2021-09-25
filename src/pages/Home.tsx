import { Button, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageColor from '../components/PageColor';
import { savedGameExists } from '../hooks/gameReducer/localStorage';
import { useGame } from '../hooks/useGame';

const useStyles = makeStyles((theme) => ({
  headerText: {
    marginBottom: theme.spacing(3),
  },
}));

const Home: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { resetGame } = useGame();

  const newGame = () => {
    resetGame();
    history.push('/play');
  };

  return (
    <PageColor color="primary">
      <Typography variant="h3" className={classes.headerText}>
        Werewolves
      </Typography>
      <Button color="secondary" variant="contained" fullWidth onClick={newGame}>
        New Game
      </Button>
      {savedGameExists() && (
        <Button
          component={Link}
          to="/play"
          color="secondary"
          variant="contained"
          fullWidth
        >
          Resume Game
        </Button>
      )}
      <Button
        component={Link}
        to="/roles"
        color="secondary"
        variant="contained"
        fullWidth
      >
        Role Descriptions
      </Button>
    </PageColor>
  );
};

export default Home;
