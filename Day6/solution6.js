var fs = require("fs");
const { mainModule } = require("process");

const getBufferStart = (datastream) => {
    //takes a stream of data and finds where it starts
    //returns one-indexed start location

    let buffLen = 14;
    let buffer = datastream.substring(0,buffLen).split('');

    for(let i = buffLen; i < datastream.length; ++i) {
        let bufferSet = new Set(buffer)
        if (buffer.length == bufferSet.size) {
            return i - 1
            throw(`found at ${i}`)
        }
        buffer = datastream.substring(i-buffLen, i).split('')

    }
    return -1
}

const main = () => {
    let input;
    let packetStart = getBufferStart(input)

}


//console.log(main())

module.exports = { 
    main,
    getBufferStart

}
