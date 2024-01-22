const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, './text.txt');

fs.readFile(pathToFile, (error, file) => {
  // вовыд ошибки
  if (error) {
    return console.log(error);
  }
  // выводим результат
  console.log(file.toString());
});
