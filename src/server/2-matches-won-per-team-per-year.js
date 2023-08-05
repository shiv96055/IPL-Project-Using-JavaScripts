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
    function countMatchesWonPerTeamPerYear(dataArray) {
      const countMatchesWonPerTeamInYear = {};

      dataArray.forEach((match) => {
        const season = match.season;
        const winnerTeam = match.winner;

        if (countMatchesWonPerTeamInYear[season]) {
          if (countMatchesWonPerTeamInYear[season][winnerTeam]) {
            countMatchesWonPerTeamInYear[season][winnerTeam]++;
          } else {
            countMatchesWonPerTeamInYear[season][winnerTeam] = 1;
          }
        } else {
          countMatchesWonPerTeamInYear[season] = { [winnerTeam]: 1 };
        }
      });
      return countMatchesWonPerTeamInYear;
    }

    const countMatchesWonPerTeamInYear =
      countMatchesWonPerTeamPerYear(dataArray);
    const jsonContent = JSON.stringify(countMatchesWonPerTeamInYear, null, 2);

    const filePath = "src/public/output/matchesWonPerTeamPerYear.json";
    fs.writeFile(filePath, jsonContent, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log(
          "countMatchesWonPerTeamInYear object has been written to ",
          filePath
        );
      }
    });
  });
