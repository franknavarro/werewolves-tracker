import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import PageColor from '../components/PageColor';
import { Classifications, Role, roleCards } from '../hooks/roles';
import RoleCard from '../components/RoleCard';
import { useGame } from '../hooks/useGame';
import { Alert } from '@material-ui/lab';

const MIN_PLAYERS = 7;

const useStyles = makeStyles({
  roleGrid: {
    margin: 0,
    width: 'auto',
  },
});

const PickRoles: FC = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState<number[]>([]);
  const { addRoles } = useGame();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const alertRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (error && alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [error]);

  const addSelected = useCallback((index: number) => {
    setError('');
    setSelected((prev) => {
      const isSelected = prev.indexOf(index);
      if (isSelected === -1) return [...prev, index];

      const newSelected = [...prev];
      newSelected.splice(isSelected, 1);
      return newSelected;
    });
  }, []);

  const playWithSelectedRoles = () => {
    setDisabled(true);

    if (selected.length < MIN_PLAYERS) {
      setError(`At least ${MIN_PLAYERS} players are required to play.`);
      setDisabled(false);
      return;
    }

    const selectedRoles = roleCards.filter((_, index) =>
      selected.includes(index),
    );

    const roleAmounts = selectedRoles.reduce(
      (amounts, role) => {
        const newAmounts = { ...amounts };
        newAmounts[role.classification]++;
        return newAmounts;
      },
      {
        [Classifications.Villager]: 0,
        [Classifications.Werewolf]: 0,
      },
    );

    if (roleAmounts[Classifications.Villager] <= 0) {
      setError('You need at least 1 villager role to play.');
      setDisabled(false);
      return;
    }
    if (roleAmounts[Classifications.Werewolf] <= 0) {
      setError('You need at least 1 werewolf role to play.');
      setDisabled(false);
      return;
    }

    const finalRoles = selectedRoles.reduce<Role[]>((prevRoles, role) => {
      const newRole = { ...role };
      const roleExists = prevRoles.findIndex((r) => r.id === newRole.id);
      if (roleExists === -1) return [...prevRoles, newRole];

      prevRoles[roleExists].amount++;
      return prevRoles;
    }, []);

    addRoles(finalRoles);
  };

  return (
    <PageColor color="primary">
      <Typography variant="h3" component="h1">
        Which roles would you like to play with?
      </Typography>
      {error && (
        <Alert variant="filled" severity="warning" ref={alertRef}>
          {error}
        </Alert>
      )}
      <Grid container spacing={2} className={classes.roleGrid}>
        {roleCards.map((role, index) => (
          <RoleCard
            key={index}
            role={role}
            selected={selected.includes(index)}
            disabled={disabled}
            onClick={() => !disabled && addSelected(index)}
          />
        ))}
      </Grid>
      <Button
        color="secondary"
        variant="contained"
        disabled={disabled}
        onClick={playWithSelectedRoles}
      >
        Next
      </Button>
    </PageColor>
  );
};

export default PickRoles;
