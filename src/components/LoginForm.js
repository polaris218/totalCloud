import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { Link } from "react-router-dom";
import { withAuth } from '@okta/okta-react';

import Description from "./Description";

export default withAuth(class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      email: '',
      password: ''
    }

    this.oktaAuth = new OktaAuth({ url: props.baseUrl });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.oktaAuth.signIn({
      username: this.state.email,
      password: this.state.password
    })
    .then(res => this.setState({
      sessionToken: res.sessionToken
    }))
    .catch(err => console.log('Found an error', err));
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({sessionToken: this.state.sessionToken});
      return null;
    }

    return (
      <div className="container login">
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <Description />
          </div>
          <div className="col-md-5 offset-md-1 col-xs-12">
            <div className="row login-form">
              <form onSubmit={ this.handleSubmit }>
                <div className="form-row title-row">
                  <h3>Login</h3>
                </div>
                <div className="form-row my-3">
                  <input
                    type="Email"
                    className="form-control context-input"
                    placeholder="Email"
                    value={ this.state.email }
                    onChange={this.handleEmailChange}
                  />
                </div>
                <div className="form-row my-3 password">
                  <input
                    type="password"
                    className="form-control context-input"
                    placeholder="Password"
                    value={ this.state.password }
                    onChange={this.handlePasswordChange}
                  />
                  <Link to="/forgotpassword" className="forgot-link">
                    Forgot Password?
                  </Link>
                </div>
                <div className="form-row mb-5">
                  <button type="submit" className="btn btn-primary mb-2 login-button">login</button>
                </div>
                <div className="form-row mb-3">
                  <h5>Create an account for free.</h5>
                </div>
                <div className="form-row register-form">
                  <Link to="/signup" className="register-link">
                    <button type="button" className="btn btn-primary mb-2 register-button">Register</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});