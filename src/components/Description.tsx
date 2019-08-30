import React from 'react';
import Logo from "../assets/images/totalcloud.png";
import Group from "../assets/images/group.png";

const Description: React.FC = () => (
  <div className="row description">
    <img src={ Logo } alt="Logo" />
    <h3>
      A single tool to automate every AWS resource, the way you want.
    </h3>
    <ul>
      {
        [
          `Hassle-free AWS automation to flexibly manage your cloud.`,
          `No need to integrate multiple tools`,
          `Create powerful workflows or simply pick from a wide range of predefined workflows.`,
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
    <img src={ Group } alt="Group" />
  </div>
)

export default Description;