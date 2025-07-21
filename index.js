// Importa o módulo Express para criar um servidor web
const express = require('express');

// Inicializa a aplicação Express
const app = express();

// Importa o arquivo que define as rotas da funcionalidade "produtos"
const produtoRoutes = require('./routes/produtoRoutes');

// Adiciona o middleware para interpretar requisições com corpo em JSON
// Sem isso, o Express não consegue acessar req.body corretamente
app.use(express.json());

// Define a rota raiz "/" que responde com um "Olá, mundo!"
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

// Usa as rotas de "produtos" e manda o pedido para produtosRoutes
app.use('/produtos', produtoRoutes);

// exporta a aplicação para ser usada em outros arquivos
module.exports = app;
