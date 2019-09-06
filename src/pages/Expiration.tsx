import * as React from 'react';

import Description from "../components/Description";

const style = {
  width: "80%",
  margin: "auto",
}

const Expiration: React.FC = () => (
  <div className="container-fluid login">
    <div className="row" style={style}>
      <div className="col-lg-5 offset-lg-1 col-xs-12">
        <Description />
      </div>
      <div className="col-lg-4 offset-lg-1 col-xs-12">
        <div className="row login-form">
          <div className="form-group verification">
            <div className="form-row title-row text-center">
              <h3 className="title">Expired</h3>
            </div>
            <div className="form-row text-center content">
              <h5>
                Your password reset link is Expired. Please try again to reset your password
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Expiration;