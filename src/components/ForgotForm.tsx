import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Description from "./Description";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const style = {
  minHeight: `600px`,
}
const rowStyle = {
  width: "80%",
  margin: "auto",
}

interface Props {

}
interface State {
  email?: string;
  emailValidate?: boolean;
  clickedSendEmail?: boolean;
}

class ForgotForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      emailValidate: true,
      clickedSendEmail: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const { email } = this.state;
    if (email) {
      this.setState({ clickedSendEmail: true })
      fetch(`${process.env.REACT_APP_FORGOT_PASSWORD_URL}`, {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "username": email,
          "factorType": "EMAIL"
        })
      })
    }
  }

  handleEmailChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({
      email: e.currentTarget.value,
      emailValidate: emailRegex.test(e.currentTarget.value)
    })
  }

  render() { 
    const {
      emailValidate,
      clickedSendEmail
    } = this.state;
    return ( 
      <div className="container-fluid login">
        <div className="row" style={rowStyle}>
          <div className="col-lg-5 offset-lg-1 col-xs-12">
            <Description />
          </div>
          <div className="col-lg-4 offset-lg-1 col-xs-12">
            <div className="row login-form">
              <form onSubmit={ this.handleSubmit } style={style}>
                <div className="form-row title-row">
                  <h3>Forgot Password</h3>
                </div>
                <div className="form-row my-3 email">
                  <input
                    type="email"
                    className="form-control context-input"
                    placeholder="Enter Email"
                    value={ this.state.email }
                    onChange={ this.handleEmailChange }
                    required
                  />
                  {!emailValidate && <small>Email is not valid</small>}
                </div>
                <div className="form-row mb-5">
                  <button type="submit" className="btn btn-primary mb-2 login-button">
                    {!clickedSendEmail ? `send reset password link`: `Resend`}
                  </button>
                </div>
                <div>
                  <div className="form-row go-to-login-page" style={{marginTop: `250px`, textAlign: `center`}}>
                    <h5>Go back to login page.&nbsp;<Link to="/Login" className="register-link">Login</Link></h5>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
     );
  }
}
 
export default ForgotForm;