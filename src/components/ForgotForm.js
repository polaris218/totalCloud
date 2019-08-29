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
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    if (email) {
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
    if (emailRegex.test(e.target.value)) {
      this.setState({ email: e.target.value, emailValidate: true})
    } else {
      this.setState({ email: e.target.value, emailValidate: false})
    }
  }

  render() { 
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
                    onChange={this.handleEmailChange}
                  />
                </div>
                <div className="form-row mb-5">
                  <button type="submit" className="btn btn-primary mb-2 login-button">
                    send reset password link
                  </button>
                </div>
                <div className="form-row go-to-login-page">
                  <h5>Go back to login page.&nbsp;<Link to="/Login" className="register-link">Login</Link></h5>
                </div>
                {/* <div className="form-row register-form">
                  
                    <button type="button" className="btn btn-primary mb-2 register-button"></button>
                  </Link>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
     );
  }
}
 
export default ForgotForm;