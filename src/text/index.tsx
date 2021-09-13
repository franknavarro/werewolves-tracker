import { RoleIDs } from '../hooks/roles';
import { ROLE_TEXT as ROLE_TEXT_EN } from './english';

export const getRoleText = (role: RoleIDs | null | undefined) => {
  if (!role) return ROLE_TEXT_EN[RoleIDs.Villager];
  return ROLE_TEXT_EN[role];
};
