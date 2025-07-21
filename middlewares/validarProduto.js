module.exports = (req, res, next) => {
    const {
        nome, descricao, quantidade,
        preco_compra, preco_venda,
        imagem_url, classe_id, ativo,
    } = req.body;

    // Verifica campos obrigatórios
    if (!nome || !preco_venda || !quantidade || !classe_id) {
        return res.status(400).json({
            erro: 'Campos obrigatórios ausentes: nome, preco_venda, quantidade, classe_id',
        });
    }

    // Verifica se valores do preco de venda são válidos (maior ou iguais a 0)
    if (typeof preco_venda !== 'number' || preco_venda <= 0) {
        return res.status(400).json({ erro: 'Preço de venda deve ser um número positivo' });
    }

    // Verifica se valores do preco de compra são válidos (maior ou iguais a 0)
    if (typeof preco_compra !== 'number' || preco_compra <= 0) {
        return res.status(400).json({ erro: 'Preço de compra deve ser um número positivo' });
    }

    // Verifica se a quantidade do produto é valida (maior ou igual a 0)
    if (typeof quantidade !== 'number' || quantidade < 0) {
        return res.status(400).json({ erro: 'Quantidade deve ser um número não-negativo' });
    }

    // Tudo certo, segue pro controller
    next();
};
