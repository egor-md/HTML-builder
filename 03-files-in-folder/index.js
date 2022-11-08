const { log } = require('console');
const { stat } = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');

let pathToFiles = path.join(__dirname, 'secret-folder');

readdir(pathToFiles, { withFileTypes: true })
    .then(res => res.forEach(i => {

        let pathToF = path.join(pathToFiles, i.name);

        if (i.isFile()) {
            stat(pathToF, (err, stats) => {
                let fName = i.name.split('.')[0];
                let fExt = path.extname(pathToF).slice(1);
                let fSize = (stats.size / 1024).toFixed(3);
                return console.log(`${fName} - ${fExt} - ${fSize}kb`);
            });
        }
    }))
    .catch(err => {
        console.log(err);
    });
