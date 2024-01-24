const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, './text.txt');

const streamForRead = fs.createReadStream(pathToFile, 'utf8');

streamForRead.on('readable', () => {
  const data = streamForRead.read();
  if (data !== null) console.log(data);
});

streamForRead.on('end', () => {});
