import React, { Component } from 'react';

import SignupForm from "../components/SignupForm";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <SignupForm />
    );
  }
}
 
export default Signup;