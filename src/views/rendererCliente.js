/*Renderer Cliente*/

//Captura dos valores do clientes.html

console.log('RendererCliente: Iniciando execução do script.')
// 1. Otimização inicial: Executar o código depois que o DOM estiver completamente carregado


    const clientForm = document.getElementById('formClient')
    const idClient = document.getElementById('inputIdClient')
    const nameClient = document.getElementById('inputNameClient')
    const CPFClient = document.getElementById('inputCPFClient')
    const emailClient = document.getElementById('inputEmailClient')
    const phoneClient = document.getElementById('inputPhoneClient')
    const CEPClient = document.getElementById('inputCEPClient')
    const addressClient = document.getElementById('inputAddressClient')
    const numberClient = document.getElementById('inputNumberClient')
    const complementClient = document.getElementById('inputComplementClient')
    const neighborhoodClient = document.getElementById('inputNeighborhoodClient')
    const cityClient = document.getElementById('inputCityClient')
    const ufClient = document.getElementById('inputUFClient')



    // Adicionar o event listener para o envio do formulário

    clientForm.addEventListener('submit', (event) => {
        // Prevenir o comportamento padrão do formulário (recarregar a página)
        event.preventDefault();

        //capturar o valor do cpf e retirar os espaços e pontos
        const rawCPFClient = CPFClient.value
        const cleanedCPFClient = rawCPFClient.replace(/[\.\- ]/g, '')

        const clientData = {
            id: idClient.value || null,

            nome: nameClient.value,
            cpf: cleanedCPFClient,
            email: emailClient.value,
            telefone: phoneClient.value,
            cep: CEPClient.value,
            logradouro: addressClient.value,
            numero: numberClient.value,
            complemento: complementClient.value,
            bairro: neighborhoodClient.value,
            cidade: cityClient.value,
            uf: ufClient.value,
            
        };
        console.log('Dados do Cliente Coletados:', clientData);
        //console.log('Conteúdo de window.api ANTES da chamada (dentro do submit):', window.api); 
        api.saveClient(clientData); 

    })


