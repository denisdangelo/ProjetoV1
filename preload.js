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
    onClientSaved: (callback) => ipcRenderer.on('client-saved', (event, response) => callback(response)),
    onClientSaveError: (callback) => ipcRenderer.on('client-save-error', (event, error) => callback(error)),
})
