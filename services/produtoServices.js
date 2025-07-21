// Importa o módulo que contém as funções para acessar e manipular os dados dos produtos
const produtoModels = require('../models/produtoModels');

// Exporta uma função assíncrona chamada 'listar'essa função chama 'buscarTodos' 
// do arquivo 'produtoModels', que retorna todos os produtos do banco de dados
exports.listar = async () => {
    return await produtoModels.buscarTodos();
};

// Exporta uma função assíncrona chamada 'mostrar'essa função chama 'buscaProduto' 
// do arquivo 'produtoModels', que retorna o produto desejado do banco de dados ( pelo id)
exports.mostrar = async ({id}) => {
    return await produtoModels.buscaProduto({id});
};

// Exporta uma função assíncrona chamada 'criar', que recebe dados como parâmetro
// Essa função chama 'inserir' do arquivo 'produtoModel' para adicionar um novo produto ao banco
exports.criar = async (dados) => {
    return await produtoModels.inserir(dados);
};

// Exporta uma função que recebe dados como parametros e chama 'alterar'
// para modificar um dado de produtos
exports.atualizar = async (dados) => {
    return await produtoModels.alterar(dados);
};

// Exporta uma função que recebe o id como parametro e chama 'excluir'
// para modificar um dado de produtos
exports.deletar = async ({ id }) => {
  return await produtoModels.excluir({ id });
};

