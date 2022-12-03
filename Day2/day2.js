var fs = require("fs");
const { mainModule } = require("process");

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

const decryptShape = (encryptedShape) => {
    let shape;
    if (encryptedShape == 'A' || encryptedShape == 'X') {
        shape = 'rock'
    } else if (encryptedShape == 'B' || encryptedShape == 'Y') {
        shape = 'paper'
    } else if (encryptedShape == 'C' || encryptedShape == 'Z') {
        shape = 'scissors'
    } else {
        console.log(encryptedShape)
        throw('Decryption Error')
    }
    return shape


}

const getOutcomeScore = (playerShape, oppShape) => {
    //console.log(`opp: ${oppShape}, player: ${playerShape}`)
    let outcomeScore;

    if (playerShape == oppShape) {
        outcomeScore = 3
    } else if (playerShape == 'rock' && oppShape == 'paper') {
        outcomeScore = 0
    } else if (playerShape == 'rock' && oppShape == 'scissors') {
        outcomeScore = 6
    } else if (playerShape == 'scissors' && oppShape == 'rock') {
        outcomeScore = 0
    } else if (playerShape == 'scissors' && oppShape == 'paper') {
        outcomeScore = 6
    } else if (playerShape == 'paper' && oppShape == 'scissors') {
        outcomeScore = 0
    } else if (playerShape == 'paper' && oppShape == 'rock') {
        outcomeScore = 6
    } 
    else {
        console.log(`opp: ${oppShape}, player: ${playerShape}`)
        throw("getOutcomeScore fundamental Error")
    }
    //console.log(`outcomeScore = ${outcomeScore}`)
    return outcomeScore
}

const getShapeScore = (playerShape) => {

    let shapeScore;
    if (playerShape == 'rock') {
        shapeScore = 1
    } else if (playerShape == 'paper') {
        shapeScore = 2
    } else if (playerShape == 'scissors') {
        shapeScore = 3
    } else {
        console.log('_____________________________')
        console.log('_____________________________')
        console.log(playerShape)
        throw("getShapeScore fundamental Error")
    }
    //console.log(`shapeScore = ${shapeScore}`)
    return shapeScore

}

const getRoundScore = (round) => {
    //console.log(`Raw Round: ${round}`)
    let playerIndex = 1
    let encPlayShape = round[playerIndex]
    //console.log(`Encrypted Player Shape: ${encPlayShape}`)
    let playerShape = decryptShape(encPlayShape)
    let oppShapeIndex = Number(!playerIndex)
    //console.log(`Opponent Shape Index: ${oppShapeIndex}`)
    let encOppShape = round[oppShapeIndex]
    //console.log(`Encrypted Opponent Shape: ${encOppShape}`)
    let opponentShape = decryptShape(encOppShape)
    let outcomeScore = getOutcomeScore(playerShape, opponentShape)
    let shapeScore = getShapeScore(playerShape)
    let roundScore = outcomeScore + shapeScore
    return roundScore
}

const getPlayerShape = (endState, oppShape) => {
    //X lose, Y draw, Z win
    let playerShape;

    if (endState == 'Y') {
        playerShape = oppShape
    } else if (endState == 'X' && oppShape == 'paper') {
        playerShape = 'rock'
    } else if (endState == 'X' && oppShape == 'scissors') {
        playerShape = 'paper'
    } else if (endState == 'X' && oppShape == 'rock') {
        playerShape = 'scissors'
    } else if (endState == 'Z' && oppShape == 'paper') {
        playerShape = 'scissors'
    } else if (endState == 'Z' && oppShape == 'scissors') {
        playerShape = 'rock'
    } else if (endState == 'Z' && oppShape == 'rock') {
        playerShape = 'paper'
    } 
    else {
        console.log(`opp: ${oppShape}, endState: ${endState}`)
        throw("getOutcomeScore fundamental Error")
    }
    console.log(`opp: ${oppShape}, endState: ${endState}, player: ${playerShape}`)
    return playerShape
}

const getRoundScoreEnding = (round) => {
    //console.log(`Raw Round: ${round}`)

    //should be fine below here
    let oppShapeIndex = 0
    //console.log(`Opponent Shape Index: ${oppShapeIndex}`)
    let encOppShape = round[oppShapeIndex]
    //console.log(`Encrypted Opponent Shape: ${encOppShape}`)
    let opponentShape = decryptShape(encOppShape)
    let endState = round[1]
    let playerShape = getPlayerShape(endState, opponentShape)
    let outcomeScore = getOutcomeScore(playerShape, opponentShape)
    let shapeScore = getShapeScore(playerShape)
    let roundScore = outcomeScore + shapeScore
    return roundScore
}

const getMyScore = (roundArray) => {
    myScore = 0
    //for(let i = 0; i < roundArray.length; ++i) {
    for(let i = 0; i < roundArray.length; ++i) {
        let round = roundArray[i]
        let roundScore = getRoundScoreEnding(round)
        //console.log(roundScore)
        console.log(`iteration ${i}`)
        myScore += roundScore
        //console.log(`Running Total = ${myScore}`)
    }
    return myScore

}

const main = () => {
    //ingest data 
    var data = fs.readFileSync('input.txt');
    var rawData = data.toString();

    //convert data to array
    converted = convertRawToRoundArray(rawData)

    let myScore = getMyScore(converted)
    console.log(myScore)

}

main()
