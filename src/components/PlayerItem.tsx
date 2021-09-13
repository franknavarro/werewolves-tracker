import clsx from 'clsx';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Slide,
  TextField,
  Theme,
} from '@material-ui/core';
import { Add, Remove, Visibility } from '@material-ui/icons';
import { FC } from 'react';
import { Player } from '../hooks/useGame';
import CharacterIcon from '../components/CharacterIcon';
import { InteractablePlayer } from '../hooks/useInteractablePlayers';
import RoleSvg from './RoleSvg';

interface PlayerItemProps {
  player: Player;
  checked?: boolean;
  showDeathIcon?: boolean;
  showSavedIcon?: boolean;
  disabled?: boolean;
  selectable?: boolean;
  showPlayerInfo?: boolean;
  onShowPlayerInfo?: () => void;
  showCounter?: boolean;
  counterValue?: InteractablePlayer['value'];
  updateCounter?: (value: InteractablePlayer['value']) => void;
  onClick: () => void;
}

const useStyles = makeStyles<Theme, Pick<PlayerItemProps, 'player'>>(
  (theme) => ({
    playerItem: {
      '& > *': {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
    counterField: {
      '& label.MuiFormLabel-root': {
        color: ({ player }) => theme[player.role.id].contrastText,
      },
      '& .MuiInputBase-root': {
        color: ({ player }) => theme[player.role.id].contrastText,
      },
      '& .MuiOutlinedInput-root.Mui-disabled fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: ({ player }) => theme[player.role.id].contrastText,
      },
    },
    itemBackground: {
      display: 'flex',
      justifyContent: 'row',
      borderTop: '1px solid rgb(0, 0, 0, 0.25)',
      '&:last-child': {
        borderBottom: '1px solid rgb(0, 0, 0, 0.25)',
      },
      backgroundColor: ({ player }) => theme[player.role.id].main,
      color: ({ player }) => theme[player.role.id].contrastText,
    },
    itemText: {
      color: ({ player }) => theme[player.role.id].contrastText,
    },
    rootItem: {
      display: 'flex',
      '& .MuiCheckbox-root': {
        color: ({ player }) => theme[player.role.id].contrastText,
      },
    },
    checkboxSpacing: {
      marginRight: theme.spacing(3),
    },
    itemContainer: {
      display: 'flex',
      '& > *': {
        transition: 'all 300ms ease-in',
      },
    },
    roleIcon: {
      aspectRatio: '1',
      justifyContent: 'center',
      maxWidth: '50px',
      paddingLeft: 0,
      '& > img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    },
    playerActions: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'none',
    },
    counterPadding: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  }),
);

const PlayerItem: FC<PlayerItemProps> = ({
  player,
  onClick,
  checked,
  selectable,
  showDeathIcon,
  showSavedIcon,
  showPlayerInfo,
  onShowPlayerInfo,
  showCounter,
  counterValue = 0,
  updateCounter,
  disabled,
}) => {
  const classes = useStyles({ player });
  const labelId = `${player.name}-checkbox`;
  const counterVisible = checked && showCounter;
  const iconVisible = showPlayerInfo || showDeathIcon || showSavedIcon;

  const ShowIcon = () => {
    if (showDeathIcon) {
      return <CharacterIcon role={player.causeOfDeath} />;
    } else if (showSavedIcon) {
      return <CharacterIcon role={player.savedBy} save />;
    }
    return <Visibility />;
  };

  const showPlayerCounter = () => {
    return (
      <Slide in={counterVisible} direction="left" unmountOnExit>
        <ListItemSecondaryAction
          classes={{
            root: clsx(classes.playerActions, classes.counterPadding),
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="increase-counter"
            onClick={() => {
              if (updateCounter)
                updateCounter(counterValue === 0 ? 0 : counterValue - 1);
            }}
          >
            <Remove />
          </IconButton>
          <TextField
            value={counterValue}
            variant="outlined"
            disabled
            label="Vote"
            className={classes.counterField}
          />
          <IconButton
            edge="end"
            color="inherit"
            aria-label="increase-counter"
            onClick={() => {
              if (updateCounter) updateCounter(counterValue + 1);
            }}
          >
            <Add />
          </IconButton>
        </ListItemSecondaryAction>
      </Slide>
    );
  };

  return (
    <div className={classes.itemBackground}>
      <ListItem
        dense
        button
        onClick={onClick}
        className={classes.playerItem}
        disabled={disabled}
        classes={{
          root: clsx(
            classes.rootItem,
            selectable &&
              (counterVisible || iconVisible) &&
              classes.checkboxSpacing,
          ),
          container: classes.itemContainer,
        }}
      >
        <Slide in={!counterVisible} direction="right" unmountOnExit>
          <ListItemIcon className={classes.roleIcon}>
            <RoleSvg role={player.role.id} />
          </ListItemIcon>
        </Slide>
        <ListItemText id={labelId} primary={player.name} />
        {selectable && (
          <Checkbox
            edge="end"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        )}
        {iconVisible && !selectable && <ShowIcon />}
      </ListItem>
      {iconVisible && selectable && (
        <ListItemSecondaryAction
          classes={{
            root: classes.playerActions,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="show-player-info"
            onClick={onShowPlayerInfo}
          >
            <ShowIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
      {showPlayerCounter()}
    </div>
  );
};

export default PlayerItem;
