// Importa o módulo Express, necessário para utilizar o roteador
const express = require('express');

// Cria uma instância do roteador do Express
const router = express.Router();

// Importa o controlador que contém as funções de lógica para os produtos
const produtoControllers = require('../controllers/produtoControllers');

// Define uma rota GET na raiz "/", quando chamada, executa a função
// 'listarProdutos' do arquivo 'produtoController' para listar todos os produtos
router.get('/', produtoControllers.listarProdutos);

// Define uma rota POST na raiz "/", quando chamada, executa a função
// 'criarProduto' do arquivo 'produtoController' para adicionar um novo produto
router.post('/', produtoControllers.criarProduto);

// Exporta o roteador para que ele possa ser usado em outros arquivos da aplicação
module.exports = router;
