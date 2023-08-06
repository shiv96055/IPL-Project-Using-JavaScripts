const fs = require("fs");
const dataArray = require("./index.js");

function storeMatchId() {
  const storeId = [];
  dataArray.matches.forEach((match) => {
    const season = match.season;
    if (season === "2016") {
      storeId.push(match.id);
    }
  });

  return storeId;
}

const storeId = storeMatchId();

function countExtraRunPerTeamIn2016() {
  const countExtraRun = {};
  dataArray.deliveries.forEach((delivery) => {
    const matchId = delivery.match_id;
    if (storeId.indexOf(matchId) !== -1) {
      const run = Number(delivery.extra_runs);
      const team = delivery.bowling_team;

      if (countExtraRun[team]) {
        countExtraRun[team] = countExtraRun[team] + run;
      } else {
        countExtraRun[team] = run;
      }
    }
  });

  return countExtraRun;
}

const countExtraRun = countExtraRunPerTeamIn2016();
const jsonContent = JSON.stringify(countExtraRun, null, 2);

const filePath =
  "src/public/output/3-extra-run-conceded-per-team-per-year.json";
fs.writeFile(filePath, jsonContent, "utf8", (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log(
      "countExtraRunPerTeamIn2016 object has been written to ",
      filePath
    );
  }
});
