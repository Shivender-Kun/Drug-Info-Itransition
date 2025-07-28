const {
  getDrugData,
  addDrugData,
  addStoredDrugData,
  getDistinctCompanies,
} = require("../controllers");
const routes = require("express").Router();

routes.get("/drug-data", getDrugData);
routes.get("/distinct-companies", getDistinctCompanies);
// routes.post("/drug-data", addDrugData);
// routes.post("/all-drug-data", addStoredDrugData);

module.exports = { routes };
