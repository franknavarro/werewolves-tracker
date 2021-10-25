import { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Play from './pages/Play';
import WerewolvesTheme from './components/WerewolvesTheme';
import { PlayersProvider } from './hooks/useGame';
import RoleDescriptions from './pages/RoleDescriptions';
import { FUTURE_ROLES, ROLES, rolesAsList } from './hooks/roles';

const App: FC = () => {
  return (
    <WerewolvesTheme>
      <PlayersProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/future-roles">
              <RoleDescriptions roles={rolesAsList(FUTURE_ROLES)} />
            </Route>
            <Route path="/roles">
              <RoleDescriptions roles={rolesAsList(ROLES)} />
            </Route>
            <Route path="/play">
              <Play />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </PlayersProvider>
    </WerewolvesTheme>
  );
};

export default App;
