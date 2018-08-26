import sites from "../../../sites/globalSites.json";

import SiteDetails from "../SiteDetails";

export default [
  {
    component: SiteDetails,
    name: "more details off",
    props: {
      selectedSite: sites[0],
      isOpen: true,
      onCloseSite: () => console.log(`close site `)
    }
  },
  {
    component: SiteDetails,
    name: "more details on",
    props: {
      selectedSite: sites[0],
      isOpen: true,
      onCloseSite: () => console.log(`close site `)
    },
    state: {
      moreDetails: true
    }
  }
];
