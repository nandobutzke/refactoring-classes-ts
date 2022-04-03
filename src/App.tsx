import { BrowserRouter as Router } from 'react-router-dom';
import { FoodsProvider } from './hooks/useFood';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App = () => (
  <FoodsProvider>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
  </FoodsProvider>
);

export default App;
