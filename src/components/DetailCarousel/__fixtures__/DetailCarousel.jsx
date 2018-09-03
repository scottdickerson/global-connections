import DetailCarousel from "../DetailCarousel";

import sites from "../../../sites/globalSites.json";

export default [
  {
    component: DetailCarousel,
    name: "singleImage",
    props: {
      detailImages: sites[0].detailImages,
      onImageChanged: image => console.log(`image changed ${image}`)
    }
  },
  {
    component: DetailCarousel,
    name: "multiple images",
    props: {
      detailImages: sites[3].detailImages,
      onImageChanged: image => console.log(`image changed ${image}`)
    }
  }
];
