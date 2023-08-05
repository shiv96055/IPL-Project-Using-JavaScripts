const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const csvFilePath = path.join(__dirname, "../data/matches.csv");
console.log(csvFilePath);
const dataArray = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    dataArray.push(row);
  })
  .on("end", () => {

    function countMatchesPerSeason(dataArray) {
      const matchesPerSeason = {};

      dataArray.forEach((match) => {
        const season = match.season;
        if (matchesPerSeason[season]) {
          matchesPerSeason[season]++;
        } else {
          matchesPerSeason[season] = 1;
        }
      });

      return matchesPerSeason;
    }

    const matchesPerSeason = countMatchesPerSeason(dataArray);
    const jsonContent = JSON.stringify(matchesPerSeason, null, 2);

    const filePath = "src/public/output/matchesPerYear.json";
    fs.writeFile(filePath, jsonContent, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("matchesPerSeason object has been written to", filePath);
      }
    });
  });
