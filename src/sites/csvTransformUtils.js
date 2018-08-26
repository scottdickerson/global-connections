import csvtojson from "csvtojson";
import path from "path";
import find from "find";

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export const findPhotoFile = (photoId, photoDir = "details-images") => {
  const fileRegExp = new RegExp(
    `\\\\${escapeRegExp(photoId)}.*\\.(?:png|jpg)$`,
    "g"
  );
  const fileArray = find.fileSync(
    fileRegExp,
    path.join(__dirname, "..", "..", "public", "img", photoDir)
  );
  // return just the short name of the file
  return fileArray.length > 0 ? path.basename(fileArray.pop()) : null;
};

export const loadGlobalConnections = () =>
  csvtojson()
    .fromFile(path.join(__dirname, "/GlobalConnectionsText.csv"))
    .then(jsonObj => {
      const mappedObject = jsonObj
        .filter(globalSite => !globalSite.Continent) // exclude any row that's just a continent
        .map(globalSite => ({
          person: globalSite["Person/ Group/ Event Name"],
          label: globalSite["Star Point"],
          // top: translate location from the label
          // left: translate location from the label
          photoId: globalSite["Photo(s)"],
          // thumbnail: findThumbnail(photoId),
          detailImages: [
            {
              src: findPhotoFile(globalSite["Photo(s)"].split(" ").shift()), // replace with filename finder
              title: globalSite.Conflict,
              caption: globalSite.Caption,
              credit: globalSite["Photo Credit"]
            }
          ],
          learnMore: globalSite["Long Story (Opt?)"]
        }));
      const filteredSites = mappedObject.filter(
        globalSite => globalSite.photoId
      );
      const nestedSite = filteredSites.reduce((result, globalSite) => {
        // console.log(`nestedSite: ${JSON.stringify(globalSite)}`);
        if (!globalSite.person) {
          result[result.length - 1].detailImages.push(
            ...globalSite.detailImages
          );
        } else {
          result.push(globalSite);
        }
        return result;
      }, []);
      // console.log(JSON.stringify(nestedSite, null, "\t"));
      return nestedSite;
    });
