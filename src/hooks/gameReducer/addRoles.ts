import { GameActionTypes, Reducer } from '.';
import { Role } from '../roles';

export type AddRolesAction = {
  type: GameActionTypes.AddRoles;
  roles: Role[];
};

export const addRoles: Reducer<AddRolesAction> = (state, action) => {
  return { ...state, roles: action.roles };
};
