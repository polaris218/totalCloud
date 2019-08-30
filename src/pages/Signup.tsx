import React, { Component } from 'react';

import SignupForm from "../components/SignupForm";

export interface SignupProps {

}

export interface SignupState {

}

class Signup extends Component<SignupProps, SignupState> {
  render() { 
    return ( 
      <SignupForm />
    );
  }
}
 
export default Signup;