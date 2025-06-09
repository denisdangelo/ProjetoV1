/* main.js - processo principal  */

/* importação dos metodos principais do electron */
const { app, BrowserWindow, nativeTheme, Menu, ipcMain } = require('electron');
/* relacionado ao preload.js */
const path = require('node:path');

// Importação dos métodos conectar e desconectar (módulo de conexão)
const { conectar, desconectar } = require('./database.js')

// Importação do Model Cliente da camada model
const ClienteModel = require('./src/models/Cliente.js');

// Importação do Model Empresa da camada model
const EmpresaModel = require('./src/models/Empresa.js');

// Importação do Model OrdemServico da camada model
const OrdemServicoModel = require('./src/models/OrdemServico.js');

// Importação do Model Produto da camada model
const ProdutoModel = require('./src/models/Produto.js');






/** ===============================================================
 * ====================== JANELAS ================================*/

/* Janela principal */
let win
function createWindow() {
	nativeTheme.themeSource = 'dark'
	win = new BrowserWindow({
		width: 1200,
		height: 900,
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

let clientWin
function clientWindow() {
	nativeTheme.themeSource = 'light'
	const main = BrowserWindow.getFocusedWindow()
	if (main) {
		clientWin = new BrowserWindow({
			width: 1010,
			height: 740,
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
	clientWin.loadFile('./src/views/clientes.html')
	clientWin.center() //iniciar no centro da tela   
}

let enterpriseWin
function enterpriseWindow() {
	nativeTheme.themeSource = 'light'
	const main = BrowserWindow.getFocusedWindow()
	if (main) {
		enterpriseWin = new BrowserWindow({
			width: 1010,
			height: 740,
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
	enterpriseWin.loadFile('./src/views/empresas.html')
	enterpriseWin.center() //iniciar no centro da tela   
}

let productWin
function productWindow() {
	nativeTheme.themeSource = 'light'
	const main = BrowserWindow.getFocusedWindow()
	if (main) {
		productWin = new BrowserWindow({
			width: 1010,
			height: 740,
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
	productWin.loadFile('./src/views/produtos.html')
	productWin.center() //iniciar no centro da tela   
}

let OSWin
function OSWindow() {
	nativeTheme.themeSource = 'light'
	const main = BrowserWindow.getFocusedWindow()
	if (main) {
		OSWin = new BrowserWindow({
			width: 1010,
			height: 740,
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
	OSWin.loadFile('./src/views/ordemServico.html')
	OSWin.center() //iniciar no centro da tela   
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


//=============== iniciar a conexão com o banco de dados (pedido direto do preload.js) =======//
ipcMain.on('db-connect', async (event) => {
	let conectado = await conectar()
	// se conectado for igual a true
	if (conectado) {
		//console.log("Conexão bem-sucedida, executando troca de ícone...")
		// enviar uma mensagem para o renderizador trocar o ícone, criar um delay de 0.5s para sincronizar a nuvem
		setTimeout(() => {
			event.reply('db-status', "conectado")
		}, 500) //500ms        
	} /*else {
    console.log("Falha na conexão, ícone não será alterado.")
}*/
})


//===================== Crud Create =============================
//===============================================================
ipcMain.on('save-client', async (event, clientData) => {
	//teste de recebimento
	console.log(clientData)

	try {
		const newClient = new ClienteModel({
			nome: clientData.nome,
			cpf: clientData.cpf,
			email: clientData.email,
			telefone: clientData.telefone,
			cep: clientData.cep,
			logradouro: clientData.logradouro,
			numero: clientData.numero,
			complemento: clientData.complemento,
			bairro: clientData.bairro,
			cidade: clientData.cidade,
			uf: clientData.uf,
		})
		 await newClient.save()
		event.reply('reset-form')
	} catch (error) {
		console.log(error);
	}
})


//===================== Fim - Crud Create =======================
//===============================================================




// IMPORTANTE ! Desconectar do banco de dados quando a aplicação for encerrada.
app.on('before-quit', () => {
	desconectar()
})

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

ipcMain.on('enterprise-window', () => {
	enterpriseWindow()
})

ipcMain.on('product-window', () => {
	productWindow()
})

ipcMain.on('OS-window', () => {
	OSWindow()
})
