import csvtojson from "csvtojson";
import path from "path";

const loadGlobalConnections = () =>
  csvtojson()
    .fromFile(path.join(__dirname, "/GlobalConnectionsText.csv"))
    .then(jsonObj => jsonObj);

export default loadGlobalConnections;
