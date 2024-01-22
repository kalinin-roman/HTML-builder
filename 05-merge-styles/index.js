const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, './styles');
const bundleFile = path.join(__dirname, './project-dist/bundle.css');

const createWriteStream = fs.createWriteStream(bundleFile);

fs.readdir(stylesFolder, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error);
  } else {
    for (let i = 0; i < files.length; i++) {
      const pathToFile = path.join(stylesFolder, files[i].name);
      const typeOfFile = path.extname(pathToFile);

      if (typeOfFile === '.css') {
        const createReadStream = fs.createReadStream(pathToFile);
        createReadStream.pipe(createWriteStream);
      }
    }
  }
});
