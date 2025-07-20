-- Cada produto pertence a uma categoria, como "Eletrônicos", "Roupas", etc.
CREATE TABLE classes_produto (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID único da categoria
  nome VARCHAR(50) NOT NULL,                       -- Nome da categoria
  descricao VARCHAR(255)                           -- Descrição para entender o grupo
);

-- Armazena os dados dos produtos
CREATE TABLE produtos (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID único do produto
  nome VARCHAR(100) NOT NULL,                      -- Nome comercial exibido
  descricao VARCHAR(255),                          -- Detalhes sobre o produto
  quantidade INT DEFAULT 0,                        -- Estoque disponível
  preco_compra DECIMAL(10,2),                      -- Preço pago pelo administrador
  preco_venda DECIMAL(10,2),                       -- Preço que o cliente vê
  imagem_url VARCHAR(255),                         -- Link da imagem exibida na interface
  classe_id INT,                                   -- ID da categoria do produto
  ativo BOOLEAN DEFAULT TRUE,                      -- Se está disponível para venda
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data que foi adicionado ao sistema
);

-- Cadastro de clientes que podem comprar na loja.
CREATE TABLE usuarios (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID único do cliente
  nome VARCHAR(100),                               -- Nome completo
  cpf CHAR(11) UNIQUE,                             -- CPF, usado para identificação
  telefone VARCHAR(20),                            -- Número de celular
  email VARCHAR(100) UNIQUE,                       -- Email para login e notificações
  senha_hash VARCHAR(255),                         -- Senha criptografada
  rua VARCHAR(100),                                -- Endereço: rua
  numero VARCHAR(10),                              -- Endereço: número
  cep CHAR(8),                                     -- Código postal
  estado VARCHAR(50),                              -- UF do endereço
  cidade VARCHAR(50),                              -- Cidade de entrega
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data do cadastro na plataforma
);

-- Usuários com permissões para gerenciar o sistema.
CREATE TABLE administradores (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID do administrador
  email VARCHAR(100) UNIQUE,                       -- Email usado no login
  senha_hash VARCHAR(255),                         -- Senha segura para acesso restrito
  nome VARCHAR(100),                               -- Nome da pessoa responsável
  nivel_acesso VARCHAR(50),                        -- Permissões (ex: "gerente", "estoque")
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data da criação da conta admin
);

-- Registra pedidos feitos pelos usuários.
CREATE TABLE vendas (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID único da venda
  usuario_id INT,                                  -- ID de quem comprou
  data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Quando o pedido foi feito
  metodo_pagamento VARCHAR(50),                    -- Forma de pagamento (Pix, Cartão...)
  comprovante_url VARCHAR(255),                    -- Link do recibo (se tiver)
  data_entrega_prevista DATE,                      -- Estimativa de entrega
  data_entrega_real DATE,                          -- Data de entrega real
  valor_total DECIMAL(10,2),                       -- Total pago
  status VARCHAR(20)                               -- Estado do pedido: "pendente", "entregue"
);

-- Cada venda pode conter vários produtos com quantidades diferentes.
CREATE TABLE itens_venda (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID do item na venda
  venda_id INT,                                    -- Qual venda pertence
  produto_id INT,                                  -- Qual produto foi vendido
  quantidade INT DEFAULT 1,                        -- Quantidade comprada
  preco_unitario DECIMAL(10,2)                     -- Preço do produto no momento da compra
);

-- Os usuários podem avaliar produtos que compraram
CREATE TABLE avaliacoes (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, -- ID da avaliação
  usuario_id INT,                                  -- Quem avaliou
  produto_id INT,                                  -- Produto que foi avaliado
  nota INT CHECK (nota BETWEEN 1 AND 5),           -- Avaliação de 1 a 5 estrelas
  comentario VARCHAR(255),                         -- Opinião deixada pelo usuário
  data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data da avaliação
);
