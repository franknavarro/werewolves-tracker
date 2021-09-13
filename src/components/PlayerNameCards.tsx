import {
  ListItem,
  ListItemIcon,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { ChangeEvent, FC } from 'react';
import { PlayerSetUp } from '../hooks/gameReducer/addPlayers';
import RoleSvg from './RoleSvg';

interface PlayerNameCardsProps {
  index: number;
  player: PlayerSetUp;
  maxLength: number;
  onChange: (value: string) => void;
}

const useStyles = makeStyles<Theme, Pick<PlayerNameCardsProps, 'player'>>(
  (theme) => ({
    roleIcon: {
      aspectRatio: '1',
      maxWidth: '50px',
      paddingRight: theme.spacing(2),
      '& > *': {
        width: '100%',
        height: '100%',
      },
    },
    playerCard: {
      backgroundColor: ({ player }) => theme[player.role.id].main,
      color: ({ player }) => theme[player.role.id].contrastText,
    },
    textField: {
      '& label.MuiFormLabel-root': {
        color: ({ player }) => theme[player.role.id].contrastText,
      },
      '& .MuiInputBase-root': {
        color: ({ player }) => theme[player.role.id].contrastText,
      },
      '& .MuiFilledInput-underline:before': {
        borderColor: ({ player }) =>
          alpha(theme[player.role.id].contrastText, 0.42),
      },
      '& .MuiFilledInput-underline:hover:before': {
        borderColor: ({ player }) =>
          alpha(theme[player.role.id].contrastText, 0.87),
      },
      '& .MuiFilledInput-colorSecondary.MuiFilledInput-underline:after': {
        borderBottomColor: ({ player }) => theme[player.role.id].contrastText,
      },
    },
  }),
);

const PlayerNameCards: FC<PlayerNameCardsProps> = ({
  onChange,
  player,
  index,
  maxLength,
}) => {
  const classes = useStyles({ player });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value.substring(0, maxLength));
  };

  return (
    <ListItem dense className={classes.playerCard}>
      <ListItemIcon className={classes.roleIcon}>
        <RoleSvg role={player.role.id} />
      </ListItemIcon>
      <TextField
        id={`player-${index}`}
        variant="filled"
        color="secondary"
        fullWidth
        label={`Player ${index + 1}`}
        value={player.name}
        onChange={handleChange}
        className={classes.textField}
      />
    </ListItem>
  );
};

export default PlayerNameCards;
