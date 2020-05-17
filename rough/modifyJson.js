let fs = require("fs");
let request = require("request")

const writeStream = fs.createWriteStream('file.txt');
const pathName = writeStream.path;

fs.readFile('./ingredients.json', 'utf8', (err, fileContents) => {
    if (err) {
        console.error(err)
        return
    }
    try {
        let data = JSON.parse(fileContents)
        // console.log(JSON.parse(fileContents))
        let ingredients = [];
        for (let i = 0; i < 9178; i++) {
            // console.log(data[i]["searchValue"]);
            ingredients.push(data[i]["searchValue"]);
        }

        // var file = fs.createWriteStream('array.txt');
        // file.on('error', function (err) { console.log(err) });
        // ingredients.forEach(function (v) { file.write(v.join(', ') + '\n'); });
        // file.end();


        // write each value of the array on the file breaking line
        ingredients.forEach(value => writeStream.write(`${value},`));

        // the finish event is emitted when all data has been flushed from the stream
        writeStream.on('finish', () => {
            console.log(`wrote all the array data to file ${pathName}`);
        });

        // handle the errors on the write process
        writeStream.on('error', (err) => {
            console.error(`There is an error writing the file ${pathName} => ${err}`)
        });

        // close the stream
        writeStream.end();

    } catch (err) {
        console.error(err)
    }
})


