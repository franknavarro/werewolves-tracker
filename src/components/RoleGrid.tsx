import { Grid, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { Role } from '../hooks/roles';
import RoleCard from './RoleCard';

const useStyles = makeStyles({
  roleGrid: {
    margin: 0,
    width: 'auto',
  },
});

interface RoleGridProps {
  roles: Role[];
  onClick?: (index: number) => void;
  isSelected?: (index: number) => boolean;
  disabled?: boolean;
}

const RoleGrid: FC<RoleGridProps> = ({
  roles,
  onClick,
  isSelected,
  disabled = false,
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.roleGrid}>
      {roles.map((role, index) => (
        <RoleCard
          key={index}
          role={role}
          selected={!!(isSelected && isSelected(index))}
          disabled={disabled}
          onClick={() => onClick && onClick(index)}
        />
      ))}
    </Grid>
  );
};
export default RoleGrid;
