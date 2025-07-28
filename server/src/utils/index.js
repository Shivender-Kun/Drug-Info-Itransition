const sortDrugData = (array = [], order = "descending") => {
  const sorted = array.sort((a, b) => {
    const aTime = new Date(a.launchDate).getTime();
    const bTime = new Date(b.launchDate).getTime();

    if (aTime > bTime) return order === "descending" ? -1 : 1;
    if (aTime < bTime) return order === "descending" ? 1 : -1;
  });

  return sorted;
};

module.exports = {
  sortDrugData,
};
