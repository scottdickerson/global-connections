import React from "react";
import PropTypes from "prop-types";
import "./Details.css";
import ReactHTMLParser from "react-html-parser";

const propTypes = {
  label: PropTypes.node.isRequired,
  person: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  caption: PropTypes.node.isRequired,
  credit: PropTypes.node.isRequired,
  learnMore: PropTypes.node,
  onMoreDetails: PropTypes.func
};

const defaultProps = {
  learnMore: undefined,
  onMoreDetails: undefined
};

const Details = props => {
  const {
    label,
    person,
    title,
    caption,
    credit,
    learnMore,
    onMoreDetails
  } = props;

  return (
    <div className="rightDetails">
      <div className="locationDetails label ">{`${label}`}</div>
      <img className="separator" src="img/Lines-TwoYellowDividers.png" alt="" />
      <div className="personDetails person">{person}</div>
      <img className="separator" src="img/Lines-TwoYellowDividers.png" alt="" />
      <div className="imageDetails">
        <p className="imageTitle">{ReactHTMLParser(title)}</p>
        <div className="imageCaption">
          <p>{ReactHTMLParser(caption)}</p>
        </div>
      </div>
      <img className="separator" src="img/Line-CreamDotted.png" alt="" />
      <div className="credit">{ReactHTMLParser(credit)}</div>
      {learnMore ? (
        <div className="moreDetailsImage">
          <img
            draggable="false"
            src="img/Button-WantToLearnMore.png"
            alt="More Details"
            onTouchStart={onMoreDetails}
            onClick={onMoreDetails}
          />
        </div>
      ) : null}
    </div>
  );
};

Details.propTypes = propTypes;
Details.defaultProps = defaultProps;
export default Details;
