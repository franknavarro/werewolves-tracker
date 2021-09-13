import { useCallback, useState } from 'react';
import { Player, PlayerID } from './useGame';

export interface InteractablePlayer {
  id: PlayerID;
  selected: boolean;
  value: number;
}

export const useInteractablePlayers = (players: Player[]) => {
  const [interactablePlayers, setInteractablePlayers] = useState<
    InteractablePlayer[]
  >(players.map((player) => ({ id: player.id, value: 0, selected: false })));

  const setCounterForID = useCallback((id: PlayerID, value: number) => {
    setInteractablePlayers((prevCounters) => {
      const current = prevCounters.findIndex((counter) => counter.id === id);
      if (current === -1) return prevCounters;
      const newCounters = [...prevCounters];
      const counter = { ...newCounters[current], value };
      newCounters.splice(current, 1, counter);
      return newCounters;
    });
  }, []);

  const toggleSelected = useCallback((id: PlayerID) => {
    setInteractablePlayers((prevCounters) => {
      const current = prevCounters.findIndex((counter) => counter.id === id);
      if (current === -1) return prevCounters;
      const newCounters = [...prevCounters];
      const counter = {
        ...newCounters[current],
        selected: !newCounters[current].selected,
      };
      newCounters.splice(current, 1, counter);
      return newCounters;
    });
  }, []);

  return { interactablePlayers, setCounterForID, toggleSelected };
};
