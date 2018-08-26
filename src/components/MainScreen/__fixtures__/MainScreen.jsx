import React, { Component } from "react";
import OriginalMainScreen from "../MainScreen";

import sites from "../../../sites/globalSites.json";

class MainScreen extends Component {
  state = {
    selectedSite: sites[0]
  };

  handleSiteChanged = (oldsite, site) => {
    this.setState({ selectedSite: sites[site] });
  };

  render() {
    const { onSiteTapped } = this.props; // eslint-disable-line react/prop-types
    const { selectedSite } = this.state;
    return (
      <OriginalMainScreen
        sites={sites}
        selectedSite={selectedSite}
        onSiteChanged={this.handleSiteChanged}
        onSiteTapped={onSiteTapped}
      />
    );
  }
}

export default {
  component: MainScreen,
  props: {
    onSiteTapped: site => console.log(`site tapped ${JSON.stringify(site)}`)
  }
};
