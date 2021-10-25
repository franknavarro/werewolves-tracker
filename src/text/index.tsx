import { FutureRoleIDs, RoleIDs } from '../hooks/roles';
import { ROLE_TEXT as ROLE_TEXT_EN } from './english';

export const getRoleText = (
  role: RoleIDs | FutureRoleIDs | null | undefined,
) => {
  return ROLE_TEXT_EN[role as RoleIDs] || ROLE_TEXT_EN[RoleIDs.Villager];
};
