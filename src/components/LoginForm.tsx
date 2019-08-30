import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { Link } from "react-router-dom";
import { withAuth } from '@okta/okta-react';

import Description from "./Description";
import { string, bool, any } from 'prop-types';

const emailRegex = new RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

interface LoginFormProps {
  baseUrl?: string;
  auth?: any;
}

interface LoginFormState {
  sessionToken: string ;
  email?: string;
  password?: string;
  loginFailed?: boolean;
  loginFailedMessage?: string;
  emailValidate?: boolean;
  keepmelogin?: boolean;
  passwordValidate?: boolean;
  loginStage?: boolean;
}

/**
 * @see https://www.thepolyglotdeveloper.com/2016/05/add-type-definitions-external-javascript-library-typescript/
 */
export default withAuth(class LoginForm extends Component<LoginFormProps, LoginFormState> {
  oktaAuth: any;
  constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      sessionToken: "",
      email: '',
      password: '',
      loginFailed: false,
      loginFailedMessage: "",
      emailValidate: true,
      keepmelogin: false,
      passwordValidate: true,
      loginStage: false,
    }

    this.oktaAuth = new OktaAuth({ url: props.baseUrl });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const {
      email, 
      password
    } = this.state;

    if (!emailRegex.test(String(email))) {
      this.setState({ loginStage: false })
    } else {
      this.setState({ loginStage: true });
      this.oktaAuth.signIn({
        username: email,
        password: password
      }).then((res: any) => {
          this.setState({
            sessionToken: res.sessionToken,
            loginStage: false,
          });
          localStorage.setItem("sessionToken", res.sessionToken);
        }
      )
      .catch((err: any) => {
        this.setState({
          loginFailed: true,
          loginStage: false,
          loginFailedMessage: "Login Failed",
        });
        console.log('Found an error', err);
      });
    }
  }

  handleEmailChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ 
      email: e.currentTarget.value, 
      emailValidate: emailRegex.test(e.currentTarget.value)})
  }

  handlePasswordChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ password: e.currentTarget.value });
    
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({sessionToken: this.state.sessionToken});
      return null;
    }
    const {
      loginFailed,
      loginFailedMessage,
      emailValidate,
      loginStage,
      email,
      password,
      keepmelogin
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
                      // value={ this.state.keepmelogin }
                      checked={keepmelogin}
                      onChange={ (e) => this.setState({ keepmelogin: e.currentTarget.checked }) }
                    />
                    <label className="form-check-label text-white">Keep me logged in</label>
                  </div>
                </div>
                <div className={`form-row ${!loginFailed && `mb-5`}`}>
                  <button type="submit" className="btn btn-primary mb-2 login-button">
                    { loginStage ? `Loggin In...`: `Login` }
                  </button>
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