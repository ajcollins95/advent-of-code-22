var fs = require("fs");
const { mainModule } = require("process");

/*

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
*/

const getRepeatedItem = (packArray) => {
    //figures out which element is reapeated in each pack partition
    
    //determines which item is in the first two elements of the array
    let item = '-'
    let first = packArray[0]
    for(let i = 0; i < packArray[1].length; ++i) {
        let c = packArray[1][i]
        if (first.includes(c)) {
            item = c
        }
    }
    if (item == '-') {throw("getRepeatedItem: no match found!")}
    return item
}

const splitRucksack = (packContent) => {
    //creates array that has the partition of content
    let splitPack = []
    let itemsInPack = packContent.length
    if (itemsInPack % 2 == 0) {
        let first = packContent.slice(0, itemsInPack / 2)
        splitPack.push(first)
        let second = packContent.slice(itemsInPack / 2)
        splitPack.push(second)
    } else {
        throw("splitRucksack: odd amount of content!")
    }
    return splitPack
}

const getRucksackPriority = (packContent) => {
    //console.log(`Raw Round: ${round}`)
    let splitPack = splitRucksack(packContent)
    let repeatedItem = getRepeatedItem(splitPack)
    console.log(repeatedItem)
    return 0
    throw('STOP')
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

const getPrioritySum = (rucksackArray) => {
    prioritySum = 0
    //for(let i = 0; i < rucksackArray.length; ++i) {
    for(let i = 0; i < rucksackArray.length; ++i) {
        let rucksack = rucksackArray[i]
        let rucksackPriority = getRucksackPriority(rucksack)
        //console.log(rucksackPriority)
        //console.log(`iteration ${i}`)
        prioritySum += rucksackPriority
        //console.log(`Running Total = ${prioritySum}`)
    }
    return myScore

}

const main = () => {
    //ingest data 
    var data = fs.readFileSync('testInput.txt');
    var rawData = data.toString();

    //convert data to array
    converted = rawData.split('\n')

    //calculate priority sum of the converted data array
    let prioritySum = getPrioritySum(converted)
    //console.log(myScore)

}

main()
