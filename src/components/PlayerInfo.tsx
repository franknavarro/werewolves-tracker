import { makeStyles, Theme, Typography } from '@material-ui/core';
import { FC } from 'react';
import { Player } from '../hooks/useGame';
import { getRoleText } from '../text';
import PlayerModal from './PlayerModal';
import RoleSvg from './RoleSvg';

interface PlayerInfoProps {
  player: Player;
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles<Theme, Pick<PlayerInfoProps, 'player'>>(
  (theme) => ({
    roleCardRoot: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      width: '90%',
      padding: 0,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    roleCardContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      '& > img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    },
    startText: {
      paddingBottom: '0 !important',
    },
    endText: {
      paddingTop: '0 !important',
    },
  }),
);

const PlayerInfo: FC<PlayerInfoProps> = ({ player, onClose, open }) => {
  const classes = useStyles({ player });

  const showDeath = () => {
    if (player.causeOfDeath !== null) {
      return (
        <>
          <Typography variant="h6" className={classes.startText}>
            Cause of Death:
          </Typography>
          <Typography className={classes.endText}>
            {getRoleText(player.causeOfDeath).displayName}
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
    >
      <div className={classes.roleCardRoot}>
        <div className={classes.roleCardContainer}>
          <RoleSvg role={player.role.id} />
        </div>
      </div>
      <Typography variant="h6">
        {getRoleText(player.role.id).displayName}
      </Typography>
      {showDeath()}
    </PlayerModal>
  );
};

export default PlayerInfo;
