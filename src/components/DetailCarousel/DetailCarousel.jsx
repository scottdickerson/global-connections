import Slider from "react-slick";
import React from "react";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./DetailCarousel.css";

const propTypes = {
  detailImages: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired
    })
  ).isRequired,
  onImageChanged: PropTypes.func.isRequired
};

const settings = {
  dots: true,
  infinite: true,
  arrows: true,
  speed: 200,
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 25000,
  variableWidth: true,
  adaptiveHeight: true,
  centerMode: true,
  centerPadding: "50px"
};

const DetailCarousel = props => {
  const { detailImages, onImageChanged } = props;
  const imagesMap = detailImages.map((imageDetails, key) => (
    <div key={`details-${imageDetails.caption}`}>
      <img
        className="image"
        draggable="false"
        key={`imageDetail${imageDetails.caption}`}
        id={key}
        src={imageDetails.src}
        alt={imageDetails.caption}
      />
    </div>
  ));
  return (
    <div className="detailImageCarousel">
      {detailImages.length > 1 ? (
        <Slider {...settings} afterChange={onImageChanged}>
          {imagesMap}
        </Slider>
      ) : (
        imagesMap
      )}
    </div>
  );
};

DetailCarousel.propTypes = propTypes;

export default DetailCarousel;
