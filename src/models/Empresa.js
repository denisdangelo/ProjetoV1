// src/models/Empresa.js

const mongoose = require('mongoose');

// Definição do Schema Mongoose para Empresa
const empresaSchema = new mongoose.Schema({
  // _id será gerado automaticamente pelo MongoDB/Mongoose
  razaoSocial: { type: String, required: true }, // Mapeia de inputNameEnterprise
  cnpj: { type: String, required: true, unique: true }, // Mapeia de inputCNPJEnterprise
  ie: { type: String }, // Mapeia de inputIEEnterprise (Inscrição Estadual)
  im: { type: String }, // Mapeia de inputIMEnterprise (Inscrição Municipal)
  telefone: { type: String, required: true }, // Mapeia de inputPhoneEnterprise
  cep: { type: String, required: true }, // Mapeia de inputCEPEnterprise
  logradouro: { type: String, required: true }, // Mapeia de inputAddressEnterprise
  numero: { type: String, required: true }, // Mapeia de inputNumberEnterprise
  complemento: { type: String }, // Mapeia de inputComplementEnterprise
  bairro: { type: String, required: true }, // Mapeia de inputNeighborhoodEnterprise
  cidade: { type: String, required: true }, // Mapeia de inputCityEnterprise
  uf: { type: String, required: true }, // Mapeia de inputUFEnterprise
  contatoNome: { type: String }, // Mapeia de inputContactNameEnterprise
  contatoCargo: { type: String }, // Mapeia de inputContactRoleEnterprise
  contatoEmail: { type: String }, // Mapeia de inputContactEmailEnterprise
  contatoTelefone: { type: String }, // Mapeia de inputContactPhoneEnterprise
});

// Criação e Exportação do Model Mongoose
module.exports = mongoose.model('Empresa', empresaSchema);
// Mongoose criará a coleção 'empresas'