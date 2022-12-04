var fs = require("fs");
const { mainModule } = require("process");

const TEST_DATA = `98-99,3-97
23-72,23-72
53-62,8-87
21-52,36-51
36-38,37-96
92-96,4-92
7-30,8-60
31-44,43-88
67-73,45-73
37-48,49-62
32-50,1-33
39-98,38-47
11-17,18-88
35-99,36-97
9-82,2-3
27-50,4-10
1-92,5-92
6-40,4-40
4-7,2-3
98-99,46-96`

const getMinRangeIndex = (pair) => {
    let rangeSizes = []
    let size;
    pair.forEach((range) => {
        size = Number(range[1] - range[0])
        //TODO change size calculation, each range index should be a number
        rangeSizes.push(size)
    })
    let minSize = Math.min(...rangeSizes)
    let min_i = rangeSizes.indexOf(minSize)
    //console.log(`rangeSizes: ${rangeSizes}, min_i: ${min_i}`)
    return min_i
}

const isPairContained = (pair) => {
    let smaller_i = getMinRangeIndex(pair)
    let smallerPair = pair[smaller_i]
    let larger_i = Number(!Boolean(smaller_i))
    let largerPair = pair[larger_i]
    let isInsideLowerBound = Number(largerPair[0]) <= Number(smallerPair[0])
    let isInsideUpperBound = Number(smallerPair[1]) <= Number(largerPair[1])

    return isInsideLowerBound && isInsideUpperBound
}

const getFullyContainedRanges = (rangePairArray) => {
    //Takes fully converted raw data, outputs # of pairs that overlap
    let containedRanges = 0
    let isPairFullyContained;
    rangePairArray.forEach((rangePair) => {
        isPairFullyContained = isPairContained(rangePair)
        console.log(`pair: ${rangePair[0]} + ${rangePair[1]} ${isPairFullyContained}`)
        containedRanges += Number(isPairFullyContained)
    })

    return containedRanges

}

const rawToRangeArrays = (raw) => {
    let strPairArray = raw.split('\n')
    let rangeArray = []
    let strRange;
    let ranges = []
    strPairArray.forEach((strPair) => {
        strRange = strPair.split(',')
        strRange.forEach((range) => {
            //console.log(range)
            ranges.push(range.split('-'))
        })
        rangeArray.push(ranges)
        ranges = []
    })
    return rangeArray
}

const main = () => {
    //ingest data 
    var data = fs.readFileSync('testInput4.txt');
    var rawData = data.toString();

    //convert data to array
    let converted = rawToRangeArrays(rawData)

    //Not 454, too low
    //calculate priority sum of the converted data array
    let fullyContainedRanges = getFullyContainedRanges(converted)
    return fullyContainedRanges
}

console.log(main())
