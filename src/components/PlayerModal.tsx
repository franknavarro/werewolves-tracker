import {
  AppBar,
  Container,
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
import { AllRoleIDs } from '../hooks/roles';
import RoleSvg from './RoleSvg';

const useStyles = makeStyles<Theme, { themeID: AllRoleIDs }>((theme) => ({
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
    alignItems: 'center',
    backgroundColor: ({ themeID }) => theme[themeID].main,
    color: ({ themeID }) => theme[themeID].contrastText,
  },
  roleCardRoot: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 0,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    position: 'relative',
    minHeight: '200px',
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
  headerText: {
    paddingTop: theme.spacing(2),
  },
  subContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      textAlign: 'center',
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
  header?: string;
  open: boolean;
  onClose: () => void;
  themeID: AllRoleIDs;
}

const PlayerModal: FC<PlayerModalProps> = ({
  appBarText,
  children,
  header = '',
  onClose,
  open,
  themeID,
}) => {
  const classes = useStyles({ themeID });

  const HeaderText = () => (
    <Typography variant="h6" className={classes.headerText}>
      {header}
    </Typography>
  );

  return (
    <Dialog
      fullScreen
      open={open}
      TransitionComponent={Transition}
      classes={{ paper: classes.content }}
    >
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
      <div className={classes.roleCardRoot}>
        <div className={classes.roleCardContainer}>
          <RoleSvg role={themeID} />
        </div>
      </div>
      <Container className={classes.subContent}>
        {header && <HeaderText />}
        {children}
      </Container>
    </Dialog>
  );
};

export default PlayerModal;
