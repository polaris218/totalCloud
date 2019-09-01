import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Description from "./Description";

interface Props {

}

interface State {
  newPassword?: string;
  confirmPassword?: string;
}

const style = {
  width: "80%",
  margin: "auto",
}

class Reset extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
    }
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
  }

  handleNewPassword(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({ newPassword: e.currentTarget.value})
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  handleConfirmPassword(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({ confirmPassword: e.currentTarget.value})
  }

  render() { 
    return ( 
      <div className="container-fluid login">
        <div className="row" style={style}>
          <div className="col-lg-5 offset-lg-1 col-xs-12">
            <Description />
          </div>
          <div className="col-lg-4 offset-lg-1 col-xs-12">
            <div className="row login-form">
              <form onSubmit={ this.handleSubmit }>
                <div className="form-row title-row">
                  <h3>Reset Password</h3>
                </div>
                <div className="form-row my-3">
                  <input
                    type="password"
                    className="form-control context-input"
                    placeholder="Enter New Password"
                    value={ this.state.newPassword }
                    onChange={this.handleNewPassword}
                  />
                </div>
                <div className="form-row my-3">
                  <input
                    type="password"
                    className="form-control context-input"
                    placeholder="Confirm New Password"
                    value={ this.state.confirmPassword }
                    onChange={this.handleConfirmPassword}
                  />
                </div>
                <div className="form-row mb-5">
                  <button type="submit" className="btn btn-primary mb-2 login-button">reset password</button>
                </div>
                <div className="form-row my-5 go-to-login-page">
                  <h5>Go back to login page.&nbsp;<Link to="/login">Login</Link></h5>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
     );
  }
}
 
export default Reset;