import { Button, Typography } from '@material-ui/core';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import PageColor from '../../components/PageColor';
import { Classifications, Role, roleCards } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';
import { Alert } from '@material-ui/lab';
import RoleGrid from '../../components/RoleGrid';

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

      const players = selectedIndexes.reduce(
        (players, index) => {
          const role = { ...roleCards[index] };

          players.total += role.amount;
          players[role.classification] += role.amount;

          const roleIndex = players.roles.findIndex((r) => r.id === role.id);
          if (roleIndex === -1) {
            players.roles.push(role);
          } else {
            players.roles[roleIndex].amount++;
          }
          return players;
        },
        {
          [Classifications.Villager]: 0,
          [Classifications.Werewolf]: 0,
          [Classifications.Loner]: 0,
          total: 0,
          roles: [] as Role[],
        },
      );

      if (
        players[Classifications.Villager] > 0 &&
        players[Classifications.Loner] === 0 &&
        players[Classifications.Werewolf] === 0
      ) {
        setError('You need at least 1 werewolf or loner to play.');
        setDisabled(false);
        return;
      }

      if (
        players[Classifications.Loner] > 0 &&
        players[Classifications.Villager] === 0 &&
        players[Classifications.Werewolf] === 0
      ) {
        setError('You need at least 1 more werewolf or villager to play.');
        setDisabled(false);
        return;
      }

      if (
        players[Classifications.Werewolf] > 0 &&
        players[Classifications.Loner] === 0 &&
        players[Classifications.Villager] === 0
      ) {
        setError('You need at least 1 more villager or loner to play.');
        setDisabled(false);
        return;
      }

      addRoles(players.roles);
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
