import { makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import { Player } from '../hooks/useGame';
import { getRoleText } from '../text';
import PlayerModal from './PlayerModal';

interface PlayerInfoProps {
  player: Player;
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  startText: {
    paddingBottom: '0 !important',
  },
  endText: {
    paddingTop: '0 !important',
  },
}));

const PlayerInfo: FC<PlayerInfoProps> = ({ player, onClose, open }) => {
  const classes = useStyles();

  const showDeath = () => {
    if (player.causeOfDeath !== null) {
      return (
        <>
          <Typography variant="h6" className={classes.startText}>
            Cause of Death:
          </Typography>
          <Typography className={classes.endText}>
            {getRoleText(player.causeOfDeath).causeOfDeath}
          </Typography>
        </>
      );
    }
  };

  return (
    <PlayerModal
      open={open}
      onClose={onClose}
      themeID={player.role.id}
      appBarText={player.name}
      header={getRoleText(player.role.id).displayName}
    >
      {showDeath()}
    </PlayerModal>
  );
};

export default PlayerInfo;
