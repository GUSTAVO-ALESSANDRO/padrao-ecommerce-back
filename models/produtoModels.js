// Importa o módulo de conexão com o banco de dados
const db = require('../configs/db');

// Função assíncrona que busca todos os registros da tabela "produtos"
exports.buscarTodos = async () => {
    // Executa a consulta SQL para selecionar todos os produtos
    const result = await db.query('SELECT * FROM produtos');
    // Retorna apenas as linhas (rows) do resultado da consulta
    return result.rows;
};

// Função assíncrona que busca um produto específico nos registros da tabela "produtos" com base no id
exports.buscaProduto = async ({ id }) => {
    // Executa a consulta SQL para selecionar o produto que é igual ao id requisitado
    const result = await db.query('SELECT * FROM produtos WHERE id = $1', [id]);
    // Retorna apenas as linhas (rows) do resultado da consulta
    return result.rows;
};

// Função assíncrona que insere um novo produto no banco de dados
exports.inserir = async (dados) => {
    // Faz a desestruturação dos dados recebidos como parâmetro
    const {
        nome, descricao, quantidade, preco_compra,
        preco_venda, imagem_url, classe_id, ativo
    } = dados;

    // Define a query SQL de inserção, com placeholders ($1, $2, ..., $8) para segurança contra SQL Injection
     const query = `
        INSERT INTO produtos (nome, descricao, quantidade, preco_compra, preco_venda, imagem_url, classe_id, ativo)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`;

    // Monta o array com os valores que serão substituídos nos placeholders da query
     const values = [
        nome, descricao, quantidade, preco_compra,
        preco_venda, imagem_url, classe_id, ativo
    ];

    // Executa a query no banco de dados com os valores fornecidos
    const result = await db.query(query, values);

    // Retorna a primeira linha do resultado, ou seja, o produto recém-inserido
     return result.rows[0];
};

exports.alterar = async (dados) => {
  // Faz a desestruturação dos dados recebidos como parâmetro
     const {
        id, nome, descricao, quantidade, preco_compra,
        preco_venda, imagem_url, classe_id, ativo
    } = dados;

    // Define a query SQL de atualização
    const query = `
    UPDATE produtos
    SET nome = $2, descricao = $3, quantidade = $4, preco_compra = $5,
         preco_venda = $6, imagem_url = $7, classe_id = $8, ativo = $9
     WHERE id = $1
    RETURNING *`;


  // Monta o array com os valores que serão substituídos nos placeholders da query
  const values = [
    id, nome, descricao, quantidade, preco_compra,
    preco_venda, imagem_url, classe_id, ativo
  ];

  // Executa a query no banco de dados com os valores fornecidos
  const result = await db.query(query, values);

  // Retorna a primeira linha do resultado, ou seja, o produto atualizado
  return result.rows[0];
};

exports.excluir = async ({ id }) => {
    // Define a query SQL de exclusão de um dado
    const query = `
        DELETE FROM produtos
        WHERE id = $1
        RETURNING *`;

    // Executa a query no banco de dados com os valores fornecidos
    const result = await db.query(query, [id]);
     return result.rows[0];
};

