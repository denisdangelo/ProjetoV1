// src/models/Produto.js

const mongoose = require('mongoose');

// Definição do Schema Mongoose para Produto
const produtoSchema = new mongoose.Schema({
  // _id será gerado automaticamente pelo MongoDB/Mongoose
  nome: { type: String, required: true }, // Mapeia de inputProductName
  codigo: { type: String, required: true, unique: true }, // Mapeia de inputProductCode
  marca: { type: String }, // Mapeia de inputProductBrand
  // Número de série: obrigatório e único se a política for rastrear cada unidade individualmente
  // Se for opcional (nem todo item tem NS) ou se múltiplas unidades puderem ter o mesmo NS (o que é raro para TI), ajuste 'required' e 'unique'
  numeroSerie: { type: String, unique: true, sparse: true }, // Mapeia de inputProductSerial. 'sparse: true' permite nulos/ausentes sem violar a unicidade
  quantidadeEstoque: { type: Number, required: true, min: 0 }, // Mapeia de inputProductStock
  valorAluguelDiario: { type: Number, required: true, min: 0 }, // Mapeia de inputProductRentValue
  observacoesInternas: { type: String }, // Mapeia de inputProductNotes
});

// Criação e Exportação do Model Mongoose
module.exports = mongoose.model('Produto', produtoSchema);
// Mongoose criará a coleção 'produtos'