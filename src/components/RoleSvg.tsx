import { FC } from 'react';
import {
  AllRoleIDs,
  FutureRoleIDs,
  RoleIDs,
  RoleIDsWithType,
} from '../hooks/roles';
import AccursedWolfFatherIcon from '../svgs/AccursedWolfFather.svg';
import ActorIcon from '../svgs/Actor.svg';
import AngelIcon from '../svgs/Angel.svg';
import BearTamerIcon from '../svgs/BearTamer.svg';
import BigBadWolfIcon from '../svgs/BigBadWolf.svg';
import CupidIcon from '../svgs/Cupid.svg';
import DefenderIcon from '../svgs/Defender.svg';
import DevotedServantIcon from '../svgs/DevotedServant.svg';
import ElderIcon from '../svgs/Elder.svg';
import FortuneTellerIcon from '../svgs/FortuneTeller.svg';
import FoxIcon from '../svgs/Fox.svg';
import GypsyIcon from '../svgs/Gypsy.svg';
import HunterIcon from '../svgs/Hunter.svg';
import KnightWithTheRustySwordIcon from '../svgs/KnightWithTheRustySword.svg';
import LittleGirlIcon from '../svgs/LittleGirl.svg';
import PiperIcon from '../svgs/Piper.svg';
import PrejudicedManipulatorIcon from '../svgs/PrejudicedManipulator.svg';
import PyromaniacIcon from '../svgs/Pyromaniac.svg';
import ScandalmongerIcon from '../svgs/Scandalmonger.svg';
import ScapegoatIcon from '../svgs/Scapegoat.svg';
import SimpleWerewolfIcon from '../svgs/SimpleWerewolf.svg';
import StutteringJudgeIcon from '../svgs/StutteringJudge.svg';
import ThiefIcon from '../svgs/Thief.svg';
import ThreeBrothersIcon from '../svgs/ThreeBrothers.svg';
import TwoSistersIcon from '../svgs/TwoSisters.svg';
import VillageIdiotIcon from '../svgs/VillageIdiot.svg';
import VillagerIcon from '../svgs/Villager.svg';
import WhiteWerewolfIcon from '../svgs/WhiteWerewolf.svg';
import WildChildIcon from '../svgs/WildChild.svg';
import WitchIcon from '../svgs/Witch.svg';
import WolfHoundIcon from '../svgs/WolfHound.svg';

interface RoleSvgProps {
  role: AllRoleIDs;
}

type SvgPaths = RoleIDsWithType<string>;

const SVG_PATHS: SvgPaths = {
  [RoleIDs.BigBadWolf]: BigBadWolfIcon,
  [RoleIDs.Cupid]: CupidIcon,
  [RoleIDs.Defender]: DefenderIcon,
  [RoleIDs.FortuneTeller]: FortuneTellerIcon,
  [RoleIDs.Hunter]: HunterIcon,
  [RoleIDs.LittleGirl]: LittleGirlIcon,
  [RoleIDs.Villager]: VillagerIcon,
  [RoleIDs.Werewolf]: SimpleWerewolfIcon,
  [RoleIDs.Witch]: WitchIcon,
  [FutureRoleIDs.AccursedWolfFather]: AccursedWolfFatherIcon,
  [FutureRoleIDs.Actor]: ActorIcon,
  [FutureRoleIDs.Angel]: AngelIcon,
  [FutureRoleIDs.WhiteWerewolf]: WhiteWerewolfIcon,
  [FutureRoleIDs.Elder]: ElderIcon,
  [RoleIDs.Scapegoat]: ScapegoatIcon,
  [FutureRoleIDs.VillageIdiot]: VillageIdiotIcon,
  [FutureRoleIDs.TwoSisters]: TwoSistersIcon,
  [FutureRoleIDs.ThreeBrothers]: ThreeBrothersIcon,
  [FutureRoleIDs.Fox]: FoxIcon,
  [FutureRoleIDs.BearTamer]: BearTamerIcon,
  [FutureRoleIDs.StutteringJudge]: StutteringJudgeIcon,
  [FutureRoleIDs.KnightRustySword]: KnightWithTheRustySwordIcon,
  [FutureRoleIDs.Thief]: ThiefIcon,
  [FutureRoleIDs.DevotedServant]: DevotedServantIcon,
  [FutureRoleIDs.WildChild]: WildChildIcon,
  [FutureRoleIDs.Wolfhound]: WolfHoundIcon,
  [RoleIDs.Piper]: PiperIcon,
  [FutureRoleIDs.PrejudicedManipulator]: PrejudicedManipulatorIcon,
  [FutureRoleIDs.Pyromaniac]: PyromaniacIcon,
  [FutureRoleIDs.Scandalmonger]: ScandalmongerIcon,
  [FutureRoleIDs.Gypsy]: GypsyIcon,
};

const RoleSvg: FC<RoleSvgProps> = ({ role }) => {
  return <img src={SVG_PATHS[role]} alt="Test" />;
};

export default RoleSvg;
