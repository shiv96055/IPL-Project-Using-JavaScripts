const fs = require("fs");
const dataArray = require("./index.js");

function storeMatchId() {
  const storeId = [];
  dataArray.matches.forEach((match) => {
    const season = match.season;
    if (season === "2015") {
      storeId.push(match.id);
    }
  });

  return storeId;
}

const storeId = storeMatchId();

function topTenEconomicalBowlerIn2015() {
  const countBowlerRun = {};
  const countBowlerBall = {};

  dataArray.deliveries.forEach((delivery) => {
    const matchId = delivery.match_id;

    if (storeId.indexOf(matchId) !== -1) {
      const run = Number(delivery.total_runs);
      const bowler = delivery.bowler;

      if (
        Number(delivery.noball_runs) === 0 &&
        Number(delivery.wide_runs) === 0
      ) {
        countBowlerBall[bowler] = (countBowlerBall[bowler] || 0) + 1;
      }

      countBowlerRun[bowler] = (countBowlerRun[bowler] || 0) + run;
    }
  });

  const topTenEconomicalBowler = {};

  for (const bowler in countBowlerRun) {
    const runs = countBowlerRun[bowler];
    const balls = countBowlerBall[bowler] || 1;
    const economyRate = (runs / balls) * 6.0;
    topTenEconomicalBowler[bowler] = economyRate;
  }

  const sortedTopTen = Object.fromEntries(
    Object.entries(topTenEconomicalBowler)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 10)
  );

  return sortedTopTen;
}

const topTenEconomicalBowler = topTenEconomicalBowlerIn2015();

const jsonContent = JSON.stringify(topTenEconomicalBowler, null, 2);

const filePath = "src/public/output/4-top-10-economical-bowler-in-2015.json";
fs.writeFile(filePath, jsonContent, "utf8", (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("topTenEconomicalBowler object has been written to ", filePath);
  }
});
