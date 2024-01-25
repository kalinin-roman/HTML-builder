const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

// ================================================================
// папки которые хранят файлы
const assestFolder = path.join(__dirname, './assets');
const componentsFolder = path.join(__dirname, 'components');
const stylesFolder = path.join(__dirname, './styles');
const templateFile = path.join(__dirname, './template.html');
// ================================================================
// папка для компиляции
const projectDistFolder = path.join(__dirname, './project-dist');
const assetsFolderForTransfer = path.join(__dirname, './project-dist/assets');
// ================================================================
// файлы для компиляции
const indexFileForCampilation = path.join(
  __dirname,
  './project-dist/index.html',
);
const styleFileForCampilation = path.join(
  __dirname,
  './project-dist/style.css',
);
// ленивый квантификатор для поиска замены тегов
const componentRegExp = /{{(.*?)}}/g;

async function buildPage() {
  // получаем массив тегов для замены
  const tags = [];
  let tagContent;
  let templateContent = await fsPromises.readFile(templateFile, {
    encoding: 'utf8',
  });
  while ((tagContent = componentRegExp.exec(templateContent))) {
    tags.push(tagContent[1]);
  }
  // заменяем теги и сохраняем их замену
  for (let i = 0; i < tags.length; i++) {
    const componentFile = path.join(componentsFolder, `${tags[i]}.html`);
    const componentContent = await fsPromises.readFile(componentFile, {
      encoding: 'utf8',
    });
    templateContent = templateContent.replace(
      `{{${tags[i]}}}`,
      componentContent,
    );
  }
  await fsPromises.rm(projectDistFolder, { recursive: true, force: true });
  await fsPromises.mkdir(projectDistFolder, { recursive: true });
  await fsPromises.writeFile(indexFileForCampilation, templateContent, {
    encoding: 'utf8',
  });

  // компилирование файлов css
  fs.readdir(stylesFolder, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log(error);
    } else {
      const createWriteStream = fs.createWriteStream(styleFileForCampilation, {
        encoding: 'utf8',
      });
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

  // копирование файлов
  // assetsFolderForTransfer - для переноса
  // assestFolder - от куда
  async function coppyAssest(assestFolder, assetsFolderForTransfer) {
    fs.mkdir(assetsFolderForTransfer, { recursive: true }, (error) => {
      if (error) {
        return console.error(error);
      }
    });

    fs.readdir(assestFolder, { withFileTypes: true }, (error, files) => {
      if (error) {
        return console.log(error);
      } else {
        for (let i = 0; i < files.length; i++) {
          const secondFolderAssest = path.join(assestFolder, files[i].name);
          const secondFolderForTransfer = path.join(
            assetsFolderForTransfer,
            files[i].name,
          );
          if (files[i].isDirectory()) {
            coppyAssest(secondFolderAssest, secondFolderForTransfer);
          } else {
            fs.copyFile(
              secondFolderAssest,
              secondFolderForTransfer,
              (error) => {
                if (error) {
                  return console.log(error);
                }
              },
            );
          }
        }
      }
    });
  }

  coppyAssest(assestFolder, assetsFolderForTransfer);
}

buildPage();
