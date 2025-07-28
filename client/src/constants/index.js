export const { VITE_BASE_API_URL } = import.meta.env;

export const API = {
  GET_DRUGS_DATA: (order = "descending", selectedCompany = "") =>
    `${VITE_BASE_API_URL}/drug-data?order=${order}&company=${selectedCompany}`,
  GET_COMPANIES: `${VITE_BASE_API_URL}/distinct-companies`,
};

export const ORDER = {
  ASCENDING: "ascending",
  DESCENDING: "descending",
};
