import React from "react";
import PropTypes from "prop-types";

import "./SiteStar.css";

const SiteStar = props => {
  const { active, top, left } = props;
  const imgSrc = active ? "Star-LIT.png" : "Star-50percentLIT.png";
  const style = {
    position: "absolute",
    top,
    left
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
