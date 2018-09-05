import SiteSlide from "../SiteSlide";

export default {
  component: SiteSlide,
  props: {
    onClick: id => console.log(`clicked! ${id}`),
    id: "myid",
    thumbnail: "img\\carousel-images\\25.1-4_5x6_5-JamesWimberlyLewis.png",
    person: "Perry Rains"
  }
};
