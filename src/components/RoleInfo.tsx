import { makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import { Role } from '../hooks/roles';
import { getRoleText } from '../text';
import { CLASSIFICATION_TEXT } from '../text/english';
import PlayerModal from './PlayerModal';

const useStyles = makeStyles((theme) => ({
  text: {
    width: `calc(100% - ${theme.spacing(4)}px)`,
  },
}));

interface RoleInfoProps {
  role: Role;
  open: boolean;
  onClose: () => void;
}

const RoleInfo: FC<RoleInfoProps> = ({ role, onClose, open }) => {
  const classes = useStyles();
  const roleText = getRoleText(role.id);

  return (
    <PlayerModal
      open={open}
      onClose={onClose}
      themeID={role.id}
      appBarText={roleText.displayName}
      header={`Classifcation: ${CLASSIFICATION_TEXT[role.classification]}`}
    >
      {roleText.description.map((text) => (
        <Typography className={classes.text}>{text}</Typography>
      ))}
    </PlayerModal>
  );
};

export default RoleInfo;
