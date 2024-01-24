const fs = require('fs');
const path = require('path');

const filesFolder = path.join(__dirname, './files');
const copyFolder = path.join(__dirname, './files-copy');

fs.mkdir(copyFolder, { recursive: true }, (error) => {
  if (error) {
    return console.error(error);
  }
});

fs.readdir(copyFolder, { withFileTypes: true }, (error, files) => {
  if (error) {
    return console.log(error);
  } else {
    for (let i = 0; i < files.length; i++) {
      const checkDeletedFiles = path.join(copyFolder, files[i].name);
      fs.unlink(checkDeletedFiles, (error) => {
        if (error) {
          return console.log(error);
        }
      });
    }
  }
});

fs.readdir(filesFolder, { withFileTypes: true }, (error, files) => {
  if (error) {
    return console.log(error);
  } else {
    for (let i = 0; i < files.length; i++) {
      const fileFromOriginFolder = path.join(filesFolder, files[i].name);
      const fileFromCoppyFolder = path.join(copyFolder, files[i].name);
      fs.copyFile(fileFromOriginFolder, fileFromCoppyFolder, (error) => {
        if (error) {
          return console.log(error);
        }
      });
    }
  }
});

console.log('Directory created successfully!');
