/* main.js - processo principal  */

/* importação dos metodos principais do electron */
const { app, BrowserWindow, nativeTheme, Menu } = require('electron');
/* relacionado ao preload.js */
const path = require('node:path');

/* Janela principal */
let win
function createWindow() {
  nativeTheme.themeSource = 'dark'
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });
 
  win.loadFile('./src/views/index.html');
}

// Iniciar a aplicação
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});


//encerrar a aplicação (todas as janelas fechadas)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
