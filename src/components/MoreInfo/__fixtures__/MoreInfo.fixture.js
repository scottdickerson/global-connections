import loremIpsum from "lorem-ipsum";
import MoreInfo from "../MoreInfo";

export default {
  component: MoreInfo,
  props: {
    person: "Scott Dickerson",
    learnMore: loremIpsum({ count: 50, paragraphUpperBound: 5, format: "html" })
  }
};
