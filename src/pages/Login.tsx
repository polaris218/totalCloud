// src/Login.js

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { withAuth } from '@okta/okta-react';

interface LoginProps {
  baseUrl?: string;
  auth?: any;
}

interface LoginState {
  authenticated?: any;
}

export default withAuth(class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;
    
    return (
      this.state.authenticated ?
      <Redirect to={{ pathname: "/protected" }} /> :
      <LoginForm baseUrl={this.props.baseUrl} />
    )
  }
});