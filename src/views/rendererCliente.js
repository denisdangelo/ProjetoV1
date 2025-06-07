// src/views/rendererCliente.js

console.log('RendererCliente: Script carregado. Aguardando chamada initPage().');

// A função de inicialização que será exportada e chamada pelo renderer.js principal
export function initPage() {
    console.log('RendererCliente: initPage() chamado (página de cliente inicializada dinamicamente).');

    // Captura dos elementos HTML. Estes já DEVEM estar no DOM quando initPage é chamado.
    // (O document.getElementById deve funcionar, pois o HTML já foi injetado).
    const clientForm = document.getElementById('formClient');
    const idClient = document.getElementById('inputIdClient');
    const nameClient = document.getElementById('inputNameClient');
    const CPFClient = document.getElementById('inputCPFClient');
    const emailClient = document.getElementById('inputEmailClient');
    const phoneClient = document.getElementById('inputPhoneClient');
    const CEPClient  = document.getElementById('inputCEPClient'); // Cuidado com este 'document = document'!
    const addressClient = document.getElementById('inputAddressClient');
    const numberClient = document.getElementById('inputNumberClient');
    const complementClient = document.getElementById('inputComplementClient');
    const neighborhoodClient = document.getElementById('inputNeighborhoodClient'); // Cuidado com este 'document = document'!
    const cityClient = document.getElementById('inputCityClient');
    const ufClient = document.getElementById('inputUFClient');

    // CORREÇÃO: Removendo o 'document = document' acidental que apareceu aqui
    const cepClient = document.getElementById('inputCEPClient');
    const neighborhoodClientCorrected = document.getElementById('inputNeighborhoodClient');


    // Elementos do formulário de busca e botões
    const searchClientInput = document.getElementById('searchClient');
    const btnSearch = document.getElementById('btnRead'); 
    const btnCreate = document.getElementById('btnCreate');
    const btnUpdate = document.getElementById('btnUpdate');
    const btnDelete = document.getElementById('btnDelete');
    const btnReset = document.getElementById('btnReset'); 

    // SOLUÇÃO: CAPTURAR window.api EM UMA VARIÁVEL ESTÁVEL
    const electronApi = window.api; 
    console.log('RendererCliente: electronApi capturado na initPage():', electronApi);

    // OUVINTES PARA RESPOSTAS DO PROCESSO PRINCIPAL (FEEDBACK)
    electronApi.onClientSaved((response) => {
        console.log('Cliente salvo com sucesso (feedback do Main):', response);
        alert('Cliente cadastrado com sucesso!'); 
        clientForm.reset(); 
        idClient.value = ''; 
        btnCreate.disabled = false;
        btnUpdate.disabled = true;
        btnDelete.disabled = true;
    });

    electronApi.onClientSaveError((error) => {
        console.error('Erro ao salvar cliente (feedback do Main):', error);
        alert('Erro ao cadastrar cliente: ' + error.message);
    });

    // Event listener para o envio do formulário
    clientForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const rawCPFClient = CPFClient.value;
        const cleanedCPFClient = rawCPFClient.replace(/[\.\- ]/g, '');

        const clientData = {
            id: idClient.value || null,
            nome: nameClient.value,
            cpf: cleanedCPFClient, 
            email: emailClient.value, 
            telefone: phoneClient.value, 
            cep: cepClient.value, // Usando a variável corrigida
            logradouro: addressClient.value,
            numero: numberClient.value, 
            complemento: complementClient.value, 
            bairro: neighborhoodClientCorrected.value, // Usando a variável corrigida
            cidade: cityClient.value, 
            uf: ufClient.value, 
        };
        console.log('Dados do Cliente Coletados (para envio ao Main):', clientData);
        console.log('Conteúdo de electronApi ANTES da chamada (dentro do submit):', electronApi);
        electronApi.saveClient(clientData);
    });

    // Funções de Busca e Limpeza
    window.searchName = () => { 
        const searchTerm = searchClientInput.value;
        console.log('Buscar cliente por:', searchTerm);
    };

    window.buscarCEP = () => { 
        const cep = cepClient.value; // Usando a variável corrigida
        console.log('Buscando CEP:', cep);
    };

    btnReset.addEventListener('click', () => {
        console.log('Formulário de cliente limpo.');
        clientForm.reset();
        idClient.value = '';
        btnCreate.disabled = false;
        btnUpdate.disabled = true;
        btnDelete.disabled = true;
    });

    // Inicializar estado dos botões ao carregar a página
    btnUpdate.disabled = true;
    btnDelete.disabled = true;

} // Fecha a função initPage