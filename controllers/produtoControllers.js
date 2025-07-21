// Importa o serviço que contém a lógica de negócio relacionada aos produtos
const produtoServices = require('../services/produtoServices');

// Função que lida com requisições GET em "/produtos" chama
// o serviço para listar os produtos e envia o resultado em JSON
exports.listarProdutos = async (req, res) => {
    console.log(`[ROTA] GET ${req.originalUrl}`);
    try {
        const produtos = await produtoServices.listar();
        console.log('[SUCESSO] Produtos listados.');
        res.json(produtos);
    } catch (error) {
        console.log(`[ERRO] Falha ao listar produtos: ${error.message}`);
        res.status(500).json({ erro: 'Erro ao listar produtos', detalhes: error.message });
    }
};

// Função com requisições GET em "/produtos/:id" chama o serviço para
// listar um produto específico e envia o resultado em JSON
exports.listaProduto = async (req, res) => {
    // pega o parametro id da url ( em /:id)
    const id = Number(req.params.id);
    
    console.log(`[ROTA] GET ${req.originalUrl} | id: ${id}`);
    // verifica se há id e se ele é maior que 0 , se não ter nada da um erro
    if (!id || isNaN(id) || id <= 0) {
        console.log(`[AVISO] ID inválido recebido: ${req.params.id}`);
        return res.status(400).json({ erro: 'ID inválido' });
    }
    // tratamento de erro em listar o produto de id específico
    try {
        const produto = await produtoServices.mostrar({ id });
        if (!produto.length) {
            console.log(`[AVISO] Produto não encontrado para id: ${id}`);
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        console.log(`[SUCESSO] Produto encontrado.`);
        res.json(produto);
    } catch (error) {
        console.log(`[ERRO] Falha ao buscar produto id ${id}: ${error.message}`);
        res.status(500).json({ erro: 'Erro ao buscar produto', detalhes: error.message });
    }
};

// Função que lida com requisições POST em "/produtos"
exports.criarProduto = async (req, res) => {
    console.log(`[ROTA] POST ${req.originalUrl}`);
    // tratamento de erro caso não consiga criar o produto
    try {
        const novoProduto = await produtoServices.criar(req.body);
        console.log(`[SUCESSO] Produto criado.`);
        res.status(201).json(novoProduto);
    } catch (error) {
        console.log(`[ERRO] Falha ao criar produto: ${error.message}`);
        res.status(500).json({ erro: 'Erro ao criar produto', detalhes: error.message });
    }
};

// recebe dados da requisição e chama o serviço para atualizar um produto específico
exports.atualizarProduto = async (req, res) => {
    // pega o parametro id da url ( em /:id)
    const id = Number(req.params.id);
    console.log(`[ROTA] PUT ${req.originalUrl} | id: ${id}`);
    // verifica se há id e se ele é maior que 0, se não retorna um erro
    if (!id || isNaN(id) || id <= 0) {
        console.log(`[AVISO] ID inválido recebido para atualização: ${req.params.id}`);
        return res.status(400).json({ erro: 'ID inválido' });
    }
    // tratamento de erro caso não consiga atualizar um produto
    try {
        const produtoAtualizado = await produtoServices.atualizar({ id, ...req.body });
        console.log(`[SUCESSO] Produto atualizado`);
        res.status(200).json(produtoAtualizado);
    } catch (error) {
        console.log(`[ERRO] Falha ao atualizar produto id ${id}: ${error.message}`);
        res.status(500).json({ erro: 'Erro ao atualizar produto', detalhes: error.message });
    }
};

// recebe o id e chama o serviço de deletar um produto
exports.deletarProduto = async (req, res) => {
    // pega o parametro id da url ( em /:id)
    const id = Number(req.params.id);
    console.log(`[ROTA] DELETE ${req.originalUrl} | id: ${id}`);
    // verifica se há id e se ele é maior que 0, caso contrario retorna um erro
    if (!id || isNaN(id) || id <= 0) {
        console.log(`[AVISO] ID inválido recebido para exclusão: ${req.params.id}`);
        return res.status(400).json({ erro: 'ID inválido' });
    }
    try {
        const produtoDeletado = await produtoServices.deletar({ id });
        console.log(`[SUCESSO] Produto deletado: id ${id}`);
        res.status(200).json(produtoDeletado);
    } catch (error) {
        console.log(`[ERRO] Falha ao deletar produto id ${id}: ${error.message}`);
        res.status(500).json({ erro: 'Erro ao deletar produto', detalhes: error.message });
    }
};
