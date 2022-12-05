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
            INPUT.test.rawStack,
            INPUT.live.rawStack
        ],
        "output": [
            [[""],["Z","N"],["M","C","D"],["P"]],
            [[""],["W","B","D","N","C","F","J"],["P","Z","V","Q","L","S","T"],["P","Z","B","G","J","T"],["D","T","L","J","Z","B","H","C"],["G","V","B","J","S"],["P","S","Q"],["B","V","D","F","L","M","P","N"],["P","S","M","F","B","D","L","R"],["V","D","T","R"]]
        ]
    },
}

module.exports = testCases