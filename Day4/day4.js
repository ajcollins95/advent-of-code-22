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
    console.log(`rangeSizes: ${rangeSizes}, min_i: ${min_i}`)
    return min_i
}

const getMinSection = (pair) => {
    let rangeSizes = []
    let smallestBound = 10000;
    let minIntBound;
    let mCP_i;
    pair.forEach((range) => {
        range.forEach((bound) => {
            minIntBound = Number(bound)
            if (minIntBound < smallestBound) {smallestBound = minIntBound}
        })
    })
    //console.log(`pair: ${pair} smallestBound: ${smallestBound}`)
    return smallestBound
}

const getMinContainingPairIndex = (pair) => {
    //takes a pair of section assignments, returns the index of the pair with the smallest section number
    //if there are two pairs that have the smallest section, returns the pair with the smaller range
    let smallestSection = String(getMinSection(pair))
    let minContainingPair_i
    
    if (pair[0].includes(smallestSection) && pair[1].includes(smallestSection)) {
        //case where the smallest number is in both pairs
        //return the pair with the smaller range
        minContainingPair_i = getMinRangeIndex(pair)
    } else {
        //console.log(`pair: ${pair} smallestBound: ${smallestBound}`)
        minContainingPair_i = Number(pair[1].includes(smallestSection))
    }
    //console.log(`lpair: ${pair[0]} + ${pair[1]}, min: ${smallestSection}, mCP_i: ${minContainingPair_i}`)
    
    return minContainingPair_i
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

const isPairIntersecting = (pair) => {
    //which pair has the smallest value
    //what is that value
    //is the smallest value in the other pair less than the upper bound of the first pair

    let smallest_i = getMinContainingPairIndex(pair)
    let minContainingPair = pair[smallest_i]
    let smallestSection = Number(minContainingPair)
    let otherPair_i = Number(!Boolean(smallest_i))
    let otherPair = pair[otherPair_i]
    console.log(`pair: ${pair[0]} + ${pair[1]}, min: ${smallestSection}, mCP_i: ${minContainingPair_i}`)

    /*
    throw("STOP")
    let smallerPair = pair[smaller_i]
    let larger_i = Number(!Boolean(smaller_i))
    let largerPair = pair[larger_i]
    let isInsideLowerBound = Number(largerPair[0]) <= Number(smallerPair[0])
    let isInsideUpperBound = Number(smallerPair[1]) <= Number(largerPair[1])
    */
    return false
}

const getFullyContainedRanges = (rangePairArray) => {
    //Takes fully converted raw data, outputs # of pairs that overlap
    let containedRanges = 0
    let isPairFullyContained;
    rangePairArray.forEach((rangePair) => {
        isPairFullyContained = isPairContained(rangePair)
        //console.log(`pair: ${rangePair[0]} + ${rangePair[1]} ${isPairFullyContained}`)
        containedRanges += Number(isPairFullyContained)
    })

    return containedRanges

}

const getIntersectingPairs = (rangePairArray) => {
    //Takes fully converted raw data, outputs # of pairs that overlap
    let intersectingPairs = 0
    let doesPairIntersect;
    rangePairArray.forEach((rangePair) => {
        doesPairIntersect = isPairIntersecting(rangePair)
        //console.log(`pair: ${rangePair[0]} + ${rangePair[1]} ${doesPairIntersect}`)
        intersectingPairs += Number(doesPairIntersect)
    })

    return intersectingPairs

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
    //let fullyContainedRanges = getFullyContainedRanges(converted)
    let intersectingPairs = getIntersectingPairs(converted)
    return fullyContainedRanges
}

console.log(main())
