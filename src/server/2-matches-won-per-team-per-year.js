const fs = require("fs");
const dataArray = require("./index.js");

function countMatchWonPerTeam() {
  const countMatchWonPerTeamPerYear = {};
  dataArray.matches.forEach((match) => {
    const season = match.season;
    const winnerTeam = match.winner;

    if (countMatchWonPerTeamPerYear[season]) {
      if (countMatchWonPerTeamPerYear[season][winnerTeam]) {
        countMatchWonPerTeamPerYear[season][winnerTeam]++;
      } else {
        countMatchWonPerTeamPerYear[season][winnerTeam] = 1;
      }
    } else {
      countMatchWonPerTeamPerYear[season] = { [winnerTeam]: 1 };
    }
  });

  return countMatchWonPerTeamPerYear;
}

const countMatchWonPerTeamPerYear = countMatchWonPerTeam();
const jsonContent = JSON.stringify(countMatchWonPerTeamPerYear, null, 2);

const filePath = "src/public/output/2-matches-won-per-team-per-year.json";
fs.writeFile(filePath, jsonContent, "utf8", (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log(
      "countMatchWonPerTeamPerYear object has been written to ",
      filePath
    );
  }
});
