import clsx from 'clsx';
import { Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { FC } from 'react';
import { Role } from '../hooks/roles';
import RoleSvg from './RoleSvg';

interface RoleCardProps {
  role: Role;
  onClick: () => void;
  selected: boolean;
  disabled: boolean;
}

const baseBoxSadow =
  '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)';
const useStyles = makeStyles<Theme, Pick<RoleCardProps, 'role'>>((theme) => ({
  role: {
    aspectRatio: '1',
  },
  roleCard: {
    '& > img': {
      width: '100%',
    },
    position: 'relative',
    width: '100%',
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transitionProperty: 'all',
    cursor: 'pointer',
    boxShadow: baseBoxSadow,
    backgroundColor: ({ role }) => theme[role.id].main,
    color: ({ role }) => theme[role.id].contrastText,
    '&:hover': {
      backgroundColor: ({ role }) => theme[role.id].dark,
      boxShadow:
        '0px 5px 6px -3px rgb(0 0 0 / 20%), 0px 9px 12px 1px rgb(0 0 0 / 14%), 0px 3px 16px 2px rgb(0 0 0 / 12%)',
    },
  },
  selectedBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: ({ role }) => theme[role.id].dark,
    opacity: 0.9,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 300ms ease-out',
  },
}));

const useHide = makeStyles((theme) => ({
  hide: {
    opacity: 0,
  },
  disabled: {
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.text.disabled,
    cursor: 'inherit',
    '&:hover': {
      backgroundColor: theme.palette.action.disabled,
      boxShadow: baseBoxSadow,
    },
  },
}));

const RoleCard: FC<RoleCardProps> = ({ role, onClick, disabled, selected }) => {
  const classes = useStyles({ role });
  const hideClasses = useHide();

  return (
    <Grid item xs={6} sm={4} md={3} className={classes.role}>
      <Paper
        className={clsx(classes.roleCard, disabled && hideClasses.disabled)}
        onClick={onClick}
      >
        <RoleSvg role={role.id} />
        <span
          className={clsx(
            !selected && hideClasses.hide,
            disabled && hideClasses.disabled,
            classes.selectedBox,
          )}
        >
          <CheckCircleIcon fontSize="large" />
        </span>
      </Paper>
    </Grid>
  );
};

export default RoleCard;
