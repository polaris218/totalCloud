import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import Protected from "./pages/Protected";
import './App.css';

const onAuthRequired: any = ({ history }: any) => {
  history.push('/login');
}

const App: React.FC = () => {
  return (
    <Router>
      <Security
        issuer={process.env.REACT_APP_ISSUER}
        client_id={process.env.REACT_APP_CLIENTID}
        redirect_uri={ window.location.origin + '/implicit/callback' }
        onAuthRequired={ onAuthRequired }
      >
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path="/login" exact render={() => <Login baseUrl={process.env.REACT_APP_BASE_URL} />} />
          <Route path="/signup" exact component={ Signup } />
          <Route path="/reset" exact component={ Reset } />
          <Route path="/forgotpassword" exact component={ Forgot } />
          <SecureRoute path="/protected" exact component={Protected} />
          <Route path="/implicit/callback" exact component={ImplicitCallback} />
        </Switch>
      </Security>
    </Router>
  );
}

export default App;
