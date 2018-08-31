import fs from "fs";
import path from "path";
import { loadGlobalConnections } from "./csvTransformUtils";

loadGlobalConnections().then(sites => {
  console.log(`sites! ${JSON.stringify(sites)}`);
  fs.writeFileSync(
    path.join(__dirname, "globalSites.json"),
    JSON.stringify(sites, null, 2)
  );
});
