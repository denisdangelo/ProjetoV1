// src/views/renderer.js

console.log('Renderer (index.html): Iniciando execução do script.');

// Abertura de janelas
function clientesWin() {
    api.clientWindow()
}

function empresasWin() {
    api.enterpriseWindow()
}

function produtosWin() {
    api.productWindow()
}

function ordemServicoWin() {
    api.OSWindow()
}

// Fim abertura de janelas