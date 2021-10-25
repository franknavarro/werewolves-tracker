import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { FC } from 'react';
import { FutureRoleIDs, RoleIDs, RoleIDsWithType } from '../hooks/roles';

type ColorOptions = {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
};

export type RoleColors = RoleIDsWithType<ColorOptions>;

declare module '@material-ui/core/styles/createTheme' {
  interface Theme extends RoleColors {}
  // allow configuration using `createTheme`
  interface ThemeOptions extends RoleColors {}
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#b00c15',
      light: '#e94c3e',
      dark: '#790000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1c1c1c',
      light: '#434343',
      dark: '#000000',
      contrastText: '#ffffff',
    },
  },
  [RoleIDs.Werewolf]: {
    main: '#983b31',
    light: '#cd695b',
    dark: '#65090a',
    contrastText: '#ffffff',
  },
  [RoleIDs.BigBadWolf]: {
    main: '#983b31',
    light: '#cd695b',
    dark: '#65090a',
    contrastText: '#ffffff',
  },
  [RoleIDs.Villager]: {
    main: '#ebc16d',
    light: '#fff49d',
    dark: '#b6913f',
    contrastText: '#000000',
  },
  [RoleIDs.FortuneTeller]: {
    main: '#764383',
    light: '#a670b3',
    dark: '#481856',
    contrastText: '#ffffff',
  },
  [RoleIDs.Hunter]: {
    main: '#37593c',
    light: '#628667',
    dark: '#0e2f16',
    contrastText: '#ffffff',
  },
  [RoleIDs.Cupid]: {
    main: '#008abb',
    light: '#58baee',
    dark: '#005d8b',
    contrastText: '#ffffff',
  },
  [RoleIDs.Witch]: {
    main: '#f05e23',
    light: '#ff8f51',
    dark: '#b62b00',
    contrastText: '#000000',
  },
  [RoleIDs.LittleGirl]: {
    main: '#1e3e5e',
    light: '#4c688b',
    dark: '#001834',
    contrastText: '#ffffff',
  },
  [RoleIDs.Defender]: {
    main: '#ebc16d',
    light: '#fff49d',
    dark: '#b6913f',
    contrastText: '#000000',
  },
  [FutureRoleIDs.AccursedWolfFather]: {
    main: '#9e4c36',
    light: '#d37a60',
    dark: '#6b200f',
    contrastText: '#ffffff',
  },
  [FutureRoleIDs.WhiteWerewolf]: {
    main: '#935050',
    light: '#c67d7c',
    dark: '#622528',
    contrastText: '#ffffff',
  },
  [FutureRoleIDs.Elder]: {
    main: '#2bae5c',
    light: '#66e18a',
    dark: '#007d30',
    contrastText: '#000000',
  },
  [FutureRoleIDs.Scapegoat]: {
    main: '#d0384a',
    light: '#ff6c76',
    dark: '#980023',
    contrastText: '#ffffff',
  },
  [FutureRoleIDs.VillageIdiot]: {
    main: '#f9ea25',
    light: '#ffff63',
    dark: '#c2b800',
    contrastText: '#000000',
  },
  [FutureRoleIDs.TwoSisters]: {
    main: '#e0c64d',
    light: '#fff97e',
    dark: '#ab9617',
    contrastText: '#000000',
  },
  [FutureRoleIDs.ThreeBrothers]: {
    main: '#e4c240',
    light: '#fff472',
    dark: '#ae9200',
    contrastText: '#000000',
  },
  [FutureRoleIDs.Fox]: {
    main: '#474e63',
    light: '#737a91',
    dark: '#1e2639',
    contrastText: '#ffffff',
  },
  [FutureRoleIDs.BearTamer]: {
    main: '#b56a41',
    light: '#ea996d',
    dark: '#813e18',
    contrastText: '#000000',
  },
  [FutureRoleIDs.StutteringJudge]: {
    main: '#8ad2b7',
    light: '#bcffe9',
    dark: '#5aa187',
    contrastText: '#000000',
  },
  [FutureRoleIDs.KnightRustySword]: {
    main: '#ab5731',
    light: '#e1855c',
    dark: '#772b07',
    contrastText: '#ffffff',
  },
  [FutureRoleIDs.Thief]: {
    main: '#a8dabb',
    light: '#daffed',
    dark: '#78a88b',
    contrastText: '#000000',
  },
  [FutureRoleIDs.DevotedServant]: {
    main: '#bb3889',
    light: '#f06bb9',
    dark: '#87005c',
    contrastText: '#ffffff',
  },
  [FutureRoleIDs.Actor]: {
    main: '#926892',
    light: '#c396c2',
    dark: '#643d64',
    contrastText: '#ffffff',
  },
  [FutureRoleIDs.WildChild]: {
    main: '#995237',
    light: '#cd7f62',
    dark: '#672710',
    contrastText: '#ffffff',
  },
  [FutureRoleIDs.Wolfhound]: {
    main: '#9f5039',
    light: '#d47e64',
    dark: '#6c2512',
    contrastText: '#ffffff',
  },
  [FutureRoleIDs.Angel]: {
    main: '#588db8',
    light: '#8abdea',
    dark: '#236088',
    contrastText: '#000000',
  },
  [RoleIDs.Piper]: {
    main: '#df4f9e',
    light: '#ff82cf',
    dark: '#aa0f70',
    contrastText: '#000000',
  },
  [FutureRoleIDs.PrejudicedManipulator]: {
    main: '#e7de9a',
    light: '#ffffcb',
    dark: '#b4ac6b',
    contrastText: '#000000',
  },
  [FutureRoleIDs.Pyromaniac]: {
    main: '#9a3b28',
    light: '#d06951',
    dark: '#660900',
    contrastText: '#ffffff',
  },
  [FutureRoleIDs.Scandalmonger]: {
    main: '#d9cc9f',
    light: '#ffffd0',
    dark: '#a79b70',
    contrastText: '#000000',
  },
  [FutureRoleIDs.Gypsy]: {
    main: '#90acc5',
    light: '#c1def8',
    dark: '#617d94',
    contrastText: '#000000',
  },
});

const WerewolvesTheme: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default WerewolvesTheme;
