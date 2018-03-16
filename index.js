const fs = require('fs');
const pathToSrc = `${__dirname}/src/`;

const promiseToSaveMarkup = Promise.all([readMarkups(), saveToFile()]);

promiseToSaveMarkup.then((data) => {
  console.log(data[1]);
  process.exit();
}).catch(err => {
  throw new err;
});

function readMarkups() {
  return new Promise((resolve, reject) => {
    fs.readdir(`${pathToSrc}/markup/`, (err, list) => {
      if (err) reject(err);
      list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));

      console.log(list);
      saveToFile(list);
      resolve(list);
    });
  });
}

function saveToFile(array) {
  return new Promise((resolve, reject) => {
    const fileToSave = `module.exports=${JSON.stringify(array)}`;

    fs.writeFile('htmlfiles.js', fileToSave, (err) => {
      if (err) reject(err);

      resolve('Html markup found and saved!');
    });
  });
}


