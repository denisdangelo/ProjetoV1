// Cliente.js

// Importação do Mongoose
const mongoose = require('mongoose');

// 1. Definição do Schema Mongoose para Cliente
const clienteSchema = new mongoose.Schema({
  // Nota: o _id é gerado automaticamente pelo MongoDB/Mongoose.
  // Você não precisa definir um 'id' manual a menos que queira um UUID customizado.
  // Se usar um ID próprio, remova o '_id' padrão e defina o seu como 'id'.
  // Para simplicidade e padrão do Mongoose, vamos deixar o _id padrão do MongoDB.

  nome: { type: String, required: true }, // Mapeia de inputNameClient
  cpf: { type: String, required: true, unique: true }, // Mapeia de inputCPFClient
  email: { type: String }, // Mapeia de inputEmailClient
  telefone: { type: String, required: true }, // Mapeia de inputPhoneClient
  cep: { type: String, required: true }, // Mapeia de inputCEPClient
  logradouro: { type: String, required: true }, // Mapeia de inputAddressClient
  numero: { type: String, required: true }, // Mapeia de inputNumberClient
  complemento: { type: String }, // Mapeia de inputComplementClient
  bairro: { type: String, required: true }, // Mapeia de inputNeighborhoodClient
  cidade: { type: String, required: true }, // Mapeia de inputCityClient
  uf: { type: String, required: true }, // Mapeia de inputUFClient
}, {versionKey: false});

// 2. Criação e Exportação do Model Mongoose
// O primeiro argumento 'Clientes' é o nome da coleção no MongoDB (Mongoose pluraliza automaticamente para 'clientes')
module.exports = mongoose.model('Cliente', clienteSchema);
// Note: Use 'Cliente' no singular, Mongoose vai criar a coleção 'clientes'.