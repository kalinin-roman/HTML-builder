const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, './text.txt');

const process = require('process');

const createWriteStream = fs.createWriteStream(pathToFile);

process.stdout.write(
  'Привет и хорошего тебе дня✨. Напиши, пожалуйста, текст в консоли и нажми Enter, после этого он появится в созданном файле text.txt".\n' +
    '\n',
);

process.stdin.on('data', (textForFile) => {
  if (textForFile.includes('exit')) {
    console.log('\nСпасибо, теперь можно проверить файл');
    process.exit(1);
  }
  createWriteStream.write(textForFile.toString());
  console.log('\n' + `В файл записан текст: ${textForFile}`);
});

process.on('SIGINT', () =>
  console.log('\nСпасибо, теперь можно проверить файл'),
);
process.on('SIGINT', () => process.exit(1));
