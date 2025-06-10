// src/views/rendererCliente.js


let clientForm = document.getElementById('formClient')
let idClient = document.getElementById('inputIdClient')
let nameClient = document.getElementById('inputNameClient')
let CPFClient = document.getElementById('inputCPFClient');
let emailClient = document.getElementById('inputEmailClient')
let phoneClient = document.getElementById('inputPhoneClient')
let CEPClient = document.getElementById('inputCEPClient')
let addressClient = document.getElementById('inputAddressClient')
let numberClient = document.getElementById('inputNumberClient')
let complementClient = document.getElementById('inputComplementClient')
let neighborhoodClient = document.getElementById('inputNeighborhoodClient')
let cityClient = document.getElementById('inputCityClient')
let ufClient = document.getElementById('inputUFClient')


//crud create - update
// Event listener para o envio do formulário
clientForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if (idClient.value === "") {
        const rawCPFClient = CPFClient.value;
        const cleanedCPFClient = rawCPFClient.replace(/[\.\- ]/g, '')

        const clientData = {
            nome: nameClient.value,
            cpf: cleanedCPFClient,
            email: emailClient.value,
            telefone: phoneClient.value,
            cep: CEPClient.value,
            logradouro: addressClient.value,
            numero: numberClient.value,
            complemento: complementClient.value,
            bairro: neighborhoodClient.value, // Usando a variável corrigida
            cidade: cityClient.value,
            uf: ufClient.value,
        }
        console.log('Dados do Cliente Coletados (para envio ao Main):', clientData)
        api.saveClient(clientData)
    } else {
        const rawCPFClient = CPFClient.value;
        const cleanedCPFClient = rawCPFClient.replace(/[\.\- ]/g, '')

        const clientData = {
            idCli: idClient.value,
            nome: nameClient.value,
            cpf: cleanedCPFClient,
            email: emailClient.value,
            telefone: phoneClient.value,
            cep: CEPClient.value,
            logradouro: addressClient.value,
            numero: numberClient.value,
            complemento: complementClient.value,
            bairro: neighborhoodClient.value, // Usando a variável corrigida
            cidade: cityClient.value,
            uf: ufClient.value,
        }
        api.updateClient(clientData)
    }


})

//fim crud create

//crud update





// ============================================================
// == Reset Form ==============================================
function resetForm(args) {
    console.log(args)
    location.reload()
}

api.resetForm((args) => {
    resetForm()
})
// == Fim Reset Form ==========================================
// ============================================================


