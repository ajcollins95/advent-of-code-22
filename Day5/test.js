var fs = require("fs");
const INPUT = require("./input")
const TEST_CASES = require("./testCases")
const SOLUTION = require("./solution5")
const assert = require('assert')

const writeToFile = (data, fileName) => {
    fs.writeFileSync(`./${fileName}.txt`, data, err => {
        if (err) {
            console.error(err)
        }
    })
}   

const testGetMovesArray = () => {
    
}

const testGetCrateStack = () => {
    let methodName = "getCrateStack"
    let inputArray = TEST_CASES[methodName].input
    let method = TEST_CASES[methodName].method
    let expectedOutput;
    let input; 
    let output;
    for(let i = 0; i < inputArray.length; ++i) {
        input = inputArray[i]
        output = JSON.stringify(method(input))
        expectedOutput = JSON.stringify(TEST_CASES[methodName].output[i])
        //console.log(output)
        //console.log(expectedOutput)
        assert(output == expectedOutput)
    }

    console.log(`${methodName} passed all tests!`)

}

const testMethod = (methodName) => {
    //tests the provided methodName against the imported test cases
    console.log(TEST_CASES)
    let inputArray = TEST_CASES[methodName].input
    let method = TEST_CASES[methodName].method
    let expectedOutput;
    let input; 
    let output;
    for(let i = 0; i < inputArray.length; ++i) {
        input = inputArray[i]
        output = method(input)
        expectedOutput = TEST_CASES[methodName].output[i]
        console.log(output)
        console.log(expectedOutput)
        assert(output == expectedOutput)
    }

    console.log(`${methodName} passed all tests!`)
}

const testAll = () => {
    //tests every method supplied in the solution against the data in the testCases file
    methods = [
        'getCrateStack'
    ]
    methods.forEach((methodName) => {
        testMethod(methodName)
    })
    console.log('Solution passes all tests')
}

const test = () => {
    testGetCrateStack()
    testGetMovesArray()
}

//testAll()
test()