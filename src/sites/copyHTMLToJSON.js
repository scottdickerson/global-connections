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
  if (person && line.indexOf("<strong>Learn More:</strong>") > -1) {
    result[person].learnMore = line // eslint-disable-line
      .replace("<strong>Learn More:</strong>", "")
      .trim();
  }
  return result;
}, {});

console.log(
  `merged: ${JSON.stringify(
    globalSites.map(site => ({
      ...site,
      learnMore: updatedSiteMap[site.person]
        ? updatedSiteMap[site.person].learnMore
        : "HELP!"
    })),
    null,
    2
  )}`
);

fs.writeFileSync(
  path.join(__dirname, "globalSites.json"),
  JSON.stringify(
    globalSites.map(site => ({
      ...site,
      learnMore: updatedSiteMap[site.person]
        ? updatedSiteMap[site.person].learnMore
        : "HELP!"
    })),
    null,
    2
  )
);
