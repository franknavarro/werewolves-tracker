import {
  Classifications,
  RoleIDs,
  RoleIDsWithType,
  FutureRoleIDs,
} from '../hooks/roles';

type RoleText = RoleIDsWithType<{
  displayName: string;
  description: string[];
}>;

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
  [FutureRoleIDs.AccursedWolfFather]: {
    displayName: 'Accursed Wolf-father',
    description: [
      'The first Werewolf in our lands, the father of their fathers, had two powers: the first was the ability to spread his curse through a special bite and the second was the ability to flee from this world by sleeping for a few centuries. Thankfully for our recent ancestors, he had been fast asleep for some time.',
      "The authors of this work would like to wish good luck to today's villagers and bring to their attention that the Accursed Wolf-father has just woken up from a long sleep, and that he's very hungry!",
      "Each night, he wakes up and devours with the other Werewolves. But once per game, if he so wishes, after the Werewolves have fallen asleep, he raises his hand. This means that the victim isn't devoured, but infected.  The Accursed Wolf-father can only use his special power once per game.",
      "The Moderator then touches the infected inhabitant who then immediately (and secretly) becomes a Werewolf, and who will take part each night in the Werewolves' feast.  If the player had a nocturnal power, they will be woken up by the Moderator on following turns to use this power, in addition to being called with the Werewolves.",
    ],
  },
  [FutureRoleIDs.WhiteWerewolf]: {
    displayName: 'White Werewolf',
    description: [
      "This thoroughly miscreant character hates the Werewolves as much as he hates the villagers!  In a recent work, titled 'The Village,' it is said that a strange mutation took place amidst the very lycanthrope population.",
      'Each night, he wakes up and devours with the other Werewolves.',
      "But every other night, on the Moderator's call, he wakes up alone and can eliminate a Werewolf.",
      "The goal of this character is to be the village's sole survivor.",
      'Only in this situation does he win the game.',
    ],
  },
  [FutureRoleIDs.Elder]: {
    displayName: 'Elder',
    description: [
      "He has victoriously gone through all of life's terrible trials, and has gained an uncommon resistance!  The Werewolves will have to try twice to devour him.",
      "The first time the Elder is devoured by the Werewolves, he survives; and the Moderator does not flip over his card. The Elder is only eliminated when he is devoured for the second time. The village's vote, the Witch's poison potion, the Hunter's shot, and the Barber's razor will all kill him on the first time.  But, despairing from having killed off such a fount of knowledge, the Villagers all lose their special powers until the end of the game.",
      "He is not affected by the Accursed Wolf-father if it's the first time he's bitten.",
      'Be careful: if the Elder is healed by the Witch, he only regains one life. (Variant for courageous players: if the Idiot has already been revealed, he gets eliminated with the Elder as, the village having lost its wisdom goes back on its decision to spare the Idiot).',
    ],
  },
  [RoleIDs.Scapegoat]: {
    displayName: 'Scapegoat',
    description: [
      "It's sad to say, but in Miller's Hollow, when something doesn't go right, it's always him who unjustly suffers the consequences.",
      "If the village's vote ends in a tie, it's the Scapegoat who is eliminated instead of the tied characters. It is up to him to work carefully to avoid such a sad fate. If the Scapegoat is eliminated, he has one last task to complete - he'll chose who is permitted to vote or not on the next day.",
      "Be careful: choosing only 1 player to vote is to risk them getting devoured by the Werewolves on the next night.  There would then be no Village vote.  (Except, of course, if the chosen player is a Werewolf, or if the Werewolves deliberately don't eat the chosen player..)",
    ],
  },
  [RoleIDs.VillageIdiot]: {
    displayName: 'Village Idiot',
    description: [
      "What is a village without an Idiot? He does pretty much nothing important, but he's so charming that no one would want to hurt him...",
      'If the village votes against him, the Idiot flips his card over. At that moment the Villagers understand their mistake and immediately let him be. From now on, he continues to play, but may no longer vote. As what would the vote of an Idiot be worth...',
      'There will not be another vote that turn.',
      'Be careful: if the Werewolves devour him, the Idiot is eliminated. If the Idiot is eliminated while he was the Sheriff, he does not pass this function, and there will thus no longer be a Sheriff. If the Hunter shoots the Idiot, the Idiot gets eliminated.',
    ],
  },
  [RoleIDs.TwoSisters]: {
    displayName: 'Two Sisters',
    description: [
      "Some of the village's inhabitants confuse them when they meet one of the Two Sisters around the corner of a country road.",
      "The smile one the young woman's face after one's tried his chance at the first name game is difficult to decipher: is the young woman happy to have been identified, or is she amused by the mistake? In all cases, the Two Sisters get along like the fingers of the hand or the hair in a lock. It's certainly encouraging to have someone close you can trust in these uncertain times!",
      'The first night, when called by the Moderator, they wake up together and recognize each other.',
      "For experienced players, during the game, once in a while (every other turn or at the Moderator's discretion), they wake up again and agree, quickly and in silence, on the decisions to be taken to save the village.",
      'Moderator advice: particularly powerful with players who know sign language.',
    ],
  },
  [FutureRoleIDs.ThreeBrothers]: {
    displayName: 'Three Brothers',
    description: [
      'The entire village rings out with the joyous sound of their voice when they return home after working in the field. During the debates, a simple glance between them allows them to take a good decision as to the future of the village.',
      "The first night, when called by the Moderator, they wake up together and recognize each other. For experienced players, during the game, once in a while (every other turn or at the Moderator's discretion), they wake up again and, quickly and in silence, agree on the decisions to be taken to save the village.",
      'Moderator advice: even more powerful with players who know sign language. To be used only in large villagers. If the village is very large, you can even add in the Two Sisters!',
    ],
  },
  [FutureRoleIDs.Fox]: {
    displayName: 'Fox',
    description: [
      "In Miller's Hollow, everyone appreciates the flair of this vivacious yet discreet character, except maybe for the chickens and especially the Werewolves.",
      'At night, when called by the moderator, the Fox can choose a group of three players neighbouring each other, of whom he points the central player. If in this group is at least one Werewolf, then the Moderator makes an affirmative sign to the Fox. In that case, the Fox will be able to use his power again on another night. If there are not Werewolves in the chosen group, then the Fox permanently loses his power; however, he has important information, clearing the names of three players in one fell swoop.',
      'Note: the Moderator calls the Fox each night, but that player his not forced to use his power each night.',
      "Moderator advice: the Fox doesn't see the cards; the Moderator simply lets him know whether or not there's a Werewolf among those three players.",
    ],
  },
  [FutureRoleIDs.BearTamer]: {
    displayName: 'Bear Tamer',
    description: [
      "Ah! How sweet it is, in my memory, the sound of chains slipping onto the cobblestones of the 'Three Road' plaza, accompanied by the grunting of Ursus. Ah! How long ago it was that Titan, the Bear Tamer, would lead his companion in a ballet so gracious that we'd cry every summer in Miller's Hollow. Ursus even had the oh-so-precious ability to detect lycanthropes hidden near him.",
      "Each morning, right after the revelation of any possible nocturnal victims, if at least one Werewolf is or ends up directly next to the Bear Tamer, then the Moderator grunts to let the players know that the Tamer's bear has smelled danger.",
      "Only players next to him and still in play are taken into account.  Moderator advice: to help things, eliminated players leave the game or step away from the table.  If the Bear Tamer is infected*, then the Moderator will grunt each turn, until Bear Tamer isn't eliminated.",
      '* See the Accursed Wolf.father.',
    ],
  },
  [FutureRoleIDs.StutteringJudge]: {
    displayName: 'Stuttering Judge',
    description: [
      "The miller's youngest son was gifted for studies and dreamed of becoming a lawyer.",
      "As his father had managed to make some dough, he sent him to study law in the nearby city. A slight pronounciation defect kept the young man from having the coveted prestige of being the defender of the widow and the orphan. However, he returned to the village of Miller's Hollow haloed with the only slightly less prestigious title of wandering judge.",
      "Once per game, the Stuttering Judge can decide that there'll be 2 consecutive votes and two suspect eliminations.  The uttering Judge lets the Moderator know his decision through a special sign he uses to choose an inhabitant during a village's vote. The second vote is immediately started without any debate by the Moderator, right after the elimination caused by the first vote. The Stuttering Judge will have shown the Moderator that special sign during the first night, when called by the Moderator.",
      'Moderator advice: always be attentive to the behavior of the Stuttering Judge during the votes, in order not to miss his distinctive sign.',
    ],
  },
  [FutureRoleIDs.KnightRustySword]: {
    displayName: 'Knight with the Rusty Sword',
    description: [
      "'Don Sneezy' is a very old retired knight.  He's rather tired by a life of questing throughout the world and doesn't maintain his noble tool very well any more. Rust has slowly started to settle on his protector's dull edge, but he'll never leave her for another. He still sleeps with her every evening these days: intruders beware!",
      "If the Knight is devoured, he's eliminated, but one of the Werewolves is contaminated by the rusted sword. Among the Werewolves guilty of that elimination, the first Werewolf to the left of the Knight with the Rusty Sword will be eliminated on the next night. This elimination due to disease will be revealed by the Moderator in the morning following the Werewolfs disappearance.",
      'That player will have thus survived his wound for a day.',
      'Be careful: players will be able to deduce that all the inhabitants sitting between the defunct Knight with the Rusty Sword and the sick Werewolf are innocent villagers.',
    ],
  },
  [FutureRoleIDs.Thief]: {
    displayName: 'Thief',
    description: [
      'If the Thief is in the mix, two extra Simple Villager cards must be added to those already chosen.',
      "After the characters are dealt, the two cards which haven't been dealt are placed in the middle of the table, face-down. On the first night, the Thief will be able to take a look at these two cards, and exchange his card for one of the two others. If these cards are both Werewolves, he must exchange his card for one of these two Werewolves. He'll play that character from now on, until the end of the game.",
    ],
  },
  [FutureRoleIDs.DevotedServant]: {
    displayName: 'Devoted Servant',
    description: [
      'Who could dream of a better servant than one willing to give up her life for that of her masters?',
      "Don't rejoice too fast, as the devouring ambition within her could spell the end of the village!",
      "Before the revelation of the card of the player eliminated by the village's vote, she can reveal herself by showing her card.",
      'In that case, the Devoted Servant loses her card, and then takes the card of the eliminated player without revealing it to anyone and takes on the role of the eliminated player until the end of the game.',
      "Be careful: if she's in love, the Devoted Servant cannot use her power. Her love is stronger than her desire to change characters.",
      "Moderator advice: wait before revealing the card of the player eliminated by the village in order to give the Devoted Servant time to to reveal herself. If she takes on a role with a power, the Moderator will call on the ex-Devoted Servant under the name of this new role. More specifically the following first night, in order to 'reset' this new role.",
      'As a general rule, the new role taken on by the Devoted Servant sees its ability completely reset and must be played as though it was the first night. However, any possible effects previously applied to the eliminated player are cancelled.',
      "Clarifications: if the eliminated player was infected*, in love, charmed, Sheriff, Town Crier, or Cupid, the ex-Devoted Servant isn't.",
      'If the ex-Devoted Servant was charmed, Sheriff, or Town Crier, she no longer is.',
      'If the ex-Devoted Servant was infected*, she still is.',
      'If the ex-Devoted Servant becomes:',
      '- Piper, the Moderator indicates to this new Piper which players were previously charmed.',
      "- Actor, Town Crier, or Gypsy: new cards aren't dealt; only the unused ones remain.",
      '* See the Accursed Wolf.father, page 8.',
    ],
  },
  [FutureRoleIDs.Actor]: {
    displayName: 'Actor',
    description: [
      'A tireless wanderer, he stopped at the village to give a few shows before going south to spend the winter in warmer climates.',
      'As gifted with jokes and comedies as he is to interpret the great tragedies, he has all of the talent needed to perform the vast catalog of national theater.',
      'Before the game, the Moderator chooses 3 character cards with special abilities.  After the roles have been dealt, these cards are placed face up in the middle of the table. Each night, when called by the Moderator, the Actor can choose one of these cards and use the corresponding power until the next night. If the Actor uses a character card, the Moderator removes that card from the table.It may no longer be used.',
      'Be careful: the cards offered may not be Werewolf cards.',
      'Moderator advice: among the choice of cards offered to the Actor, you can introduce a bit of chaos into the village, or, alternatively, counter a very powerful werewolf clan.',
      "If the Thief is also present, you must first deal with the Thief's 2 cards, and only then the Actor's 3 cards.",
    ],
  },
  [FutureRoleIDs.WildChild]: {
    displayName: 'Wild Child',
    description: [
      "Abandoned in the woods by his parents at a young age, he was raised by wolves.  As soon as he learned how to walk on all fours, the Wild Child began to wander around Miller's Hollow.",
      "One day, fascinated by an inhabitant of the village who was walking upright with grace and presence, he made them his secret role model. He then decided to integrate himself into the community of Miller's Hollow and entered, worried, in the village. The community was moved by his frailty, adopted him, and welcomed him in their fold.",
      'What will become of him: honest Villager or terrible Werewolf? For all of his life, the heart of the Wild Child will swing between these two alternatives.  May his model confirm him in his newfound humanity.',
      'The Wild Child is a villager.',
      'On the first night, when called by the Moderator, he chooses a player to be his role model.',
      'If during the game the chosen player is eliminated, the Wild Child becomes a Werewolf and will wake up the next night with his peers, and will devour with them each night until the end of the game. However, for as long as his role model is alive, the Wild Child remains a villager. Whether his model is a Werewolf or not changes nothing!',
      "Nothing's keeping the Wild Child from taking part in the elimination of his role model if he so wishes. If his model is alive when all of the Werewolves have been eliminated, he wins with the villagers. If his role model is eliminated and only Werewolves survive with him, it's also a victory for the Wild Child.",
      "Moderator advice: not revealing the true nature of the Wild Child eliminated by the village's vote can be amusing.  The doubt regarding his true identity then remains: was he a villager or a Werewolf before being eliminated?",
    ],
  },
  [FutureRoleIDs.Wolfhound]: {
    displayName: 'Wolfhound',
    description: [
      "All dogs know in the depths of their soul that their ancestors were wolves and that it's & Mankind who has kept them in the state of childishness and fear, the faithful and generous companions.  In any case, only the Wolf-hound can decide if he'll obey his human and civilized master or if he'll listen to the call of wild nature buried within him.",
      "The first night, he chooses if he wants to be a Simple Villager or Werewolf. If he wishes to be a Werewolf, he'll wake up with them each night and will from then on participate in the choice of the victim to be devoured. Otherwise, he'll keep his eyes closed and will win with the villagers.",
      'This choice is final!',
      "Moderator advice: not revealing the true nature of the Wolf-hound eliminated by the village's vote can be amusing.  The doubt about his true identity the remains: was he a villager or a Werewolf before being eliminated?",
    ],
  },
  [RoleIDs.Angel]: {
    displayName: 'Angel',
    description: [
      "The muddy life of a village infested with evil creatures repulses him; he wishes to believe he's the victim of a terrible nightmare, in order to finally wake up in his comfortable bed.",
      "When the Angel is in play, the game always begins with the village's debate followed by an elimination vote, and then the first night. If the Angel manages to attract the discriminatory vote of the villagers or the devouring vindictiveness of the lycanthropes to be eliminated on the first turn, he will then be able to leave the nightmare a winner and win the game.",
      'In that case, the game ends: the players can then immediately begin a new game.',
      'If he fails, he becomes a Simple Villager for the rest of the game.',
      "Moderator advice: don't hesitate to remind players of the possible presence of the Angel on the first day! The debates will only get more animated, as loudmouths will be protected by the angelic menace!",
    ],
  },
  [RoleIDs.Piper]: {
    displayName: 'Piper',
    description: [
      "Ignominously chased out of the village, he's come back years later under the cover of a false identity to exert his terrible revenge.",
      "Each night, at the Moderator's call, the Piper charms 2 new players. As soon as there are only charmed players left, the Piper wins the game. (Even if this happens due to a vote from the Village, or because of the Werewolves).",
      "If infected by the Accursed Wolf-father, he becomes a simple Werewolf.  His original objective, which was to charm all players, is then abandoned.  He'll collaborate with the Werewolves to accomplish their goal for a common victory.",
      "Be careful: the Piper cannot charm himself. The Defender doesn't protect against the charm. The Witch can't heal the charm. The Werewolves are not immune to the charm.",
      "The charmed players all keep their powers and their characteristics. The charm isn't transmitted between Lovers.",
    ],
  },
  [FutureRoleIDs.PrejudicedManipulator]: {
    displayName: 'Prejudice Manipulator',
    description: [
      'His goal: to fulfill his own objective, no matter what his side is.',
      "From his youngest age, and maybe because of a lack of love or interest given by those close to him, this poor soul didn't like himself at all. Growing up, he transferred this hatred to all those who are foreign to him.",
      "This is why he's now known by the sad name of Prejudiced Manipulator.",
      'Before the beginning of the game, the Moderator divides the village into 2 groups, according to an obvious criteria (gender, glasses, size, age, etc.) and announces it out loud to the village.  The Prejudiced Manipulator will of course have to be part of one of these 2 groups.',
      "The goal of this character is the elimination of all players of the group he hates, meaning the one he doesn't belong to.",
      'In that case, and only in that case, he wins the game. He has no special powers: his skill at manipulating the inhabitants of the village is his only weapon!',
      'If he gets infected by the Accursed Wolf-father, he becomes a simple Werewolf.',
      "Moderator advice: it's not necessary to create 2 groups of equal size.  Don't hesitate, if necessary, to specify in front of everyone to which group each inhabitant belongs to.",
    ],
  },
  [FutureRoleIDs.Pyromaniac]: {
    displayName: 'Pyromaniac',
    description: [
      "As indicated by his name, this character is hampered by an enormous fault. Let's hope he'll be able to keep his incendiary vice in check and take care of the right house at the right time, in order to help the threatened village!",
      "When his role is called, the Pyromaniac can, once per game, choose a building on which the Moderator will place the 'fire' tile.",
      "The next morning, after all the inhabitants have seen the result of the conflagration, the building is removed from the game for good. Its former occupant isn't eliminated, but instead becomes a Vagabond.",
      "If the Pyromaniac chooses the building in which that night's Werewolf victim lives, the first Werewolf to the right of the victim is eliminated instead, completely burnt. Panicked by the flames, any surviving Werewolves don't have the time to settle down for their meal! In this case, there is no victim.",
      'Be careful: playing this character requires using the buildings.',
    ],
  },
  [FutureRoleIDs.Scandalmonger]: {
    displayName: 'Scandalmonger',
    description: [
      'This individual loves to secretly make their guilty suspicions known, by posting, right before dawn, an anonymous poster full of accusations against the concerned player. Its impact is certain despite the lack of courage of our bird!',
      "At the end of each night, after the Werewolves have gone back to sleep, when his role is called, the Scandalmonger can choose a player he suspects. The Moderator then places the 'anonymous accusation poster' in front of the chosen player's building.  This player will automatically have 2 extra votes against them during the next vote. The Scandalmonger can place the 'anonymous accusation poster' on the Pub, even if the Barkeep hasn't taken part in an elimination with his vote.  The Scandalmonger cannot choose any Vagabond.",
    ],
  },
  [FutureRoleIDs.Gypsy]: {
    displayName: 'Gypsy',
    description: [
      "Esmeralda's sister, who was simply called the Gyspy, knew the ways of the Great Beyond.  She simply had. with no artifice or unguent, to concentrate and gaze upon the sky during the new moon to communicate with the souls of the departed.",
      "At the beginning of the game, the Moderator takes the 5 Spiritualism cards from 'New Moon' and keeps them in hand.",
      'Each night, the Moderator calls out the Gypsy and asks her if she wants to use her power. If affirmative, the Moderator reads out loud the 4 questions of a Spiritualism card of his choice.  The Gyspy choses one of the four questions with a gesture.  She then points out to the Moderator the inhabitant who will have to ask this question.',
      "The next morning, the chosen player becomes medium and asks this question out loud. With a strong otherworldly voice, the first eliminated player answers this question with a 'Yessssss' or 'Noooooo'.  The card is then discarded.",
    ],
  },
};

type ClassificationText = {
  [key in Classifications]: string;
};
export const CLASSIFICATION_TEXT: ClassificationText = {
  [Classifications.Werewolf]: 'Werewolf',
  [Classifications.Villager]: 'Villager',
  [Classifications.Loner]: 'Loner',
};
