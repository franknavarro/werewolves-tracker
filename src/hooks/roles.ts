export enum RoleIDs {
  Werewolf = 'werewolf',
  Villager = 'villager',
  FortuneTeller = 'fortune-teller',
  Hunter = 'hunter',
  Cupid = 'cupid',
  Witch = 'witch',
  LittleGirl = 'little-girl',
  Defender = 'defender',
  BigBadWolf = 'big-bad-wolf',
}

export enum Classifications {
  Werewolf = 'werewolf',
  Villager = 'villager',
}

export interface Role {
  id: RoleIDs;
  classification: Classifications;
  amount: number;
}

interface ChangeableRole extends Omit<Role, 'id'> {
  amountChangable: boolean;
}
type Roles = {
  [key in RoleIDs]: ChangeableRole;
};

export const ROLES: Roles = {
  [RoleIDs.Werewolf]: {
    classification: Classifications.Werewolf,
    amount: 4,
    amountChangable: true,
  },
  [RoleIDs.BigBadWolf]: {
    classification: Classifications.Werewolf,
    amount: 1,
    amountChangable: false,
  },
  [RoleIDs.FortuneTeller]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [RoleIDs.Hunter]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [RoleIDs.Cupid]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [RoleIDs.Witch]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [RoleIDs.LittleGirl]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [RoleIDs.Defender]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [RoleIDs.Villager]: {
    classification: Classifications.Villager,
    amount: 9,
    amountChangable: true,
  },
};

export const roleCards = Object.entries(ROLES)
  .map<Role[]>(([id, { amountChangable, ...role }]) => {
    const newRole: Role = { ...role, id: id as RoleIDs };
    if (!amountChangable) return [newRole];

    const { amount } = newRole;
    newRole.amount = 1;
    return Array(amount).fill(newRole);
  })
  .flat(1);

export const rolesList = Object.entries(ROLES).map<Role>(
  ([id, { amountChangable, ...role }]) => {
    return { ...role, id: id as RoleIDs };
  },
);
