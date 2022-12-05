var fs = require("fs");
const { mainModule } = require("process");
//const { TEST, LIVE } = require("./input.js")
const INPUT = require("./input")
//const Stack = require("./Stack")

const getMovesArray = (rawMoves) => {
    //takes the raw moves as a \n delimited string of movements around the stack
    //returns an array of move Objects that have a quantity, start, and end

    let stringMovesArray = rawMoves.split("\n")
    let moves = []
    let moveArray;
    let move = {
        'crates': 0,
        'start': 0,
        'end': 0
    };
    stringMovesArray.forEach((stringMove) => {
        moveArray = stringMove.split(' ')
        move['crates'] = Number(moveArray[1])
        move['start'] = Number(moveArray[3])
        move['end'] = Number(moveArray[5])
        moves.push(move)
        move = {
            'crates': 0,
            'start': 0,
            'end': 0
        };
    })

    console.log(moves)
    return move
}

const getCrateStack = (rawCrateStacks) => {
    //takes the raw stack as a list of capital letter strings
    //returns a ONE-indexed array of stacks of crates
    //a single crate stack of length n is zero-indexed where the bottom = stack[0], top = stack[n-1]

    let crateStack = [['']] //first element is a null string to make the first piece of data start at stack[1]
    let stack;
    rawCrateStacks.forEach((rawStack) => {
        stack = rawStack.split('')
        crateStack.push(stack)
        stack = []
    })  
    return crateStack
}

const main = () => {
    let input = INPUT.test
    let crateStack = getCrateStack(input.rawStack)
    let moves = getMovesArray(input.rawMoves)
    //console.log(crateStack)
}

main()

module.exports = { 
    main,
    getCrateStack,
    getMovesArray,

}