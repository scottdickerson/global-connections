import React, { Component } from "react";

import "./App.css";

import sites from "../sites/globalSites.json";
import MainScreen from "../components/MainScreen/MainScreen";
import TopTitle from "../components/TopTitle/TopTitle";
import SiteDetails from "../components/SiteDetails/SiteDetails";

class App extends Component {
  state = {
    selectedSite: sites[0],
    isSiteOpen: false
  };

  componentDidMount() {
    this.clickListener = document.addEventListener("click", this.waitForIdle);
    this.tapListener = document.addEventListener("touchEnd", this.waitForIdle);
    this.waitForIdle();
  }

  componentWillUnmount() {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
    }
    document.removeEventListener(this.clickListener);
    document.removeEventListener(this.tapListener);
  }

  waitForIdle = () => {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      clearTimeout(this.resetTimeout);
    }
    this.idleTimeout = setTimeout(() => this.resetState(), 180000);
    this.resetTimeout = setTimeout(() => window.location.reload(true), 360000);
  };

  resetState = () => {
    this.setState({ isSiteOpen: false });
  };

  handleSiteToggle = (siteId, event) => {
    const { isSiteOpen, selectedSite } = this.state;
    if (isSiteOpen || selectedSite.id === siteId) {
      if (event) {
        // workaround to prevent infinite loop
        event.stopPropagation();
        event.preventDefault();
      }
      this.setState(state => ({ isSiteOpen: !state.isSiteOpen }));
    }
  };

  handleSiteChanged = (oldSite, site) => {
    this.setState({ selectedSite: sites[site] });
  };

  render() {
    const { isSiteOpen, selectedSite } = this.state;
    return (
      <div className="app">
        <TopTitle>Global Connections</TopTitle>
        {!isSiteOpen ? (
          <MainScreen
            sites={sites}
            selectedSite={selectedSite}
            onSiteTapped={this.handleSiteToggle}
            onSiteChanged={this.handleSiteChanged}
          />
        ) : null}
        <SiteDetails
          isOpen={isSiteOpen}
          onCloseSite={this.handleSiteToggle}
          selectedSite={selectedSite}
        />
      </div>
    );
  }
}

export default App;
