/**
 * Arquivo de pré carregamento(mais desempenho) e reforço de segurança na comunicação entre processos (IPC)
 */

// importação dos recursos do framework electron
// contextBridge (segurança) ipcRenderer (comunicação)
const { contextBridge, ipcRenderer } = require('electron')

// Enviar ao main um pedido para conexão com o banco de dados
ipcRenderer.send('db-connect')


// expor (autorizar a comunicação entre processos)
contextBridge.exposeInMainWorld('api', {
	saveClient: (clientData) => ipcRenderer.send('save-client', clientData),
	clientWindow: () => ipcRenderer.send('client-window'), 
	enterpriseWindow: () => ipcRenderer.send('enterprise-window'), 
	productWindow: () => ipcRenderer.send('product-window'), 
	OSWindow: () => ipcRenderer.send('OS-window'), 
	resetForm: (args) => ipcRenderer.on('reset-form' , args)
})
