const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post('/readFile', (request, response) => {
  const { file } = request.body;

  response.send({ fileContents: readFile(file) });
});

app.post('/writeTo', (request, response) => {
  const { table, contents } = request.body;

  addNewRecord({ table, message: contents.message });
});

function readFile() {
  return fs.readFileSync('./DB.js', 'utf8');
}

function writeFile(contents) {
  return fs.writeFileSync('./DB.js', contents, 'utf8');
}

function addNewRecord(contents) {
  const databaseContents = JSON.parse(readFile('DB.js'));

  databaseContents.push({ ...contents, created_at: new Date() });

  const updatedDB = addNewLines(JSON.stringify(databaseContents));
  writeFile(updatedDB);
}

function addNewLines(string) {
  return string.split('},').join('},\n');
}

app.listen(port, () => console.log(`Listening on port ${port}`));
