import PropTypes from "prop-types";
import Slider from "react-slick";
import React from "react";
import _ from "lodash";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./SiteCarousel.css";
import SiteOverview from "../SiteOverview/SiteOverview";
import AllSitesOverview from "../AllSitesOverview/AllSitesOverview";

import SiteSchema from "../../schemas/site";

class SiteCarousel extends React.Component {
  static propTypes = {
    sites: PropTypes.arrayOf(SiteSchema).isRequired,
    siteTapped: PropTypes.func.isRequired,
    siteChanged: PropTypes.func.isRequired,
    visible: PropTypes.bool,
    selectedSite: SiteSchema.isRequired
  };

  static defaultProps = {
    visible: true
  };

  constructor(props) {
    super(props);
    this.settings = {
      dots: false,
      infinite: true,
      arrows: false,
      slidesToShow: 5,
      speed: 200,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "0px",
      autoplay: true,
      autoplaySpeed: 5000,
      focusOnSelect: true,
      initialSlide: _.findIndex(props.sites, props.selectedSite)
    };
  }

  render() {
    const {
      visible,
      siteChanged,
      selectedSite,
      siteTapped,
      sites
    } = this.props;

    const style = { visibility: visible ? "visible" : "hidden" };
    return (
      <div className="siteCarouselPositioner" style={style}>
        {sites.length !== this.settings.slidesToShow ? (
          <SiteOverview
            person={selectedSite.person}
            label={selectedSite.label}
          />
        ) : (
          <AllSitesOverview sites={sites} selectedSite={selectedSite} />
        )}
        <div className="siteCarouselBackground" />
        <div
          className="siteCarousel"
          style={{
            width: `${this.settings.slidesToShow === 3 ? 65 : 95}%`,
            left: `${this.settings.slidesToShow === 3 ? 3.5 : 3}%`
          }}
        >
          <Slider {...this.settings} beforeChange={siteChanged}>
            {sites.map((site, key) => (
              <div
                className="slide"
                key={`div-${site.id}`}
                onClick={() => siteTapped(site.id)}
              >
                <img
                  draggable="false"
                  id={key}
                  className="innerSlide"
                  src={site.thumbnail}
                  alt={site.person}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

export default SiteCarousel;
