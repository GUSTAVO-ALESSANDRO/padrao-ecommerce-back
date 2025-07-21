// Importa o módulo Express, necessário para utilizar o roteador
const express = require('express');

// Cria uma instância do roteador do Express
const router = express.Router();

// Importa o controlador que contém as funções de lógica para os produtos
const produtoControllers = require('../controllers/produtoControllers');

// Importa o middleware de validação dos produtos (correção adicionada)
const validarProduto = require('../middlewares/validarProduto');

// Define uma rota GET na raiz "/", quando chamada, executa a função
// 'listarProdutos' do arquivo 'produtoController' para listar todos os produtos
router.get('/', produtoControllers.listarProdutos);

// Define uma rota GET, quando chamada, executa a função
// 'listaProduto' do arquivo 'produtoController' para listar um produto específico.
router.get('/:id', produtoControllers.listaProduto);

// Define uma rota POST na raiz "/", quando chamada, chama o middleware 
// de validaçaõ e executa a função 'criarProduto' do arquivo
// 'produtoController' para adicionar um novo produto
router.post('/', validarProduto, produtoControllers.criarProduto);

// Defina a rota de PUT e chama o middleware de validação e depois a função  
// 'atualizarProduto' que atualiza um produto de id específico
router.put('/:id', validarProduto, produtoControllers.atualizarProduto);

// Define a rota de DELETE e chama a função 'deletarProduto' que deleta  
// um produto de id específico
router.delete('/:id', produtoControllers.deletarProduto);

// Exporta o roteador para que ele possa ser usado em outros arquivos da aplicação
module.exports = router;
