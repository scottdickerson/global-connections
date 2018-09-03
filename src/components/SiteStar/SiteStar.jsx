import React from "react";
import PropTypes from "prop-types";

import "./SiteStar.css";

const SiteStar = props => {
  const { active, top, left } = props;
  const windowHeight = window.screen.height;
  const windowWidth = window.screen.width;
  const imgSrc = active ? "Star-LIT.png" : "Star-50percentLIT.png";
  const style = {
    position: "absolute",
    opacity: 1,
    top: (top * windowHeight) / 900 - 32, // adjust for star height, original measurements were on a 1600x900 monitor
    left: (left * windowWidth) / 1600 - 32 // adjust for star width
  };
  return (
    <img
      className="siteStar"
      src={`img/${imgSrc}`}
      style={style}
      alt="imgSrc"
    />
  );
};

SiteStar.propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired
};

export default SiteStar;
