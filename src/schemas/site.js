import PropTypes from "prop-types";

export default PropTypes.shape({
  id: PropTypes.number,
  person: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  war: PropTypes.string,
  detailImages: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      caption: PropTypes.string
    })
  ),
  learnMore: PropTypes.node
});
