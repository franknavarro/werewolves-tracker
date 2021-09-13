import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { FC } from 'react';
import { RoleIDs } from '../hooks/roles';

export type RoleColors = {
  [key in RoleIDs]: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
};

type RoleColorsOptions = {
  [key in RoleIDs]: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
};

declare module '@material-ui/core/styles/createTheme' {
  interface Theme extends RoleColors {}
  // allow configuration using `createTheme`
  interface ThemeOptions extends RoleColorsOptions {}
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
});

const WerewolvesTheme: FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default WerewolvesTheme;
