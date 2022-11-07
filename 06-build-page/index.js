const fs = require('fs/promises');
const path = require('path');

fs.mkdir(__dirname + '/project-dist', { recursive: true });

async function makeBundle(dir) {
    const files = await fs.readdir(dir, { withFileTypes: true });
    fs.writeFile(__dirname + '/project-dist/style.css', '');
    for (file of files) {
        if (file.isFile() && path.extname(file.name) === '.css') {
            const style = await fs.readFile(dir + '/' + file.name, 'utf-8');
            fs.appendFile(__dirname + '/project-dist/style.css', style + '\n');
        }
    }
    makeHtml(__dirname);
}

async function makeHtml(dir) {
    let template = await fs.readFile(dir + '/template.html', 'utf-8');
    const files = await fs.readdir(dir + '/components/', { withFileTypes: true });
    for (let file of files) {
        const fName = file.name.split('.')[0];
        const el = await fs.readFile(dir + `/components/${fName}.html`, 'utf-8');
        const rExp = new RegExp(`{{${fName}}}`);
        template = template.replace(rExp, el);
    }
    await fs.writeFile(__dirname + '/project-dist/index.html', template);
    copyAssets(__dirname + '/assets/');
}

async function copyAssets(dir) {
    const dirs = ['fonts/', 'img/', 'svg/'];
    for (let dir1 of dirs) {
        await fs.mkdir(__dirname + '/project-dist/assets/' + dir1, { recursive: true });
        const files = await fs.readdir(dir + dir1, { withFileTypes: true });
        for (let file of files) {
            await fs.copyFile(dir + '/' + dir1 + '/' + file.name, __dirname + '/project-dist/assets/' + dir1 + '/' + file.name);
        }
    }
    console.log('all done!');
}

makeBundle(__dirname + '/styles');
