import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { Link } from "react-router-dom";
import { withAuth } from '@okta/okta-react';

import Description from "./Description";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const passwordRegexp = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
)

export default withAuth(class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      email: '',
      password: '',
      error: null,
      loginFailed: false,
      loginFailedMessage: "",
      emailValidate: true,
      keepmelogin: false,
      passwordValidate: true,
    }

    this.oktaAuth = new OktaAuth({ url: props.baseUrl });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!emailRegex.test(this.state.email)) {
      this.setState({ emailValidate: false })
    } else {
      this.oktaAuth.signIn({
        username: this.state.email,
        password: this.state.password
      })
      .then(res => this.setState({
        sessionToken: res.sessionToken
      }))
      .catch(err => {
        this.setState({
          loginFailed: true,
          loginFailedMessage: "Login Failed",
        });
        console.log('Found an error', err);
      });
    }

  }

  handleEmailChange(e) {
    if (emailRegex.test(e.target.value)) {
      this.setState({ email: e.target.value, emailValidate: true})
    } else {
      this.setState({ email: e.target.value, emailValidate: false})
    }
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
    
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({sessionToken: this.state.sessionToken});
      return null;
    }
    const {
      loginFailed,
      loginFailedMessage,
      emailValidate
    } = this.state;
    return (
      <div className="container-fluid login">
        <div className="row">
          <div className="col-md-4 offset-2 col-xs-12">
            <Description />
          </div>
          <div className="col-md-4 offset-md-1 col-xs-12">
            <div className="row login-form">
              <form onSubmit={ this.handleSubmit }>
                <div className="form-row my-2 title-row">
                  <h3>Login</h3>
                </div>
                <div className="form-row my-3 email">
                  <input
                    type="Email"
                    className="form-control context-input"
                    placeholder="Email"
                    value={ this.state.email }
                    onChange={this.handleEmailChange}
                  />
                  {!emailValidate && <small>Email is not valid</small>}
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
                <div className="form-row keepmelogin">
                  <div className="form-check">
                    <input 
                      type="checkbox"
                      className="form-check-input"
                      value={ this.state.keepmelogin }
                      onChange={ () => this.setState({ keepmelogin: !this.state.keepmelogin }) }
                    />
                    <label className="form-check-label text-white">Keep me logged in</label>
                  </div>
                </div>
                <div className={`form-row ${!loginFailed && `mb-5`}`}>
                  <button type="submit" className="btn btn-primary mb-2 login-button">login</button>
                </div>
                {
                  loginFailed &&
                    <div className="form-row mb-5 failed-message">
                      <p>{ loginFailedMessage }</p>
                    </div>
                }
                <div className="form-row mb-4 have-account">
                  <h6>Create an FREE account.<Link to="/signup">Register</Link></h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});