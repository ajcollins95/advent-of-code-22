var fs = require("fs");
const { mainModule } = require("process");
//const { TEST, LIVE } = require("./input.js")
const INPUT = require("./input")
//const Stack = require("./Stack")


const moveCrates = (crateStack, move) => {
    //takes an entire formatted crate stack and a move object
    //returns the modified crate stack after the move has been executed

    let crane = []
    let crates = move.crates
    let start = move.start
    let end = move.end

    //'lifts' the crates from the start position, places it on the end
    for(let i = 0; i < crates; ++i) {
        crateStack[end].push(crateStack[start].pop())
    }

    return crateStack
}

const liftCrates = (crateStack, move) => {
    //takes an entire formatted crate stack and a move object
    //returns the modified crate stack after the move has been executed

    let crates = move.crates
    let start = move.start
    let end = move.end
    let startStackLen = crateStack[start].length
    let endStackLen = crateStack[end].length

    //get top of stack
    let craneLift = crateStack[start].slice(startStackLen-crates)
    
    //remove top from full stack
    crateStack[start].splice(startStackLen-crates)

    //place onto final position
    crateStack[end].splice(endStackLen, 0, ...craneLift)
    
    /*
    //'lifts' the crates from the start position, places it on the end
    
    for(let i = 0; i < crates; ++i) {
        crateStack[end].push(crateStack[start].pop())
    }
    */
    return crateStack
}

const executeMoves = (crateStack, movesArray) => {
    let newStack = JSON.parse(JSON.stringify(crateStack))
    console.log('start')
    console.log(crateStack)
    console.log('----------')
    movesArray.forEach((move) => {
        console.log(move)
        newStack = liftCrates(crateStack, move)
        console.log(newStack)
    })
    return newStack
}

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
    return moves
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
    let input = INPUT.live
    let crateStack = getCrateStack(input.rawStack)
    let moves = getMovesArray(input.rawMoves)
    let modifiedStack = executeMoves(crateStack, moves)
    return modifiedStack
    //console.log(crateStack)
}


console.log(main())

module.exports = { 
    main,
    getCrateStack,
    getMovesArray,
    executeMoves

}
