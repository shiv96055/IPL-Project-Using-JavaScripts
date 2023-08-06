const fs = require("fs");

function readCSV(filename) {
  const csvData = fs.readFileSync(filename, "utf8");
  const rows = csvData.trim().split("\n");
  const header = rows.shift().split(",");

  const data = rows.map((row) => {
    const values = row.split(",");
    const entry = {};

    header.forEach((col, index) => {
      entry[col] = values[index];
    });

    return entry;
  });

  return data;
}

const matches = readCSV("src/data/matches.csv");
const deliveries = readCSV("src/data/deliveries.csv");
module.exports = { matches, deliveries };
