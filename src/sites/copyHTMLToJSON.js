import fs from "fs";
import path from "path";
import globalSites from "./globalSites.json";

const editedHTMLFile = fs.readFileSync(
  path.join(__dirname, "globalSitesJanet.html")
);

const linesHTML = editedHTMLFile.toString().split("<p>");
let person;
const updatedSiteMap = linesHTML.reduce((result, line) => {
  line = line.replace("</p>", ""); //eslint-disable-line
  if (line.indexOf("<strong>Person:</strong>") > -1) {
    person = line.replace("<strong>Person:</strong>", "").trim();
    result[person] = { person }; // eslint-disable-line
  }
  if (line.indexOf("<strong>Detailed Images: </strong>") > -1) {
    result[person].detailImages = []; //eslint-disable-line
  }
  if (line.indexOf("<strong>Detail Photo</strong>:") > -1) {
    result[person].detailImages.push({});
  }
  if (line.indexOf("<strong>Caption</strong>:") > -1) {
    result[person].detailImages[ // eslint-disable-line
      result[person].detailImages.length - 1
    ].caption = line.replace("<strong>Caption</strong>:", "").trim();
  }
  if (line.indexOf("<strong>Credit</strong>:") > -1) {
    result[person].detailImages[ // eslint-disable-line
      result[person].detailImages.length - 1
    ].credit = line.replace("<strong>Credit</strong>:", "").trim();
  }
  if (line.indexOf("<strong>Title</strong>:") > -1) {
    result[person].detailImages[ // eslint-disable-line
      result[person].detailImages.length - 1
    ].title = line.replace("<strong>Title</strong>:", "").trim();
  }

  if (person && line.indexOf("<strong>Learn More:</strong>") > -1) {
    result[person].learnMore = line // eslint-disable-line
      .replace("<strong>Learn More:</strong>", "")
      .trim();
  }
  return result;
}, {});

const merged = globalSites.map(site => ({
  ...site,
  learnMore: updatedSiteMap[site.person]
    ? updatedSiteMap[site.person].learnMore
    : "HELP!",
  detailImages: updatedSiteMap[site.person].detailImages.map(
    (image, index) => ({ src: site.detailImages[index].src, ...image })
  )
}));

console.log(`merged: ${JSON.stringify(merged, null, 2)}`);

fs.writeFileSync(
  path.join(__dirname, "globalSites.json"),
  JSON.stringify(merged, null, 2)
);
