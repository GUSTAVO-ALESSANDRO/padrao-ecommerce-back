const request = require('supertest');
const app = require('../index');

describe('Testes completos da API de Produtos', () => {
    let idPutValido = null;
    let idCrud = null;

    // Teste de GET geral (rota válida)
    it('GET /produtos - deve retornar status 200 e um array de produtos', async () => {
        const res = await request(app).get('/produtos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Teste de GET inválido (rota inexistente)
    it('GET /produtoX - rota inválida deve retornar 404', async () => {
        const res = await request(app).get('/produtoX');
        expect(res.statusCode).toBe(404);
    });

    
    // Teste de GET com id negativo
    it('GET /produtos/-3 - id negativo deve retornar 400', async () => {
        const res = await request(app).get('/produtos/-3');
        expect(res.statusCode).toBe(400);
    });

    // Teste de POST válido seguido de um GET com id especifico e depois o DELETE
    it('POST válido - cria, analisa e exclui produto com sucesso', async () => {
        const produto = {
        nome: "Produto Teste",
        descricao: "Descrição",
        quantidade: 10,
        preco_compra: 50,
        preco_venda: 100,
        imagem_url: "imagem.png",
        classe_id: 1,
        ativo: true
        };

        const resPost = await request(app).post('/produtos').send(produto);
        expect(resPost.statusCode).toBe(201);
        const id = resPost.body.id;

        const resGet = await request(app).get(`/produtos/${id}`);
        expect(resGet.statusCode).toBe(200);

        const resDelete = await request(app).delete(`/produtos/${id}`);
        expect(resDelete.statusCode).toBe(200);
        expect(resDelete.body.id).toBe(id);
    });

    // Testes de POST inválido cobrindo todas as validações
    it('POST inválido - ausência de nome retorna 400', async () => {
        const res = await request(app).post('/produtos').send({
        preco_venda: 100, quantidade: 10, classe_id: 1
        });
        expect(res.statusCode).toBe(400);
    });

    it('POST inválido - ausência de preco_venda retorna 400', async () => {
        const res = await request(app).post('/produtos').send({
        nome: "Produto", quantidade: 10, classe_id: 1
        });
        expect(res.statusCode).toBe(400);
    });

    it('POST inválido - ausência de quantidade retorna 400', async () => {
        const res = await request(app).post('/produtos').send({
        nome: "Produto", preco_venda: 100, classe_id: 1
        });
        expect(res.statusCode).toBe(400);
    });

    it('POST inválido - ausência de classe_id retorna 400', async () => {
        const res = await request(app).post('/produtos').send({
        nome: "Produto", preco_venda: 100, quantidade: 10
        });
        expect(res.statusCode).toBe(400);
    });

    it('POST inválido - preco_venda negativo retorna 400', async () => {
        const res = await request(app).post('/produtos').send({
        nome: "Produto", preco_venda: -10, preco_compra: 50, quantidade: 10, classe_id: 1
        });
        expect(res.statusCode).toBe(400);
    });

    it('POST inválido - preco_venda texto retorna 400', async () => {
        const res = await request(app).post('/produtos').send({
        nome: "Produto", preco_venda: "cem", preco_compra: 50, quantidade: 10, classe_id: 1
        });
        expect(res.statusCode).toBe(400);
    });

    it('POST inválido - preco_compra negativo retorna 400', async () => {
        const res = await request(app).post('/produtos').send({
        nome: "Produto", preco_venda: 100, preco_compra: -1, quantidade: 10, classe_id: 1
        });
        expect(res.statusCode).toBe(400);
    });

    it('POST inválido - preco_compra texto retorna 400', async () => {
        const res = await request(app).post('/produtos').send({
        nome: "Produto", preco_venda: 100, preco_compra: "cinquenta", quantidade: 10, classe_id: 1
        });
        expect(res.statusCode).toBe(400);
    });

    it('POST inválido - quantidade negativa retorna 400', async () => {
        const res = await request(app).post('/produtos').send({
        nome: "Produto", preco_venda: 100, preco_compra: 50, quantidade: -5, classe_id: 1
        });
        expect(res.statusCode).toBe(400);
    });

    it('POST inválido - quantidade texto retorna 400', async () => {
        const res = await request(app).post('/produtos').send({
        nome: "Produto", preco_venda: 100, preco_compra: 50, quantidade: "dez", classe_id: 1
        });
        expect(res.statusCode).toBe(400);
    });

    // Teste de PUT válido seguido de DELETE
    it('PUT válido - atualiza e exclui produto', async () => {
        const produto = {
        nome: "Produto PUT",
        descricao: "Original",
        quantidade: 5,
        preco_compra: 50,
        preco_venda: 100,
        imagem_url: "url",
        classe_id: 1,
        ativo: true
        };

        const resPost = await request(app).post('/produtos').send(produto);
        expect(resPost.statusCode).toBe(201);
        idPutValido = resPost.body.id;

        const resPut = await request(app).put(`/produtos/${idPutValido}`).send({
        nome: "Produto Atualizado",
        descricao: "Modificado",
        quantidade: 10,
        preco_compra: 60,
        preco_venda: 120,
        imagem_url: "nova_url",
        classe_id: 2,
        ativo: false
        });
        expect(resPut.statusCode).toBe(200);
        expect(resPut.body.nome).toBe("Produto Atualizado");

        const resDelete = await request(app).delete(`/produtos/${idPutValido}`);
        expect(resDelete.statusCode).toBe(200);
    });

    // Testes de PUT inválido com validação
    const camposInvalidos = [
        { descricao: "sem nome", body: { preco_venda: 100, preco_compra: 50, quantidade: 10, classe_id: 1 }, campo: "nome" },
        { descricao: "sem preco_venda", body: { nome: "Produto", preco_compra: 50, quantidade: 10, classe_id: 1 }, campo: "preco_venda" },
        { descricao: "sem quantidade", body: { nome: "Produto", preco_venda: 100, preco_compra: 50, classe_id: 1 }, campo: "quantidade" },
        { descricao: "sem classe_id", body: { nome: "Produto", preco_venda: 100, preco_compra: 50, quantidade: 10 }, campo: "classe_id" },
        { descricao: "preco_venda negativo", body: { nome: "Produto", preco_venda: -10, preco_compra: 50, quantidade: 10, classe_id: 1 }, campo: "preco_venda" },
        { descricao: "preco_venda texto", body: { nome: "Produto", preco_venda: "cem", preco_compra: 50, quantidade: 10, classe_id: 1 }, campo: "preco_venda" },
        { descricao: "preco_compra negativo", body: { nome: "Produto", preco_venda: 100, preco_compra: -1, quantidade: 10, classe_id: 1 }, campo: "preco_compra" },
        { descricao: "preco_compra texto", body: { nome: "Produto", preco_venda: 100, preco_compra: "cinquenta", quantidade: 10, classe_id: 1 }, campo: "preco_compra" },
        { descricao: "quantidade negativa", body: { nome: "Produto", preco_venda: 100, preco_compra: 50, quantidade: -5, classe_id: 1 }, campo: "quantidade" },
        { descricao: "quantidade texto", body: { nome: "Produto", preco_venda: 100, preco_compra: 50, quantidade: "dez", classe_id: 1 }, campo: "quantidade" }
    ];

    camposInvalidos.forEach(({ descricao, body }, index) => {
        it(`PUT inválido ${index + 1} - ${descricao} retorna 400`, async () => {
        // Cria produto temporário para testar PUT inválido
        const resPost = await request(app).post('/produtos').send({
            nome: "Produto Temporário",
            descricao: "",
            quantidade: 10,
            preco_compra: 50,
            preco_venda: 100,
            imagem_url: "url",
            classe_id: 1,
            ativo: true
        });
        const id = resPost.body.id;

        // Requisição PUT com corpo inválido
        const resPut = await request(app).put(`/produtos/${id}`).send(body);
        expect(resPut.statusCode).toBe(400);

        // Limpeza: exclui produto usado no teste
        await request(app).delete(`/produtos/${id}`);
        });
    });

        it('CRUD completo - cria, lê, atualiza e exclui um produto', async () => {
        // Criação (POST)
        const produto = {
        nome: "Produto CRUD",
        descricao: "Inicial",
        quantidade: 5,
        preco_compra: 30,
        preco_venda: 60,
        imagem_url: "crud.png",
        classe_id: 1,
        ativo: true
        };
        const resPost = await request(app).post('/produtos').send(produto);
        expect(resPost.statusCode).toBe(201);
        idCrud = resPost.body.id;

        // Leitura (GET)
        const resGet = await request(app).get(`/produtos/${idCrud}`);
        expect(resGet.statusCode).toBe(200);
        expect(resGet.body[0].id).toBe(idCrud);

        // Atualização (PUT)
        const resPut = await request(app).put(`/produtos/${idCrud}`).send({
        nome: "Produto CRUD Atualizado",
        descricao: "Modificado",
        quantidade: 15,
        preco_compra: 35,
        preco_venda: 70,
        imagem_url: "atualizado.png",
        classe_id: 2,
        ativo: false
        });
        expect(resPut.statusCode).toBe(200);
        expect(resPut.body.nome).toBe("Produto CRUD Atualizado");

        // Exclusão (DELETE)
        const resDelete = await request(app).delete(`/produtos/${idCrud}`);
        expect(resDelete.statusCode).toBe(200);
        expect(resDelete.body.id).toBe(idCrud);
    });
});
