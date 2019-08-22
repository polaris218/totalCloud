import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Description from "./Description";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Description />
          </div>
          <div className="col-md-5 offset-md-1">
            <div className="row">
              <form onSubmit={this.handleSubmit}>
                <h5>Register For Free</h5>
                <div className="form-row">
                  <input
                    type="Email"
                    className="form-control"
                    placeholder="Email"
                    value={ this.state.email }
                    onChange={this.handleEmailChange}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="set password"
                    value={ this.state.password }
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <div className="form-row">
                  <button type="submit" className="btn btn-primary mb-2">Register</button>
                </div>
                <div className="form-row">
                  <div className="row">
                    <p>Already have an account?</p>
                  </div>
                  <div className="row">
                    <Link to="/Login">
                      <button type="button" className="btn btn-primary mb-2">Login</button>
                    </Link>
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
 
export default SignupForm;