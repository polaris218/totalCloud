import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Description from "./Description";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showPassword: false,
      email: "",
      firstName: "",
      lastName: "",
      login: "",
      password: "",
      privacyPolicy: false,
      subscribe: false,
      awstips: false,
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const firstName = email.split("@")[0];
    const lastName = firstName;

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `SSWS ${process.env.REACT_APP_API_KEY}`,
    }
    fetch(`${process.env.REACT_APP_CREATE_USER}`, {
      method: "post",
      headers,
      body: JSON.stringify({
        "profile": {
          firstName,
          lastName,
          email,
          login: email,
        },
        "credentials": {
          "password": { 
            "value": password
          }
        }
      })
    }).then(res => res.json())
      .then(res => {
        const {
          id
        } = res;
        fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${id}/lifecycle/activate?sendEmail=true`, {
          method: "post",
          headers,
          body: JSON.stringify({})
        }).then(res => res.json())
          .then(res => {

          })
      })
  }
  render() { 
    const {
      showPassword
    } = this.state;
    return (
      <div className="container login">
        <div className="row">
          <div className="col-md-6">
            <Description />
          </div>
          <div className="col-md-5 offset-md-1">
            <div className="row login-form">
              <form onSubmit={ this.handleSubmit }>
                <div className="form-row title-row">
                  <h3>Register For Free</h3>
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
                    type={showPassword ? `textfield`: `password`}
                    className="form-control context-input"
                    placeholder="Set Password"
                    value={ this.state.password }
                    onChange={this.handlePasswordChange}
                  />
                  <div id="show-password">
                    <input 
                      type="checkbox"
                      value={ this.state.showPassword }
                      onChange={() => this.setState({ showPassword: !this.state.showPassword })}
                    />
                  </div>
                  <span>Show Password</span>
                </div>
                <div className="form-row agreements my-1">
                  <input
                    type="checkbox"
                    value={ this.state.privacyPolicy }
                    onChange={ () => this.setState({ privacyPolicy: !this.state.privacyPolicy }) }
                  />
                  <span>T&C & Pricacy</span>  
                </div>
                <div className="form-row agreements">
                  <input
                    type="checkbox"
                    value={ this.state.subscribe }
                    onChange={ () => this.setState({ subscribe: !this.state.subscribe }) }
                  />
                  <span>Subscribe To Blog</span>  
                </div>
                <div className="form-row mb-1 my-4">
                  <button type="submit" className="btn btn-primary mb-2 login-button">Register</button>
                </div>
                <div className="form-row awstipsform">
                  <input
                    type="checkbox"
                    value={ this.state.awstips }
                    onChange={() => this.setState({awstips: !this.state.awstips})}
                  />
                  <span>Get AWS tips and tricks delivered right to your inbox.</span>
                </div>
                <div className="form-row mb-5 my-5 have-account">
                  <h6>Already have an account?<Link to="/login">Login</Link></h6>
                </div>
                {/* <div className="form-row register-form">
                  <Link to="/Login" className="register-link">
                    <button type="button" className="btn btn-primary mb-2 register-button">Login</button>
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
 
export default SignupForm;