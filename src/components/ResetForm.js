import React, { Component } from 'react';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
  }

  handleNewPassword(e) {

  }

  handleSubmit(e) {

  }

  handleConfirmPassword(e) {

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
                <h5>Reset Password</h5>
                <div className="form-row">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter New Password"
                    value={ this.state.email }
                    onChange={this.handleNewPassword}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm New Password"
                    value={ this.state.password }
                    onChange={this.handleConfirmPassword}
                  />
                </div>
                <div className="form-row">
                  <button type="submit" className="btn btn-primary mb-2">reset password</button>
                </div>
                <div className="form-row">
                  <div className="row">
                    <p>Go backend to login page</p>
                  </div>
                  <div className="row">
                    <Link to="/Login">
                      <button type="button" className="btn btn-primary mb-2">login</button>
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
 
export default Reset;