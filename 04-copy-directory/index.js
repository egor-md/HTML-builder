const fs = require('fs/promises');
const path = require('path');

const curDir = __dirname + '/files';
const newDir = __dirname + '/files-copy';

async function copyDir(curDir, copyDir) {
    await fs.mkdir(newDir, { recursive: true });
    const files = await fs.readdir(curDir, { withFileTypes: true });
    for (let file of files) {
        fs.copyFile(`${curDir}/${file.name}`, `${newDir}/${file.name}`);
    }
}
copyDir(curDir, newDir);

async function preFoo() {
    try {
        await fs.access(newDir);
        await fs.rm(newDir, { recursive: true });
        copyDir(curDir, newDir);
    } catch (error) {
        if (error.code === 'ENOENT') {
            copyDir(curDir, newDir);
        }
    }
}
preFoo();
