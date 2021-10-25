import { Button, Typography } from '@material-ui/core';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import PageColor from '../../components/PageColor';
import { Classifications, Role, roleCards } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';
import { Alert } from '@material-ui/lab';
import RoleGrid from '../../components/RoleGrid';

const MIN_PLAYERS = 7;

const PickRoles: FC = () => {
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

  const playWithSelectedRoles = useCallback(
    (selectedIndexes: number[]) => {
      setDisabled(true);

      if (selectedIndexes.length < MIN_PLAYERS) {
        setError(`At least ${MIN_PLAYERS} players are required to play.`);
        setDisabled(false);
        return;
      }

      const selectedRoles = roleCards.filter((_, index) =>
        selectedIndexes.includes(index),
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
          [Classifications.Loner]: 0,
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
    },
    [addRoles],
  );

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
      <RoleGrid
        roles={roleCards}
        isSelected={(index) => selected.includes(index)}
        disabled={disabled}
        onClick={(index) => !disabled && addSelected(index)}
      />
      <Button
        color="secondary"
        variant="contained"
        disabled={disabled}
        onClick={() => playWithSelectedRoles(selected)}
      >
        Next
      </Button>
    </PageColor>
  );
};

export default PickRoles;
