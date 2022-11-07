const fs = require('fs');
const path = require('path');

let pathToFile = __dirname + '\\text.txt';
let readFile = fs.createReadStream(pathToFile, 'utf-8');

let data = '';
readFile.on('data', function (chunk) {
    console.log(chunk += data);
});
