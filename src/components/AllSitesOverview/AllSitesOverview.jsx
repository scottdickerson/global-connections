import React from "react";
import PropTypes from "prop-types";
import SiteSchema from "../../schemas/site";

import "./AllSitesOverview.css";

const propTypes = {
  sites: PropTypes.arrayOf(SiteSchema).isRequired,
  selectedSite: SiteSchema.isRequired
};

const AllSitesOverview = props => {
  const { sites } = props;
  return (
    <div className="allSitesOverview">
      <div className="allSitesOverviewRow">
        {sites.map(site => (
          <div key={`sitecol-${site.id}`} className="allSitesOverviewCol">
            <div
              key={`siteperson${site.id}`}
              className={
                site.id === props.selectedSite.id
                  ? "person-medium"
                  : "person-small"
              }
            >
              {site.person}
            </div>
            <div
              key={`sitelabel${site.id}`}
              className={
                site.id === props.selectedSite.id
                  ? "label-medium"
                  : "label-small"
              }
            >
              {site.label}
            </div>
          </div>
        ))}
      </div>
      <img src="img/Line-SingleWhite.png" alt="" className="inline-separator" />
    </div>
  );
};

AllSitesOverview.propTypes = propTypes;

export default AllSitesOverview;
