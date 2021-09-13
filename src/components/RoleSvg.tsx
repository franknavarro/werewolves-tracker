import { FC } from 'react';
import { RoleIDs } from '../hooks/roles';
import BigBadWolfIcon from '../svgs/BigBadWolf.svg';
import CupidIcon from '../svgs/Cupid.svg';
import DefenderIcon from '../svgs/Defender.svg';
import FortuneTellerIcon from '../svgs/FortuneTeller.svg';
import HunterIcon from '../svgs/Hunter.svg';
import LittleGirlIcon from '../svgs/LittleGirl.svg';
import VillagerIcon from '../svgs/Villager.svg';
import WerewolfIcon from '../svgs/SimpleWerewolf.svg';
import WitchIcon from '../svgs/Witch.svg';

interface RoleSvgProps {
  role: RoleIDs;
}

type SvgPaths = {
  [key in RoleIDs]: string;
};
const SVG_PATHS: SvgPaths = {
  [RoleIDs.BigBadWolf]: BigBadWolfIcon,
  [RoleIDs.Cupid]: CupidIcon,
  [RoleIDs.Defender]: DefenderIcon,
  [RoleIDs.FortuneTeller]: FortuneTellerIcon,
  [RoleIDs.Hunter]: HunterIcon,
  [RoleIDs.LittleGirl]: LittleGirlIcon,
  [RoleIDs.Villager]: VillagerIcon,
  [RoleIDs.Werewolf]: WerewolfIcon,
  [RoleIDs.Witch]: WitchIcon,
};

const RoleSvg: FC<RoleSvgProps> = ({ role }) => {
  return <img src={SVG_PATHS[role]} alt="Test" />;
};

export default RoleSvg;
