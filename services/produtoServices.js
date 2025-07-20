// Importa o módulo que contém as funções para acessar e manipular os dados dos produtos
const produtoModels = require('../models/produtoModels');

// Exporta uma função assíncrona chamada 'listar'essa função chama 'buscarTodos' 
// do arquivo 'produtoModel', que retorna todos os produtos do banco de dados
exports.listar = async () => {
  return await produtoModels.buscarTodos();
};

// Exporta uma função assíncrona chamada 'criar', que recebe dados como parâmetro
// Essa função chama 'inserir' do arquivo 'produtoModel' para adicionar um novo produto ao banco
exports.criar = async (dados) => {
  return await produtoModels.inserir(dados);
};
