const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');

const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');

const OPERATORS = ['<', '>', '=='];
const EXTENSIONS = ['and'];

const APP_NAME = 'world-of-workflow';
const PATH_TO_DATABASE = isDev
  ? './database.js'
  : `./Applications/${APP_NAME}.app/Contents/database.js`;

let mainWindow;
let appVisible = false;
let databaseAvailable = true;

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function() {
  if (mainWindow === null) createWindow();
});

ipcMain.on('hideWindow', () => {
  hide();
});

ipcMain.on('writeTo', (event, args) => {
  const { table, contents } = args;

  addNewRecord({ table, ...expandContents(contents) });
});

ipcMain.on('readFrom', (event, args) => {
  const { table, where } = args;

  const filterByTable = filterRecordsByTable(table);

  if (!where) {
    event.reply('readFromReply', filterByTable);

    return;
  }

  const filterByExpression = separateExpressions(where).map(expression =>
    filterRecordsByExpression(filterByTable, expression)
  );

  event.reply('readFromReply', filterByExpression);
});

ipcMain.on('update', (event, args) => {
  const { record, where } = args;

  let databaseContents = JSON.parse(readFile());
  const matchingRecord = indexOfObject(databaseContents, record);

  databaseContents[matchingRecord] = {
    ...databaseContents[matchingRecord],
    ...where,
    updated_at: new Date()
  };

  writeFile(databaseContents);
});

ipcMain.on('deleteRecords', (event, args) => {
  const { where } = args;

  const databaseContents = JSON.parse(readFile());
  const whereConditions = JSON.stringify(where);

  const dropBrackets = string => string.substring(1, string.length - 1);

  const filterRecords = databaseContents.filter(
    record => !JSON.stringify(record).includes(dropBrackets(whereConditions))
  );

  writeFile(filterRecords);
});

ipcMain.on('databaseAvailable', (event, args) => {
  event.reply('databaseAvailableReply', databaseAvailable);
});

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    transparent: true,
    hasShadow: false,
    enableLargerThanScreen: true
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000/'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.center();
  mainWindow.maximize();
  mainWindow.hide();
  app.dock.hide();
  setFullWindowSize();

  toggleWithKeyboard();
  !isDev && setupDatabase();

  // mainWindow.setIgnoreMouseEvents(true, {forward: true})
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

function toggleWithKeyboard() {
  globalShortcut.register('Option + Space', () => {
    appVisible ? hide() : show();
  });
}

function show() {
  mainWindow.show();
  appVisible = true;
}

function hide() {
  mainWindow.hide();
  appVisible = false;
}

function setFullWindowSize() {
  // default after maximize: 1680, 950
  let windowSize = mainWindow.getSize();
  const myDockHeight = 70;

  mainWindow.setSize(windowSize[0], windowSize[1] + myDockHeight);
}

function setupDatabase() {
  if (!fs.existsSync(`./Applications/${APP_NAME}.app`)) {
    databaseAvailable = false;
  } else {
    if (!fs.existsSync(PATH_TO_DATABASE))
      fs.writeFileSync(PATH_TO_DATABASE, '[]', 'utf8');
  }
}

function splitPath(path) {
  const breakPath = path.split('/');
  breakPath.shift();
  breakPath[0] = './' + breakPath[0];

  return breakPath;
}

// -------------- Database --------------

function readFile() {
  return fs.readFileSync(PATH_TO_DATABASE, 'utf8');
}

function writeFile(contents) {
  const formatContents = addNewLines(JSON.stringify(contents));

  return fs.writeFileSync(PATH_TO_DATABASE, formatContents, 'utf8');
}

function expandContents(contents) {
  let expandedContents = {};
  for (const [key, value] of Object.entries(contents)) {
    expandedContents[key] = value;
  }

  return expandedContents;
}

function addNewRecord(contents) {
  const databaseContents = JSON.parse(readFile());

  databaseContents.push({ ...contents, ...defaultColumns() });

  writeFile(databaseContents);
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

function indexOfObject(array, object) {
  const orderedObject = object => JSON.stringify(orderObject(object));

  for (let i = 0; i < array.length; i++) {
    if (orderedObject(array[i]) === orderedObject(object)) return i;
  }
}

function orderObject(unorderedObject) {
  const ordered = {};

  Object.keys(unorderedObject)
    .sort()
    .forEach(function(key) {
      ordered[key] = unorderedObject[key];
    });
}
