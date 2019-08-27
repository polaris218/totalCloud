import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Description from "./Description";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

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
      emailValidate: true,
      agreeTermsOfServices: true,
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value, emailValidate: true });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password, privacyPolicy, subscribe, awstips } = this.state;
    if (emailRegex.test(email)) {
      if (privacyPolicy && subscribe && awstips) {
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
            console.log(res);
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
      } else {
        this.setState({ agreeTermsOfServices: false})
      }
    } else {
      this.setState({ emailValidate: false });
    }
  }
  render() { 
    const {
      showPassword,
      emailValidate,
      agreeTermsOfServices,
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
                    autoComplete="off"
                    value={ this.state.email }
                    onChange={this.handleEmailChange}
                  />
                  {!emailValidate && <small>Email is not valid</small>}
                </div>
                <div className="form-row my-3 password">
                  <input
                    type={showPassword ? `textfield`: `password`}
                    className="form-control context-input"
                    placeholder="Set Password"
                    autoComplete="off"
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
                    className="form-check-input"
                    value={ this.state.privacyPolicy }
                    onChange={ () => this.setState({ privacyPolicy: !this.state.privacyPolicy }) }
                  />
                  <span className="form-check-label text-white">T&C & Privacy & Policy</span>  
                </div>
                <div className="form-row agreements">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={ this.state.subscribe }
                    onChange={ () => this.setState({ subscribe: !this.state.subscribe }) }
                  />
                  <span className="form-check-label text-white">Subscribe To Blog</span>  
                </div>
                <div className="form-row mb-1 my-4">
                  <button type="submit" className="btn btn-primary mb-2 login-button">Register</button>
                </div>
                <div className="form-row awstipsform">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={ this.state.awstips }
                      onChange={() => this.setState({awstips: !this.state.awstips})}
                    />
                    <label className="form-check-label text-white">
                      Get AWS tips and tricks delivered right to your inbox.
                    </label>
                  </div>
                </div>
                { !agreeTermsOfServices &&
                    <div className="form-row service-content">
                      <h6>Please agree of terms of services</h6>
                    </div>
                }
                <div className="form-row mb-5 my-5 have-account">
                  <h6>Already have an account?<Link to="/login">Login</Link></h6>
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