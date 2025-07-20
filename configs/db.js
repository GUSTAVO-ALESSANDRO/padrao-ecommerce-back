// Importa o módulo pg (PostegreSQL) para realizar conexões com o banco de dados.
const { Pool } = require('pg');
// Carrega as variáveis de ambiente definidas no .env
require('dotenv').config();

// Cria um pool de conexões ao banco de dados.
const pool = new Pool({
    // O endereço do servidor do banco de dados
    host: process.env.DB_HOST,
    // O nome de usuário para acessar o banco
    user: process.env.DB_USER,
    // A senha do usuário para o banco de dados
    password: process.env.DB_PASSWORD,
    // O nome do banco de dados que será utilizado
    database: process.env.DB_NAME,
    // A porta que sera utilizada
    port: process.env.DB_PORT,
});

module.exports = pool;

