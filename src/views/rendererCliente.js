// src/views/rendererCliente.js

   
    const clientForm = document.getElementById('formClient')
    const idClient = document.getElementById('inputIdClient')
    const nameClient = document.getElementById('inputNameClient')
    const CPFClient = document.getElementById('inputCPFClient');
    const emailClient = document.getElementById('inputEmailClient')
    const phoneClient = document.getElementById('inputPhoneClient')
    const CEPClient  = document.getElementById('inputCEPClient')
    const addressClient = document.getElementById('inputAddressClient')
    const numberClient = document.getElementById('inputNumberClient')
    const complementClient = document.getElementById('inputComplementClient')
    const neighborhoodClient = document.getElementById('inputNeighborhoodClient')
    const cityClient = document.getElementById('inputCityClient')
    const ufClient = document.getElementById('inputUFClient')
    


    // Event listener para o envio do formulário
    clientForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const rawCPFClient = CPFClient.value;
        const cleanedCPFClient = rawCPFClient.replace(/[\.\- ]/g, '')

        const clientData = {
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
        api.saveClient(clientData);
    });

    // Funções de Busca e Limpeza
    api.searchName = () => { 
        const searchTerm = searchClientInput.value;
        console.log('Buscar cliente por:', searchTerm);
    };

    api.buscarCEP = () => { 
        const cep = cepClient.value; // Usando a variável corrigida
        console.log('Buscando CEP:', cep);
    };

    
  



