const fs = require("fs");
const dataArray = require("./index.js");

function countMatchesPerSeason() {
  const matchesPerSeason = {};

  dataArray.matches.forEach((match) => {
    const season = match.season;
    if (matchesPerSeason[season]) {
      matchesPerSeason[season]++;
    } else {
      matchesPerSeason[season] = 1;
    }
  });

  return matchesPerSeason;
}

const matchesPerSeason = countMatchesPerSeason();
const jsonContent = JSON.stringify(matchesPerSeason, null, 2);

const filePath = "src/public/output/matchesPerYear.json";
fs.writeFile(filePath, jsonContent, "utf8", (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("matchesPerSeason object has been written to", filePath);
  }
});
