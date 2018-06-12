import React from "react";
import PropTypes from "prop-types";

import SiteCarousel from "../../components/SiteCarousel/SiteCarousel";
import SiteStar from "../../components/SiteStar/SiteStar";
import SiteSchema from "../../schemas/site";
import Intro from "../../components/Intro/Intro";
import TopTitle from "../../components/TopTitle/TopTitle";

import introJson from "../../sites/intro.json";

import "./MainScreen.css";

const propTypes = {
  sites: PropTypes.arrayOf(SiteSchema).isRequired,
  selectedSite: SiteSchema.isRequired,
  onSiteTapped: PropTypes.func.isRequired,
  onSiteChanged: PropTypes.func.isRequired,
  titleImageURL: PropTypes.string.isRequired,
  titleText: PropTypes.string.isRequired
};

const MainScreen = props => {
  const {
    sites,
    selectedSite,
    onSiteTapped,
    onSiteChanged,
    titleImageURL,
    titleText
  } = props;
  return (
    <div className="mainScreen">
      <TopTitle titleImageURL={titleImageURL} titleText={titleText} />
      <Intro {...introJson} />
      {sites[0].top // If I have locations on the map
        ? sites.map(site => (
          <SiteStar
              top={site.top}
              left={site.left}
              key={`sitestar-${site.id}`}
              active={selectedSite === site}
            />
          ))
        : null}
      <SiteCarousel
        sites={sites}
        selectedSite={selectedSite}
        siteTapped={onSiteTapped}
        siteChanged={onSiteChanged}
      />
    </div>
  );
};

MainScreen.propTypes = propTypes;
export default MainScreen;
