import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import Home from "./pages/Home";
import Forgot from "./pages/Forgot";
import logo from './logo.svg';
import './App.css';

function onAuthRequired({history}) {
  history.push('/login');
}

function App() {
  return (
    <Router>
      <Security
        issuer="https://dev-605640.okta.com/oauth2/default"
        client_id='0oa164hj8culRfco6357'
        redirect_uri={ window.location.origin + '/implicit/callback' }
        onAuthRequired={ onAuthRequired }
        scope="openid profile email"
      >
        <Switch>
          <Route path='/' exact component={Home} />
          {/* <Route path="/" exact component={Home} /> */}
          <Route path="/login" exact render={() => <Login baseUrl='https://dev-605640.okta.com' />} />
          <Route path="/signup" exact component={ Signup } />
          <Route path="/reset" exact component={ Reset } />
          <Route path="/forgotpassword" exact component={ Forgot } />
          <Route path="/implicit/callback" exact component={ImplicitCallback} />
        </Switch>
      </Security>
    </Router>
  );
}

export default App;
