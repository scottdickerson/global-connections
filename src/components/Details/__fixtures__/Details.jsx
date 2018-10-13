import Details from "../Details";

import sites from "../../../sites/globalSites.json";

export default [
  {
    component: Details,
    name: "normal",
    props: {
      ...sites[0],
      ...sites[0].detailImages[0],
      onMoreDetails: moreDetails => console.log(`more details: ${moreDetails}`),
      onCloseDetails: closeDetails =>
        console.log(`close details: ${closeDetails}`)
    }
  },
  {
    component: Details,
    name: "HTML Characters",
    props: {
      label: "Label",
      person: "Person",
      title: "Title",
      caption:
        "The <em>Nevada</em> was hit by one torpedo from a dive bomber during the second wave of attacks. Bennett, who was cleaning up in the mess hall, rushed to his battle station.",
      credit: "USS <em>Nevada</em> After Torpedo Attack, 1941 | Public Domain",
      learnMore: "more stuff",
      onMoreDetails: moreDetails => console.log(`more details: ${moreDetails}`),
      onCloseDetails: closeDetails =>
        console.log(`close details: ${closeDetails}`)
    }
  }
];
