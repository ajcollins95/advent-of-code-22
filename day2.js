var fs = require("fs");

// Asynchronous read
/*
fs.readFile('input.txt', function (err, data) {
   if (err) {
      return console.error(err);
   }
   rawData = data.toString()
   //console.log("Asynchronous read: " + data.toString());
});
*/

//ingest data
var data = fs.readFileSync('input.txt');
var rawData = data.toString();

 const convertRawToRoundArray = (rawInput) => {
    //for (let i = 0; i < rawData.legnth(); i++) {
    let roundArray = []
    let roundInputLen = 4
    let spaceIndex = 1
    let tabIndex = 3
    let round = [];
    for (let i = 0; i < rawInput.length; i++) {
        let c = rawInput[i];
        if (i % roundInputLen == tabIndex) {
            roundArray.push(round)
            round = []
        } else if ( i % roundInputLen == spaceIndex) {
            if (c != ' ') {throw("Misclaculation")}
        }
        else {
            round.push(c)
        } 
    } 
    return roundArray
 }

converted = convertRawToRoundArray(rawData)
console.log(converted)
console.log(`There should be ${converted.length} lines`)

