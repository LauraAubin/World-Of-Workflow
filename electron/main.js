const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');

let mainWindow;
let appVisible = false;

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

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 1400,
    height: 900,
    frame: false,
    transparent: true
  });

  mainWindow.loadURL('http://localhost:3000/');
  mainWindow.center();
  mainWindow.maximize();
  mainWindow.hide();
  app.dock.hide();

  toggleWithKeyboard();

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
