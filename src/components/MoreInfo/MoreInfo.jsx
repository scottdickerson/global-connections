import React from "react";
import PropTypes from "prop-types";
import ReactHTMLParser from "react-html-parser";
import "./MoreInfo.css";

const propTypes = {
  person: PropTypes.string.isRequired,
  learnMore: PropTypes.node.isRequired
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
        <p>{ReactHTMLParser(learnMore)}</p>
      </div>
    </div>
  );
};

MoreInfo.propTypes = propTypes;

export default MoreInfo;
