// Importa o módulo de conexão com o banco de dados
const db = require('../configs/db');

// Função assíncrona que busca todos os registros da tabela "produtos"
exports.buscarTodos = async () => {
  // Executa a consulta SQL para selecionar todos os produtos
  const result = await db.query('SELECT * FROM produtos');
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
