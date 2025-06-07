// src/views/renderer.js

console.log('Renderer (index.html): Iniciando execução do script.');

// Mapeamento dos nomes das páginas para os caminhos dos módulos JS correspondentes
// Importante: os caminhos aqui são relativos ao renderer.js (que está em src/views/)
// e os módulos JS (rendererCliente.js etc.) também estão em src/views/.
const pageModules = {
    'clientes': './rendererCliente.js', 
    'empresas': './rendererEmpresas.js', 
    'produtos': './rendererProdutos.js', 
    'ordemServico': './rendererOrdemServico.js', 
};

// Variável para armazenar a função de limpeza da página carregada anteriormente (se houver)
let currentPageCleanup = null; // Será usado para desinicializar a página antes de carregar outra

document.addEventListener('DOMContentLoaded', () => {
    console.log('Renderer (index.html): DOMContentLoaded disparado.');

    // Captura a área principal de conteúdo onde o HTML será injetado
    const mainContentArea = document.getElementById('main-content-area');

    // Funções de conexão DB via preload.js (mantidas aqui no contexto principal)
    // Chamada inicial para conectar ao DB quando o index.html for carregado
    if (window.api && window.api.sendDbConnect) {
        window.api.sendDbConnect(); 
        console.log('Renderer (index.html): Mensagem de conexão DB enviada.');
        window.api.onDbStatus((status) => {
            console.log('Renderer (index.html): Status do DB recebido:', status);
            // Você pode adicionar feedback visual para o status do DB aqui (ex: um ícone)
        });
    } else {
        console.warn('Renderer (index.html): API de conexão DB não disponível (sendDbConnect).');
    }

    // Função loadContent: Busca o HTML, injeta e carrega o JS associado
    // Esta função será chamada pelos botões do menu no index.html (onclick="loadContent(...)")
    window.loadContent = async (pageName) => { // Tornar async para usar await fetch e import
        console.log(`Renderer (index.html): Solicitando carregamento do conteúdo: ${pageName}`);

        // 1. Chamar função de limpeza da página anterior, se existir (para evitar listeners duplicados, etc.)
        if (currentPageCleanup) {
            console.log(`Renderer (index.html): Chamando função de limpeza da página anterior.`);
            currentPageCleanup(); // Executa qualquer lógica de limpeza da página anterior
            currentPageCleanup = null; // Reseta a referência
        }

        // 2. Limpar a área de conteúdo principal antes de injetar novo HTML
        mainContentArea.innerHTML = '';
        mainContentArea.textContent = 'Carregando...'; // Mensagem temporária de carregamento

        try {
            // 3. Fazer fetch (requisição HTTP) do arquivo HTML da página desejada
            // O caminho aqui é relativo ao arquivo que está fazendo o fetch (renderer.js).
            // Se renderer.js está em src/views/, e clientes.html está em src/views/,
            // o caminho é ./clientes.html.
            const htmlPath = `./${pageName}.html`; 
            const response = await fetch(htmlPath);
            if (!response.ok) { // se response retornar algo diferente de 200ok
                throw new Error(`Erro ao carregar ${pageName}.html: ${response.status} ${response.statusText}`);
            }
            const htmlText = await response.text(); // Obtém o conteúdo HTML como texto

            // 4. Injetar o HTML na área de conteúdo
            // ATENÇÃO: InnerHTML não executa <script> tags automaticamente
            mainContentArea.innerHTML = htmlText;
            console.log(`Renderer (index.html): Conteúdo de ${pageName}.html injetado.`);

            // 5. Carregar e inicializar o JavaScript associado à página injetada
            const modulePath = pageModules[pageName];
            if (modulePath) {
                // Importar dinamicamente o módulo JS (Ex: ./rendererCliente.js)
                // O 'import()' aqui é um import dinâmico que funciona em módulos ES6.
                // Como renderer.js vai ser tratado como um módulo, isso vai funcionar.
                const pageModule = await import(modulePath);
                
                // Chamar a função de inicialização do módulo correspondente
                if (pageModule && pageModule.initPage) { // Assumimos que cada módulo terá uma 'initPage'
                    console.log(`Renderer (index.html): Chamando initPage() do módulo ${modulePath}.`);
                    pageModule.initPage(); // Chama a função de inicialização
                    // Se a função initPage retornar uma função de limpeza, armazená-la
                    currentPageCleanup = pageModule.cleanupPage || null; 
                } else {
                    console.warn(`Renderer (index.html): Módulo ${modulePath} não exporta 'initPage' ou é inválido.`);
                }
            } else {
                console.warn(`Renderer (index.html): Nenhum módulo JS associado encontrado para ${pageName}.`);
            }

        } catch (error) {
            console.error(`Renderer (index.html): Erro ao carregar ou injetar conteúdo de ${pageName}:`, error);
            mainContentArea.innerHTML = `<div class="p-4 text-red-600">Erro ao carregar a página: ${error.message}</div>`;
        }
    };
});