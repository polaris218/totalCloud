import * as React from 'react';

import Description from "../components/Description";

const style = {
  width: "80%",
  margin: "auto",
}

const Verification: React.FC = () => (
  <div className="container-fluid login">
    <div className="row" style={style}>
      <div className="col-lg-5 offset-lg-1 col-xs-12">
        <Description />
      </div>
      <div className="col-lg-4 offset-lg-1 col-xs-12">
        <div className="row login-form">
          <div className="form-group verification">
            <div className="form-row title-row text-center">
              <h3 className="title">Verification Link Sent</h3>
            </div>
            <div className="form-row text-center content">
              <h5>
                You have been sent a verification link on your email. Please access the link to complete the registration.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Verification;