

const fs = require('fs');
const path = require('path');

let dName = __dirname + '\\files';
let dNameCopy = __dirname + '\\files-copy';

function copyDir(dNameCopy) {

    fs.access(dNameCopy, (error) => {
        if (error && error.code === 'ENOENT') {
            fs.mkdir(dNameCopy, { recursive: true }, (err) => {
                if (err) {
                    return console.log(err.message);
                }
            });
            copyDir(dName, dNameCopy)
        } else {
            fs.readdir(dNameCopy, (err, fileNames) => {
                if (err) {
                    return console.log(err.message);
                }
                fileNames.forEach(filename => {
                    fs.unlink(path.join(dNameCopy, filename), (err) => {
                        if (err) {
                            return console.log(err.message);
                        }
                    });
                });
            })
            fs.readdir(dName, { withFileTypes: true }, (err, fileBuffer) => {

                fileBuffer.forEach(i => {
                    let src = path.join(dName, i.name);
                    let copy = path.join(dNameCopy, i.name);
        
                    fs.copyFile(src, copy, function (err) { });
                });
            });
            console.log('directory created!');
        }
    });
}

copyDir(dNameCopy);
