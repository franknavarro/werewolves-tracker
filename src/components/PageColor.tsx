import clsx from 'clsx';
import { Container, makeStyles, Theme } from '@material-ui/core';
import { FC } from 'react';
import { RoleColors } from './WerewolvesTheme';

type ThemeColors = 'primary' | 'secondary';

interface PageColorProps {
  color: ThemeColors | keyof RoleColors;
}

const useStyles = makeStyles<Theme, Pick<PageColorProps, 'color'>>((theme) => ({
  container: {
    '& > *': {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    '& > a': {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: `calc(100% - ${theme.spacing(4)}px)`,
    },
    '& > button': {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: `calc(100% - ${theme.spacing(4)}px)`,
    },
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    backgroundColor: ({ color }) =>
      color === 'primary' || color === 'secondary'
        ? theme.palette[color].main
        : theme[color].main,
    color: ({ color }) =>
      color === 'primary' || color === 'secondary'
        ? theme.palette[color].contrastText
        : theme[color].contrastText,
    paddingBottom: theme.spacing(3),
  },
}));

const PageColor: FC<PageColorProps> = ({ color, children }) => {
  const classes = useStyles({ color });
  return (
    <div className={clsx(classes.page, 'full-screen')}>
      {children && (
        <Container className={classes.container} disableGutters>
          {children}
        </Container>
      )}
    </div>
  );
};

export default PageColor;
