const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const OPERATORS = ['<', '>', '=='];
const EXTENSIONS = ['and'];

app.use(bodyParser.json());

app.get('/readDatabase', (request, response) => {
  response.send({ fileContents: readFile() });
});

app.post('/writeTo', (request, response) => {
  const { table, contents } = request.body;

  addNewRecord({ table, ...expandContents(contents) });
});

app.post('/readFrom', (request, response) => {
  const { table, where } = request.body;

  const filterByTable = filterRecordsByTable(table);

  if (!where) {
    response.send({ records: filterByTable });

    return;
  }

  const filterByExpression = separateExpressions(where).map(expression =>
    filterRecordsByExpression(filterByTable, expression)
  );

  response.send({ records: filterByExpression });
});

function readFile() {
  return fs.readFileSync('./DB.js', 'utf8');
}

function writeFile(contents) {
  return fs.writeFileSync('./DB.js', contents, 'utf8');
}

function expandContents(contents) {
  let expandedContents = {};
  for (const [key, value] of Object.entries(contents)) {
    expandedContents[key] = value;
  }

  return expandedContents;
}

function addNewRecord(contents) {
  const databaseContents = JSON.parse(readFile('DB.js'));

  databaseContents.push({ ...contents, ...defaultColumns() });
  const updatedDB = addNewLines(JSON.stringify(databaseContents));

  writeFile(updatedDB);
}

function defaultColumns() {
  return { created_at: new Date() };
}

function addNewLines(s) {
  const commonSeparator = '},';

  return s.split(commonSeparator).join(`${commonSeparator}\n`);
}

function filterRecordsByTable(table) {
  const databaseContents = JSON.parse(readFile());

  return databaseContents.filter(record => record.table == table);
}

function filterRecordsByExpression(records, expression) {
  const operator = getOperator(expression);

  const leftSide = record => record[leftSideOfExpression(expression, operator)];
  const rightSide = rightSideOfExpression(expression, operator);

  return records.filter(record =>
    eval(`'${leftSide(record)}' ${operator} '${rightSide}'`)
  );
}

function removeWhitespaces(s) {
  // g means to repeat this search through the entire string
  return s.replace(/ /g, '');
}

function separateExpressions(where) {
  const query = removeWhitespaces(where);

  return EXTENSIONS.map(extension => query.split(extension))[0];
}

function getOperator(expression) {
  let result;

  OPERATORS.map(operator => {
    if (expression.includes(operator)) result = operator;
  });

  return result;
}

function leftSideOfExpression(expression, operator) {
  return expression.substring(0, expression.indexOf(operator));
}

function rightSideOfExpression(expression, operator) {
  return expression.substring(
    expression.length,
    expression.indexOf(operator) + operator.length
  );
}

app.listen(port, () => console.log(`Listening on port ${port}`));
