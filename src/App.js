import LoginPage from './views/login/index';
import './App.css';
import 'antd/dist/antd.css';
import AboutPage from './views/about';
import Registry from './views/registry';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/registry">
            <Registry />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
