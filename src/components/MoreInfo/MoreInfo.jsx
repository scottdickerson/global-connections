import React from "react";
import PropTypes from "prop-types";
import "./MoreInfo.css";

const propTypes = {
  person: PropTypes.string.isRequired,
  learnMore: PropTypes.string.isRequired
};

const MoreInfo = props => {
  const { learnMore, person } = props;
  return (
    <div className="moreInfo">
      <div className="moreInfoImage">
        <img
          draggable="false"
          src="img/Header-ReadMore.png"
          alt="More Details"
        />
      </div>
      <span className="moreInfoPerson">{person}</span>
      <div className="moreInfoContent">
        {learnMore.split("\n\n").map(paragraph => (
          <p>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

MoreInfo.propTypes = propTypes;

export default MoreInfo;
