import { useCallback, useState } from 'react';
import { PlayerID } from './useGame';

export const useSelectablePlayers = () => {
  const [selected, setSelected] = useState<PlayerID[]>([]);

  const toggleSelected = useCallback((value: PlayerID) => {
    setSelected((prevSelected) => {
      const current = prevSelected.indexOf(value);
      const newSelected = [...prevSelected];

      if (current === -1) {
        newSelected.push(value);
      } else {
        newSelected.splice(current, 1);
      }
      return newSelected;
    });
  }, []);

  return { selected, toggleSelected };
};
