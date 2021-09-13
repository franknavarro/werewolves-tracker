import {
  GiBrokenHeart,
  GiDeathSkull,
  GiHealthPotion,
  GiMagicPotion,
  GiWolfHowl,
  GiCrosshair,
} from 'react-icons/gi';
import { FaHandSpock } from 'react-icons/fa';
import { IoHandRightSharp } from 'react-icons/io5';
import { FC } from 'react';
import { RoleIDs } from '../hooks/roles';
import { Accessibility } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

interface CharacterIconProps {
  role: RoleIDs | null;
  save?: boolean;
}

const CharacterIcon: FC<CharacterIconProps> = ({ role, save }) => {
  const Icon = () => {
    switch (role) {
      case RoleIDs.Cupid:
        return <GiBrokenHeart />;
      case RoleIDs.Hunter:
        return <GiCrosshair />;
      case RoleIDs.Werewolf:
      case RoleIDs.BigBadWolf:
        return <GiWolfHowl />;
      case RoleIDs.Witch:
        return save ? <GiHealthPotion /> : <GiMagicPotion />;
      case RoleIDs.Defender:
        return <FaHandSpock />;
      case RoleIDs.Villager:
        return <IoHandRightSharp />;
      default:
        return save ? <Accessibility /> : <GiDeathSkull />;
    }
  };
  return (
    <Typography variant="h4">
      <Icon />
    </Typography>
  );
};

export default CharacterIcon;
