/* main.js - processo principal  */

/* importação dos metodos principais do electron */
const { app, BrowserWindow, nativeTheme, Menu , ipcMain} = require('electron');
/* relacionado ao preload.js */
const path = require('node:path');



/** ===============================================================
 * ====================== JANELAS ================================*/

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
  // menu personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  //pagina de inicio
  win.loadFile('./src/views/index.html');
}

// Janela sobre
function aboutWindow() {
  nativeTheme.themeSource = 'light'
  // a linha abaixo obtém a janela principal
  const main = BrowserWindow.getFocusedWindow()
  let about
  // Estabelecer uma relação hierárquica entre janelas
  if (main) {
      // Criar a janela sobre
      about = new BrowserWindow({
          width: 360,
          height: 200,
          autoHideMenuBar: true,
          resizable: false,
          minimizable: false,
          parent: main,
          modal: true
      })
  }
  //carregar o documento html na janela
  about.loadFile('./src/views/sobre.html')
}

// Janela clientes
let client
function clientWindow() {
    nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    if (main) {
        client = new BrowserWindow({
            width: 910,
            height: 680,
            //autoHideMenuBar: true,
            //resizable: false,
            parent: main,
            modal: true,
            //ativação do preload.js
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    client.loadFile('./src/views/clientes.html')
    client.center() //iniciar no centro da tela   
}

// Janela ordemServico
let serviceOrder
function serviceOrderWindow(){
  nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    if (main) {
      serviceOrder = new BrowserWindow({
            width: 910,
            height: 680,
            //autoHideMenuBar: true,
            //resizable: false,
            parent: main,
            modal: true,
            //ativação do preload.js
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    serviceOrder.loadFile('./src/views/ordemServico.html')
    serviceOrder.center() //iniciar no centro da tela   
}


// Janela produtos

let product
function productWindow(){
  nativeTheme.themeSource = 'light'
    const main = BrowserWindow.getFocusedWindow()
    if (main) {
        client = new BrowserWindow({
            width: 910,
            height: 680,
            //autoHideMenuBar: true,
            //resizable: false,
            parent: main,
            modal: true,
            //ativação do preload.js
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }
    client.loadFile('./src/views/produtos.html')
    client.center() //iniciar no centro da tela 

  }
/** ===============================================================
 * ====================== JANELAS - FIM ===========================*/

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

// template do menu
const template = [
  {
      label: 'Cadastro',
      submenu: [
          {
              label: 'Cadastrar Cliente',
          },
          {
            label: 'Cadastrar Produto',
          },
          {
              type: 'separator'
          },
          {
              label: 'Sair',
              click: () => app.quit(),
              accelerator: 'Alt+F4'
          }
      ]
  },
  {
      label: 'Relatórios',
      submenu: [
          {
              label: 'Clientes',
             // click: () => relatorioClientes()
          },
          {
            label: 'Produtos'
            //click: () => relatorioProdutos()
          }
      ]
  },
  {
      label: 'Ferramentas',
      submenu: [
          {
              label: 'Aplicar zoom',
              role: 'zoomIn'
          },
          {
              label: 'Reduzir',
              role: 'zoomOut'
          },
          {
              label: 'Restaurar o zoom padrão',
              role: 'resetZoom'
          },
          {
              type: 'separator'
          },
          {
              label: 'Recarregar',
              role: 'reload'

          },
          {
              label: 'Ferramentas do desenvolvedor',
              role: 'toggleDevTools'
          }
      ]
  },
  {
      label: 'Ajuda',
      submenu: [
          {
              label: 'Sobre',
              click: () => aboutWindow()
          }
      ]
  }
]


// recebimento dos pedidos do renderizador para abertura de janelas (botões) autorizado no preload.js
ipcMain.on('client-window', () => {
  clientWindow()
})
ipcMain.on('serviceOrder-window', () => {
  serviceOrderWindow()
})
ipcMain.on('produtos-window', () => {
  productWindow()
})
