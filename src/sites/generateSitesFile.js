import fs from "fs";
import path from "path";
import { loadGlobalConnections } from "./csvTransformUtils";

loadGlobalConnections().then(sites => {
  fs.writeFileSync(
    path.join(__dirname, "globalSites.json"),
    JSON.stringify(sites, null, 2)
  );
  console.log(`Updated file: ${path.join(__dirname, "globalSites.json")}`);
});
