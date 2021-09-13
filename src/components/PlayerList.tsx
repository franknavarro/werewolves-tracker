import { Button, Container, List, makeStyles } from '@material-ui/core';
import { FC, useCallback, useState } from 'react';
import {
  InteractablePlayer,
  useInteractablePlayers,
} from '../hooks/useInteractablePlayers';
import { Player, PlayerID } from '../hooks/useGame';
import PlayerInfo from './PlayerInfo';
import PlayerItem from './PlayerItem';

export interface PlayerListProps {
  players: Player[];
  showDeathIcon?: boolean;
  showSavedIcon?: boolean;
  selectable?: boolean;
  maxSelectable?: number;
  minSelectable?: number;
  showPlayerInfo?: boolean;
  disabledPlayers?: PlayerID[];
  showCounter?: boolean;
  onSubmit?: (interactablePlayers: InteractablePlayer[]) => void;
}

const useStyles = makeStyles({
  list: {
    padding: 0,
  },
});

const PlayerList: FC<PlayerListProps> = ({
  players,
  maxSelectable = 1,
  minSelectable = 0,
  selectable = false,
  showPlayerInfo = false,
  showDeathIcon,
  showSavedIcon,
  showCounter,
  onSubmit,
  disabledPlayers = [],
}) => {
  const classes = useStyles();
  const {
    interactablePlayers,
    setCounterForID,
    toggleSelected,
  } = useInteractablePlayers(players);
  const [showPlayer, setShowPlayer] = useState<Player>(players[0]);
  const [isInfoShown, setIsInfoShown] = useState<boolean>(false);

  const updateShowPlayer = useCallback((player: Player) => {
    setShowPlayer(player);
    setIsInfoShown(true);
  }, []);

  const handleClick = useCallback(
    (playerID: PlayerID) => {
      if (selectable) {
        toggleSelected(playerID);
      } else if (showPlayerInfo) {
        const player = players.find((player) => player.id === playerID);
        if (player) {
          updateShowPlayer(player);
        }
      }
    },
    [selectable, toggleSelected, showPlayerInfo, players, updateShowPlayer],
  );

  const handleShowPlayerInfo = useCallback(
    (player: Player) => {
      updateShowPlayer(player);
    },
    [updateShowPlayer],
  );

  const amountSelected = interactablePlayers.filter((player) => player.selected)
    .length;

  return (
    <>
      <List className={classes.list}>
        {players.map((player) => {
          const playerState = interactablePlayers.find(
            (counter) => counter.id === player.id,
          );
          return (
            <PlayerItem
              key={player.id}
              player={player}
              disabled={
                selectable &&
                ((!playerState?.selected && amountSelected === maxSelectable) ||
                  disabledPlayers.includes(player.id))
              }
              showDeathIcon={showDeathIcon}
              showSavedIcon={showSavedIcon}
              selectable={selectable}
              onClick={() => handleClick(player.id)}
              checked={playerState?.selected}
              showPlayerInfo={showPlayerInfo}
              showCounter={showCounter}
              counterValue={playerState?.value || 0}
              updateCounter={(value) => {
                if (Number(value) <= players.length) {
                  setCounterForID(player.id, value);
                }
              }}
              onShowPlayerInfo={() => handleShowPlayerInfo(player)}
            />
          );
        })}
      </List>
      {onSubmit && (
        <Container>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            disabled={
              amountSelected < minSelectable ||
              (showCounter &&
                !interactablePlayers.some((p) => p.value && p.selected))
            }
            onClick={() => onSubmit(interactablePlayers)}
          >
            Next
          </Button>
        </Container>
      )}
      {showPlayerInfo && (
        <PlayerInfo
          player={showPlayer}
          open={isInfoShown}
          onClose={() => setIsInfoShown(false)}
        />
      )}
    </>
  );
};

export default PlayerList;
