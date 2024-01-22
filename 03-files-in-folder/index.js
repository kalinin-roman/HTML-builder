const fs = require('fs');
const path = require('path');

const secretFolder = path.join(__dirname, './secret-folder');

fs.readdir(secretFolder, { withFileTypes: true }, (error, files) => {
  // console.log(files.length);
  if (error) {
    console.log(error);
  } else {
    for (let i = 0; i < files.length; i += 1) {
      if (!files[i].isDirectory()) {
        const pathToFile = path.join(secretFolder, files[i].name);
        fs.stat(pathToFile, (error, infoOfFile) => {
          if (error) {
            console.log(error);
          } else {
            const pathForEachFile = path.parse(pathToFile);
            const nameOfFile = pathForEachFile.name;
            const typeOfFile = pathForEachFile.ext.replace('.', '');
            const sizeOfFile = (infoOfFile.size / 1024).toFixed(3);
            console.log(`${nameOfFile} - ${typeOfFile} - ${sizeOfFile}kb`);
          }
        });
      }
    }
  }
});
