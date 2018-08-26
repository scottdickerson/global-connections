import React from "react";
import PropTypes from "prop-types";

import "./Intro.css";

const propTypes = {
  intro: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  callToAction: PropTypes.string.isRequired
};

const Intro = props => {
  const { intro, details, callToAction } = props;
  return (
    <div className="intro">
      <div className="introText">
        {intro.split(";").map((line, index, { length }) => (
          <span>
            {`${line}${index + 1 !== length ? ";" : ""}`}
            <br />
          </span>
        ))}
      </div>
      <div className="introDetails">
        <div className="introDetailsText">
          {details}
          {callToAction}
        </div>
      </div>
    </div>
  );
};

Intro.propTypes = propTypes;

export default Intro;
