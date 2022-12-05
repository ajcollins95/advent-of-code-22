const INPUT = require("./input")
const SOLUTION = require("./solution5")

const testCases = {
    'getCrateStack': {
        "method": SOLUTION.getCrateStack,
        "input": [
            INPUT.test.rawStack,
            INPUT.live.rawStack
        ],
        "output": [
            [[""],["Z","N"],["M","C","D"],["P"]],
            [[""],["W","B","D","N","C","F","J"],["P","Z","V","Q","L","S","T"],["P","Z","B","G","J","T"],["D","T","L","J","Z","B","H","C"],["G","V","B","J","S"],["P","S","Q"],["B","V","D","F","L","M","P","N"],["P","S","M","F","B","D","L","R"],["V","D","T","R"]]
        ]
    },
    'getMovesArray': {
        "method": SOLUTION.getMovesArray,
        "input": [
            INPUT.test.rawMoves,
            //INPUT.live.rawMoves
        ],
        "output": [
            [{"crates":1,"start":2,"end":1},{"crates":3,"start":1,"end":3},{"crates":2,"start":2,"end":1},{"crates":1,"start":1,"end":2}],

        ]
    },
    'executeMoves': {
        "method": SOLUTION.executeMoves,
        "input": [
            [[[""],["Z","N"],["M","C","D"],["P"]], [{"crates":1,"start":2,"end":1},{"crates":3,"start":1,"end":3},{"crates":2,"start":2,"end":1},{"crates":1,"start":1,"end":2}]]
            //INPUT.live.rawMoves
        ],
        "output": [
            [[""],["C"],["M"],["P","D","N","Z"]],
        ]
    },
}

module.exports = testCases