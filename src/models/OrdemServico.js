// src/models/OrdemServico.js

const mongoose = require('mongoose');

// 1. Schema para o Item Alugado (sub-documento, dentro da OrdemServico)
const itemAlugadoSchema = new mongoose.Schema({
  // Nota: Um item alugado não precisa de um '_id' próprio a menos que você precise
  // referenciá-lo individualmente de fora da OS. Por padrão, MongoDB/Mongoose
  // adicionam um _id para subdocumentos em arrays, mas não é um _id de coleção.
  
  produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true }, // Referencia o _id do Model Produto
  produtoNome: { type: String, required: true }, // Para exibição (dispensa buscar o produto de novo)
  produtoCodigo: { type: String, required: true }, // Para exibição
  numeroSerieItem: { type: String, required: true }, // Número de série específico da unidade alugada.
  quantidade: { type: Number, required: true, min: 1 },
  valorDiarioItem: { type: Number, required: true, min: 0 },
  subtotalItem: { type: Number, required: true, min: 0 }, // Calculado: (valorDiarioItem * quantidade * dias)
});


// 2. Definição do Schema Mongoose para Ordem de Serviço
const ordemServicoSchema = new mongoose.Schema({
  // _id será gerado automaticamente pelo MongoDB/Mongoose
  numeroOS: { type: String, required: true, unique: true }, // Ex: "OS-2024-001"
  dataEmissao: { type: Date, required: true, default: Date.now }, // Armazenar como Date
  statusOS: { 
    type: String, 
    required: true, 
    enum: ['aberta', 'ativa', 'concluida', 'cancelada'], // Restringe os valores permitidos
    default: 'aberta' 
  },
  dataRetirada: { type: Date, required: true }, // Armazenar como Date
  horaRetirada: { type: String }, // Manter como String para HH:MM
  dataDevolucao: { type: Date, required: true }, // Armazenar como Date
  horaDevolucao: { type: String }, // Manter como String para HH:MM

  // Referência ao Cliente ou Empresa (apenas um dos IDs será preenchido)
  clienteId: { type: String, required: true }, // ID do Cliente ou Empresa selecionado
  tipoCliente: { type: String, required: true, enum: ['cliente', 'empresa'] }, // Para saber qual model buscar
  clienteNome: { type: String, required: true }, // Nome/Razão Social para exibição
  clienteDocumento: { type: String, required: true }, // CPF/CNPJ para exibição
  clienteTelefone: { type: String }, 
  clienteEmail: { type: String },

  // Array de sub-documentos usando o itemAlugadoSchema
  itemsAlugados: [itemAlugadoSchema], 

  // Valores Finais
  subtotalEquipamentos: { type: Number, required: true, min: 0 },
  totalGeral: { type: Number, required: true, min: 0 },
  formaPagamento: { 
    type: String, 
    required: true, 
    enum: ['cartao', 'boleto', 'pix', 'dinheiro', 'a-definir'] // Exemplo: 'a-definir' para flexibilidade
  },

  observacoes: { type: String },
}, { timestamps: true }); // Adiciona campos createdAt e updatedAt automaticamente

// Criação e Exportação do Model Mongoose
module.exports = mongoose.model('OrdemServico', ordemServicoSchema);
// Mongoose criará a coleção 'ordemservicos'