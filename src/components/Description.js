import React from 'react';
import Logo from "../assets/images/totalcloud.png";
import Group from "../assets/images/group.png";

const Description = () => (
  <div className="row description">
    <img src={ Logo } alt="Logo" />
    <h3>
      Create cloud management platform using powerful pictorial workflows that enables one to automate specific tasks triggered.
    </h3>
    <ul>
      {
        [
         `Create cloud management platform using powerful pictorial workflows that enables one to automate specific tasks triggered.`,
         `Create cloud management platform using powerful pictorial workflows that enables one to automate specific tasks triggered.`,
         `Create cloud management platform using powerful pictorial workflows that enables one to automate specific tasks triggered.`
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