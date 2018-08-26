import _ from "lodash";
import { loadGlobalConnections, findPhotoFile } from "./csvTransformUtils";

describe(`csvTransformUtils`, () => {
  test("loadGlobalConnections", done =>
    loadGlobalConnections().then(jsonObject => {
      expect(jsonObject).toBeDefined();
      const missingSites = jsonObject.map(site => ({
        person: `${site.photoId} ${site.person}`,
        missingImageSrc: _.some(site.detailImages, { src: null })
      }));
      console.log(
        `missingSites: ${JSON.stringify(
          missingSites.filter(site => site.missingImageSrc),
          null,
          "\t"
        )}`
      );
      done();
    }));
  test("findPhotoFile", () => {
    expect(findPhotoFile("4.0")).toBeDefined();
  });
});
