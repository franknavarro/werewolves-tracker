import { Typography } from '@material-ui/core';
import { FC, useState } from 'react';
import PageColor from '../../components/PageColor';
import PlayerList, { PlayerListProps } from '../../components/PlayerList';
import { RoleIDs } from '../../hooks/roles';
import { aliveAndIsRoles } from '../../helpers/filterPlayers';
import { Player, useGame } from '../../hooks/useGame';
import { getRoleText } from '../../text';

interface Action extends Partial<PlayerListProps> {
  primaryText?: string;
  secondaryText?: string;
  hideSecondaryText?: boolean;
}

interface WakeSleepProps {
  actions?: Action[];
  roles: RoleIDs[];
  wakePlayers?: Player[];
  wakeText?: string;
}

const WakeSleep: FC<WakeSleepProps> = ({
  actions,
  roles,
  wakePlayers,
  wakeText,
}) => {
  const { players, nextPhase } = useGame();
  const [actionIndex, setAction] = useState(0);

  const roleText = getRoleText(roles[0]);
  const actionText = roleText?.actions?.[actionIndex];
  const { hideSecondaryText, ...action } = actions?.[actionIndex] || {};

  const handleNextAction: PlayerListProps['onSubmit'] = (
    interactablePlayers,
  ) => {
    if (action?.onSubmit) {
      action.onSubmit(interactablePlayers);
    }
    if (actionIndex < (actions?.length || 1) - 1) {
      setAction(actionIndex + 1);
    } else {
      nextPhase();
    }
  };

  const playerListProps: PlayerListProps = {
    players: [],
    ...action,
    onSubmit: handleNextAction,
    submitText: action?.submitText || actionText?.submitText || '',
  };

  const wakeTextPrimary = wakeText || roleText?.wakeUp;
  const wakePlayersPrimary = wakePlayers || aliveAndIsRoles(players, roles);

  const actionPrimaryText = action?.primaryText ?? actionText?.primaryText;
  const actionSecondaryText =
    action?.secondaryText ?? actionText?.secondaryText;

  return (
    <PageColor color={roles[0]}>
      {wakeTextPrimary && (
        <Typography component="h1" variant="h3">
          {wakeTextPrimary}
        </Typography>
      )}
      <PlayerList players={wakePlayersPrimary} />
      {actionPrimaryText && (
        <Typography component="h1" variant="h3">
          {actionPrimaryText}
        </Typography>
      )}
      {actionSecondaryText && !hideSecondaryText && (
        <Typography>{actionSecondaryText}</Typography>
      )}
      <PlayerList {...playerListProps} />
    </PageColor>
  );
};

export default WakeSleep;
