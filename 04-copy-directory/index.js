const fs = require('fs');
const path = require('path');

const fsPromises = require('fs/promises');

const filesFolder = path.join(__dirname, './files');
const copyFolder = path.join(__dirname, './files-copy');

fs.mkdir(copyFolder, { recursive: true }, (error) => {
  if (error) {
    return console.error(error);
  }

  fsPromises.cp(filesFolder, copyFolder, { recursive: true });

  console.log('\nФайлы успешно скопированны!\n');
});
