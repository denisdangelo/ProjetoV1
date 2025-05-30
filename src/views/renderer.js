/* Essa função recebe a pagina do index captura a tag Iframe e joga o conteudo da pagina em questão para dentro dessa tag*/
/* por exempo: você clica na pagina clientes, loadPage recebe 'clientes'. iframe captura o elemento Id 'content' e por fim iframe recebe o conteudo de page.html (que nesse exemplo é clientes.html) e joga no conteudo da tag*/

function loadPage(page) {
    const iframe = document.getElementById('content');
    iframe.src = `${page}.html`;
  }



/* //função para chamar a janela Clientes
function client() {
        //console.log("teste do botão Cliente")
        api.clientWindow()
}
//função para chamar a janela Ordem de servico
function serviceOrder() {
    //console.log("teste do botão Cliente")
    api.serviceOrderWindow()
}
//função para chamar a janela produtos
function product() {
    //console.log("teste do botão Cliente")
    api.productWindow()
} */

