import { Classifications, RoleIDs } from '../hooks/roles';

type RoleText = {
  [key in RoleIDs]: {
    displayName: string;
    description: string[];
  };
};
export const ROLE_TEXT: RoleText = {
  [RoleIDs.Defender]: {
    displayName: 'Defender',
    description: [
      'This character can save the Villagers from the bite of the Werewolves...',
      'Each night the Defender is called before the Werewolves.',
      'The Defender then points out a player to the Moderator. (Tradition requires the Defender to first make the symbol drawn on his card with his hand). The player thus chosen will be protected during the night (and only during that night) against the Werewolves. Even if chosen by them, the player will not be eliminated from the game.',
      "Be careful: The Defender can protect himself. The Defender isn't allowed to protect the same player 2 nights in a row. The Defender's protection has no result on the Little Girl. (She's having an adolescent crisis and nothing can save her from trouble). The Defender does not protect against the Piper or against the infection of the Accursed Wolf-father.",
    ],
  },
  [RoleIDs.BigBadWolf]: {
    displayName: 'Big Bad Wolf',
    description: [
      "In this town, little piggies are not the only ones to fear the Big Bad Wolf. He's enormous and his appetite is gigantic. Because of him, entire villages have been wiped from the map!",
      'Each night he wakes up and devours with the other Werewolves. But as long as no Werewolf, Wild Child or Wolf Hound has been eliminated, he wakes up a second time and devours a second victim.',
      'He cannot devour a Werewolf.',
    ],
  },
  [RoleIDs.Werewolf]: {
    displayName: 'Simple Werewolf',
    description: [
      'Each night they agree to devour one Villager.',
      'During the day they try to hide their nocturnal identity to avoid mob justice.',
      'Under no circumstances can a simple Werewolf devour another werewolf.',
    ],
  },
  [RoleIDs.Villager]: {
    displayName: 'Simple Villager',
    description: [
      'Has no special skill.',
      'Their only weapons are the ability to analyze behavior to identify the Werewolves, and the strength of their conviction to prevent the execution of the innocents like themselves.',
    ],
  },
  [RoleIDs.FortuneTeller]: {
    displayName: 'Fortune Teller',
    description: [
      'Each night, she sees the card of a player of her choice. She must help the other Villagers, but must remain discreet in order not to be unmasked by the Werewolves.',
    ],
  },
  [RoleIDs.Hunter]: {
    displayName: 'Hunter',
    description: [
      'If dies, the Hunter must strike back beofre giving up the ghost, by immediately eliminating any player of their choice.',
      'Special case: If the Hunter is in Love with an eliminated player, before leaving the game the Hunter must immediately eliminate another player of their choice. This can create a game wehre there are no players left alive. In that case, none of the sides can claim victory.',
    ],
  },
  [RoleIDs.Cupid]: {
    displayName: 'Cupid',
    description: [
      'By shooting his famous magic arrows, Cupid has the power to make two people fall in love forever.',
      'The first night (preliminary turn), he chooses the two players who are in love. Cupid can, if he so wishes, choose himself as one of the two lovers.',
      'If one of the two Lovers is eliminated, the other immediately dies of sorrow.',
      'A Lover may never eliminate their loved one, nor bear them any prejudice (even if only bluffing!)',
      'Be careful, if one of the two Lovers is a Villager and the other a Werewolf or the Piper, the goal of the game changes for the Lovers. As, in order to live out their love in peace and win the game, they must eliminate all of the other palyers, Werewolves and Villagers, while following the rules of the game.',
    ],
  },
  [RoleIDs.Witch]: {
    displayName: 'Witch',
    description: [
      'She knows how to brew 2 extremely powerful potions: a healing potion, ot resurrect the player devoured by the Werewolves, and a poison potion, used at night to eliminate a player.',
      'The can use each potion only once per game. She can use both of her potions in the same night.',
      'In the morning depending on the potion(s) used, there might be 2 players eliminated or none!',
      'The Witch can also use the healing potion for her own benefit and heal herself if she was just devoured by the Werewolves.',
    ],
  },
  [RoleIDs.LittleGirl]: {
    displayName: 'Little Girl',
    description: [
      "The Litter Girl can, by opening her eyes a bit, spy on the Werewolves while they're awake.",
      "If she's caught by one of the Werewolves, she can immediately by devoured (in silence) instead of the chosen victim.",
      "The Little Girl can only spy at night, when the Werewolves are awake. She's not allowed to pass herself off as a Werewolf and open her eyes wide.",
    ],
  },
};

type ClassificationText = {
  [key in Classifications]: string;
};
export const CLASSIFICATION_TEXT: ClassificationText = {
  [Classifications.Werewolf]: 'Werewolf',
  [Classifications.Villager]: 'Villager',
};
