import {
  AppBar,
  Dialog,
  IconButton,
  makeStyles,
  Slide,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { Close } from '@material-ui/icons';
import { FC, forwardRef, ReactElement, Ref } from 'react';
import { Player } from '../hooks/useGame';
import { getRoleText } from '../text';
import RoleSvg from './RoleSvg';

interface PlayerInfoProps {
  player: Player;
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles<Theme, Pick<PlayerInfoProps, 'player'>>(
  (theme) => ({
    roleCardRoot: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      width: '90%',
      padding: 0,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    roleCardContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      '& > img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    appBar: {
      backgroundColor: ({ player }) => theme[player.role.id].main,
      color: ({ player }) => theme[player.role.id].contrastText,
      position: 'relative',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: ({ player }) => theme[player.role.id].main,
      color: ({ player }) => theme[player.role.id].contrastText,
      '& > *:not(:first-child)': {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
    },
    startText: {
      paddingBottom: '0 !important',
    },
    endText: {
      paddingTop: '0 !important',
    },
  }),
);

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PlayerInfo: FC<PlayerInfoProps> = ({ player, onClose, open }) => {
  const classes = useStyles({ player });

  const showDeath = () => {
    if (player.causeOfDeath !== null) {
      return (
        <>
          <Typography variant="h6" className={classes.startText}>
            Cause of Death:
          </Typography>
          <Typography className={classes.endText}>
            {getRoleText(player.causeOfDeath).displayName}
          </Typography>
        </>
      );
    }
  };

  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {player.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <div className={classes.roleCardRoot}>
          <div className={classes.roleCardContainer}>
            <RoleSvg role={player.role.id} />
          </div>
        </div>
        <Typography variant="h6">
          {getRoleText(player.role.id).displayName}
        </Typography>
        {showDeath()}
      </div>
    </Dialog>
  );
};

export default PlayerInfo;
