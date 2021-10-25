import { Button, Typography } from '@material-ui/core';
import { FC } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList from '../../components/PlayerList';
import { alive, dead } from '../../helpers/filterPlayers';
import { WinningRoles } from '../../hooks/gameReducer/checkWinConditions';
import { RoleIDs } from '../../hooks/roles';
import { useGame } from '../../hooks/useGame';

interface WinProps {
  winner: WinningRoles;
}

type WinColors = {
  [key in WinningRoles]: RoleIDs;
};
const WIN_COLORS: WinColors = {
  [WinningRoles.Lovers]: RoleIDs.Cupid,
  [WinningRoles.Villagers]: RoleIDs.Villager,
  [WinningRoles.Werewolves]: RoleIDs.Werewolf,
  [WinningRoles.Tie]: RoleIDs.Villager,
  [WinningRoles.Piper]: RoleIDs.Piper,
};

type WinText = {
  [key in WinningRoles]: string;
};
const WIN_TEXT: WinText = {
  [WinningRoles.Lovers]: 'The forbidden lovers have won.',
  [WinningRoles.Villagers]:
    'The villagers have successfully eliminated the werewolf threat.',
  [WinningRoles.Werewolves]: 'The werewolves have devoured the town.',
  [WinningRoles.Tie]: 'The town is no more. All players have died. Tied game.',
  [WinningRoles.Piper]: 'The town has been charmed by the piper.',
};

const Win: FC<WinProps> = ({ winner }) => {
  const { players, resetGame } = useGame();
  const alivePlayers = alive(players);

  const showAlivePlayers = () => {
    if (alivePlayers.length !== 0) {
      return (
        <>
          <Typography variant="h5">Survivors:</Typography>
          <PlayerList players={alivePlayers} showPlayerInfo />
        </>
      );
    }
  };

  return (
    <PageColor color={WIN_COLORS[winner]}>
      <Typography variant="h4">{WIN_TEXT[winner]}</Typography>
      {showAlivePlayers()}
      <Typography variant="h5">Dead:</Typography>
      <PlayerList players={dead(players)} showDeathIcon showPlayerInfo />
      <Button variant="contained" color="secondary" onClick={resetGame}>
        New Game
      </Button>
    </PageColor>
  );
};

export default Win;
