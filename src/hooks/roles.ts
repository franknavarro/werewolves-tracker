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
  Piper = 'piper',
  Scapegoat = 'scapegoat',
  VillageIdiot = 'village-idiot',
}

export enum FutureRoleIDs {
  AccursedWolfFather = 'accursed-wolf-father',
  WhiteWerewolf = 'white-werewolf',
  Elder = 'elder',
  TwoSisters = 'two-sisters',
  ThreeBrothers = 'three-brothers',
  Fox = 'fox',
  BearTamer = 'bear-tamer',
  StutteringJudge = 'stuttering-judge',
  KnightRustySword = 'knight-with-the-rusty-sword',
  Thief = 'theif',
  DevotedServant = 'devoted-servant',
  Actor = 'actor',
  WildChild = 'wild-child',
  Wolfhound = 'wolf-hound',
  Angel = 'angel',
  PrejudicedManipulator = 'prejudiced-manipulator',
  Pyromaniac = 'pyromaniac',
  Scandalmonger = 'scandalmonger',
  Gypsy = 'gypsy',
}

export type AllRoleIDs = RoleIDs | FutureRoleIDs;

export type RoleIDsWithType<T> = {
  [key in AllRoleIDs]: T;
};

export enum Classifications {
  Werewolf = 'werewolf',
  Villager = 'villager',
  Loner = 'loner',
}

export interface Role {
  id: RoleIDs | FutureRoleIDs;
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
  [RoleIDs.Piper]: {
    classification: Classifications.Loner,
    amount: 1,
    amountChangable: false,
  },
  [RoleIDs.Scapegoat]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [RoleIDs.VillageIdiot]: {
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

type FutureRoles = {
  [key in FutureRoleIDs]: ChangeableRole;
};
export const FUTURE_ROLES: FutureRoles = {
  [FutureRoleIDs.AccursedWolfFather]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.WhiteWerewolf]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.Elder]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.TwoSisters]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.ThreeBrothers]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.Fox]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.BearTamer]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.StutteringJudge]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.KnightRustySword]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.Thief]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.DevotedServant]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.Actor]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.WildChild]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.Wolfhound]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.Angel]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.PrejudicedManipulator]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.Pyromaniac]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.Scandalmonger]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
  },
  [FutureRoleIDs.Gypsy]: {
    classification: Classifications.Villager,
    amount: 1,
    amountChangable: false,
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

export const rolesAsList = (roles: Roles | FutureRoles) =>
  Object.entries(roles).map<Role>(([id, { amountChangable, ...role }]) => {
    return { ...role, id: id as RoleIDs };
  });
