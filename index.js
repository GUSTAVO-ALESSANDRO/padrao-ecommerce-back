// Importa o módulo Express para criar um servidor web
const express = require('express');

// Inicializa a aplicação Express
const app = express();

// Define a porta na qual o servidor vai escutar
const port = 3000;

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

// Inicia o servidor, escutando a porta definida, e exibe uma mensagem no terminal
app.listen(port, async () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
