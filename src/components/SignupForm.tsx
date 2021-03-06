import React, { Component, FormEvent } from 'react';
import { Link, Redirect } from "react-router-dom";

import Description from "./Description";
import BallotImage from "../assets/images/ballot-check.png";
import BallotImageUncheck from "../assets/images/ballot-uncheck.png";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const errorsvg = `
<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.0//EN'  'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'><svg height="8" style="overflow:visible;enable-background:new 0 0 16 16" viewBox="0 0 16 16" width="16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g id="Error_1_"><g id="Error"><circle cx="16" cy="16" id="BG" r="16" style="fill:#D72828;"/><path d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" id="Exclamatory_x5F_Sign" style="fill:#690404;"/></g></g></g></svg>`

const showsvg = `
<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 59.2 59.2" style="enable-background:new 0 0 59.2 59.2;" xml:space="preserve">
<g>
	<path d="M51.062,21.561c-11.889-11.889-31.232-11.889-43.121,0L0,29.501l8.138,8.138c5.944,5.944,13.752,8.917,21.561,8.917
		s15.616-2.972,21.561-8.917l7.941-7.941L51.062,21.561z M49.845,36.225c-11.109,11.108-29.184,11.108-40.293,0l-6.724-6.724
		l6.527-6.527c11.109-11.108,29.184-11.108,40.293,0l6.724,6.724L49.845,36.225z" style="fill:#fff"/>
	<path d="M28.572,21.57c-3.86,0-7,3.14-7,7c0,0.552,0.448,1,1,1s1-0.448,1-1c0-2.757,2.243-5,5-5c0.552,0,1-0.448,1-1
		S29.125,21.57,28.572,21.57z" style="fill:#fff"/>
	<path d="M29.572,16.57c-7.168,0-13,5.832-13,13s5.832,13,13,13s13-5.832,13-13S36.741,16.57,29.572,16.57z M29.572,40.57
		c-6.065,0-11-4.935-11-11s4.935-11,11-11s11,4.935,11,11S35.638,40.57,29.572,40.57z" style="fill:#fff"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`
const ticksvg = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" version="1.1" width="16" height="16" fill="#000000">
  <g id="surface1">
    <path style=" fill:#fff;" d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z "/>
  </g>
</svg>
`

const hidesvg = `
  <?xml version="1.0" encoding="iso-8859-1"?>
  <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 59.049 59.049" style="enable-background:new 0 0 59.049 59.049;" xml:space="preserve">
  <g>
	<path d="M11.285,41.39c0.184,0.146,0.404,0.218,0.623,0.218c0.294,0,0.585-0.129,0.783-0.377c0.344-0.432,0.273-1.061-0.159-1.405
		c-0.801-0.638-1.577-1.331-2.305-2.06l-7.398-7.398l7.629-7.629c7.334-7.333,18.003-9.836,27.839-6.534
		c0.523,0.173,1.09-0.107,1.267-0.63c0.175-0.523-0.106-1.091-0.63-1.267c-10.562-3.545-22.016-0.857-29.89,7.016L0,30.368
		l8.812,8.812C9.593,39.962,10.426,40.705,11.285,41.39z" style="fill:#fff"/>
	<path d="M50.237,21.325c-1.348-1.348-2.826-2.564-4.394-3.616c-0.458-0.307-1.081-0.185-1.388,0.273
		c-0.308,0.458-0.185,1.08,0.273,1.388c1.46,0.979,2.838,2.113,4.094,3.369l7.398,7.398l-7.629,7.629
		c-7.385,7.385-18.513,9.882-28.352,6.356c-0.52-0.187-1.093,0.084-1.279,0.604c-0.186,0.52,0.084,1.092,0.604,1.279
		c3.182,1.14,6.49,1.693,9.776,1.693c7.621,0,15.124-2.977,20.665-8.518l9.043-9.043L50.237,21.325z" style="fill:#fff"/>
	<path d="M30.539,41.774c-2.153,0-4.251-0.598-6.07-1.73c-0.467-0.29-1.084-0.148-1.377,0.321c-0.292,0.469-0.148,1.085,0.321,1.377
		c2.135,1.33,4.6,2.032,7.126,2.032c7.444,0,13.5-6.056,13.5-13.5c0-2.685-0.787-5.279-2.275-7.502
		c-0.308-0.459-0.93-0.582-1.387-0.275c-0.459,0.308-0.582,0.929-0.275,1.387c1.267,1.893,1.937,4.102,1.937,6.39
		C42.039,36.616,36.88,41.774,30.539,41.774z" style="fill:#fff"/>
	<path d="M30.539,18.774c2.065,0,4.089,0.553,5.855,1.6c0.474,0.281,1.088,0.125,1.37-0.351c0.281-0.475,0.125-1.088-0.351-1.37
		c-2.074-1.229-4.451-1.879-6.875-1.879c-7.444,0-13.5,6.056-13.5,13.5c0,2.084,0.462,4.083,1.374,5.941
		c0.174,0.354,0.529,0.56,0.899,0.56c0.147,0,0.298-0.033,0.439-0.102c0.496-0.244,0.701-0.843,0.458-1.338
		c-0.776-1.582-1.17-3.284-1.17-5.06C19.039,23.933,24.198,18.774,30.539,18.774z" style="fill:#fff"/>
	<path d="M54.621,5.567c-0.391-0.391-1.023-0.391-1.414,0l-46.5,46.5c-0.391,0.391-0.391,1.023,0,1.414
		c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l46.5-46.5C55.012,6.591,55.012,5.958,54.621,5.567z" style="fill:#fff"/>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  </svg>
