import { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Play from './pages/Play';
import WerewolvesTheme from './components/WerewolvesTheme';
import { PlayersProvider } from './hooks/useGame';
import RoleDescriptions from './pages/RoleDescriptions';

const App: FC = () => {
  return (
    <WerewolvesTheme>
      <PlayersProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/roles">
              <RoleDescriptions />
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
