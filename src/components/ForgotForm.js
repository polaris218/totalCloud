import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Description from "./Description";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class ForgotForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailValidate: true,
      clickedSendEmail: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleSubmit(e) {
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

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
      emailValidate: emailRegex.test(e.target.value)
    })
  }

  render() { 
    const {
      emailValidate,
      clickedSendEmail
    } = this.state;
    return ( 
      <div className="container-fluid login">
        <div className="row">
          <div className="col-md-4 offset-md-2 col-xs-12">
            <Description />
          </div>
          <div className="col-md-4 offset-md-1">
            <div className="row login-form">
              <form onSubmit={ this.handleSubmit }>
                <div className="form-row title-row">
                  <h3>Forgot Password</h3>
                </div>
                <div className="form-row my-3">
                  <input
                    type="email"
                    className="form-control context-input"
                    placeholder="Enter New Password"
                    value={ this.state.email }
                    onChange={ this.handleEmailChange }
                    required
                  />
                </div>
                <div className="form-row email">
                  <small>{ !emailValidate && `Email is not valid` }</small>
                </div>
                <div className="form-row mb-5">
                  <button type="submit" className="btn btn-primary mb-2 login-button">
                    {!clickedSendEmail ? `send reset password link`: `Resend`}
                  </button>
                </div>
                <div className="form-row go-to-login-page">
                  <h5>Go back to login page.&nbsp;<Link to="/Login" className="register-link">Login</Link></h5>
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