import _ from "lodash";
import globalSites from "../globalSites.json";
import { loadGlobalConnections, findPhotoFile } from "../csvTransformUtils";

describe(`csvTransformUtils`, () => {
  test("loadGlobalConnections", done =>
    loadGlobalConnections().then(jsonObject => {
      expect(jsonObject).toBeDefined();
      const missingSites = jsonObject.map(site => ({
        person: `${site.photoId} ${site.person}`,
        missingThumbnail: !site.thumbnail,
        missingImageSrc: _.some(site.detailImages, { src: null }),
        detailImages: site.detailImages
      }));
      console.log(
        `missingSites: ${JSON.stringify(
          missingSites.filter(site => site.missingImageSrc),
          null,
          "\t"
        )}`
      );

      console.log(
        `missingThumbnails: ${JSON.stringify(
          missingSites.filter(site => site.missingThumbnail).map(site => {
            _.unset(site, "detailImages");
            return site;
          }),
          null,
          "\t"
        )}`
      );
      done();
    }));
  test("findPhotoFile", () => {
    expect(findPhotoFile("4.0")).toBeDefined();
  });
  test("long credit", () => {
    globalSites.map(globalSite =>
      globalSite.detailImages.map(detailImage => {
        console.log(detailImage.credit);
        expect(detailImage.credit.length < 79).toEqual(true);
      })
    );
  });
});
