// Carrega variáveis de ambiente definidas no arquivo .env
require('dotenv').config();

// Importa o objeto Express configurado no arquivo index.js
const app = require('./index');

// Define a porta que o servidor vai escutar; usa a definida no .env ou 3000 como padrão
const port = process.env.PORT || 3000;

// Inicia o servidor, escutando na porta definida, e exibe mensagem no terminal
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
