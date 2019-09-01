import React from 'react';
import { Link } from "react-router-dom";
import Logo from "../assets/images/totalcloud.png";
import Group from "../assets/images/group.png";

const Description: React.FC = () => (
  <div className="row description">
    <Link to="/">
      <img src={ Logo } alt="Logo" />
    </Link>
    <h3>
      A single tool to automate every AWS resource, the way you want.
    </h3>
    <ul>
      {
        [
          `No need to integrate multiple tools`,
          `Create completely customized workflows or pick from a wide range of 80+ templates`,
          `Pick from read-only or actionable workflow to drive efficiency`,
          `Eliminate the need for code by using predefined nodes to achieve any use case`
        ].map((item, key) => (
          <li key={ key }>
            <span>
              {item}
            </span>
          </li>
        ))
      }
    </ul>
    <img src={ Group } className="group" alt="Group" />
  </div>
)

export default Description;