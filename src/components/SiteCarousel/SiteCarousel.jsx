import PropTypes from "prop-types";
import Slider from "react-slick";
import React from "react";
import _ from "lodash";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./SiteCarousel.css";
import SiteOverview from "../SiteOverview/SiteOverview";
import SiteSlide from "../SiteSlide/SiteSlide";
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
      speed: 500,
      cssEase: "ease-out",
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "0px",
      autoplay: true,
      autoplaySpeed: 5000,
      focusOnSelect: true,
      draggable: true,
      swipeToSlide: true,
      initialSlide: _.findIndex(props.sites, props.selectedSite)
    };
  }

  componentWillUnmount() {
    clearTimeout(this.swipeTimeout);
  }

  swiped = () => {
    this.recentlySwiped = true;
    clearTimeout(this.swipeTimeout);
    this.swipeTimeout = setTimeout(() => {
      this.recentlySwiped = false;
    }, 300);
  };

  siteTapped = (id, event) => {
    const { siteTapped } = this.props;
    if (!this.recentlySwiped) {
      siteTapped(id, event);
    }
  };

  render() {
    const { visible, siteChanged, selectedSite, sites } = this.props;

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
            left: `${this.settings.slidesToShow === 3 ? 3.5 : 1}%`
          }}
        >
          <Slider
            {...this.settings}
            beforeChange={siteChanged}
            onSwipe={this.swiped}
          >
            {sites.map(site => (
              <SiteSlide
                {...site}
                key={`div-${site.id}`}
                onClick={this.siteTapped}
              />
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

export default SiteCarousel;
