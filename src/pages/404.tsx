import * as React from 'react';

import Description from "../components/Description";

const style = {
  width: "80%",
  margin: "auto",
}

const Page404: React.FC = () => (
  <div className="container-fluid login">
    <div className="row" style={style}>
      <div className="col-lg-5 offset-lg-1 col-xs-12">
        <Description />
      </div>
      <div className="col-lg-4 offset-lg-1 col-xs-12">
        <div className="row login-form">
          <div className="form-group verification">
            <div className="form-row title-row text-center">
              <h3 className="title">404!</h3>
            </div>
            <div className="form-row text-center content">
              <h5>
                The page you are looking for might have been removed, had its name changed, or its temporarily unavailable.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Page404;