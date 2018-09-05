import React, { Component } from "react";
import PropTypes from "prop-types";

class SiteSlide extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    person: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  handleClick = () => {
    const { id, onClick } = this.props;
    onClick(id);
  };

  render() {
    const { id, thumbnail, person } = this.props;
    return (
      <div className="slide" onClick={this.handleClick}>
        <img
          draggable="false"
          id={id}
          className="innerSlide"
          src={thumbnail}
          alt={person}
        />
      </div>
    );
  }
}

export default SiteSlide;
