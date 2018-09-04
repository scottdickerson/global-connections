import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import _ from "lodash";
import DetailCarousel from "../DetailCarousel/DetailCarousel";
import Details from "../Details/Details";
import MoreInfo from "../MoreInfo/MoreInfo";
import SiteSchema from "../../schemas/site";
import "./SiteDetails.css";

class SiteDetails extends Component {
  static propTypes = {
    selectedSite: SiteSchema.isRequired,
    onCloseSite: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
      moreDetails: false
    };
  }

  componentDidUpdate(prevProps) {
    const { selectedSite } = this.props;
    if (!_.isEqual(prevProps.selectedSite, selectedSite)) {
      this.setState({ imageIndex: 0, moreDetails: false }); //eslint-disable-line
    }
  }

  onImageChanged = image => {
    this.setState({
      imageIndex: image
    });
  };

  toggleMoreDetails = () => {
    console.log("toggle More Details");
    this.setState(state => ({
      moreDetails: !state.moreDetails
    }));
  };

  render() {
    const { selectedSite, onCloseSite, isOpen } = this.props;
    const { imageIndex, moreDetails } = this.state;

    return (
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={isOpen}
        timeout={1000}
        classNames="bottom"
      >
        <div className="siteDetails">
          <div className="siteDetailContent">
            <div className="siteDetailBackground" />
            {!moreDetails ? (
              <Fragment>
                <DetailCarousel
                  detailImages={selectedSite.detailImages}
                  onImageChanged={this.onImageChanged}
                />

                <Details
                  {...selectedSite}
                  {...selectedSite.detailImages[imageIndex]}
                  onMoreDetails={this.toggleMoreDetails}
                />
              </Fragment>
            ) : (
              <MoreInfo
                {...selectedSite}
                onMoreDetails={this.toggleMoreDetails}
              />
            )}
          </div>
          {!moreDetails ? (
            <img
              src="img/site-details/Button-Close-X.png"
              alt="Close"
              className="closeButton"
              onClick={onCloseSite}
            />
          ) : (
            <img
              src="img/site-details/Button-Close-X.png"
              alt="Back"
              className="closeButton"
              onClick={this.toggleMoreDetails}
            />
          )}
        </div>
      </CSSTransition>
    );
  }
}

export default SiteDetails;
