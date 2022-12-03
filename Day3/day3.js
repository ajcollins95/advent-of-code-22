var fs = require("fs");
const { mainModule } = require("process");

const getItemPriority = (item) => {
    let charCode_a = 97
    let charCode_A = 65
    let ord = item.charCodeAt(0)
    let gapZtoA = 7
    let lettersInAlphabet = 26
    let priority = 0
    //console.log(`ord of ${item} = ${ord}`)
    if (ord < charCode_A) {
        throw("getItemPriority: bad character!")
    } else if (charCode_A <= ord && ord < charCode_A + lettersInAlphabet) {
        //item is capital letter
        priority = ord - charCode_A + lettersInAlphabet + 1
    } else if (charCode_a <= ord && ord < charCode_a + lettersInAlphabet) {
        //item is lowercase letter
        priority = ord - charCode_a + 1
    } else {
        throw("getItemPriority: bad character!")
    }
    if (priority == 0 || priority > 52) { throw("getItemPriority: bad calculation")}
    return priority
}


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
    let itemPriority = getItemPriority(repeatedItem)
    //console.log(`Letter ${repeatedItem} is worth ${itemPriority} points`)

    return itemPriority
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
    return prioritySum

}

const main = () => {
    //ingest data 
    var data = fs.readFileSync('input3.txt');
    var rawData = data.toString();

    //convert data to array
    converted = rawData.split('\n')

    //calculate priority sum of the converted data array
    let prioritySum = getPrioritySum(converted)
    console.log(prioritySum)

}

main()
