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
import { RoleIDs } from '../hooks/roles';

const useStyles = makeStyles<Theme, { themeID: RoleIDs }>((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  appBar: {
    backgroundColor: ({ themeID }) => theme[themeID].main,
    color: ({ themeID }) => theme[themeID].contrastText,
    position: 'relative',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: ({ themeID }) => theme[themeID].main,
    color: ({ themeID }) => theme[themeID].contrastText,
    '& > *:not(:first-child)': {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PlayerModalProps {
  appBarText: string;
  open: boolean;
  onClose: () => void;
  themeID: RoleIDs;
}

const PlayerModal: FC<PlayerModalProps> = ({
  appBarText,
  children,
  onClose,
  open,
  themeID,
}) => {
  const classes = useStyles({ themeID });

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
            {appBarText}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>{children}</div>
    </Dialog>
  );
};

export default PlayerModal;
