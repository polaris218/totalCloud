import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import cookie from "cookie";

import Description from "./Description";

interface Props {

}

interface State {
  newPassword?: string;
  confirmPassword?: string;
  status?: boolean;
  stateToken?: string;
  passwordReset?: boolean;
  cookieExpired?: boolean;
  passwordMatch?: boolean;
  is8Characters?: boolean;
  is1Numbers?: boolean;
  is1LowerCases?: boolean;
  is1UpperCases?: boolean;
  isPasswordContainsName?: boolean;
  passwordValidate: boolean;
}

const style = {
  width: "80%",
  margin: "auto",
}

const errorsvg = `
<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.0//EN'  'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'><svg height="8" style="overflow:visible;enable-background:new 0 0 16 16" viewBox="0 0 16 16" width="16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g id="Error_1_"><g id="Error"><circle cx="16" cy="16" id="BG" r="16" style="fill:#D72828;"/><path d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" id="Exclamatory_x5F_Sign" style="fill:#690404;"/></g></g></g></svg>`

const ticksvg = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" version="1.1" width="16" height="16" fill="#000000">
  <g id="surface1">
    <path style=" fill:#fff;" d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z "/>
  </g>
</svg>
`

class Reset extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
      stateToken: "",
      status: false,
      passwordReset: true,
      cookieExpired: false,

      is8Characters: false,
      is1Numbers: false,
      is1LowerCases: false,
      is1UpperCases: false,
      isPasswordContainsName: false,
      passwordMatch: true,
      passwordValidate: true,
    }
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
  }

  handleNewPassword(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({ 
      newPassword: e.currentTarget.value,
      passwordReset: true,
      passwordMatch: true,
      passwordValidate: true,
    })
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const cookies = cookie.parse(document.cookie);
    const { newPassword, confirmPassword } = this.state;
    // if(!cookies.oktaStateToken) {
    //   this.setState({ cookieExpired: true });
    //   return;
    // }
    if(newPassword !== confirmPassword && newPassword && confirmPassword) {
      this.setState({ passwordMatch: false });
    } else {
      if(newPassword && confirmPassword) {
        const is1UpperCases = (/[A-Z]/).test(newPassword);
        const is1Numbers = (/[0-9]/).test(newPassword);
        const is1LowerCases = (/[a-z]/).test(newPassword);
        const is8Characters = newPassword.length > 7 ? true : false;
        const passwordValidate = is1UpperCases && is1Numbers && is1LowerCases && is8Characters
        
        this.setState({
          is1LowerCases,
          is1UpperCases,
          is1Numbers,
          is8Characters,
          passwordValidate,
        });

        if(passwordValidate) {
          fetch(`${process.env.REACT_APP_RESET_PASSWORD_URL}`, {
            method: "post",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              stateToken: cookies.oktaStateToken,
              newPassword,
            })
          }).then(res => res.json())
            .then(resp => {
              console.log(resp);
              if(resp.errorCauses) {
                this.setState({ passwordReset: false });
              } else {
                if(resp.status === "SUCCESS") this.setState({ status: true });
              }
            })
        }
      }
    }
  }

  handleConfirmPassword(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({ 
      confirmPassword: e.currentTarget.value,
      passwordReset: true,
      passwordMatch: true,
      passwordValidate: true,
    })
  }

  render() {
    const { 
      status,
      newPassword,
      confirmPassword,
      passwordReset,
      cookieExpired,
      is1LowerCases,
      is1UpperCases,
      is1Numbers,
      is8Characters,
      passwordValidate,
      passwordMatch,
    } = this.state;

    if(status) return <Redirect to={{ pathname: "/login" }} />
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
                    value={newPassword}
                    onChange={this.handleNewPassword}
                  />
                </div>
                <div className="form-row my-3">
                  <input
                    type="password"
                    className="form-control context-input"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={this.handleConfirmPassword}
                  />
                  {
                    !passwordValidate &&
                    <div className="password-hint">
                      <small className={!is8Characters ? `error`: `valid`}>
                        <div dangerouslySetInnerHTML={ { __html: !is8Characters ? errorsvg: ticksvg } }></div>
                        <span>At least 8 character(s)</span>
                      </small>
                      <br />
                      <small className={!is1Numbers ? `error`: `valid`}>
                        <div dangerouslySetInnerHTML={ { __html: !is1Numbers ? errorsvg: ticksvg } }></div>
                        <span>At least 1 number(s)</span>
                      </small>
                      <br />
                      <small className={!is1LowerCases ? `error`: `valid`}>
                        <div dangerouslySetInnerHTML={ { __html: !is1LowerCases ? errorsvg: ticksvg } } />
                        <span>At least 1 lowercase letter(s)</span>
                      </small>
                      <br />
                      <small className={!is1UpperCases ? `error`: `valid`}>
                        <div dangerouslySetInnerHTML={ { __html: !is1UpperCases ? errorsvg: ticksvg } } />
                        <span>At least 1 uppercase letter(s)</span>
                      </small>
                    </div>
                  }
                  {
                    !passwordMatch && 
                      <div className="password-hint">
                        <small className="error">
                          <div dangerouslySetInnerHTML={{__html: errorsvg}} />
                          <span>New passwords must match</span>
                        </small>
                      </div>
                  }
                </div>
                <div className="form-row mb-5">
                  <button type="submit" className="btn btn-primary mb-2 login-button">reset password</button>
                  {!passwordReset && 
                      <div className="failed-message m-auto">
                        <p>We found some errors. Please review the form and make corrections.</p>
                      </div>
                  }
                  {cookieExpired &&
                      <div className="failed-message m-auto">
                        <p>Link is expired</p>
                      </div>
                  }
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