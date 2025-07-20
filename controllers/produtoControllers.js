// Importa o serviço que contém a lógica de negócio relacionada aos produtos
const produtoServices = require('../services/produtoServices');

// Função que lida com requisições GET em "/produtos" chama
// o serviço para listar os produtos e envia o resultado como resposta em formato JSON
exports.listarProdutos = async (req, res) => {
  const produtos = await produtoServices.listar();
  res.json(produtos);
};

// Função que lida com requisições POST em "/produtos"
// Recebe os dados do corpo da requisição (req.body), chama o serviço para criar um novo produto
// Retorna o produto criado com status HTTP 201 (Created) e resposta JSON
exports.criarProduto = async (req, res) => {
  const novoProduto = await produtoServices.criar(req.body);
  res.status(201).json(novoProduto);
};