`
export interface SignupFormProps {
  history?: any;
}

export interface SignupFormState {
  email: string;
  showPassword: boolean;
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  privacyPolicy: boolean;
  emailValidate: boolean;
  agreeTermsOfServices: boolean;
  signupFailed: boolean;
  signupStage: boolean;
  passwordValidate: boolean;
  is8Characters: boolean;
  is1Numbers: boolean;
  is1LowerCases: boolean;
  is1UpperCases: boolean;
  isPasswordContainsName: boolean;
  signupFailedMessage: string;
  submitted: boolean;
  signupSuccess: boolean;
}

const style = {
  width: "80%",
  margin: "auto",
}

class SignupForm extends Component<SignupFormProps, SignupFormState> {
  constructor(props: SignupFormProps) {
    super(props);
    this.state = { 
      showPassword: false,
      email: "",
      firstName: "",
      lastName: "",
      login: "",
      password: "",
      privacyPolicy: false,
      emailValidate: true,
      agreeTermsOfServices: true,
      passwordValidate: true,
      signupFailed: false,
      signupStage: false,
      is8Characters: false,
      is1Numbers: false,
      is1LowerCases: false,
      is1UpperCases: false,
      isPasswordContainsName: false,
      signupFailedMessage: "",
      submitted: false,
      signupSuccess: false,
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({ 
      email: e.currentTarget.value, 
      emailValidate: emailRegex.test(e.currentTarget.value),
      signupFailed: false,
    })
  }

  handlePasswordChange(e: React.FormEvent<HTMLInputElement>): void {
    const { email } = this.state;

    const password = e.currentTarget.value;
    const is1UpperCases = (/[A-Z]/).test(password);
    const is1Numbers = (/[0-9]/).test(password);
    const is1LowerCases = (/[a-z]/).test(password);
    const is8Characters = password.length > 7 ? true : false;
    const isPasswordContainsName = email.indexOf(password) === -1 ? false: true;

    this.setState({
      password, 
      is1UpperCases, 
      is1Numbers, 
      is1LowerCases, 
      is8Characters,
      isPasswordContainsName,
      passwordValidate: is1UpperCases && is1Numbers && is1LowerCases && is8Characters && isPasswordContainsName,
      signupFailed: false,
    });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const { email, password } = this.state;
    if(!email || !password) { this.setState({ submitted: true}); return; };
    if (emailRegex.test(email)) {
      this.setState({ signupStage: true });
      const firstName = email.split("@")[0];
      const lastName = firstName;

      const headers: HeadersInit = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Content-Type", "application/json");
      headers.append("q", "0.01");
      headers.append("User-Agent", "request");

      fetch(`${process.env.REACT_APP_SIGNUP_URL}`, {
        method: "post",
        headers,
        body: JSON.stringify({
          userProfile: {
            email,
            firstName,
            lastName,
            password,
          }
        })
      }).then(res => res.json())
        .then(resp => {
          this.setState({ signupStage: false })
          if (resp.errorCauses) {
            this.setState({ 
              signupFailed: true,
              signupFailedMessage: resp.errorCauses[0].errorSummary
            });
          } else {
            this.setState({ signupSuccess: true });
          }
        })
    } else {
      this.setState({ emailValidate: false });
    }
  }

  render() { 
    const {
      showPassword,
      emailValidate,
      privacyPolicy,
      passwordValidate,
      signupFailed,
      signupStage,
      is1LowerCases,
      is1UpperCases,
      is8Characters,
      isPasswordContainsName,
      is1Numbers,
      signupFailedMessage,
      email,
      password,
      submitted,
      signupSuccess,
    } = this.state;

    if(signupSuccess) return <Redirect to="/verification-sent" />

    return (
      <div className="container-fluid login">
        <div className="row" style={style}>
          <div className="col-lg-5 offset-lg-1 col-xs-12">
            <Description />
          </div>
          <div className="col-lg-4 offset-lg-1 col-xs-12">
            <div className="row login-form">
              <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                  <div className="form-row title-row text-center">
                    <h4>Set-up TotalCloud to save engineering costs & time</h4>
                  </div>
                  <div className="form-row my-3 email">
                    <input
                      type="Email"
                      className="form-control context-input"
                      placeholder="Email"
                      value={ this.state.email }
                      onChange={ this.handleEmailChange }
                    />
                    {!emailValidate && <small>Email is not valid</small>}
                    {!email && submitted && <small>Email is required</small>}
                  </div>
                  <div className="form-row my-3 password">
                    <input
                      type={showPassword ? `textfield`: `password`}
                      className="form-control context-input"
                      placeholder="Set Password"
                      autoComplete="off"
                      value={ this.state.password }
                      onChange={ this.handlePasswordChange }
                    />
                    <div
                      className="agreements password-view"
                      dangerouslySetInnerHTML={{ __html: showPassword ? showsvg: hidesvg }}
                      onClick={() => this.setState({ showPassword: !showPassword})}
                    >
                    </div>
                    {!password && submitted && <small>Password is required</small>}
                  </div>
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
                      <br />
                      <small className={isPasswordContainsName ? `error`: `valid`}>
                        <div dangerouslySetInnerHTML={ { __html: isPasswordContainsName ? errorsvg: ticksvg } } />
                        <span>Does not contain part of username</span>
                      </small>
                    </div>
                  }
                  <div className="form-row agreements my-1">
                    <div>
                      {privacyPolicy   
                        ? <img 
                            src={BallotImage} width="20px" 
                            onClick={() => this.setState({ privacyPolicy: !this.state.privacyPolicy})}
                            alt="checkmark"
                          />
                        : <img 
                            src={BallotImageUncheck} width="20px"
                            onClick={() => this.setState({ privacyPolicy: !this.state.privacyPolicy})}
                            alt="checkmark"
                          />
                      }
                      <small className="text-white">Get AWS tips and tricks delivered right to your inbox.</small>
                    </div>
                  </div>
                  <div className={`form-row my-4 ${!signupFailed && `mb-1`}`}>
                    <button type="submit" className="btn btn-primary mb-2 login-button">
                      { signupStage ? `Signing Up...`: `Sign Up`}
                    </button>
                    { 
                      signupFailed &&
                        <div className={ `form-row failed-message` } style={{ width: "100%" }}>
                          <p>{signupFailedMessage}</p>
                        </div> 
                    }
                  </div>

                  <div className="form-row awstipsform text-center">
                    <small>
                      By clicking on "Sign Up", you agree to our &nbsp;
                      <Link to="/terms">Terms</Link>&nbsp; 
                      & acknowledge reading our&nbsp;
                      <Link to="/privacy">
                        Privacy Policy
                      </Link>
                    </small>
                  </div>
                  <div className="form-row mb-5 my-3 have-account text-center">
                    <h6>Already have an account?<Link to="/login">Login</Link></h6>
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