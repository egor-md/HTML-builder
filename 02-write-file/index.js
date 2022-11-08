const fs = require('fs');
const path = require('path');

let pathToFile = path.join(__dirname, 'text.txt');
let output = fs.createWriteStream(pathToFile, 'utf-8');

const process = require('process');
process.stdout.write('Hi, enter text please \n');

process.on('SIGINT', function () {
    process.exit();
});

process.stdin.on('data', function (print) {
    if (print.toString().trim() === 'exit') {
        process.exit();
    } else {
        output.write(print);
    }   
});

process.on('exit', function () {
    process.stdout.write('file with your test was created');
});
