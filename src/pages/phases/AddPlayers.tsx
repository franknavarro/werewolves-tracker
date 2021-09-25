import { Button, List, makeStyles, Typography } from '@material-ui/core';
import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import PageColor from '../../components/PageColor';
import PlayerNameCards from '../../components/PlayerNameCards';
import { PlayerSetUp } from '../../hooks/gameReducer/addPlayers';
import { useGame } from '../../hooks/useGame';

const MAX_CHARS_FOR_PLAYER_NAME = 20;

const useStyles = makeStyles((theme) => ({
  form: {
    margin: 0,
    padding: 0,
    '& > *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    '& > button': {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: `calc(100% - ${theme.spacing(4)}px)`,
    },
  },
  playerList: {
    padding: 0,
    marginTop: theme.spacing(4),
  },
}));

const AddPlayers: FC = () => {
  const classes = useStyles();
  const { roles, addPlayers } = useGame();
  const [disabled, setDisabled] = useState(true);
  const [allPlayers, updatePlayers] = useState<PlayerSetUp[]>(
    roles.reduce<PlayerSetUp[]>((pastPlayers, role) => {
      const playersPerRole = Array(role.amount)
        .fill(0)
        .map(() => ({ name: '', role }));
      return [...pastPlayers, ...playersPerRole];
    }, []),
  );

  useEffect(() => {
    setDisabled(allPlayers.some((player) => !player.name));
  }, [allPlayers]);

  const updatePlayerName = useCallback((name: string, index: number) => {
    updatePlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      newPlayers[index].name = name;
      return newPlayers;
    });
  }, []);

  const playWithPlayers = (e: SyntheticEvent) => {
    e.preventDefault();
    setDisabled(true);
    addPlayers(allPlayers);
  };

  return (
    <PageColor color="primary">
      <form onSubmit={playWithPlayers} className={classes.form}>
        <Typography variant="h3" component="h1">
          Who will be playing tonight?
        </Typography>
        <List className={classes.playerList}>
          {allPlayers.map((player, index) => (
            <PlayerNameCards
              player={player}
              index={index}
              key={index}
              onChange={(name) => updatePlayerName(name, index)}
              maxLength={MAX_CHARS_FOR_PLAYER_NAME}
            />
          ))}
        </List>
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          disabled={disabled}
          type="submit"
        >
          Next
        </Button>
      </form>
    </PageColor>
  );
};

export default AddPlayers;
