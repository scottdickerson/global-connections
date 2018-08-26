import loadGlobalConnections from "./csvTransformUtils";

describe(`csvTransformUtils`, () => {
  test("loadGlobalConnections", () =>
    loadGlobalConnections().then(jsonObject =>
      expect(jsonObject).toBeDefined()
    ));
});
