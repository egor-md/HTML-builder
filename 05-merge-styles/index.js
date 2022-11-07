const fs = require('fs/promises');
const path = require('path');

createBundle(__dirname + '/styles')
async function createBundle(dir) {
    const files = await fs.readdir(dir, { withFileTypes: true });
    fs.writeFile(__dirname + '/project-dist/bundle.css', '');
    for (file of files) {
        if (file.isFile() && path.extname(file.name) === '.css') {
            const styles = await fs.readFile(dir + '/' + file.name, 'utf-8');
            fs.appendFile(__dirname + '/project-dist/bundle.css', styles + '\n');
        }
    }
    console.log('file created!');
}
