import csvtojson from "csvtojson";
import path from "path";
import find from "find";

const starMap = [
  {
    name: "Monterrey, Mexico",
    top: 360,
    left: 335
  },
  {
    name: "Mexico City, Mexico",
    top: 385,
    left: 340
  },
  {
    name: "Richmond, Virginia",
    top: 300,
    left: 455
  },
  {
    name: "Fort Lancaster, Texas",
    top: 340,
    left: 340
  },
  {
    name: "Springfield, Missouri",
    top: 300,
    left: 410
  },
  {
    name: "Appomattox, Virginia",
    top: 300,
    left: 445
  },
  {
    name: "Santiago, Cuba",
    top: 390,
    left: 450
  },
  {
    name: "Guerrero, Mexico",
    top: 395,
    left: 330
  },
  {
    name: "Ceiba, Puerto Rico",
    top: 395,
    left: 495
  },
  {
    name: "Luzon, Philippines",
    top: 400,
    left: 1370
  },
  {
    name: "Balanga, Phillippines",
    top: 410,
    left: 1370
  },
  {
    name: "Santa Rita, Guam",
    top: 420,
    left: 1475
  },
  {
    name: "Pearl Harbor, Hawaii",
    top: 375,
    left: 80
  },
  {
    name: "Papua New Guinea",
    top: 520,
    left: 1475
  },
  {
    name: "Java Sea",
    top: 520,
    left: 1340
  }
];

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
  return path.join(
    "img",
    photoDir,
    path.basename(fileArray.length > 0 ? fileArray.pop() : "")
  );
};

export const loadGlobalConnections = () =>
  csvtojson()
    .fromFile(path.join(__dirname, "/GlobalConnectionsText.csv"))
    .then(jsonObj => {
      const mappedObject = jsonObj
        .filter(globalSite => !globalSite.Continent) // exclude any row that's just a continent
        .map((globalSite, index) => {
          const starPoint = starMap.find(
            star => star.name === globalSite["Star Point"]
          );
          return {
            person: globalSite["Person/ Group/ Event Name"],
            name: globalSite["Star Point"],
            id: index,
            top: starPoint ? starPoint.top : 800,
            left: starPoint ? starPoint.left : 800,
            photoId: globalSite["Photo(s)"],
            thumbnail: findPhotoFile(
              globalSite["Photo(s)"].split(" ").shift(),
              "carousel-images"
            ),
            detailImages: [
              {
                src: findPhotoFile(globalSite["Photo(s)"].split(" ").shift()), // replace with filename finder
                title: globalSite.Conflict,
                caption: globalSite.Caption,
                credit: globalSite["Photo Credit"]
              }
            ],
            learnMore: globalSite["Long Story (Opt?)"]
          };
        });
      const filteredSites = mappedObject.filter(
        globalSite => globalSite.photoId
      );
      const nestedSite = filteredSites.reduce((result, globalSite) => {
        if (!globalSite.person) {
          result[result.length - 1].detailImages.push(
            ...globalSite.detailImages
          );
        } else {
          result.push(globalSite);
        }
        return result;
      }, []);
      return nestedSite;
    });
