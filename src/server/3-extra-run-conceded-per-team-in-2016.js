const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const csvFilePathForMatches = path.join(__dirname,  "../data/matches.csv");
const csvFilePathForDeliveries = path.join(__dirname, "../data/deliveries.csv");

const dataArrayForMatch = [];
const storeId = [];
fs.createReadStream(csvFilePathForMatches)
.pipe(csv())
.on("data", (row) => {
    dataArrayForMatch.push(row);
})
.on("end", ()=>{
    function storeMatchId(dataArrayForMatch){   
        const storeId = [];
        dataArrayForMatch.forEach(match => {
            const season = match.season;
            if(season == '2016'){
                storeId.push(match.id);
            }
        });

        return storeId;
    }
 
     const storeId = storeMatchId(dataArrayForMatch);
     console.log(storeId);
     
});
//module.exports.deliveries=deliveries;
//module.exports.matches=matches;
// module.exports={deliveries,matches}